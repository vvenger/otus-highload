#!/usr/bin/env bash
# Usage: ./run-test.sh <threads> <name>
#
# <threads> — number of concurrent threads
# <name>    — output directory name under jmeter/results/
#
# Example:
#   ./run-test.sh 1   before_1
#   ./run-test.sh 10  before_10
#   ./run-test.sh 100 after_100
#
# Or via make:
#   make jmeter/test THREADS=1 NAME=before_1
#
# Optional env vars:
#   NETWORK  — docker network (default: social-network_default)
#   HOST     — app container hostname (default: social-network-app-1)
#   PORT     — app port (default: 8000)
#   DURATION — test duration in seconds (default: 60)
#   RAMP_UP  — ramp-up in seconds (default: 10)

set -euo pipefail

if [[ $# -ne 2 ]]; then
    echo "Usage: $0 <threads> <name>"
    exit 1
fi

THREADS="$1"
OUT_DIR="results/$2"

NETWORK="${NETWORK:-social-network_default}"
HOST="${HOST:-social-network-app-1}"
PORT="${PORT:-8000}"
DURATION="${DURATION:-60}"
RAMP_UP="${RAMP_UP:-10}"

# OUT_DIR is relative to jmeter/ — make absolute for mkdir, relative for docker volume
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ABS_OUT="${SCRIPT_DIR}/${OUT_DIR}"

rm -rf "${ABS_OUT}"
mkdir -p "${ABS_OUT}"

echo "=== JMeter Load Test ==="
echo "  Target:   ${HOST}:${PORT}"
echo "  Threads:  ${THREADS}"
echo "  Ramp-up:  ${RAMP_UP}s"
echo "  Duration: ${DURATION}s"
echo "  Output:   ${OUT_DIR}"
echo "  Network:  ${NETWORK}"
echo "========================"

docker run --rm \
    --network "${NETWORK}" \
    -v "${SCRIPT_DIR}:/jmeter" \
    justb4/jmeter \
    -n \
    -t /jmeter/search-test.jmx \
    -l "/jmeter/${OUT_DIR}/results.jtl" \
    -e -o "/jmeter/${OUT_DIR}/report" \
    -Jhost="${HOST}" \
    -Jport="${PORT}" \
    -Jthreads="${THREADS}" \
    -Jrampup="${RAMP_UP}" \
    -Jduration="${DURATION}"

echo ""
echo "Results:     ${ABS_OUT}/results.jtl"
echo "HTML Report: ${ABS_OUT}/report/index.html"
