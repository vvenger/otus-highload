#!/usr/bin/env bash
set -euo pipefail

JMETER_HOME="${JMETER_HOME:-/home/user/apache-jmeter-5.6.3}"
export PATH="$JMETER_HOME/bin:$PATH"

THREADS="${THREADS:-10}"
DURATION="${DURATION:-30}"
SN_HOST="${SN_HOST:-localhost}"
SN_PORT="${SN_PORT:-8000}"
CHAT_HOST="${CHAT_HOST:-localhost}"
CHAT_PORT="${CHAT_PORT:-8001}"
TEST_NAME="${1:-test}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESULTS_DIR="$SCRIPT_DIR/results/$TEST_NAME"

mkdir -p "$RESULTS_DIR"

echo "==> Dialog load test: $TEST_NAME"
echo "    Threads:  $THREADS"
echo "    Duration: ${DURATION}s"
echo "    SN:       $SN_HOST:$SN_PORT"
echo "    Chat:     $CHAT_HOST:$CHAT_PORT"
echo "    Results:  $RESULTS_DIR"
echo ""

jmeter -n \
  -t "$SCRIPT_DIR/dialog_load_test.jmx" \
  -l "$RESULTS_DIR/results.jtl" \
  -j "$RESULTS_DIR/jmeter.log" \
  -JTHREADS="$THREADS" \
  -JDURATION="$DURATION" \
  -JSN_HOST="$SN_HOST" \
  -JSN_PORT="$SN_PORT" \
  -JCHAT_HOST="$CHAT_HOST" \
  -JCHAT_PORT="$CHAT_PORT"

echo ""
echo "==> Done."
echo "    Results: $RESULTS_DIR/results.jtl"
echo "    Log:     $RESULTS_DIR/jmeter.log"
echo ""
echo "    To view: open JMeter GUI → File → Open → $RESULTS_DIR/results.jtl"
