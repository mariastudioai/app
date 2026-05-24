import React from 'react';
import { aiTools } from '../data/mock';
import { Sparkles, MousePointer2, Zap, Code, Wind, Bot, Terminal, Heart } from 'lucide-react';

const iconFor = (name) => {
  switch (name) {
    case 'Claude': return <Sparkles size={16} />;
    case 'Cursor': return <MousePointer2 size={16} />;
    case 'bolt': return <Zap size={16} />;
    case 'V0': return <Code size={16} />;
    case 'Windsurf': return <Wind size={16} />;
    case 'KIMI': return <Bot size={16} />;
    case 'replit': return <Terminal size={16} />;
    case 'Lovable': return <Heart size={16} />;
    default: return <Sparkles size={16} />;
  }
};

const Pill = ({ name }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 mx-2 rounded-full bg-white border border-black/5 shadow-[0_4px_18px_-8px_rgba(27,27,58,0.15)] text-[#1B1B3A] font-semibold text-[14px] whitespace-nowrap">
    <span className="text-[#7C6CFF]">{iconFor(name)}</span>
    <span>{name === 'bolt' ? 'bolt' : name === 'replit' ? 'replit' : name}</span>
  </div>
);

const LogoMarquee = () => {
  const items = [...aiTools, ...aiTools];
  return (
    <section className="py-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-[12px] tracking-[0.18em] font-semibold text-[#1B1B3A]/50 uppercase mb-8">
          Works with every AI coding tool
        </p>
      </div>
      <div className="relative">
        <div className="flex marquee-track w-max">
          {items.map((tool, i) => (
            <Pill key={`${tool.name}-${i}`} name={tool.logo} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F4FB] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F5F4FB] to-transparent" />
      </div>
    </section>
  );
};

export default LogoMarquee;
