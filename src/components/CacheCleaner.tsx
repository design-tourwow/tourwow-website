'use client';

import { useState, useEffect } from 'react';
import { Trash2, RefreshCw, AlertTriangle, CheckCircle, Eye, EyeOff, X } from 'lucide-react';
import CacheCleaner from '@/lib/cache-cleaner';

interface CacheCleanerProps {
  autoClear?: boolean;
  intervalMinutes?: number;
  showStatus?: boolean;
  defaultVisible?: boolean;
}

export default function CacheCleanerComponent({ 
  autoClear = true, 
  intervalMinutes = 5, 
  showStatus = true,
  defaultVisible = false
}: CacheCleanerProps) {
  const [isClearing, setIsClearing] = useState(false);
  const [lastCleared, setLastCleared] = useState<Date | null>(null);
  const [autoClearActive, setAutoClearActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'clearing' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);

  // Initialize visibility from localStorage or props
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVisibility = localStorage.getItem('cache-cleaner-visible');
      if (savedVisibility !== null) {
        setIsVisible(savedVisibility === 'true');
      } else {
        setIsVisible(defaultVisible);
      }
    } else {
      setIsVisible(defaultVisible);
    }
  }, [defaultVisible]);

  // Save visibility state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cache-cleaner-visible', isVisible.toString());
    }
  }, [isVisible]);

  // Start auto-clear on component mount
  useEffect(() => {
    if (autoClear) {
      startAutoClear();
    }

    return () => {
      if (autoClearActive) {
        CacheCleaner.stopAutoClear();
      }
    };
  }, [autoClear]);

  const startAutoClear = () => {
    if (!autoClearActive) {
      CacheCleaner.startAutoClear(intervalMinutes);
      setAutoClearActive(true);
      console.log(`🔄 Auto-clear started every ${intervalMinutes} minutes`);
    }
  };

  const stopAutoClear = () => {
    if (autoClearActive) {
      CacheCleaner.stopAutoClear();
      setAutoClearActive(false);
      console.log('⏹️ Auto-clear stopped');
    }
  };

  const handleManualClear = async () => {
    setIsClearing(true);
    setStatus('clearing');
    
    try {
      await CacheCleaner.clearAllCaches();
      setLastCleared(new Date());
      setStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error clearing cache:', error);
      setStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } finally {
      setIsClearing(false);
    }
  };

  const handleClearSpecific = async (type: 'localStorage' | 'sessionStorage' | 'browser' | 'serviceWorker' | 'indexedDB') => {
    setIsClearing(true);
    setStatus('clearing');
    
    try {
      await CacheCleaner.clearSpecificCache(type);
      setLastCleared(new Date());
      setStatus('success');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error(`Error clearing ${type}:`, error);
      setStatus('error');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } finally {
      setIsClearing(false);
    }
  };

  // If not showing status and not visible, return null
  if (!showStatus && !isVisible) {
    return null;
  }

  // If not visible, show only the toggle button
  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Show Cache Cleaner"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Cache Cleaner
          </h3>
          <div className="flex items-center gap-2">
            {autoClearActive && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Auto
              </div>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Hide Cache Cleaner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Display */}
        {status !== 'idle' && (
          <div className={`mb-3 p-2 rounded text-xs flex items-center gap-2 ${
            status === 'success' ? 'bg-green-100 text-green-700' :
            status === 'error' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {status === 'success' && <CheckCircle className="w-3 h-3" />}
            {status === 'error' && <AlertTriangle className="w-3 h-3" />}
            {status === 'clearing' && <RefreshCw className="w-3 h-3 animate-spin" />}
            {status === 'success' && 'Cache cleared successfully!'}
            {status === 'error' && 'Error clearing cache'}
            {status === 'clearing' && 'Clearing cache...'}
          </div>
        )}

        {/* Last Cleared */}
        {lastCleared && (
          <div className="text-xs text-gray-500 mb-3">
            Last cleared: {lastCleared.toLocaleTimeString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleManualClear}
            disabled={isClearing}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white text-xs py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
          >
            {isClearing ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <Trash2 className="w-3 h-3" />
                Clear All Caches
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleClearSpecific('localStorage')}
              disabled={isClearing}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white text-xs py-1 px-2 rounded"
            >
              LocalStorage
            </button>
            <button
              onClick={() => handleClearSpecific('browser')}
              disabled={isClearing}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-xs py-1 px-2 rounded"
            >
              Browser Cache
            </button>
          </div>

          {/* Auto-clear Toggle */}
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-gray-600">Auto-clear</span>
            <button
              onClick={autoClearActive ? stopAutoClear : startAutoClear}
              className={`text-xs px-2 py-1 rounded ${
                autoClearActive 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              {autoClearActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 