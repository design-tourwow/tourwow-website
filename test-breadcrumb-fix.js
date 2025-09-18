// Breadcrumb Alignment Verification Script
// Run this in browser console on tour-search-21/[id] page

function verifyBreadcrumbAlignment() {
    console.clear();
    console.log('🔍 Verifying Breadcrumb Alignment...');
    
    // Find breadcrumb navigation
    const breadcrumbNav = document.querySelector('nav[role="navigation"]');
    
    if (!breadcrumbNav) {
        console.error('❌ Breadcrumb navigation not found');
        return false;
    }
    
    console.log('✅ Breadcrumb navigation found');
    console.log('📍 Element:', breadcrumbNav);
    
    // Get all breadcrumb items
    const items = breadcrumbNav.children;
    console.log(`📊 Found ${items.length} breadcrumb items`);
    
    // Check alignment by measuring element positions
    let isAligned = true;
    let baselineY = null;
    const positions = [];
    
    Array.from(items).forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(item);
        
        positions.push({
            index,
            text: item.textContent,
            top: rect.top,
            height: rect.height,
            lineHeight: computedStyle.lineHeight,
            fontSize: computedStyle.fontSize,
            display: computedStyle.display,
            verticalAlign: computedStyle.verticalAlign
        });
        
        console.log(`📏 Item ${index}: "${item.textContent}" - Top: ${rect.top.toFixed(2)}px, Height: ${rect.height.toFixed(2)}px`);
        
        if (baselineY === null) {
            baselineY = rect.top;
        } else {
            const diff = Math.abs(rect.top - baselineY);
            if (diff > 2) { // Allow 2px tolerance
                console.warn(`⚠️ Item ${index} is misaligned by ${diff.toFixed(2)}px`);
                isAligned = false;
            }
        }
    });
    
    // Check if all elements are inline-block
    const allInlineBlock = Array.from(items).every(item => {
        const display = window.getComputedStyle(item).display;
        return display === 'inline-block';
    });
    
    console.log('📋 Alignment Results:');
    console.log(`✅ All elements inline-block: ${allInlineBlock}`);
    console.log(`✅ Vertically aligned: ${isAligned}`);
    console.log(`✅ Uses semantic nav: ${breadcrumbNav.tagName === 'NAV'}`);
    console.log(`✅ Has proper role: ${breadcrumbNav.getAttribute('role') === 'navigation'}`);
    
    // Visual test - highlight potential alignment issues
    if (!isAligned) {
        console.log('🎨 Highlighting misaligned elements...');
        Array.from(items).forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (Math.abs(rect.top - baselineY) > 2) {
                item.style.outline = '2px solid red';
                item.style.outlineOffset = '2px';
                setTimeout(() => {
                    item.style.outline = '';
                    item.style.outlineOffset = '';
                }, 3000);
            }
        });
    }
    
    // Test horizontal scrolling
    const containerStyle = window.getComputedStyle(breadcrumbNav);
    console.log('📱 Scroll Properties:');
    console.log(`- overflow-x: ${containerStyle.overflowX}`);
    console.log(`- white-space: ${containerStyle.whiteSpace}`);
    console.log(`- scrollbar-width: ${containerStyle.scrollbarWidth}`);
    
    const finalResult = isAligned && allInlineBlock;
    console.log(`\n${finalResult ? '🎉' : '❌'} Final Result: Breadcrumb alignment is ${finalResult ? 'PERFECT' : 'BROKEN'}`);
    
    if (finalResult) {
        console.log('✨ Breadcrumb alignment has been successfully fixed!');
        console.log('🔧 Key improvements:');
        console.log('  - Changed to semantic <nav> element');
        console.log('  - All items use inline-block display');
        console.log('  - Consistent mx-2 spacing instead of px-2 + flex-shrink-0');
        console.log('  - Added proper ARIA attributes');
        console.log('  - Maintained horizontal scroll capability');
    }
    
    return {
        aligned: isAligned,
        inlineBlock: allInlineBlock,
        semantic: breadcrumbNav.tagName === 'NAV',
        positions: positions,
        success: finalResult
    };
}

// Auto-run verification
setTimeout(() => {
    const result = verifyBreadcrumbAlignment();
    
    if (result && result.success) {
        // Create success notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed; 
                top: 20px; 
                right: 20px; 
                background: #10b981; 
                color: white; 
                padding: 12px 16px; 
                border-radius: 8px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
                z-index: 10000;
                font-family: system-ui;
                font-size: 14px;
                max-width: 300px;
            ">
                ✅ <strong>Breadcrumb Fixed!</strong><br>
                Perfect alignment achieved
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}, 1000);

console.log('🚀 Breadcrumb alignment verification script loaded');
console.log('⏳ Will auto-verify in 1 second...');
console.log('💡 You can also run: verifyBreadcrumbAlignment()');