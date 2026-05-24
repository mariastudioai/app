import React from 'react';
import Logo from './Logo';

const RotatingBadge = () => (
  <div className="fixed bottom-6 right-6 z-40 w-[88px] h-[88px] hidden sm:flex items-center justify-center">
    <svg className="absolute inset-0 rotate-slow" viewBox="0 0 100 100">
      <defs>
        <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="44" fill="#5B4EE6" />
      <text fill="white" fontSize="9" fontWeight="700" letterSpacing="1">
        <textPath href="#circle">HOSTED ON MARI.A LAUNCH · HOSTED ON MARI.A LAUNCH · </textPath>
      </text>
    </svg>
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="relative">
      <path d="M20 3 L4 17 L14 17 L8 29 L28 13 L18 13 L24 3 Z" fill="#fff" />
    </svg>
  </div>
);

const Footer = () => {
  return (
    <footer className="dark-section pt-16 pb-10 px-4">
      <RotatingBadge />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Logo variant="white" />
            <p className="mt-4 text-[14.5px] text-white/55 max-w-xs leading-relaxed">
              Static hosting for AI-generated websites.
            </p>
          </div>
          <div>
            <div className="text-[12px] tracking-[0.16em] uppercase font-bold text-white/50 mb-4">
              Product
            </div>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#features" className="text-white/85 hover:text-white">Features</a></li>
              <li><a href="#pricing" className="text-white/85 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-white/85 hover:text-white">CLI</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[12px] tracking-[0.16em] uppercase font-bold text-white/50 mb-4">
              Developers
            </div>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#" className="text-white/85 hover:text-white">Docs</a></li>
              <li><a href="#" className="text-white/85 hover:text-white">GitHub</a></li>
              <li><a href="#" className="text-white/85 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[13px] text-white/60">
            <a href="#" className="hover:text-white">Terms</a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <a href="#" className="hover:text-white">Privacy</a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <a href="#" className="hover:text-white">Status</a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <a href="#" className="hover:text-white">Docs</a>
          </div>
          <p className="text-[13px] text-white/50">
            © 2026 MARI.A Launch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
