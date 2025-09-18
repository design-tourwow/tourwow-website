import { NextRequest, NextResponse } from 'next/server';
import CacheCleaner from '@/lib/cache-cleaner';

export async function POST(req: NextRequest) {
  try {
    const { type } = await req.json();
    
    console.log('🗑️ API: Clearing cache type:', type || 'all');
    
    if (type) {
      await CacheCleaner.clearSpecificCache(type as any);
    } else {
      await CacheCleaner.clearAllCaches();
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Cache cleared successfully: ${type || 'all'}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ API: Error clearing cache:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return cache status
    return NextResponse.json({
      success: true,
      message: 'Cache cleaner API is running',
      timestamp: new Date().toISOString(),
      endpoints: {
        'POST /api/clear-cache': 'Clear all caches',
        'POST /api/clear-cache {type}': 'Clear specific cache type (localStorage, sessionStorage, browser, serviceWorker, indexedDB)'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 