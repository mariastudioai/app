import React from 'react';

const Logo = ({ className = '', size = 28, variant = 'default' }) => {
  // MARI.A Launch lightning-style logo (two stacked tilted bars in indigo)
  const grad = variant === 'white' ? '#ffffff' : 'url(#ezGrad)';
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ezGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C6CFF" />
            <stop offset="1" stopColor="#5B4EE6" />
          </linearGradient>
        </defs>
        <path d="M20 3 L4 17 L14 17 L8 29 L28 13 L18 13 L24 3 Z" fill={grad} />
      </svg>
      <span
        className="text-[20px] font-extrabold tracking-tight whitespace-nowrap"
        style={{ color: variant === 'white' ? '#fff' : '#1B1B3A' }}
      >
        MARI.A Launch
      </span>
    </div>
  );
};

export default Logo;
