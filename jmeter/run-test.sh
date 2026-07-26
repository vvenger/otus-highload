#!/bin/bash
# Запускает нагрузочный тест через JMeter в Docker (образ justb4/jmeter),
# нацеленный на nginx внутри docker-сети проекта. Не требует локальной
# установки JMeter — воспроизводимо у любого, кто поднял стек через `make up`.
# Результаты и HTML-отчёт складываются в jmeter/results/<TEST_NAME>/.
set -euo pipefail

# --- параметры (можно переопределить через env) ---
NETWORK="${NETWORK:-social-network_default}"
HOST="${HOST:-nginx}"       # имя сервиса nginx внутри docker-сети
PORT="${PORT:-80}"          # внутренний порт nginx (не 8080 — это host-проброс)
THREADS="${THREADS:-50}"
RAMP_UP="${RAMP_UP:-10}"
DURATION="${DURATION:-60}"
TEST_NAME="${1:-test}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RESULTS_DIR="./jmeter/results/$TEST_NAME"

rm -rf "$RESULTS_DIR"
mkdir -p "$RESULTS_DIR/home"

echo "=== JMeter Load Test (docker) ==="
echo "  Test:     $TEST_NAME"
echo "  Target:   http://$HOST:$PORT  (nginx, network $NETWORK)"
echo "  Threads:  $THREADS"
echo "  Ramp-up:  ${RAMP_UP}s"
echo "  Duration: ${DURATION}s"
echo "=================================="

RESULT_FILE="/jmeter/results/$TEST_NAME/results.jtl"

# --user: результаты и отчёт остаются владением текущего хоста-пользователя
# (образ по умолчанию пишет от root, что делает jmeter/results/ неудаляемым без sudo).
# Но под "--user uid:gid" в /etc/passwd образа нет записи для этого uid, поэтому
# JVM не может определить user.home через getpwuid (видно как "?" в
# -XshowSettings:properties) — а на user.home опирается java.util.prefs
# (Preferences), не на $HOME. Отсюда "Couldn't create user preferences directory".
# Фикс — JMETER_OPTS: это единственная переменная окружения, которую entrypoint.sh
# образа не перезаписывает и которая подставляется в реальный `java` (JVM-флаг,
# применяется до старта JMeter). Обычный "-Duser.home=..." аргументом CLI не
# работает: JMeter обрабатывает свои -D уже после того, как FileSystemPreferences
# успевает проинициализироваться статически.
HOME_DIR="/jmeter/results/$TEST_NAME/home"
docker run --rm \
  --network "$NETWORK" \
  --user "$(id -u):$(id -g)" \
  -e HOME="$HOME_DIR" \
  -e JMETER_OPTS="-Duser.home=$HOME_DIR" \
  -v "$ROOT/jmeter:/jmeter" \
  justb4/jmeter \
  -n \
  -t /jmeter/test-plan.jmx \
  -j "/jmeter/results/$TEST_NAME/jmeter.log" \
  -l "$RESULT_FILE" \
  -e -o "/jmeter/results/$TEST_NAME/report" \
  -Jhost="$HOST" \
  -Jport="$PORT" \
  -Jthreads="$THREADS" \
  -Jrampup="$RAMP_UP" \
  -Jduration="$DURATION" \
  -Jresultfile="$RESULT_FILE" \
  -Jjmeter.reportgenerator.temp_dir="/jmeter/results/$TEST_NAME/tmp"

echo ""
echo "Results:     $RESULTS_DIR/results.jtl"
echo "HTML report: $RESULTS_DIR/report/index.html"
