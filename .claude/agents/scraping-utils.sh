#!/bin/bash

# Scraping Expert Utility Script
# Tools for browser automation and data collection

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Directories
DATA_DIR="data/ihsa-schools"
SCRIPTS_DIR="scripts"
OUTPUT_DIR="$DATA_DIR"

# Check if required tools are installed
check_tools() {
    local missing_tools=()
    
    command -v bun >/dev/null 2>&1 || missing_tools+=("bun")
    command -v jq >/dev/null 2>&1 || missing_tools+=("jq")
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${RED}Missing tools: ${missing_tools[*]}${NC}"
        echo "Install instructions:"
        echo "  bun: curl -fsSL https://bun.sh/install | bash"
        echo "  jq: brew install jq (macOS) or apt-get install jq (Linux)"
        return 1
    fi
    return 0
}

# Run IHSA scraping
run_scraping() {
    local mode=${1:-"headless"}
    local script=${2:-"scrape-ihsa-schools-final.ts"}
    
    echo -e "${YELLOW}Running IHSA scraping in $mode mode...${NC}"
    
    # Create output directory
    mkdir -p "$DATA_DIR"
    
    # Set environment and run
    if [ "$mode" = "debug" ]; then
        HEADLESS=false bun "$SCRIPTS_DIR/$script"
    else
        bun "$SCRIPTS_DIR/$script"
    fi
}

# Check scraping progress
check_progress() {
    echo -e "${YELLOW}Checking scraping progress...${NC}"
    
    # Find latest progress file
    local latest_progress=$(ls -t "$DATA_DIR"/ihsa-schools-progress-*.json 2>/dev/null | head -1)
    
    if [ -z "$latest_progress" ]; then
        echo -e "${RED}No progress files found${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Latest progress file: $latest_progress${NC}"
    
    # Count schools scraped
    local count=$(jq length "$latest_progress" 2>/dev/null || echo "0")
    echo -e "${GREEN}Schools scraped: $count${NC}"
    
    # Show last 5 schools
    echo -e "\n${BLUE}Last 5 schools scraped:${NC}"
    jq -r '.[-5:][].name // empty' "$latest_progress" 2>/dev/null | nl
    
    # Check for errors
    local errors=$(jq '[.[] | select(.error != null)] | length' "$latest_progress" 2>/dev/null || echo "0")
    if [ "$errors" -gt 0 ]; then
        echo -e "\n${RED}Schools with errors: $errors${NC}"
        echo "Run 'scraping-utils.sh errors' to see details"
    fi
}

# Show schools with errors
show_errors() {
    echo -e "${YELLOW}Finding schools with scraping errors...${NC}"
    
    local latest_progress=$(ls -t "$DATA_DIR"/ihsa-schools-progress-*.json 2>/dev/null | head -1)
    
    if [ -z "$latest_progress" ]; then
        echo -e "${RED}No progress files found${NC}"
        return 1
    fi
    
    jq -r '.[] | select(.error != null) | "\(.name): \(.error)"' "$latest_progress" 2>/dev/null
}

# Resume scraping from last position
resume_scraping() {
    echo -e "${YELLOW}Resuming scraping from last position...${NC}"
    
    # Check if resumable script exists
    if [ ! -f "$SCRIPTS_DIR/scrape-ihsa-resumable.ts" ]; then
        echo -e "${RED}Resumable script not found${NC}"
        return 1
    fi
    
    bun "$SCRIPTS_DIR/scrape-ihsa-resumable.ts"
}

