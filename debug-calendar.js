// Calendar Scroll Debug Script
// Run this in browser console when calendar is open

function debugCalendar() {
    console.clear();
    console.log('🔍 Starting Calendar Scroll Debug...');
    
    // Find calendar elements
    const calendarContainer = document.getElementById('custom-calendar');
    const scrollArea = document.querySelector('#custom-calendar [style*="height: 256px"]');
    
    if (!calendarContainer || !scrollArea) {
        console.error('❌ Calendar elements not found');
        return;
    }
    
    console.log('✅ Calendar elements found');
    console.log('📍 Container:', calendarContainer);
    console.log('📍 Scroll area:', scrollArea);
    
    // Current scroll position
    console.log(`📏 Current scroll: ${scrollArea.scrollTop}px / ${scrollArea.scrollHeight}px`);
    
    // Add scroll listener
    let scrollCount = 0;
    scrollArea.addEventListener('scroll', (e) => {
        scrollCount++;
        console.log(`🔄 Scroll #${scrollCount}: ${e.target.scrollTop}px`);
        
        // Check if window also scrolled (this is the problem)
        setTimeout(() => {
            console.log(`📍 Window scroll: ${window.scrollY}px`);
        }, 10);
    });
    
    // Add wheel listener
    scrollArea.addEventListener('wheel', (e) => {
        console.log(`🖱️ Wheel: deltaY=${e.deltaY}, scrollTop=${e.target.scrollTop}`);
        
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop >= scrollHeight - clientHeight;
        
        console.log(`📊 At top: ${atTop}, At bottom: ${atBottom}`);
        
        if (atTop && e.deltaY < 0) {
            console.log('⚠️ Trying to scroll up at top - should preventDefault');
        } else if (atBottom && e.deltaY > 0) {
            console.log('⚠️ Trying to scroll down at bottom - should preventDefault');
        } else {
            console.log('✅ Normal scroll within bounds');
        }
    });
    
    // Monitor window scroll
    let windowScrollCount = 0;
    window.addEventListener('scroll', () => {
        windowScrollCount++;
        console.error(`🚨 WINDOW SCROLL #${windowScrollCount} - This should NOT happen! Position: ${window.scrollY}px`);
    });
    
    // Test scroll programmatically
    console.log('🧪 Testing programmatic scroll...');
    
    setTimeout(() => {
        console.log('📍 Scrolling to middle...');
        scrollArea.scrollTop = 100;
    }, 1000);
    
    setTimeout(() => {
        console.log('📍 Scrolling to bottom...');
        scrollArea.scrollTop = scrollArea.scrollHeight;
    }, 2000);
    
    setTimeout(() => {
        console.log('📍 Scrolling back to top...');
        scrollArea.scrollTop = 0;
    }, 3000);
    
    console.log('🎯 Debug setup complete. Now try scrolling manually...');
    console.log('👀 Watch for any red WINDOW SCROLL messages (these indicate the bug)');
    
    return {
        scrollArea,
        calendarContainer,
        getScrollInfo: () => ({
            scrollTop: scrollArea.scrollTop,
            scrollHeight: scrollArea.scrollHeight,
            clientHeight: scrollArea.clientHeight,
            windowY: window.scrollY
        })
    };
}

// Auto-run if calendar is open
if (document.getElementById('custom-calendar')) {
    debugCalendar();
} else {
    console.log('⏳ Calendar not found. Open calendar first, then run: debugCalendar()');
}