const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 8000

console.log('🚀 Starting TourWow Custom Server...')
console.log(`📍 Environment: ${dev ? 'development' : 'production'}`)
console.log(`📍 Hostname: ${hostname}`)
console.log(`📍 Port: ${port}`)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('❌ Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err
    console.log('✅ TourWow Server ready!')
    console.log(`🌐 Local: http://${hostname}:${port}`)
    console.log(`🌐 Network: http://192.168.1.109:${port}`)
    console.log('📱 Ready to accept connections...')
  })
})