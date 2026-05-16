#!/usr/bin/env bash
set -euo pipefail

JMETER_HOME="${JMETER_HOME:-/home/user/apache-jmeter-5.6.3}"
export PATH="$JMETER_HOME/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="$SCRIPT_DIR/results/$TIMESTAMP"

mkdir -p "$RESULTS_DIR"

echo "==> Dialog load test"
echo "    Plan:    $SCRIPT_DIR/dialog_load_test.jmx"
echo "    Results: $RESULTS_DIR/results.jtl"
echo ""

jmeter -n \
  -t "$SCRIPT_DIR/dialog_load_test.jmx" \
  -l "$RESULTS_DIR/results.jtl" \
  -j "$RESULTS_DIR/jmeter.log"

echo ""
echo "==> Done."
echo "    Log:     $RESULTS_DIR/jmeter.log"
echo "    Results: $RESULTS_DIR/results.jtl"
echo ""
echo "    To view: open JMeter GUI → File → Open → $RESULTS_DIR/results.jtl"
