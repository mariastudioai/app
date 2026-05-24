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
          <h2 className="h-display text-[44px] sm:text-[60px] text-[#3E2F2B] max-w-2xl mx-auto">
            Simple pricing. <em>No surprises.</em>
          </h2>
          <p className="mt-4 text-[17px] text-[#1A1A1A]/65 font-light">
            Start free, upgrade when you're ready. Cancel anytime.
          </p>
          <div className="inline-flex items-center mt-8 p-1 rounded-full bg-white border border-[#3E2F2B]/10 shadow-sm">
            <button
              onClick={() => setBilling('monthly')}
              className={`btn-pill px-5 py-2 text-[13px] tracking-[0.04em] uppercase ${
                billing === 'monthly' ? 'bg-[#3E2F2B] text-white' : 'text-[#1A1A1A]/70 hover:text-[#3E2F2B]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`btn-pill px-5 py-2 text-[13px] tracking-[0.04em] uppercase ${
                billing === 'yearly' ? 'bg-[#3E2F2B] text-white' : 'text-[#1A1A1A]/70 hover:text-[#3E2F2B]'
              }`}
            >
              Yearly
              <span className="ml-1 text-[11px] font-semibold text-[#C6A77D] normal-case tracking-normal">2 months free</span>
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C6A77D] text-[#3E2F2B] text-[10px] font-bold tracking-[0.18em] uppercase">
                  Most popular
                </div>
              )}
              <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#C6A77D] mb-3">
                {p.name}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="h-display text-[52px] text-[#3E2F2B]">{p.price}</span>
                {p.sub && <span className="text-[14px] text-[#1A1A1A]/60 font-light">{p.sub}</span>}
              </div>
              <div className="border-t border-[#C6A77D]/30 pt-4 space-y-3 mb-6">
                {p.features.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-[13.5px]">
                    <span className="text-[#1A1A1A]/65 font-light">{label}</span>
                    {value === true ? (
                      <Check size={16} className="text-[#C6A77D]" />
                    ) : (
                      <span className="font-semibold text-[#3E2F2B]">{value}</span>
                    )}
                  </div>
                ))}
              </div>
              <a
                href="#signup"
                className={`btn-pill w-full justify-center py-3 text-[13px] tracking-[0.08em] uppercase ${
                  p.popular
                    ? 'bg-[#3E2F2B] text-white hover:bg-[#2A1F1B] shadow-[0_10px_25px_-10px_rgba(62,47,43,0.45)]'
                    : 'bg-transparent text-[#3E2F2B] border border-[#3E2F2B]/25 hover:border-[#C6A77D] hover:text-[#C6A77D]'
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
