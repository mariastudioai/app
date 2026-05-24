import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import Features from '../components/Features';
import CraftedSection from '../components/CraftedSection';
import HowItWorks from '../components/HowItWorks';
import CliSection from '../components/CliSection';
import Pricing from '../components/Pricing';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Features />
      <CraftedSection />
      <HowItWorks />
      <CliSection />
      <Pricing />
      <CtaSection />
      <Footer />
    </main>
  );
};

export default Home;
