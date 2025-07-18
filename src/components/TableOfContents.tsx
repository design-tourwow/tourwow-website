'use client';

import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TableOfContentsItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>('');

  // Handle smooth scrolling to headings
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Focus the element for accessibility
      element.focus();
    }
  };

  // Update active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        สารบัญ
      </h3>
      <nav className="space-y-2 text-sm">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`w-full text-left flex items-center gap-2 py-2 border-l-2 border-transparent hover:border-blue-600 pl-3 transition-all ${
              activeHeading === heading.id
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            style={{ paddingLeft: '12px' }}
          >
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{heading.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
} 