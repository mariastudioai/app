import React from 'react';

const CtaSection = () => {
  return (
    <section id="signup" className="cta-bg py-28 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative">
        <p className="text-[12px] tracking-[0.32em] uppercase font-semibold text-[#3E2F2B]/70 mb-5">
          Begin your launch
        </p>
        <h2 className="h-display text-[52px] sm:text-[72px] text-[#3E2F2B]">
          Your site is one <em>deploy</em> away.
        </h2>
        <p className="mt-5 text-[17px] text-[#3E2F2B]/75 font-light">
          Free to start. No credit card required.
        </p>
        <a
          href="#"
          className="btn-pill mt-8 inline-flex px-8 py-4 text-[13px] tracking-[0.18em] uppercase bg-[#3E2F2B] text-white hover:bg-[#2A1F1B] shadow-[0_15px_40px_-15px_rgba(62,47,43,0.55)]"
        >
          Get started free
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
