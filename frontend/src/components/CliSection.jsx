import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const CliSection = () => {
  const [os, setOs] = useState('Node.js');
  const [copied, setCopied] = useState(false);

  const commands = [
    '$ npm install -g maria-launch',
    '$ maria login',
    '$ maria deploy',
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(commands.map(c => c.replace(/^\$\s/, '')).join('\n'));
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 dark-section">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[12px] tracking-[0.32em] uppercase font-semibold text-[#C6A77D] mb-4">For developers</p>
          <h2 className="h-display text-[44px] sm:text-[60px] text-white">
            Prefer the <em>terminal?</em>
          </h2>
          <p className="mt-5 text-[17px] text-white/70 max-w-md font-light">
            Install the MARI.A Launch CLI and deploy from anywhere in 3 commands.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Node.js', 'macOS', 'Linux', 'Windows'].map((o) => (
              <button
                key={o}
                onClick={() => setOs(o)}
                className={`btn-pill px-4 py-2 text-[12px] tracking-[0.08em] uppercase border ${
                  os === o
                    ? 'bg-[#C6A77D] text-[#3E2F2B] border-[#C6A77D]'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-[#C6A77D]/60 hover:text-[#C6A77D]'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
        <div className="terminal p-5 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A77D]/25" />
              </div>
              <span className="text-[12px] text-white/50 ml-2">Terminal</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[12px] text-white/70 hover:text-[#C6A77D] px-2 py-1 rounded-md hover:bg-white/5"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="space-y-2 text-[14px]">
            {commands.map((c) => (
              <div key={c} className="font-mono">
                <span className="text-[#C6A77D]">$</span>
                <span className="text-white/90"> {c.slice(2)}</span>
              </div>
            ))}
            <div className="font-mono text-[#C6A77D]">✓ Uploading files...</div>
            <div className="font-mono text-[#C6A77D]">✓ Live at <span className="underline decoration-[#C6A77D]/60">mysite.marialaunch.app</span></div>
            <div className="font-mono text-white/40">|</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CliSection;
