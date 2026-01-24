#!/bin/bash

# RPIV Gate Runner
# Executes validation checks on curriculum artifacts

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS="${GREEN}✅ PASS${NC}"
FAIL="${RED}❌ FAIL${NC}"

usage() {
    echo "Usage: $0 <gate-number> <topic-or-class>"
    echo ""
    echo "Gates:"
    echo "  1  Lesson Plan Alignment"
    echo "  2  Spec Achievement"
    echo "  3  Implementation Match"
    echo "  4  Verification"
    echo "  5  Validation"
    echo ""
    echo "Examples:"
    echo "  $0 1 market-sizing"
    echo "  $0 3 class-5-market-sizing"
    echo "  $0 all"
    exit 1
}

check_font_sizes() {
    local file=$1
    echo "Checking font sizes in $file..."

    # Look for small font sizes (bad patterns)
    if grep -E "font-size:\s*(1[0-4]|[0-9])px" "$file" > /dev/null 2>&1; then
        echo -e "  ${FAIL} Found font sizes below 15px"
        grep -n -E "font-size:\s*(1[0-4]|[0-9])px" "$file" | head -5
        return 1
    fi

    if grep -E "\.attr\(['\"]font-size['\"],\s*['\"]?(1[0-4]|[0-9])px" "$file" > /dev/null 2>&1; then
        echo -e "  ${FAIL} Found D3 font sizes below 15px"
        grep -n -E "\.attr\(['\"]font-size['\"],\s*['\"]?(1[0-4]|[0-9])px" "$file" | head -5
        return 1
    fi

    if grep -E "font-size:\s*0\.[0-8]rem" "$file" > /dev/null 2>&1; then
        echo -e "  ${FAIL} Found font sizes below 0.9rem"
        grep -n -E "font-size:\s*0\.[0-8]rem" "$file" | head -5
        return 1
    fi

    echo -e "  ${PASS} Font sizes OK"
    return 0
}

check_navigation() {
    local file=$1
    echo "Checking keyboard navigation in $file..."

    local has_keyboard=false
    if grep -q "keydown\|keyup\|KeyboardEvent" "$file"; then
        has_keyboard=true
    fi

    if [ "$has_keyboard" = true ]; then
        echo -e "  ${PASS} Keyboard handlers found"
        return 0
    else
        echo -e "  ${FAIL} No keyboard navigation detected"
        return 1
    fi
}

check_responsive() {
    local file=$1
    echo "Checking responsive design in $file..."

    # Check for viewBox on SVGs (good pattern)
    if grep -q "viewBox" "$file"; then
        echo -e "  ${PASS} SVG viewBox found"
    else
        if grep -q "<svg" "$file"; then
            echo -e "  ${FAIL} SVG without viewBox"
            return 1
        fi
    fi

    return 0
}

count_slides() {
    local file=$1
    local count=0

    # Count Astro slides
    count=$(grep -c 'class="slide' "$file" 2>/dev/null || echo "0")

    echo "$count"
}

# Main
GATE=${1:-""}
TARGET=${2:-""}

if [ -z "$GATE" ]; then
    usage
fi

echo "# Gate Check Results"
echo ""
echo "Gate: $GATE"
echo "Target: $TARGET"
echo ""

case $GATE in
    3)
        # Find presentation file
        if [ -n "$TARGET" ]; then
            PRES_FILE=$(find . -path "*$TARGET*" -name "presentation.*" | head -1)
        else
            echo "Target required for Gate 3"
            exit 1
        fi

        if [ -z "$PRES_FILE" ]; then
            echo -e "${FAIL} No presentation file found for $TARGET"
            exit 1
        fi

        echo "## Gate 3: Implementation Match"
        echo ""
        echo "File: $PRES_FILE"
        echo ""

        PASS_COUNT=0
        TOTAL=4

        # Check slide count
        SLIDES=$(count_slides "$PRES_FILE")
        echo "Slide count: $SLIDES"
        if [ "$SLIDES" -gt 5 ]; then
            echo -e "  ${PASS} Sufficient slides"
            ((PASS_COUNT++))
        else
            echo -e "  ${FAIL} Only $SLIDES slides found"
        fi

        # Check fonts
        if check_font_sizes "$PRES_FILE"; then
            ((PASS_COUNT++))
        fi

        # Check navigation
        if check_navigation "$PRES_FILE"; then
            ((PASS_COUNT++))
        fi

        # Check responsive
        if check_responsive "$PRES_FILE"; then
            ((PASS_COUNT++))
        fi

        echo ""
        echo "## Summary"
        echo ""
        echo "$PASS_COUNT/$TOTAL checks passed"

        if [ "$PASS_COUNT" -eq "$TOTAL" ]; then
            echo -e "\nOverall: ${PASS}"
        else
            echo -e "\nOverall: ${FAIL}"
            echo ""
            echo "Fix issues and re-run: /gate-check 3 $TARGET"
        fi
        ;;

    all)
        echo "Running all gates on all artifacts..."
        echo "This should be run via Claude, not directly."
        ;;

    *)
        echo "Gate $GATE checking requires Claude analysis."
        echo "Run via: /gate-check gate-$GATE $TARGET"
        ;;
esac
