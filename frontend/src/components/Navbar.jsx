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
            ? 'bg-[#F6F3EF]/90 shadow-[0_10px_40px_-12px_rgba(62,47,43,0.18)] border border-[#C6A77D]/30'
            : 'bg-white/70 border border-white/50'
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
                className="nav-link text-[13px] font-medium tracking-[0.12em] uppercase text-[#3E2F2B]/75 hover:text-[#3E2F2B]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#signup"
              className="btn-pill hidden sm:inline-flex px-5 py-2.5 text-[12px] tracking-[0.14em] uppercase text-white bg-[#3E2F2B] hover:bg-[#2A1F1B] shadow-[0_8px_24px_-10px_rgba(62,47,43,0.55)]"
            >
              Get started free
            </a>
            <button
              className="md:hidden p-2 rounded-full hover:bg-[#3E2F2B]/5"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-[#3E2F2B]/10 px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#3E2F2B]/75 hover:text-[#3E2F2B]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#signup"
              className="btn-pill self-start px-5 py-2 text-[12px] tracking-[0.14em] uppercase text-white bg-[#3E2F2B]"
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
