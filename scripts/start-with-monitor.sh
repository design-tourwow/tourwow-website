#!/bin/bash

# Simple startup script with automatic monitoring
# Usage: ./scripts/start-with-monitor.sh

echo "🚀 Starting TourWow development server with auto-restart monitoring..."

# Kill any existing processes on port 4000
echo "Cleaning up port 4000..."
lsof -ti:4000 | xargs kill -9 2>/dev/null

# Start the monitoring script in background
echo "Starting server monitor..."
/Users/gap/tourwow-website/scripts/auto-restart-server.sh &
MONITOR_PID=$!

echo "✅ Server monitor started (PID: $MONITOR_PID)"
echo ""
echo "📊 Monitor features:"
echo "  - Auto-restarts if server becomes unresponsive"
echo "  - Restarts if CPU usage exceeds 90%"
echo "  - Health checks every 30 seconds"
echo "  - Logs available at: /tmp/tourwow-server-monitor.log"
echo ""
echo "🌐 Server will be available at: http://localhost:4000"
echo ""
echo "To stop: Press Ctrl+C or run: kill $MONITOR_PID"
echo ""
echo "Monitoring logs:"
tail -f /tmp/tourwow-server-monitor.log