// Cache Cleaner Utility - เคลียร์แคชทั้งหมดในระบบ

export class CacheCleaner {
  // เคลียร์ localStorage
  static clearLocalStorage() {
    if (typeof window !== 'undefined') {
      console.log('🗑️ Clearing localStorage...');
      localStorage.clear();
      console.log('✅ localStorage cleared');
    }
  }

  // เคลียร์ sessionStorage
  static clearSessionStorage() {
    if (typeof window !== 'undefined') {
      console.log('🗑️ Clearing sessionStorage...');
      sessionStorage.clear();
      console.log('✅ sessionStorage cleared');
    }
  }

  // เคลียร์ browser cache
  static async clearBrowserCache() {
    if (typeof window !== 'undefined' && 'caches' in window) {
      console.log('🗑️ Clearing browser cache...');
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            console.log(`🗑️ Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
        console.log('✅ Browser cache cleared');
      } catch (error) {
        console.error('❌ Error clearing browser cache:', error);
      }
    }
  }

  // เคลียร์ service worker cache
  static async clearServiceWorkerCache() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      console.log('🗑️ Clearing service worker cache...');
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map(registration => {
            console.log(`🗑️ Unregistering service worker: ${registration.scope}`);
            return registration.unregister();
          })
        );
        console.log('✅ Service worker cache cleared');
      } catch (error) {
        console.error('❌ Error clearing service worker cache:', error);
      }
    }
  }

  // เคลียร์ IndexedDB
  static async clearIndexedDB() {
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      console.log('🗑️ Clearing IndexedDB...');
      try {
        const databases = await window.indexedDB.databases();
        await Promise.all(
          databases.map(db => {
            console.log(`🗑️ Deleting IndexedDB: ${db.name}`);
            return window.indexedDB.deleteDatabase(db.name);
          })
        );
        console.log('✅ IndexedDB cleared');
      } catch (error) {
        console.error('❌ Error clearing IndexedDB:', error);
      }
    }
  }

  // เคลียร์แคชทั้งหมด
  static async clearAllCaches() {
    console.log('🚀 Starting complete cache cleanup...');
    
    // Clear all storage types
    this.clearLocalStorage();
    this.clearSessionStorage();
    await this.clearBrowserCache();
    await this.clearServiceWorkerCache();
    await this.clearIndexedDB();
    
    console.log('✅ Complete cache cleanup finished');
  }

  // เคลียร์แคชเฉพาะบางประเภท
  static async clearSpecificCache(type: 'localStorage' | 'sessionStorage' | 'browser' | 'serviceWorker' | 'indexedDB') {
    switch (type) {
      case 'localStorage':
        this.clearLocalStorage();
        break;
      case 'sessionStorage':
        this.clearSessionStorage();
        break;
      case 'browser':
        await this.clearBrowserCache();
        break;
      case 'serviceWorker':
        await this.clearServiceWorkerCache();
        break;
      case 'indexedDB':
        await this.clearIndexedDB();
        break;
    }
  }

  // เคลียร์แคชอัตโนมัติทุก 5 นาที
  static startAutoClear(intervalMinutes: number = 5) {
    if (typeof window !== 'undefined') {
      console.log(`🔄 Starting auto-clear every ${intervalMinutes} minutes...`);
      setInterval(() => {
        console.log('🕐 Auto-clearing cache...');
        this.clearAllCaches();
      }, intervalMinutes * 60 * 1000);
    }
  }

  // หยุดการเคลียร์แคชอัตโนมัติ
  static stopAutoClear() {
    if (typeof window !== 'undefined') {
      console.log('⏹️ Stopping auto-clear...');
      // Clear all intervals (this is a simplified approach)
      for (let i = 1; i < 1000; i++) {
        window.clearInterval(i);
      }
    }
  }
}

// Export for use in components
export default CacheCleaner; 