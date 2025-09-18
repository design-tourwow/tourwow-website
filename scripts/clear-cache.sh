#!/bin/bash

echo "🗑️ TourWow Cache Cleaner Script"
echo "================================"

# Function to clear browser cache
clear_browser_cache() {
    echo "🌐 Clearing browser cache..."
    
    # Clear Chrome cache (macOS)
    if [ -d "$HOME/Library/Application Support/Google/Chrome/Default/Cache" ]; then
        rm -rf "$HOME/Library/Application Support/Google/Chrome/Default/Cache"/*
        echo "✅ Chrome cache cleared"
    fi
    
    # Clear Safari cache (macOS)
    if [ -d "$HOME/Library/Caches/com.apple.Safari" ]; then
        rm -rf "$HOME/Library/Caches/com.apple.Safari"/*
        echo "✅ Safari cache cleared"
    fi
    
    # Clear Firefox cache (macOS)
    if [ -d "$HOME/Library/Caches/Firefox" ]; then
        rm -rf "$HOME/Library/Caches/Firefox"/*
        echo "✅ Firefox cache cleared"
    fi
}

# Function to clear Node.js cache
clear_node_cache() {
    echo "📦 Clearing Node.js cache..."
    
    # Clear npm cache
    npm cache clean --force
    echo "✅ npm cache cleared"
    
    # Clear Next.js cache
    if [ -d ".next" ]; then
        rm -rf .next
        echo "✅ Next.js cache cleared"
    fi
    
    # Clear node_modules (optional)
    if [ "$1" = "--full" ]; then
        echo "🗑️ Removing node_modules..."
        rm -rf node_modules
        echo "✅ node_modules removed"
    fi
}

# Function to clear system cache
clear_system_cache() {
    echo "💻 Clearing system cache..."
    
    # Clear DNS cache (macOS)
    sudo dscacheutil -flushcache
    sudo killall -HUP mDNSResponder
    echo "✅ DNS cache cleared"
    
    # Clear system cache
    sudo rm -rf /Library/Caches/*
    sudo rm -rf ~/Library/Caches/*
    echo "✅ System cache cleared"
}

# Function to restart development server
restart_dev_server() {
    echo "🔄 Restarting development server..."
    
    # Kill existing Node.js processes
    pkill -f "next\|node" 2>/dev/null || true
    
    # Wait a moment
    sleep 2
    
    # Start development server
    echo "🚀 Starting development server..."
    npm run dev &
    
    echo "✅ Development server restarted"
}

# Main execution
case "$1" in
    "browser")
        clear_browser_cache
        ;;
    "node")
        clear_node_cache
        ;;
    "system")
        clear_system_cache
        ;;
    "dev")
        clear_node_cache
        restart_dev_server
        ;;
    "full")
        clear_browser_cache
        clear_node_cache --full
        clear_system_cache
        restart_dev_server
        ;;
    *)
        echo "Usage: $0 {browser|node|system|dev|full}"
        echo ""
        echo "Options:"
        echo "  browser  - Clear browser cache only"
        echo "  node     - Clear Node.js and Next.js cache"
        echo "  system   - Clear system cache and DNS"
        echo "  dev      - Clear node cache and restart dev server"
        echo "  full     - Clear all caches and restart dev server"
        echo ""
        echo "Examples:"
        echo "  $0 browser    # Clear browser cache"
        echo "  $0 dev        # Clear node cache and restart server"
        echo "  $0 full       # Clear everything and restart"
        exit 1
        ;;
esac

echo ""
echo "🎉 Cache clearing completed!"
echo "================================" 