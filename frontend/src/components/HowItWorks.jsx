import React, { useState } from 'react';
import { FileArchive, Github, Sparkles, MousePointer2, Zap, Wind, Loader2, BarChart3 } from 'lucide-react';

const Step01Visual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-6 flex items-center justify-center">
    <div className="flex flex-wrap gap-2 justify-center">
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[12px] font-semibold text-[#1A1A1A] shadow-sm">
        <Zap size={12} className="text-[#C6A77D]" /> bolt
      </span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[12px] font-semibold text-[#1A1A1A] shadow-sm">
        <MousePointer2 size={12} className="text-[#3E2F2B]" /> Cursor
      </span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[12px] font-semibold text-[#1A1A1A] shadow-sm">
        <Sparkles size={12} className="text-orange-500" /> Claude
      </span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[12px] font-semibold text-[#1A1A1A] shadow-sm">
        V0
      </span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[12px] font-semibold text-[#1A1A1A] shadow-sm">
        <Wind size={12} className="text-sky-500" /> Windsurf
      </span>
    </div>
  </div>
);

const Step02Visual = () => {
  const [tab, setTab] = useState('zip');
  return (
    <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-4 flex flex-col">
      <div className="flex border-b border-black/10 text-[12px] font-semibold mb-3">
        <button onClick={() => setTab('zip')} className={`px-3 pb-2 relative ${tab === 'zip' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50'}`}>
          ZIP
          {tab === 'zip' && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#3E2F2B] rounded-full" />}
        </button>
        <button onClick={() => setTab('gh')} className={`px-3 pb-2 relative ${tab === 'gh' ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50'}`}>
          GitHub
          {tab === 'gh' && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#3E2F2B] rounded-full" />}
        </button>
      </div>
      {tab === 'zip' ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-black/5 font-mono text-[12px]">
            <FileArchive size={14} className="text-[#3E2F2B]" /> site.zip
          </div>
          <div className="w-2/3 h-1 rounded-full bg-[#3E2F2B]/15 overflow-hidden">
            <div className="h-full bg-[#3E2F2B] progress-bar" />
          </div>
          <span className="text-[11px] text-[#1A1A1A]/60">Uploading…</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-black/5 font-mono text-[12px]">
            <Github size={14} /> user/my-site
          </div>
          <Loader2 size={14} className="text-[#3E2F2B] spinner" />
          <span className="text-[11px] text-[#1A1A1A]/60">Cloning…</span>
        </div>
      )}
    </div>
  );
};

const Step03Visual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-4 flex flex-col">
    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-black/5 mb-3">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77D]/70" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77D]/45" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77D]" />
      </div>
      <div className="flex-1 flex items-center gap-1 text-[11px] font-mono text-[#1A1A1A]">
        <span className="text-[#C6A77D]">●</span> mysite.marialaunch.app
      </div>
    </div>
    <div className="flex gap-2 mb-2">
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#C6A77D]/10 border border-[#C6A77D]/40 text-[10px] font-semibold text-[#3E2F2B]">
        ✓ SSL Active
      </span>
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#3E2F2B]/10 border border-[#3E2F2B]/20 text-[10px] font-semibold text-[#3E2F2B]">
        <BarChart3 size={11} /> Analytics On
      </span>
    </div>
    <div className="flex-1 flex items-end justify-end">
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C6A77D]/40 text-[11px] font-bold text-[#3E2F2B]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77D] pulse-dot" /> LIVE
      </span>
    </div>
  </div>
);

const stepVisuals = [Step01Visual, Step02Visual, Step03Visual];

import { steps } from '../data/mock';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 section-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex px-4 py-1.5 rounded-full bg-white/70 border border-[#C6A77D]/50 text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C6A77D] mb-5">
            How it works
          </div>
          <h2 className="h-display text-[44px] sm:text-[60px] text-[#3E2F2B] max-w-3xl mx-auto">
            From AI prompt to <em>live site</em> in 3 steps.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Visual = stepVisuals[i];
            return (
              <div key={s.number} className="feature-card p-5 relative reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="step-number">{s.number}</span>
                <Visual />
                <div className="mt-5 px-1">
                  <h3 className="text-[20px] font-semibold text-[#3E2F2B] mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-[#1A1A1A]/65 font-light">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
