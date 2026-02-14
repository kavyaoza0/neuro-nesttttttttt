
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatItDoes from './components/WhatItDoes';
import Features from './components/Features';
import Research from './components/Research';
import WhyItWorks from './components/WhyItWorks';
import UseCases from './components/UseCases';
import CTAFooter from './components/CTAFooter';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SectionWrapper = ({ children, delay = 0, className = "" }: { children?: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`will-change-transform ${className}`}
  >
    {children}
  </motion.div>
);

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveMouse = (e: MouseEvent) => {
      // Direct updates are faster than react state for high freq events
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive-card, input')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveMouse, { passive: true });
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border border-white/80 rounded-full pointer-events-none z-[9999] mix-blend-exclusion flex items-center justify-center will-change-transform"
      style={{
        x: ringX,
        y: ringY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(255,255,255,1)' : 'transparent',
      }}
      transition={{ duration: 0.2 }}
    />
  );
};

const App = () => {
  return (
    <div className="relative bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <Cursor />
      <Navbar />

      <div className="fixed inset-0 z-0 h-screen w-full">
         <Hero />
      </div>

      <main className="relative z-10 mt-[100vh] bg-black border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,1)]">
        <div className="relative w-full overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[1000px] h-[300px] md:h-[600px] bg-indigo-600/5 md:bg-indigo-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-[90rem] mx-auto px-5 md:px-12 pt-20 md:pt-48 pb-20 md:pb-32 space-y-32 md:space-y-48">
              <SectionWrapper><WhatItDoes /></SectionWrapper>
              <SectionWrapper delay={0.1}><Features /></SectionWrapper>
              <SectionWrapper delay={0.1}><WhyItWorks /></SectionWrapper>
              <SectionWrapper delay={0.1}><Research /></SectionWrapper>
              <SectionWrapper delay={0.1}><UseCases /></SectionWrapper>
              <SectionWrapper delay={0.1}><CTAFooter /></SectionWrapper>
            </div>
            
            <footer className="py-16 md:py-24 border-t border-white/5 bg-black relative">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-16">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-600 flex items-center justify-center font-black text-[10px] md:text-xs shadow-2xl">N</div>
                      <span className="text-xl md:text-2xl font-bold tracking-tight">NEURONEST</span>
                    </div>
                    <p className="text-gray-600 text-[10px] md:text-sm max-w-sm font-light leading-relaxed mono-font uppercase tracking-widest">
                      System.init(2026); <br/>
                      Orchestrating logic at scale.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10 md:gap-16 text-[10px] md:text-sm">
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="font-bold uppercase tracking-[0.2em] text-white mono-font">Platform</h4>
                      <ul className="space-y-2 md:space-y-3 text-gray-500 font-light">
                        <li><a href="#" className="hover:text-white transition-colors">Neural Core</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">API & Docs</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Access</a></li>
                      </ul>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="font-bold uppercase tracking-[0.2em] text-white mono-font">Research</h4>
                      <ul className="space-y-2 md:space-y-3 text-gray-500 font-light">
                        <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Benchmarking</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Open Compute</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between text-[8px] md:text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium mono-font">
                  <span>&copy; 2026 NeuroNest Lab</span>
                  <div className="flex gap-6 md:gap-10 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Protocols</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Sync</a>
                  </div>
                </div>
            </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