# Generate CSV reports
generate_csv() {
    local report_type=${1:-"final"}
    
    echo -e "${YELLOW}Generating $report_type CSV report...${NC}"
    
    case $report_type in
        "final")
            bun "$SCRIPTS_DIR/create-final-sales-csv.ts"
            ;;
        "comprehensive")
            bun "$SCRIPTS_DIR/create-comprehensive-sales-csv.ts"
            ;;
        "clean")
            bun "$SCRIPTS_DIR/create-fully-cleaned-sales-csv.ts"
            ;;
        *)
            echo -e "${RED}Unknown report type: $report_type${NC}"
            echo "Available: final, comprehensive, clean"
            return 1
            ;;
    esac
    
    # Show output files
    echo -e "\n${GREEN}Generated CSV files:${NC}"
    ls -la "$DATA_DIR"/*.csv 2>/dev/null | tail -5
}

# Data quality report
quality_report() {
    echo -e "${YELLOW}Generating data quality report...${NC}"
    
    if [ -f "$SCRIPTS_DIR/generate-full-data-report.ts" ]; then
        bun "$SCRIPTS_DIR/generate-full-data-report.ts"
    else
        echo -e "${RED}Quality report script not found${NC}"
        return 1
    fi
    
    # Show report summary
    if [ -f "$DATA_DIR/data-quality-report.txt" ]; then
        echo -e "\n${BLUE}Report Summary:${NC}"
        head -20 "$DATA_DIR/data-quality-report.txt"
    fi
}

# Debug specific school
debug_school() {
    local school_name="$1"
    
    if [ -z "$school_name" ]; then
        echo -e "${RED}School name required${NC}"
        echo "Usage: $0 debug-school \"School Name\""
        return 1
    fi
    
    echo -e "${YELLOW}Debugging school: $school_name${NC}"
    
    # Set school name and run debug script
    SCHOOL_NAME="$school_name" HEADLESS=false bun "$SCRIPTS_DIR/debug-ihsa-detailed.ts"
}

# Monitor scraping in real-time
monitor_scraping() {
    echo -e "${YELLOW}Monitoring scraping progress...${NC}"
    
    # Check if scraping log exists
    if [ ! -f "scraping.log" ]; then
        echo -e "${RED}No scraping.log found. Run scraping with logging:${NC}"
        echo "bun scripts/scrape-ihsa-schools-final.ts > scraping.log 2>&1 &"
        return 1
    fi
    
    # Tail the log with highlighting
    tail -f scraping.log | grep --color=auto -E "Error|Success|Progress|Warning|$"
}

# Clean data directory
clean_data() {
    local confirm=${1:-"no"}
    
    echo -e "${YELLOW}Data directory contents:${NC}"
    ls -la "$DATA_DIR" | head -20
    
    if [ "$confirm" != "confirm" ]; then
        echo -e "\n${RED}To clean data directory, run: $0 clean confirm${NC}"
        return 1
    fi
    
    echo -e "${RED}Cleaning data directory...${NC}"
    
    # Backup important files
    mkdir -p "$DATA_DIR/backup"
    cp "$DATA_DIR"/*.csv "$DATA_DIR/backup/" 2>/dev/null
    cp "$DATA_DIR"/ihsa-schools-final-*.json "$DATA_DIR/backup/" 2>/dev/null
    
    # Remove progress files
    rm -f "$DATA_DIR"/ihsa-schools-progress-*.json
    rm -f "$DATA_DIR"/ihsa-schools-test-*.json
    
    echo -e "${GREEN}Cleanup complete. CSVs backed up to $DATA_DIR/backup/${NC}"
}

# Test scraping setup
test_setup() {
    echo -e "${YELLOW}Testing scraping setup...${NC}"
    
    # Check tools
    echo -e "\n${BLUE}Checking required tools:${NC}"
    check_tools || return 1
    
    # Check scripts
    echo -e "\n${BLUE}Checking scraping scripts:${NC}"
    local required_scripts=(
        "scrape-ihsa-schools-final.ts"
        "create-final-sales-csv.ts"
        "generate-full-data-report.ts"
    )
    
    for script in "${required_scripts[@]}"; do
        if [ -f "$SCRIPTS_DIR/$script" ]; then
            echo -e "${GREEN}✓ $script${NC}"
        else
            echo -e "${RED}✗ $script${NC}"
        fi
    done
    
    # Check Puppeteer
    echo -e "\n${BLUE}Checking Puppeteer installation:${NC}"
    if bun pm ls | grep -q "puppeteer"; then
        echo -e "${GREEN}✓ Puppeteer is installed${NC}"
        
        # Test Puppeteer with simple script
        echo -e "\n${BLUE}Testing Puppeteer functionality:${NC}"
        cat > /tmp/test-puppeteer.js << 'EOF'
const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://example.com');
        const title = await page.title();
        console.log('✓ Puppeteer working - Page title:', title);
        await browser.close();
    } catch (error) {
        console.error('✗ Puppeteer error:', error.message);
    }
})();
EOF
        node /tmp/test-puppeteer.js
        rm /tmp/test-puppeteer.js
    else
        echo -e "${RED}✗ Puppeteer not installed${NC}"
        echo "Run: bun add puppeteer"
    fi
}

# Analyze CSV data
analyze_csv() {
    local csv_file="$DATA_DIR/ihsa-schools-sales-final-cleaned.csv"
    
    if [ ! -f "$csv_file" ]; then
        echo -e "${RED}CSV file not found: $csv_file${NC}"
        echo "Run 'generate-csv final' first"
        return 1
    fi
    
    echo -e "${YELLOW}Analyzing CSV data...${NC}"
    
    # Count rows (excluding header)
    local total_rows=$(($(wc -l < "$csv_file") - 1))
    echo -e "${BLUE}Total contacts: $total_rows${NC}"
    
    # Count by title (if available)
    echo -e "\n${BLUE}Contacts by title:${NC}"
    awk -F',' 'NR>1 {print $4}' "$csv_file" | sort | uniq -c | sort -nr | head -10
    
    # Count schools
    echo -e "\n${BLUE}Unique schools:${NC}"
    awk -F',' 'NR>1 {print $1}' "$csv_file" | sort -u | wc -l
    
    # Check for missing emails
    echo -e "\n${BLUE}Contacts without email:${NC}"
    awk -F',' 'NR>1 && $5=="" {count++} END {print count+0}' "$csv_file"
}

# Main command handling
case "$1" in
    "scrape")
        run_scraping "$2" "$3"
        ;;
    "progress")
        check_progress
        ;;
    "errors")
        show_errors
        ;;
    "resume")
        resume_scraping
        ;;
    "generate-csv")
        generate_csv "$2"
        ;;
    "quality")
        quality_report
        ;;
    "debug-school")
        debug_school "$2"
        ;;
    "monitor")
        monitor_scraping
        ;;
    "clean")
        clean_data "$2"
        ;;
    "test")
        test_setup
        ;;
    "analyze")
        analyze_csv
        ;;
    *)
        echo "Scraping Expert Utilities"
        echo "Usage: $0 {command} [args]"
        echo ""
        echo "Scraping Commands:"
        echo "  scrape [mode] [script]  - Run scraping (mode: headless/debug)"
        echo "  progress                - Check scraping progress"
        echo "  errors                  - Show schools with errors"
        echo "  resume                  - Resume from last position"
        echo "  debug-school \"name\"     - Debug specific school"
        echo "  monitor                 - Monitor scraping in real-time"
        echo ""
        echo "Data Processing:"
        echo "  generate-csv [type]     - Generate CSV (final/comprehensive/clean)"
        echo "  quality                 - Generate data quality report"
        echo "  analyze                 - Analyze CSV data"
        echo "  clean [confirm]         - Clean data directory"
        echo ""
        echo "Setup & Testing:"
        echo "  test                    - Test scraping setup"
        echo ""
        echo "Examples:"
        echo "  $0 scrape debug"
        echo "  $0 debug-school \"Adlai E. Stevenson High School\""
        echo "  $0 generate-csv final"
        echo "  $0 analyze"
        ;;
esac