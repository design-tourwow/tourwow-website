// Analytics API endpoint for tour-search-50
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const events = await request.json()
    
    // In a real application, you would:
    // 1. Validate the events data
    // 2. Store in database/analytics service
    // 3. Process the analytics data
    
    // For now, just log to console in development (commented out to reduce noise)
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('📊 Analytics Events:', events)
    // }
    
    return NextResponse.json({ success: true, count: events?.length || 0 })
  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process analytics' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Analytics API is running',
    timestamp: new Date().toISOString()
  })
}