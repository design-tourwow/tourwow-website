'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface CardExpansionContextType {
  currentExpandingCard: string | null;
  requestExpansion: (cardId: string) => boolean;
  releaseExpansion: (cardId: string) => void;
  forceRelease: () => void;
}

const CardExpansionContext = createContext<CardExpansionContextType | null>(null);

export const CardExpansionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentExpandingCard, setCurrentExpandingCard] = useState<string | null>(null);
  const releaseTimeoutRef = useRef<NodeJS.Timeout>();

  // Request permission to expand a card
  const requestExpansion = useCallback((cardId: string): boolean => {
    // If no card is currently expanding, grant permission
    if (!currentExpandingCard) {
      setCurrentExpandingCard(cardId);
      return true;
    }
    
    // If the same card is requesting, maintain permission
    if (currentExpandingCard === cardId) {
      return true;
    }
    
    // Otherwise, deny permission
    return false;
  }, [currentExpandingCard]);

  // Release expansion permission
  const releaseExpansion = useCallback((cardId: string) => {
    if (currentExpandingCard === cardId) {
      // Add a small delay to prevent flashing when user scrolls quickly
      if (releaseTimeoutRef.current) {
        clearTimeout(releaseTimeoutRef.current);
      }
      
      releaseTimeoutRef.current = setTimeout(() => {
        setCurrentExpandingCard(null);
      }, 300);
    }
  }, [currentExpandingCard]);

  // Force release all expansions (for emergency cases)
  const forceRelease = useCallback(() => {
    if (releaseTimeoutRef.current) {
      clearTimeout(releaseTimeoutRef.current);
    }
    setCurrentExpandingCard(null);
  }, []);

  const value: CardExpansionContextType = {
    currentExpandingCard,
    requestExpansion,
    releaseExpansion,
    forceRelease
  };

  return (
    <CardExpansionContext.Provider value={value}>
      {children}
    </CardExpansionContext.Provider>
  );
};

export const useCardExpansion = (): CardExpansionContextType => {
  const context = useContext(CardExpansionContext);
  if (!context) {
    throw new Error('useCardExpansion must be used within CardExpansionProvider');
  }
  return context;
};