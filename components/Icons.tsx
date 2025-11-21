import React from 'react';

// Simplified Icon Components (Lucide style)

const IconWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

export const Search = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </IconWrapper>
);

export const FlaskConical = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path>
    <path d="M8.5 2h7"></path>
    <path d="M7 16h10"></path>
  </IconWrapper>
);

export const Dna = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M2 15c6.667-6 13.333 0 20-6"></path>
    <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"></path>
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"></path>
    <path d="M17 6l-2.5-2.5"></path>
    <path d="M14 8l-1-1"></path>
    <path d="M7 18l2.5 2.5"></path>
    <path d="M3.5 14.5l.5.5"></path>
    <path d="M20 9l.5.5"></path>
    <path d="M6.5 12.5l1 1"></path>
    <path d="M16.5 10.5l1 1"></path>
    <path d="M10 16l1.5 1.5"></path>
  </IconWrapper>
);

export const Loader2 = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </IconWrapper>
);

export const AlertCircle = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </IconWrapper>
);

export const CheckCircle2 = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </IconWrapper>
);

export const ArrowRight = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </IconWrapper>
);

export const Zap = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </IconWrapper>
);