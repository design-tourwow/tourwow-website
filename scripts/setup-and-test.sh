#!/bin/bash

# Setup and Test Script for Tour Search UX/UI
# This script installs dependencies and runs comprehensive UX/UI tests

set -e

echo "🚀 Starting Setup and Test Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
}

# Install project dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    npm install
    print_success "Dependencies installed successfully"
}

# Install testing dependencies
install_test_dependencies() {
    print_status "Installing testing dependencies..."
    
    # Check if puppeteer is already installed
    if npm list puppeteer &> /dev/null; then
        print_success "Puppeteer already installed"
    else
        npm install --save-dev puppeteer
        print_success "Puppeteer installed successfully"
    fi
}

# Check if development server is running
check_dev_server() {
    print_status "Checking if development server is running..."
    
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Development server is running on port 3000"
        return 0
    else
        print_warning "Development server is not running on port 3000"
        return 1
    fi
}

# Start development server
start_dev_server() {
    print_status "Starting development server..."
    
    # Check if port 3000 is available
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
        print_warning "Port 3000 is already in use. Please stop the existing server first."
        return 1
    fi
    
    # Start the server in background
    npm run dev &
    DEV_SERVER_PID=$!
    
    # Wait for server to start
    print_status "Waiting for server to start..."
    for i in {1..30}; do
        if curl -s http://localhost:3000 > /dev/null; then
            print_success "Development server started successfully (PID: $DEV_SERVER_PID)"
            return 0
        fi
        sleep 1
    done
    
    print_error "Failed to start development server"
    return 1
}

# Run UX/UI tests
run_ux_ui_tests() {
    print_status "Running UX/UI tests..."
    
    if [ ! -f "scripts/test-ux-ui.js" ]; then
        print_error "Test script not found: scripts/test-ux-ui.js"
        return 1
    fi
    
    # Make test script executable
    chmod +x scripts/test-ux-ui.js
    
    # Run tests
    node scripts/test-ux-ui.js
    
    if [ $? -eq 0 ]; then
        print_success "UX/UI tests completed successfully"
        return 0
    else
        print_error "UX/UI tests failed"
        return 1
    fi
}

# Generate test report
generate_report() {
    print_status "Generating test report..."
    
    if [ -f "scripts/ux-ui-test-report.json" ]; then
        print_success "Test report generated: scripts/ux-ui-test-report.json"
        
        # Display summary
        echo ""
        echo "📊 Test Report Summary:"
        echo "========================"
        
        # Parse and display results
        PASSED=$(node -e "const report = require('./scripts/ux-ui-test-report.json'); console.log(report.passed);")
        FAILED=$(node -e "const report = require('./scripts/ux-ui-test-report.json'); console.log(report.failed);")
        TOTAL=$((PASSED + FAILED))
        SUCCESS_RATE=$((PASSED * 100 / TOTAL))
        
        echo "✅ Passed: $PASSED"
        echo "❌ Failed: $FAILED"
        echo "📈 Success Rate: ${SUCCESS_RATE}%"
        
        if [ $SUCCESS_RATE -ge 80 ]; then
            print_success "Excellent! Tests passed with high success rate"
        elif [ $SUCCESS_RATE -ge 60 ]; then
            print_warning "Good, but there's room for improvement"
        else
            print_error "Low success rate. Please review and fix issues"
        fi
    else
        print_error "Test report not found"
    fi
}

# Cleanup function
cleanup() {
    print_status "Cleaning up..."
    
    # Kill development server if we started it
    if [ ! -z "$DEV_SERVER_PID" ]; then
        print_status "Stopping development server (PID: $DEV_SERVER_PID)..."
        kill $DEV_SERVER_PID 2>/dev/null || true
    fi
}

# Main execution
main() {
    # Set up cleanup on exit
    trap cleanup EXIT
    
    echo "🎯 Tour Search UX/UI Testing Setup"
    echo "=================================="
    
    # Run setup steps
    check_node
    check_npm
    install_dependencies
    install_test_dependencies
    
    # Check if dev server is running, start if not
    if ! check_dev_server; then
        if ! start_dev_server; then
            print_error "Failed to start development server. Please start it manually and run: npm run dev"
            exit 1
        fi
    fi
    
    # Wait a bit for server to be fully ready
    sleep 3
    
    # Run tests
    if run_ux_ui_tests; then
        generate_report
        print_success "All tests completed successfully!"
    else
        print_error "Tests failed. Please check the output above for details."
        exit 1
    fi
}

# Run main function
main "$@" 