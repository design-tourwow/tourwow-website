const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '127.0.0.1';

// Simple HTML content
const html = `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TourWow - ทำงานแล้ว!</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            text-align: center;
        }
        .container { 
            max-width: 800px; 
            padding: 40px; 
            background: rgba(255,255,255,0.1); 
            border-radius: 20px; 
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        h1 { 
            font-size: 3rem; 
            margin-bottom: 20px; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        h2 { 
            font-size: 1.5rem; 
            margin-bottom: 30px; 
            opacity: 0.9;
        }
        .status { 
            background: rgba(34, 197, 94, 0.2); 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px 0; 
            border: 2px solid #22c55e;
        }
        .url-list { 
            background: rgba(255,255,255,0.1); 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px 0;
        }
        .url-list a { 
            color: #ffd700; 
            text-decoration: none; 
            font-size: 1.2rem; 
            display: block; 
            margin: 10px 0; 
            padding: 10px;
            background: rgba(255,255,255,0.1);
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        .url-list a:hover { 
            background: rgba(255,255,255,0.2); 
            transform: translateY(-2px);
        }
        .instructions { 
            background: rgba(255,255,255,0.1); 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px 0; 
            text-align: left;
        }
        .instructions h3 { margin-bottom: 15px; }
        .instructions ol { margin-left: 20px; }
        .instructions li { margin: 10px 0; line-height: 1.5; }
        .timestamp { 
            opacity: 0.7; 
            font-size: 0.9rem; 
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 TourWow Server</h1>
        <h2>เซิร์ฟเวอร์ทำงานแล้ว!</h2>
        
        <div class="status">
            <h3>✅ สถานะ: เชื่อมต่อสำเร็จ</h3>
            <p>เซิร์ฟเวอร์ Node.js ทำงานปกติบน localhost:3000</p>
        </div>

        <div class="url-list">
            <h3>🔗 URL ที่ใช้งานได้:</h3>
            <a href="http://localhost:3000">http://localhost:3000</a>
            <a href="http://127.0.0.1:3000">http://127.0.0.1:3000</a>
            <a href="http://192.168.1.109:3000">http://192.168.1.109:3000</a>
        </div>

        <div class="instructions">
            <h3>📋 ขั้นตอนต่อไป:</h3>
            <ol>
                <li>หากเห็นหน้านี้ แสดงว่าเครือข่ายทำงานปกติ</li>
                <li>ปิดเซิร์ฟเวอร์นี้ด้วย Ctrl+C</li>
                <li>รันคำสั่ง: <code>npm run dev</code></li>
                <li>รีเฟรชหน้าเว็บ</li>
                <li>ควรเห็น TourWow UI แล้ว</li>
            </ol>
        </div>

        <div class="timestamp">
            <p>เวลาที่เริ่มต้น: ${new Date().toLocaleString('th-TH')}</p>
            <p>เซิร์ฟเวอร์: Node.js ${process.version}</p>
            <p>Host: ${HOST}:${PORT}</p>
        </div>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
    });
    res.end(html);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ พอร์ต ${PORT} ถูกใช้งานแล้ว`);
        console.error('รันคำสั่ง: lsof -i:3000 เพื่อเช็คโปรเซส');
    } else {
        console.error('❌ Server error:', err.message);
    }
    process.exit(1);
});

server.listen(PORT, HOST, () => {
    console.log('🎯 =================================');
    console.log('🚀 TourWow Working Server Started!');
    console.log('🎯 =================================');
    console.log('');
    console.log('✅ Status: RUNNING');
    console.log(`📍 Host: ${HOST}`);
    console.log(`📍 Port: ${PORT}`);
    console.log('');
    console.log('🔗 Access URLs:');
    console.log(`   📱 http://localhost:${PORT}`);
    console.log(`   📱 http://127.0.0.1:${PORT}`);
    console.log(`   📱 http://192.168.1.109:${PORT}`);
    console.log('');
    console.log('📋 Next Steps:');
    console.log('   1. Open browser and go to any URL above');
    console.log('   2. If you see the page, network is working!');
    console.log('   3. Press Ctrl+C to stop this server');
    console.log('   4. Then run: npm run dev');
    console.log('');
    console.log('🛑 Press Ctrl+C to stop');
    console.log('🎯 =================================');
});

process.on('SIGINT', () => {
    console.log('\n🛑 Server stopped by user');
    process.exit(0);
});