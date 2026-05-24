import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAuthDialog } from '../context/AuthDialogContext';

const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const initial = (user.name || user.email).trim().charAt(0).toUpperCase();
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#3E2F2B] text-white hover:bg-[#2A1F1B] transition-colors"
        aria-label="Account menu"
      >
        <span className="w-7 h-7 rounded-full bg-[#C6A77D] text-[#3E2F2B] text-[12px] font-bold flex items-center justify-center">
          {initial}
        </span>
        <span className="hidden sm:inline text-[12px] tracking-[0.08em] uppercase pr-1.5">
          {user.name.split(' ')[0]}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#C6A77D]/30 shadow-[0_18px_40px_-18px_rgba(62,47,43,0.3)] p-2 z-50">
          <div className="px-3 py-2.5 border-b border-[#3E2F2B]/10">
            <div className="text-[13px] font-semibold text-[#3E2F2B]">{user.name}</div>
            <div className="text-[11.5px] text-[#1A1A1A]/55 truncate">{user.email}</div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-[12px] tracking-[0.08em] uppercase text-[#3E2F2B] hover:bg-[#F6F3EF]"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { openSignup, openLogin } = useAuthDialog();

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
            {user ? (
              <UserMenu user={user} onLogout={logout} />
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="hidden md:inline-flex btn-pill px-4 py-2 text-[12px] tracking-[0.14em] uppercase text-[#3E2F2B]/75 hover:text-[#3E2F2B] hover:bg-[#3E2F2B]/5"
                >
                  Sign in
                </button>
                <button
                  onClick={() => openSignup()}
                  className="btn-pill hidden sm:inline-flex px-5 py-2.5 text-[12px] tracking-[0.14em] uppercase text-white bg-[#3E2F2B] hover:bg-[#2A1F1B] shadow-[0_8px_24px_-10px_rgba(62,47,43,0.55)]"
                >
                  Get started free
                </button>
              </>
            )}
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
            {!user && (
              <>
                <button
                  onClick={() => { openLogin(); setOpen(false); }}
                  className="self-start text-[13px] font-medium tracking-[0.12em] uppercase text-[#3E2F2B]/75 hover:text-[#3E2F2B]"
                >
                  Sign in
                </button>
                <button
                  onClick={() => { openSignup(); setOpen(false); }}
                  className="btn-pill self-start px-5 py-2 text-[12px] tracking-[0.14em] uppercase text-white bg-[#3E2F2B]"
                >
                  Get started free
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
