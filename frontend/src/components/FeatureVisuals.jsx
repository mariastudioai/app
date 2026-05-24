import React from 'react';
import { FileArchive, Check, AlertTriangle, Copy, Image as ImageIcon, Upload } from 'lucide-react';

// Visuals for each feature card

export const UploadVisual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-5 overflow-hidden">
    <div className="absolute inset-5 rounded-xl border-2 border-dashed border-[#3E2F2B]/40 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-black/5 font-mono text-[12px] text-[#1A1A1A]">
        <FileArchive size={14} className="text-[#3E2F2B]" /> mysite.zip
      </div>
      <div className="mt-4 w-2/3 h-1.5 rounded-full bg-[#3E2F2B]/15 overflow-hidden">
        <div className="h-full bg-[#3E2F2B] progress-bar" />
      </div>
    </div>
  </div>
);

export const SSLVisual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-5 flex items-start justify-center">
    <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-black/5 shadow-sm w-full max-w-[280px]">
      <div className="w-2 h-2 rounded-full bg-[#C6A77D] pulse-dot" />
      <span className="font-mono text-[13px] text-[#1A1A1A]">https://mysite.marialaunch.app</span>
    </div>
  </div>
);

export const AnalyticsVisual = () => {
  const bars = [40, 60, 35, 80, 50];
  return (
    <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-5 overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[12px] font-semibold text-[#1A1A1A]/70">Pageviews</span>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white border border-black/5 text-[#1A1A1A]/70">Weekly</span>
      </div>
      <div className="flex items-end justify-around h-[100px] gap-3">
        {bars.map((h, i) => (
          <div
            key={`bar-${i}-${h}`}
            className="flex-1 rounded-t-md bg-gradient-to-t from-[#3E2F2B] to-[#C6A77D] bar-grow"
            style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export const FormsVisual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="font-mono text-[12px] text-[#1A1A1A]/70">&lt;form data-maria&gt;…&lt;/form&gt;</span>
      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#C6A77D]/10 text-[#3E2F2B] border border-[#C6A77D]/40">Submissions · Just now</span>
    </div>
    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white border border-black/5">
      <div className="w-9 h-9 rounded-full bg-[#3E2F2B] text-white text-[12px] font-bold flex items-center justify-center">JD</div>
      <div className="flex-1">
        <div className="text-[13px] font-semibold text-[#1A1A1A]">John Doe</div>
        <div className="text-[11px] text-[#1A1A1A]/60 font-mono">john@site.com</div>
      </div>
      <Check size={16} className="text-[#C6A77D]" />
    </div>
  </div>
);

export const DomainsVisual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-5 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="px-4 py-2 rounded-xl bg-white border border-black/5 font-mono text-[13px] text-[#1A1A1A] shadow-sm">
        yourdomain.com
      </div>
      <div className="w-px h-6 bg-[#3E2F2B]/30" />
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C6A77D]/10 border border-[#C6A77D]/40 text-[11px] font-semibold text-[#3E2F2B]">
        <Check size={12} /> SSL Active
      </div>
    </div>
  </div>
);

export const CLIVisual = () => (
  <div className="relative h-[180px] terminal p-4 overflow-hidden">
    <div className="flex gap-1.5 mb-3">
      <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/45" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/80" />
    </div>
    <div className="text-[12px] space-y-1.5">
      <div><span className="text-[#3E2F2B]">$</span> maria deploy</div>
      <div className="text-[#C6A77D]">✓ Uploading files...</div>
      <div className="text-[#C6A77D]">✓ Live at <span className="underline">mysite.marialaunch.app</span></div>
    </div>
  </div>
);

export const SEOVisual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-5">
    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#3E2F2B]/15 text-[10px] font-bold text-[#3E2F2B]">✦ AI</div>
    <div className="flex items-center gap-4">
      <div className="relative w-[68px] h-[68px]">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3E2F2B22" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9" fill="none" stroke="#10B981" strokeWidth="3"
            strokeDasharray="87, 100" strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[18px] font-extrabold text-[#1A1A1A]">87</span>
        </div>
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2 text-[12px] text-[#1A1A1A]">
          <Check size={14} className="text-[#C6A77D]" /> Title tag
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#1A1A1A]">
          <Check size={14} className="text-[#C6A77D]" /> Meta description
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#1A1A1A]">
          <AlertTriangle size={14} className="text-[#C6A77D]" /> Missing og:image
        </div>
      </div>
    </div>
    <div className="mt-2 text-[11px] font-semibold text-[#1A1A1A]/60">SEO Score</div>
  </div>
);

export const ImagesVisual = () => (
  <div className="relative h-[180px] bg-gradient-to-br from-[#FDFAF5] to-[#EFE7DC] rounded-2xl p-4">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1A1A1A]">
        <ImageIcon size={14} className="text-[#3E2F2B]" /> Your images
      </div>
      <span className="text-[10px] text-[#1A1A1A]/60">4 stored</span>
    </div>
    <div className="flex gap-2 mb-3">
      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-[#3E2F2B] to-[#E2CDAE]" />
      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-[#C6A77D] to-[#9C7E5A]" />
      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-[#E2CDAE] to-[#C6A77D]" />
      <div className="w-14 h-14 rounded-md border border-dashed border-[#3E2F2B]/40 flex items-center justify-center text-[#3E2F2B]">
        <Upload size={14} />
      </div>
    </div>
    <div className="flex items-center gap-2 bg-white rounded-md border border-black/5 px-2 py-1.5">
      <div className="w-5 h-5 rounded bg-gradient-to-br from-[#3E2F2B] to-[#E2CDAE]" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-[#1A1A1A] truncate">hero-banner.png</div>
        <div className="text-[10px] font-mono text-[#1A1A1A]/50 truncate">assets.marialaunch.app/hero-banner.png</div>
      </div>
      <button className="text-[10px] font-semibold text-[#3E2F2B] flex items-center gap-1 hover:text-[#3E2F2B]">
        <Copy size={11} /> Copy
      </button>
    </div>
  </div>
);

export const EditorVisual = () => (
  <div className="relative h-[180px] terminal p-3">
    <div className="flex gap-1.5 mb-2">
      <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/45" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/80" />
      <span className="ml-2 text-[10px] text-white/50">index.html</span>
    </div>
    <pre className="text-[11px] leading-relaxed">
<span className="text-[#C6A77D]/80">&lt;title&gt;</span><span className="text-white">My Portfolio</span><span className="text-[#C6A77D]/80">&lt;/title&gt;</span>{'\n'}
<span className="text-[#C6A77D]/80">&lt;meta</span> <span className="text-[#E2CDAE]">name</span>=<span className="text-[#E2CDAE]/85">"description"</span>{'\n'}
  <span className="text-[#E2CDAE]">content</span>=<span className="text-[#E2CDAE]/85">"Designer & developer{'\n'}  based in San José"</span><span className="text-[#C6A77D]/80">&gt;</span>
    </pre>
    <button className="absolute bottom-3 right-3 btn-pill text-[10px] px-3 py-1.5 bg-[#3E2F2B] text-white">Save changes</button>
  </div>
);

export const visualByKey = {
  upload: UploadVisual,
  ssl: SSLVisual,
  analytics: AnalyticsVisual,
  forms: FormsVisual,
  domains: DomainsVisual,
  cli: CLIVisual,
  seo: SEOVisual,
  images: ImagesVisual,
  editor: EditorVisual,
};
