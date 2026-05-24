import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`w-full max-w-6xl rounded-full backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 shadow-[0_10px_40px_-10px_rgba(27,27,58,0.18)] border border-white/60'
            : 'bg-white/70 border border-white/40'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <a href="#" className="shrink-0">
            <Logo />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link text-[15px] font-medium text-[#1B1B3A]/80 hover:text-[#1B1B3A]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#signup"
              className="btn-pill hidden sm:inline-flex px-5 py-2.5 text-[14px] text-white bg-[#7C6CFF] hover:bg-[#6B5BE8] shadow-[0_8px_24px_-8px_rgba(124,108,255,0.7)]"
            >
              Get started free
            </a>
            <button
              className="md:hidden p-2 rounded-full hover:bg-black/5"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-black/5 px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium text-[#1B1B3A]/80 hover:text-[#1B1B3A]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#signup"
              className="btn-pill self-start px-5 py-2 text-[14px] text-white bg-[#7C6CFF]"
            >
              Get started free
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
