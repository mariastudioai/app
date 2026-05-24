import React from 'react';

const CtaSection = () => {
  return (
    <section id="signup" className="cta-bg py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[44px] sm:text-[56px] font-extrabold leading-[1.05] tracking-tight text-white">
          Your site is one deploy away.
        </h2>
        <p className="mt-5 text-[17px] text-white/85">
          Free to start. No credit card required.
        </p>
        <a
          href="#"
          className="btn-pill mt-8 inline-flex px-7 py-4 text-[15px] bg-white text-[#5B4EE6] hover:bg-white/95 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.4)]"
        >
          Get started free
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
