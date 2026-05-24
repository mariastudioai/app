import React from 'react';

const Logo = ({ className = '', size = 28, variant = 'default' }) => {
  // MARI.A Launch — luxury wordmark with gold accent diamond
  const textColor = variant === 'white' ? '#F6F3EF' : '#3E2F2B';
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mariaGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C6A77D" />
            <stop offset="1" stopColor="#9C7E5A" />
          </linearGradient>
        </defs>
        {/* Stylized M with a small gold dot to evoke MARI.A */}
        <path
          d="M5 26 L5 6 L10 6 L16 16 L22 6 L27 6 L27 26 L23 26 L23 13 L17 23 L15 23 L9 13 L9 26 Z"
          fill={variant === 'white' ? '#F6F3EF' : '#3E2F2B'}
        />
        <circle cx="27.5" cy="6.5" r="2" fill="url(#mariaGrad)" />
      </svg>
      <span
        className="text-[18px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase"
        style={{ color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Mari<span style={{ color: '#C6A77D' }}>.</span>A&nbsp;<span style={{ fontWeight: 400, letterSpacing: '0.08em' }}>Launch</span>
      </span>
    </div>
  );
};

export default Logo;
