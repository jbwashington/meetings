#!/bin/bash

# Test Guardian Utility Script with CLI Integrations
# Enhanced commands for testing with Supabase, Stripe, Vercel, and GitHub CLIs

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if CLI tools are installed
check_cli_tools() {
    local missing_tools=()
    
    command -v supabase >/dev/null 2>&1 || missing_tools+=("supabase")
    command -v stripe >/dev/null 2>&1 || missing_tools+=("stripe")
    command -v vercel >/dev/null 2>&1 || missing_tools+=("vercel")
    command -v gh >/dev/null 2>&1 || missing_tools+=("gh")
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${RED}Missing CLI tools: ${missing_tools[*]}${NC}"
        echo "Install instructions:"
        echo "  Supabase: npm install -g supabase"
        echo "  Stripe: https://stripe.com/docs/stripe-cli"
        echo "  Vercel: npm install -g vercel"
        echo "  GitHub: https://cli.github.com/"
        return 1
    fi
    return 0
}

# Function to run tests with better error handling
run_test() {
    local test_type=$1
    local test_file=$2
    
    echo -e "${YELLOW}Running $test_type tests...${NC}"
    
    case $test_type in
        "e2e")
            if [ -n "$test_file" ]; then
                bun test:e2e "$test_file"
            else
                bun test:e2e
            fi
            ;;
        "unit")
            if [ -n "$test_file" ]; then
                bun test --run "$test_file"
            else
                bun test
            fi
            ;;
        "integration")
            bun test:integration
            ;;
        *)
            echo -e "${RED}Unknown test type: $test_type${NC}"
            exit 1
            ;;
    esac
}

# Function to debug failing E2E tests
debug_e2e() {
    local test_file=$1
    echo -e "${YELLOW}Running E2E test in headed mode for debugging...${NC}"
    bunx playwright test "$test_file" --headed --workers=1
}

# Enhanced environment check with CLI tools
check_env() {
    echo -e "${YELLOW}Checking test environment with CLI tools...${NC}"
    
    # Check CLI tools first
    if ! check_cli_tools; then
        echo -e "${RED}Please install missing CLI tools first${NC}"
        return 1
    fi
    
    # Check Supabase
    echo -e "\n${BLUE}Supabase Status:${NC}"
    if supabase status >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Supabase is running${NC}"
        supabase status | grep -E "API URL|GraphQL URL|DB URL" | sed 's/^/  /'
    else
        echo -e "${RED}✗ Supabase is not running. Run: supabase start${NC}"
    fi
    
    # Check Stripe
    echo -e "\n${BLUE}Stripe Status:${NC}"
    if stripe config --list >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Stripe CLI is configured${NC}"
        stripe config --list | grep -E "test_mode|device_name" | sed 's/^/  /'
    else
        echo -e "${RED}✗ Stripe CLI not configured. Run: stripe login${NC}"
    fi
    
    # Check Vercel
    echo -e "\n${BLUE}Vercel Status:${NC}"
    if vercel whoami >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Vercel CLI is authenticated${NC}"
        echo "  User: $(vercel whoami 2>/dev/null)"
    else
        echo -e "${RED}✗ Vercel CLI not authenticated. Run: vercel login${NC}"
    fi
    
    # Check GitHub
    echo -e "\n${BLUE}GitHub Status:${NC}"
    if gh auth status >/dev/null 2>&1; then
        echo -e "${GREEN}✓ GitHub CLI is authenticated${NC}"
        gh auth status 2>&1 | grep -E "Logged in|Token:" | sed 's/^/  /'
    else
        echo -e "${RED}✗ GitHub CLI not authenticated. Run: gh auth login${NC}"
    fi
    
    # Check Redis
    echo -e "\n${BLUE}Redis Status:${NC}"
    if command -v redis-cli >/dev/null 2>&1 && redis-cli ping >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Redis is available${NC}"
    else
        echo -e "${YELLOW}⚠ Redis is not available (optional)${NC}"
    fi
    
    # Check environment variables
    echo -e "\n${BLUE}Environment Variables:${NC}"
    local required_vars=("NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY" "STRIPE_SECRET_KEY")
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            echo -e "${RED}✗ Missing: $var${NC}"
        else
            echo -e "${GREEN}✓ Set: $var${NC}"
        fi
    done
}

# Stripe webhook testing
test_stripe_webhook() {
    local event_type=${1:-"payment_intent.succeeded"}
    
    echo -e "${YELLOW}Testing Stripe webhook: $event_type${NC}"
    
    # Check if stripe listen is running
    if ! pgrep -f "stripe listen" >/dev/null; then
        echo -e "${YELLOW}Starting Stripe webhook listener...${NC}"
        stripe listen --forward-to localhost:3000/api/stripe/webhook &
        sleep 3
    fi
    
    # Trigger the event
    echo -e "${BLUE}Triggering event: $event_type${NC}"
    stripe trigger "$event_type"
}

