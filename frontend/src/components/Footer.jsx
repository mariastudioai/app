import React from 'react';
import Logo from './Logo';

const RotatingBadge = () => (
  <div className="fixed bottom-6 right-6 z-40 w-[92px] h-[92px] hidden sm:flex items-center justify-center">
    <svg className="absolute inset-0 rotate-slow" viewBox="0 0 100 100">
      <defs>
        <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="46" fill="#3E2F2B" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#C6A77D" strokeWidth="0.5" />
      <text fill="#C6A77D" fontSize="8.5" fontWeight="500" letterSpacing="2.5" fontFamily="'Plus Jakarta Sans', sans-serif">
        <textPath href="#circle">HOSTED ON MARI.A LAUNCH · HOSTED ON MARI.A LAUNCH · </textPath>
      </text>
    </svg>
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="relative">
      <path
        d="M5 26 L5 6 L10 6 L16 16 L22 6 L27 6 L27 26 L23 26 L23 13 L17 23 L15 23 L9 13 L9 26 Z"
        fill="#C6A77D"
      />
    </svg>
  </div>
);

const Footer = () => {
  return (
    <footer className="dark-section pt-20 pb-10 px-4">
      <RotatingBadge />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Logo variant="white" />
            <p className="mt-5 text-[14.5px] text-[#F6F3EF]/55 max-w-xs leading-relaxed font-light italic">
              Luxury static hosting for AI-generated websites.
            </p>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.28em] uppercase font-semibold text-[#C6A77D] mb-5">
              Product
            </div>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#features" className="text-[#F6F3EF]/80 hover:text-[#C6A77D] transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-[#F6F3EF]/80 hover:text-[#C6A77D] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[#F6F3EF]/80 hover:text-[#C6A77D] transition-colors">CLI</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.28em] uppercase font-semibold text-[#C6A77D] mb-5">
              Developers
            </div>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#" className="text-[#F6F3EF]/80 hover:text-[#C6A77D] transition-colors">Docs</a></li>
              <li><a href="#" className="text-[#F6F3EF]/80 hover:text-[#C6A77D] transition-colors">GitHub</a></li>
              <li><a href="#" className="text-[#F6F3EF]/80 hover:text-[#C6A77D] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C6A77D]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[12px] tracking-[0.1em] uppercase text-[#F6F3EF]/55">
            <a href="#" className="hover:text-[#C6A77D] transition-colors">Terms</a>
            <span className="w-1 h-1 rounded-full bg-[#C6A77D]/40" />
            <a href="#" className="hover:text-[#C6A77D] transition-colors">Privacy</a>
            <span className="w-1 h-1 rounded-full bg-[#C6A77D]/40" />
            <a href="#" className="hover:text-[#C6A77D] transition-colors">Status</a>
            <span className="w-1 h-1 rounded-full bg-[#C6A77D]/40" />
            <a href="#" className="hover:text-[#C6A77D] transition-colors">Docs</a>
          </div>
          <p className="text-[12px] tracking-[0.08em] text-[#F6F3EF]/45">
            © 2026 MARI.A Launch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
