'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useCardExpansion } from './CardExpansionContext';

interface SmartAutoExpandOptions {
  threshold: number; // Time in ms before auto-expand
  viewportThreshold: number; // Percentage of card visible for activation
  stopScrollThreshold: number; // Time in ms user must stop scrolling
  enabled: boolean;
}

export const useSmartAutoExpand = (
  cardId: string, 
  options: Partial<SmartAutoExpandOptions> = {}
) => {
  const {
    threshold = 6000,
    viewportThreshold = 0.6,
    stopScrollThreshold = 1000,
    enabled = true
  } = options;

  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const elementRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<NodeJS.Timeout>();
  const scrollStopRef = useRef<NodeJS.Timeout>();
  const lastScrollTime = useRef<number>(0);
  
  const { requestExpansion, releaseExpansion } = useCardExpansion();

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.intersectionRatio >= viewportThreshold;
          const isCompletelyOut = entry.intersectionRatio === 0; // Card is completely out of view
          
          setIsInViewport(isVisible);
          
          if (isVisible && !isExpanded) {
            // Card is sufficiently in viewport and not expanded, wait for scroll to stop
            lastScrollTime.current = Date.now();
            
            if (scrollStopRef.current) {
              clearTimeout(scrollStopRef.current);
            }
            
            scrollStopRef.current = setTimeout(() => {
              // User stopped scrolling and card is in viewport
              if (requestExpansion(cardId)) {
                setIsFocused(true);
                startProgressAnimation();
              }
            }, stopScrollThreshold);
            
          } else if (isCompletelyOut) {
            // Card is completely out of viewport
            setIsFocused(false);
            releaseExpansion(cardId);
            stopProgressAnimation();
            
            // Clear any pending progress
            if (progressRef.current) {
              clearTimeout(progressRef.current);
              progressRef.current = undefined;
            }
            
            // Auto flip back to Pre-Program when completely scrolled out of view
            if (isExpanded) {
              setTimeout(() => {
                setIsExpanded(false);
                setProgress(0);
              }, 100); // Small delay to ensure smooth transition
            }
          } else if (!isVisible) {
            // Card is partially visible but not enough to trigger auto-expand
            // Just stop the progress animation if it's running
            if (!isExpanded && progress > 0) {
              stopProgressAnimation();
            }
          }
        });
      },
      { 
        threshold: [0, 0.1, viewportThreshold], // 0 for completely out, 0.1 for almost out, viewportThreshold for auto-expand
        rootMargin: '0px' // No offset, detect exact viewport boundaries
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
      if (progressRef.current) clearTimeout(progressRef.current);
      releaseExpansion(cardId);
    };
  }, [enabled, viewportThreshold, stopScrollThreshold, cardId, requestExpansion, releaseExpansion, isExpanded]);

  // Progress animation
  const startProgressAnimation = useCallback(() => {
    if (progressRef.current || isExpanded) return; // Already running or expanded
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / threshold) * 100, 100);
      
      setProgress(progressPercent);
      
      if (progressPercent < 100 && isFocused) {
        progressRef.current = setTimeout(animate, 16); // ~60fps
      } else if (progressPercent >= 100 && isFocused) {
        setIsExpanded(true);
        setProgress(100);
        progressRef.current = undefined;
      } else {
        // Not focused anymore, stop and reset
        setProgress(0);
        progressRef.current = undefined;
      }
    };
    
    animate();
  }, [threshold, isFocused, isExpanded]);

  const stopProgressAnimation = useCallback(() => {
    if (progressRef.current) {
      clearTimeout(progressRef.current);
      progressRef.current = undefined;
    }
    setProgress(0);
  }, []);

  // Manual toggle function
  const toggleExpand = useCallback(() => {
    // Stop any auto-expansion process
    stopProgressAnimation();
    if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
    
    const newExpanded = !isExpanded;
    
    if (newExpanded) {
      // Request permission to expand
      if (requestExpansion(cardId)) {
        setIsExpanded(true);
        setProgress(100);
      }
    } else {
      // Release and collapse
      releaseExpansion(cardId);
      setIsExpanded(false);
      setProgress(0);
    }
  }, [isExpanded, cardId, requestExpansion, releaseExpansion, stopProgressAnimation]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopProgressAnimation();
      releaseExpansion(cardId);
    };
  }, [cardId, releaseExpansion, stopProgressAnimation]);

  return {
    isExpanded,
    progress,
    isInViewport,
    isFocused,
    elementRef,
    toggleExpand,
    setIsExpanded
  };
};