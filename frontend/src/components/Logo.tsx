
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className || "w-10 h-10"}
  >
    <path 
      d="M20 20L80 20L80 80L20 80L20 20Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M35 35L65 35L65 65L35 65L35 35Z" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeOpacity="0.3"
    />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
    <path d="M50 20V35" stroke="currentColor" strokeWidth="1" />
    <path d="M50 65V80" stroke="currentColor" strokeWidth="1" />
  </svg>
);
