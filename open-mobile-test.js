const { execSync } = require('child_process');

// Create applescript to open Chrome in mobile view
const applescript = `
tell application "Google Chrome"
  activate
  open location "http://localhost:4000/tour-search-28/tour-jp-001"
  delay 2
  
  -- Open Developer Tools
  tell application "System Events"
    key code 125 using {command down, option down, shift down} -- Cmd+Opt+Shift+Down (DevTools)
    delay 1
    
    -- Toggle device toolbar (mobile view)
    key code 2 using {command down, shift down} -- Cmd+Shift+C
    delay 1
  end tell
end tell
`;

try {
  execSync(`osascript -e '${applescript}'`, { stdio: 'inherit' });
  console.log('✅ Opened Chrome with mobile viewport');
} catch (error) {
  console.log('❌ Error opening Chrome:', error.message);
  
  // Fallback: just open the URL
  execSync('open http://localhost:4000/tour-search-28/tour-jp-001');
  console.log('📱 Please manually switch to mobile view in DevTools (Cmd+Shift+M)');
}