# Supabase database operations
db_operations() {
    local operation=$1
    
    case $operation in
        "reset")
            echo -e "${YELLOW}Resetting database...${NC}"
            supabase db reset
            ;;
        "seed")
            echo -e "${YELLOW}Seeding database...${NC}"
            bun seed:e2e
            ;;
        "diff")
            echo -e "${YELLOW}Checking migration differences...${NC}"
            supabase db diff
            ;;
        "dump")
            echo -e "${YELLOW}Dumping database...${NC}"
            supabase db dump --data-only
            ;;
        *)
            echo -e "${RED}Unknown operation: $operation${NC}"
            echo "Available: reset, seed, diff, dump"
            ;;
    esac
}

# GitHub CI operations
ci_operations() {
    local operation=$1
    local arg=$2
    
    case $operation in
        "status")
            echo -e "${YELLOW}Checking CI status...${NC}"
            gh run list --workflow=e2e-tests.yml --limit 5
            ;;
        "logs")
            if [ -z "$arg" ]; then
                echo -e "${RED}Run ID required${NC}"
                return 1
            fi
            echo -e "${YELLOW}Fetching logs for run $arg...${NC}"
            gh run view "$arg" --log
            ;;
        "download")
            if [ -z "$arg" ]; then
                echo -e "${RED}Run ID required${NC}"
                return 1
            fi
            echo -e "${YELLOW}Downloading artifacts for run $arg...${NC}"
            gh run download "$arg" -n playwright-report
            ;;
        "watch")
            echo -e "${YELLOW}Watching current CI runs...${NC}"
            gh run watch
            ;;
        *)
            echo -e "${RED}Unknown operation: $operation${NC}"
            echo "Available: status, logs <run-id>, download <run-id>, watch"
            ;;
    esac
}

# Vercel deployment testing
vercel_operations() {
    local operation=$1
    
    case $operation in
        "env-pull")
            echo -e "${YELLOW}Pulling environment variables...${NC}"
            vercel env pull .env.local
            ;;
        "env-list")
            echo -e "${YELLOW}Listing environment variables...${NC}"
            vercel env ls
            ;;
        "deploy-test")
            echo -e "${YELLOW}Creating test deployment...${NC}"
            vercel --no-wait
            ;;
        "logs")
            echo -e "${YELLOW}Fetching deployment logs...${NC}"
            vercel logs --follow
            ;;
        *)
            echo -e "${RED}Unknown operation: $operation${NC}"
            echo "Available: env-pull, env-list, deploy-test, logs"
            ;;
    esac
}

# Function to run specific test patterns
run_pattern() {
    local pattern=$1
    echo -e "${YELLOW}Running tests matching pattern: $pattern${NC}"
    bun test:e2e --grep "$pattern"
}

# Function to show skipped tests
show_skipped() {
    echo -e "${YELLOW}Finding skipped tests...${NC}"
    grep -r "test\.skip\|test\.todo\|xit\|it\.skip" __tests__ --include="*.test.ts" -n
}

# Main command handling
case "$1" in
    "run")
        run_test "$2" "$3"
        ;;
    "debug")
        debug_e2e "$2"
        ;;
    "env")
        check_env
        ;;
    "pattern")
        run_pattern "$2"
        ;;
    "skipped")
        show_skipped
        ;;
    "stripe")
        test_stripe_webhook "$2"
        ;;
    "db")
        db_operations "$2"
        ;;
    "ci")
        ci_operations "$2" "$3"
        ;;
    "vercel")
        vercel_operations "$2"
        ;;
    "check-cli")
        check_cli_tools && echo -e "${GREEN}All CLI tools are installed!${NC}"
        ;;
    *)
        echo "Test Guardian Utilities with CLI Integrations"
        echo "Usage: $0 {command} [args]"
        echo ""
        echo "Basic Commands:"
        echo "  run <type> [file]     - Run tests (type: e2e, unit, integration)"
        echo "  debug <file>          - Debug E2E test in headed mode"
        echo "  env                   - Check complete test environment"
        echo "  pattern <pattern>     - Run tests matching pattern"
        echo "  skipped               - Show all skipped tests"
        echo ""
        echo "CLI Integration Commands:"
        echo "  stripe [event]        - Test Stripe webhooks"
        echo "  db <operation>        - Database operations (reset, seed, diff, dump)"
        echo "  ci <operation> [id]   - GitHub CI operations (status, logs, download, watch)"
        echo "  vercel <operation>    - Vercel operations (env-pull, env-list, deploy-test, logs)"
        echo "  check-cli             - Check if all CLI tools are installed"
        echo ""
        echo "Examples:"
        echo "  $0 stripe payment_intent.succeeded"
        echo "  $0 db reset"
        echo "  $0 ci logs 123456789"
        echo "  $0 vercel env-pull"
        ;;
esac