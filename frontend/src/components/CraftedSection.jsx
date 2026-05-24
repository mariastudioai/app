import React from 'react';
import { craftedGallery } from '../data/imagery';

const CraftedSection = () => {
  return (
    <section className="py-28 px-4 section-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.32em] uppercase font-semibold text-[#C6A77D] mb-5">
              Crafted with care
            </p>
            <h2 className="h-display text-[44px] sm:text-[58px] text-[#3E2F2B]">
              Hosting as <em>refined</em> as your work.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[17px] text-[#1A1A1A]/70 leading-relaxed font-light">
              MARI.A Launch is built for creators who care about the details — soft typography,
              quiet performance, and a deploy experience that feels like opening a perfectly
              wrapped package. Every site you ship deserves a setting this considered.
            </p>
            <div className="mt-7 flex items-center gap-5 text-[12px] tracking-[0.16em] uppercase font-semibold text-[#3E2F2B]/70">
              <span>Editorial</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77D]" />
              <span>Effortless</span>
              <span className="w-1 h-1 rounded-full bg-[#C6A77D]" />
              <span>Enduring</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {craftedGallery.map((img, i) => (
            <figure
              key={img.src}
              className={`group relative overflow-hidden rounded-2xl bg-[#EFE7DC] reveal ${
                i === 0 || i === 3 ? 'aspect-[3/4]' : 'aspect-[3/4] lg:translate-y-8'
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F2B]/55 via-[#3E2F2B]/0 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="text-[10px] tracking-[0.32em] uppercase font-semibold text-[#C6A77D] mb-1">
                  {img.caption}
                </div>
                <div className="h-display text-[20px] sm:text-[22px] text-[#F6F3EF] leading-tight">
                  {img.title}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftedSection;
