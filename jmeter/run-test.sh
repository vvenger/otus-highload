#!/bin/bash
# Runs JMeter load test via Docker
set -e

NETWORK="${NETWORK:-social-network_default}"
THREADS="${THREADS:-50}"
RAMP_UP="${RAMP_UP:-10}"
DURATION="${DURATION:-60}"
HOST="${HOST:-social-network-app-1}"
PORT="${PORT:-8000}"
TEST_NAME="${1:-test}"

RESULTS_DIR="./jmeter/results/$TEST_NAME"
rm -rf "$RESULTS_DIR"
mkdir -p "$RESULTS_DIR"

echo "=== JMeter Load Test ==="
echo "  Test:     $TEST_NAME"
echo "  Target:   $HOST:$PORT"
echo "  Threads:  $THREADS"
echo "  Ramp-up:  ${RAMP_UP}s"
echo "  Duration: ${DURATION}s"
echo "  Network:  $NETWORK"
echo "========================"

docker run --rm \
  --network "$NETWORK" \
  -v "$(pwd)/jmeter:/jmeter" \
  justb4/jmeter \
  -n \
  -t /jmeter/test-plan.jmx \
  -l "/jmeter/results/$TEST_NAME/results.jtl" \
  -e -o "/jmeter/results/$TEST_NAME/report" \
  -Jhost="$HOST" \
  -Jport="$PORT" \
  -Jthreads="$THREADS" \
  -Jrampup="$RAMP_UP" \
  -Jduration="$DURATION"

echo ""
echo "Results: $RESULTS_DIR/results.jtl"
echo "HTML Report: $RESULTS_DIR/report/index.html"
