import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, FileArchive, Github, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
      <div className="w-14 h-14 rounded-full border-[3px] border-[#7C6CFF]/20 border-t-[#7C6CFF] spinner mb-4" />
      <div className="text-[15px] font-semibold text-[#1B1B3A] mb-5">Deploying your site...</div>
      <div className="w-full max-w-[280px] space-y-3">
        {stepLabels.map((label, i) => {
          const active = i < Math.min(step, 4);
          return (
            <div
              key={label}
              className={`flex items-center gap-3 text-[14px] transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}
            >
              {active ? (
                <CheckCircle2 size={18} className="text-emerald-500" />
              ) : (
                <div className="w-[18px] h-[18px] rounded-full border-2 border-black/15" />
              )}
              <span className={active ? 'text-[#1B1B3A]' : 'text-[#1B1B3A]/60'}>{label}</span>
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
          hover ? 'border-[#7C6CFF] bg-[#7C6CFF]/5' : 'border-[#7C6CFF]/40 bg-[#7C6CFF]/[0.04]'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <FileArchive className="text-[#7C6CFF]" size={28} />
          <div className="text-[14px] font-semibold text-[#1B1B3A]">
            {uploading ? 'mysite.zip · 2.4 MB' : 'Drag & drop your site.zip'}
          </div>
          {uploading && (
            <div className="w-full h-1.5 mt-2 rounded-full bg-[#7C6CFF]/15 overflow-hidden">
              <div className="h-full bg-[#7C6CFF] progress-bar" />
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
        <Github size={20} className="text-[#1B1B3A]" />
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[14px] font-mono text-[#1B1B3A]"
        />
        <button
          onClick={handleConnect}
          className="btn-pill px-4 py-2 text-[13px] bg-[#1B1B3A] text-white hover:bg-[#2A2A55]"
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
    <div className="bg-white rounded-3xl border border-black/5 shadow-[0_30px_80px_-30px_rgba(27,27,58,0.25)] p-5 sm:p-6 w-full max-w-[520px]">
      <div className="flex border-b border-black/5 mb-5">
        <button
          onClick={() => setTab('zip')}
          className={`relative px-2 pb-3 mr-6 text-[14px] font-semibold transition-colors ${
            tab === 'zip' ? 'text-[#1B1B3A]' : 'text-[#1B1B3A]/50 hover:text-[#1B1B3A]/80'
          }`}
        >
          ZIP Upload
          {tab === 'zip' && (
            <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#7C6CFF] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setTab('gh')}
          className={`relative px-2 pb-3 text-[14px] font-semibold transition-colors ${
            tab === 'gh' ? 'text-[#1B1B3A]' : 'text-[#1B1B3A]/50 hover:text-[#1B1B3A]/80'
          }`}
        >
          GitHub
          {tab === 'gh' && (
            <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#7C6CFF] rounded-full" />
          )}
        </button>
      </div>
      {tab === 'zip' ? <ZipUploadView /> : <GithubView />}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-[13px] font-semibold text-emerald-700">Your site is live</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-1 bg-white rounded-md border border-emerald-200/60 text-emerald-700">SSL</span>
          <span className="text-[13px] font-mono text-[#1B1B3A]/80">mysite.ezlaunch.app</span>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero-bg pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#7C6CFF]/30 backdrop-blur text-[13px] font-semibold text-[#5B4EE6] mb-6">
            <Sparkles size={14} />
            Built for AI Builders
          </div>
          <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.02] tracking-tight text-[#1B1B3A]">
            Host your AI-generated website in seconds.
          </h1>
          <p className="mt-6 text-[17px] sm:text-[18px] text-[#1B1B3A]/70 max-w-[520px] leading-relaxed">
            Drop a ZIP or connect GitHub. Your site is live in seconds, with SSL, analytics, SEO optimization and forms included.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#signup"
              className="btn-pill px-6 py-3.5 text-[15px] text-white bg-[#7C6CFF] hover:bg-[#6B5BE8] shadow-[0_12px_30px_-10px_rgba(124,108,255,0.7)]"
            >
              Get started free
            </a>
            <a
              href="#how-it-works"
              className="btn-pill px-6 py-3.5 text-[15px] text-[#1B1B3A] bg-white border border-black/10 hover:border-[#7C6CFF]/40 hover:text-[#5B4EE6]"
            >
              See how it works →
            </a>
          </div>
          <p className="mt-6 text-[13px] text-[#1B1B3A]/60">
            Join developers already hosting on <a href="#" className="text-[#7C6CFF] font-semibold">EZLaunch</a> · Free to start
          </p>
        </div>
        <div className="reveal flex justify-center lg:justify-end" style={{ animationDelay: '0.15s' }}>
          <HeroDeployCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
