import React, { useState } from 'react';
import { plans } from '../data/mock';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [billing, setBilling] = useState('monthly');
  const current = plans[billing];

  return (
    <section id="pricing" className="py-24 px-4 section-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1B1B3A] max-w-2xl mx-auto">
            Simple pricing. No surprises.
          </h2>
          <p className="mt-4 text-[17px] text-[#1B1B3A]/65">
            Start free, upgrade when you're ready. Cancel anytime.
          </p>
          <div className="inline-flex items-center mt-8 p-1 rounded-full bg-white border border-black/5 shadow-sm">
            <button
              onClick={() => setBilling('monthly')}
              className={`btn-pill px-5 py-2 text-[13px] ${
                billing === 'monthly' ? 'bg-[#7C6CFF] text-white' : 'text-[#1B1B3A]/70 hover:text-[#1B1B3A]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`btn-pill px-5 py-2 text-[13px] ${
                billing === 'yearly' ? 'bg-[#7C6CFF] text-white' : 'text-[#1B1B3A]/70 hover:text-[#1B1B3A]'
              }`}
            >
              Yearly
              <span className="ml-1 text-[11px] font-semibold text-emerald-600">2 months free</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {current.map((p) => (
            <div
              key={p.name}
              className={`price-card relative p-6 ${p.popular ? 'popular' : ''}`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#7C6CFF] text-white text-[11px] font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}
              <div className="text-[12px] tracking-[0.16em] uppercase font-bold text-[#1B1B3A]/60 mb-3">
                {p.name}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[40px] font-extrabold text-[#1B1B3A] tracking-tight">{p.price}</span>
                {p.sub && <span className="text-[14px] text-[#1B1B3A]/60">{p.sub}</span>}
              </div>
              <div className="border-t border-black/5 pt-4 space-y-3 mb-6">
                {p.features.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-[13.5px]">
                    <span className="text-[#1B1B3A]/65">{label}</span>
                    {value === true ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <span className="font-semibold text-[#1B1B3A]">{value}</span>
                    )}
                  </div>
                ))}
              </div>
              <a
                href="#signup"
                className={`btn-pill w-full justify-center py-3 text-[14px] ${
                  p.popular
                    ? 'bg-[#7C6CFF] text-white hover:bg-[#6B5BE8] shadow-[0_10px_25px_-10px_rgba(124,108,255,0.7)]'
                    : 'bg-white text-[#1B1B3A] border border-black/10 hover:border-[#7C6CFF]/40'
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
