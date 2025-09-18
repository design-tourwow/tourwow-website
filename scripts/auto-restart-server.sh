#!/bin/bash

# Auto-restart script for Next.js dev server on port 4000
# This script monitors the server and restarts it if it becomes unresponsive

PORT=4000
LOG_FILE="/tmp/tourwow-server-monitor.log"
CHECK_URL="http://localhost:$PORT"
MAX_RETRIES=3
TIMEOUT=10
CHECK_INTERVAL=30 # Check every 30 seconds

echo "$(date): Starting server monitor for port $PORT" >> "$LOG_FILE"

# Function to check if server is responsive
check_server() {
    curl -s -o /dev/null -w "%{http_code}" --connect-timeout "$TIMEOUT" "$CHECK_URL" 2>/dev/null
}

# Function to kill processes on port
kill_port() {
    local pids=$(lsof -ti:$PORT 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "$(date): Killing processes on port $PORT: $pids" >> "$LOG_FILE"
        for pid in $pids; do
            kill -9 $pid 2>/dev/null
        done
        sleep 2
    fi
}

# Function to start the server
start_server() {
    echo "$(date): Starting Next.js server on port $PORT" >> "$LOG_FILE"
    cd /Users/gap/tourwow-website
    nohup npm run dev -- --port $PORT >> "$LOG_FILE" 2>&1 &
    local server_pid=$!
    echo "$server_pid" > /tmp/tourwow-server.pid
    echo "$(date): Server started with PID $server_pid" >> "$LOG_FILE"
    
    # Wait for server to be ready
    local wait_count=0
    while [ $wait_count -lt 30 ]; do
        sleep 2
        if [ "$(check_server)" = "200" ]; then
            echo "$(date): Server is ready and responding" >> "$LOG_FILE"
            return 0
        fi
        wait_count=$((wait_count + 1))
    done
    
    echo "$(date): Warning: Server started but not responding after 60 seconds" >> "$LOG_FILE"
    return 1
}

# Function to restart server
restart_server() {
    echo "$(date): Restarting server..." >> "$LOG_FILE"
    kill_port
    start_server
}

# Main monitoring loop
monitor_server() {
    local fail_count=0
    
    while true; do
        sleep "$CHECK_INTERVAL"
        
        # Check if server is responsive
        response=$(check_server)
        
        if [ "$response" != "200" ]; then
            fail_count=$((fail_count + 1))
            echo "$(date): Server not responding (attempt $fail_count/$MAX_RETRIES, response: $response)" >> "$LOG_FILE"
            
            if [ $fail_count -ge $MAX_RETRIES ]; then
                echo "$(date): Server failed $MAX_RETRIES times, restarting..." >> "$LOG_FILE"
                restart_server
                fail_count=0
            fi
        else
            if [ $fail_count -gt 0 ]; then
                echo "$(date): Server recovered, resetting fail count" >> "$LOG_FILE"
            fi
            fail_count=0
        fi
        
        # Check CPU usage of Next.js process
        if [ -f /tmp/tourwow-server.pid ]; then
            server_pid=$(cat /tmp/tourwow-server.pid)
            if ps -p $server_pid > /dev/null 2>&1; then
                cpu_usage=$(ps aux | grep "^gap.*$server_pid" | awk '{print int($3)}')
                if [ ! -z "$cpu_usage" ] && [ "$cpu_usage" -gt 90 ]; then
                    echo "$(date): High CPU usage detected ($cpu_usage%), restarting server" >> "$LOG_FILE"
                    restart_server
                fi
            fi
        fi
    done
}

# Handle script termination
cleanup() {
    echo "$(date): Stopping server monitor" >> "$LOG_FILE"
    if [ -f /tmp/tourwow-server.pid ]; then
        server_pid=$(cat /tmp/tourwow-server.pid)
        kill $server_pid 2>/dev/null
        rm /tmp/tourwow-server.pid
    fi
    exit 0
}

trap cleanup SIGINT SIGTERM

# Check if already running
if [ -f /tmp/tourwow-monitor.pid ]; then
    old_pid=$(cat /tmp/tourwow-monitor.pid)
    if ps -p $old_pid > /dev/null 2>&1; then
        echo "Monitor already running with PID $old_pid"
        exit 1
    fi
fi

echo $$ > /tmp/tourwow-monitor.pid

# Initial server start
kill_port
start_server

# Start monitoring
monitor_server