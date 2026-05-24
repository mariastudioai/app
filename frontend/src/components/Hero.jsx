import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, FileArchive, Github, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthDialog } from '../context/AuthDialogContext';
import { heroSideImage } from '../data/imagery';

const DeployingCard = () => {
  const [step, setStep] = useState(0);
  const stepLabels = ['Validating...', 'Extracting files...', 'Uploading to CDN...', 'Done'];
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStep((s) => (s + 1) % 6); // gives a brief "reset" pause at 4/5
    }, 900);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 sm:p-8 min-h-[280px] flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-full border-[3px] border-[#3E2F2B]/20 border-t-[#3E2F2B] spinner mb-4" />
      <div className="text-[15px] font-semibold text-[#1A1A1A] mb-5">Deploying your site...</div>
      <div className="w-full max-w-[280px] space-y-3">
        {stepLabels.map((label, i) => {
          const active = i < Math.min(step, 4);
          return (
            <div
              key={label}
              className={`flex items-center gap-3 text-[14px] transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}
            >
              {active ? (
                <CheckCircle2 size={18} className="text-[#C6A77D]" />
              ) : (
                <div className="w-[18px] h-[18px] rounded-full border-2 border-black/15" />
              )}
              <span className={active ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/60'}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ZipUploadView = () => {
  const [hover, setHover] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    if (uploading) return;
    setUploading(true);
    toast.success('mysite.zip selected', { description: 'Starting deployment…' });
    setTimeout(() => setUploading(false), 2400);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`relative w-full rounded-xl border-2 border-dashed transition-all px-6 py-7 text-center ${
          hover ? 'border-[#3E2F2B] bg-[#3E2F2B]/5' : 'border-[#3E2F2B]/40 bg-[#3E2F2B]/[0.04]'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <FileArchive className="text-[#3E2F2B]" size={28} />
          <div className="text-[14px] font-semibold text-[#1A1A1A]">
            {uploading ? 'mysite.zip · 2.4 MB' : 'Drag & drop your site.zip'}
          </div>
          {uploading && (
            <div className="w-full h-1.5 mt-2 rounded-full bg-[#3E2F2B]/15 overflow-hidden">
              <div className="h-full bg-[#3E2F2B] progress-bar" />
            </div>
          )}
        </div>
      </button>
      <DeployingCard />
    </div>
  );
};

const GithubView = () => {
  const [repo, setRepo] = useState('user/my-site');
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    toast.success('Connecting to GitHub…');
    setTimeout(() => {
      setConnecting(false);
      toast.success('Repo cloned successfully');
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-black/10 bg-white px-4 py-4 flex items-center gap-3">
        <Github size={20} className="text-[#1A1A1A]" />
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[14px] font-mono text-[#1A1A1A]"
        />
        <button
          onClick={handleConnect}
          className="btn-pill px-4 py-2 text-[13px] bg-[#1A1A1A] text-white hover:bg-[#2A2A55]"
        >
          {connecting ? 'Cloning…' : 'Connect'}
        </button>
      </div>
      <DeployingCard />
    </div>
  );
};

const HeroDeployCard = () => {
  const [tab, setTab] = useState('zip');
  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-[0_30px_80px_-30px_rgba(26, 26, 26, 0.25)] p-5 sm:p-6 w-full max-w-[520px]">
      <div className="flex border-b border-black/5 mb-5">
        <button
          onClick={() => setTab('zip')}
          className={`relative px-2 pb-3 mr-6 text-[14px] font-semibold transition-colors ${
            tab === 'zip' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80'
          }`}
        >
          ZIP Upload
          {tab === 'zip' && (
            <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#3E2F2B] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setTab('gh')}
          className={`relative px-2 pb-3 text-[14px] font-semibold transition-colors ${
            tab === 'gh' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80'
          }`}
        >
          GitHub
          {tab === 'gh' && (
            <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#3E2F2B] rounded-full" />
          )}
        </button>
      </div>
      {tab === 'zip' ? <ZipUploadView /> : <GithubView />}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-[#C6A77D]/10 border border-[#C6A77D]/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C6A77D] pulse-dot" />
          <span className="text-[13px] font-semibold text-[#3E2F2B]">Your site is live</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-1 bg-white rounded-md border border-[#C6A77D]/40 text-[#3E2F2B]">SSL</span>
          <span className="text-[13px] font-mono text-[#1A1A1A]/80">mysite.marialaunch.app</span>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { openSignup } = useAuthDialog();
  return (
    <section className="hero-bg pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#C6A77D]/50 backdrop-blur text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C6A77D] mb-6">
            <Sparkles size={13} />
            Built for AI Builders
          </div>
          <h1 className="h-display text-[52px] sm:text-[68px] lg:text-[80px] text-[#3E2F2B]">
            Host your AI-generated <em>website</em> in seconds.
          </h1>
          <p className="mt-6 text-[17px] sm:text-[18px] text-[#1A1A1A]/70 max-w-[520px] leading-relaxed font-light">
            Drop a ZIP or connect GitHub. Your site is live in seconds, with SSL, analytics, SEO optimization and forms included.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openSignup()}
              className="btn-pill px-6 py-3.5 text-[14px] tracking-[0.04em] uppercase text-white bg-[#3E2F2B] hover:bg-[#2A1F1B] shadow-[0_12px_30px_-10px_rgba(62,47,43,0.45)]"
            >
              Get started free
            </button>
            <a
              href="#how-it-works"
              className="btn-pill px-6 py-3.5 text-[14px] tracking-[0.04em] uppercase text-[#3E2F2B] bg-transparent border border-[#3E2F2B]/30 hover:border-[#C6A77D] hover:text-[#C6A77D]"
            >
              See how it works →
            </a>
          </div>
          <p className="mt-6 text-[13px] text-[#1A1A1A]/60">
            Join developers already hosting on <a href="#" className="gold-link font-semibold">MARI.A Launch</a> · Free to start
          </p>
        </div>
        <div className="reveal flex justify-center lg:justify-end relative" style={{ animationDelay: '0.15s' }}>
          {/* Editorial side accent image */}
          <div className="hidden lg:block absolute -top-6 -right-8 w-[240px] h-[300px] rounded-3xl overflow-hidden border border-[#C6A77D]/30 shadow-[0_30px_60px_-30px_rgba(62,47,43,0.35)] rotate-[3deg] z-0">
            <img
              src={heroSideImage.src}
              alt={heroSideImage.alt}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3E2F2B]/15 via-transparent to-[#C6A77D]/15" />
          </div>
          <div className="relative z-10">
            <HeroDeployCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
