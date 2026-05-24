import React from 'react';
import { features } from '../data/mock';
import { visualByKey } from './FeatureVisuals';

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 section-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex px-4 py-1.5 rounded-full bg-white/70 border border-[#7C6CFF]/30 text-[13px] font-semibold text-[#5B4EE6] mb-5">
            Features
          </div>
          <h2 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1B1B3A] max-w-3xl mx-auto">
            Everything your site needs. Nothing it doesn't.
          </h2>
          <p className="mt-4 text-[17px] text-[#1B1B3A]/65">
            Every plan includes the tools that matter, no add-ons, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Visual = visualByKey[f.visual];
            return (
              <div key={f.title} className="feature-card p-5 reveal" style={{ animationDelay: `${i * 0.05}s` }}>
                {Visual && <Visual />}
                <div className="mt-5 px-1">
                  <h3 className="text-[20px] font-bold text-[#1B1B3A] mb-2">{f.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-[#1B1B3A]/65">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
