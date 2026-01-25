#!/bin/bash

# RPIV Artifact Status Checker
# Scans project for curriculum artifacts and reports status

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Status icons
COMPLETE="✅"
PARTIAL="🔄"
MISSING="❌"
BLOCKED="🚫"

echo "# RPIV Artifact Status Report"
echo ""
echo "Generated: $(date)"
echo ""

# Check course-level artifacts
echo "## Course Foundation"
echo ""
echo "| Artifact | Status | Notes |"
echo "|----------|--------|-------|"

check_file() {
    local file=$1
    local name=$2
    if [ -f "$file" ]; then
        local lines=$(wc -l < "$file" | tr -d ' ')
        if [ "$lines" -gt 10 ]; then
            echo "| $name | $COMPLETE | $lines lines |"
            return 0
        else
            echo "| $name | $PARTIAL | Only $lines lines |"
            return 1
        fi
    else
        echo "| $name | $MISSING | |"
        return 2
    fi
}

# Check each course artifact
check_file "curriculum-design-research.md" "curriculum-design-research.md"
RESEARCH_STATUS=$?

check_file "course-plan.md" "course-plan.md"
PLAN_STATUS=$?

check_file "SYLLABUS.md" "SYLLABUS.md"
SYLLABUS_STATUS=$?

check_file "master-presentation-spec.md" "master-presentation-spec.md"
SPEC_STATUS=$?

echo ""

# Determine foundation status
if [ $RESEARCH_STATUS -eq 0 ] && [ $PLAN_STATUS -eq 0 ] && [ $SYLLABUS_STATUS -eq 0 ] && [ $SPEC_STATUS -eq 0 ]; then
    echo "Foundation Status: COMPLETE $COMPLETE"
else
    echo "Foundation Status: INCOMPLETE $PARTIAL"
fi

echo ""
echo "## Classes"
echo ""

# Find class directories (both old and new structure)
OLD_CLASSES=$(find . -maxdepth 1 -type d -name "class-*" 2>/dev/null | sort)
NEW_CLASSES=$(find src/pages -maxdepth 1 -type d -name "class-*" 2>/dev/null | sort 2>/dev/null || true)

ALL_CLASSES="$OLD_CLASSES $NEW_CLASSES"

for class_dir in $ALL_CLASSES; do
    [ -z "$class_dir" ] && continue
    [ ! -d "$class_dir" ] && continue

    class_name=$(basename "$class_dir")
    topic=$(echo "$class_name" | sed 's/class-[0-9]*-//')

    echo "### $class_name"
    echo ""
    echo "| Artifact | Status |"
    echo "|----------|--------|"

    # Check for various artifacts
    [ -f "$class_dir/research-$topic.md" ] && echo "| research | $COMPLETE |" || echo "| research | $MISSING |"
    [ -f "$class_dir/lesson-plan-$topic.md" ] && echo "| lesson-plan | $COMPLETE |" || echo "| lesson-plan | $MISSING |"
    [ -f "$class_dir/presentation-spec-$topic.md" ] && echo "| presentation-spec | $COMPLETE |" || echo "| presentation-spec | $MISSING |"

    # Check for presentation (astro or html)
    if [ -f "$class_dir/presentation.astro" ]; then
        echo "| presentation | $COMPLETE (astro) |"
    elif [ -f "$class_dir/presentation.html" ]; then
        echo "| presentation | $COMPLETE (html) |"
    else
        echo "| presentation | $MISSING |"
    fi

    [ -f "$class_dir/reviewlog.md" ] && echo "| reviewlog | $COMPLETE |" || echo "| reviewlog | $MISSING |"
    [ -f "$class_dir/script.md" ] && echo "| script | $COMPLETE |" || echo "| script | $MISSING |"

    echo ""
done

# Count statistics
TOTAL_CLASSES=$(echo "$ALL_CLASSES" | wc -w | tr -d ' ')
echo "## Summary"
echo ""
echo "- Total classes found: $TOTAL_CLASSES"
echo ""
echo "Run \`/rpiv-workflow\` for guided next steps."
