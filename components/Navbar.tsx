
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll updates using requestAnimationFrame for performance
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Capabilities', 'Intelligence', 'Access'];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 pt-4 md:pt-8 flex justify-center pointer-events-none">
        <motion.nav 
          className={`pointer-events-auto glass flex items-center justify-between gap-4 md:gap-16 px-6 md:px-12 py-3.5 md:py-5 rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'w-full max-w-[calc(100%-2rem)] md:max-w-4xl bg-black/80 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-white/10 backdrop-blur-xl' 
              : 'w-full max-w-[90rem] border-white/5 bg-black/5'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer z-50">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-600 flex items-center justify-center font-black text-[10px] md:text-xs shadow-xl group-hover:bg-indigo-500 transition-colors">N</div>
            <span className="text-xs md:text-sm font-black tracking-tighter text-white">NEURONEST</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-16">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all hover:scale-105"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Button */}
          <button className="hidden md:block px-8 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
            Connect
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2 z-50 pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl pt-32 px-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-widest text-white/80 hover:text-white border-b border-white/10 pb-4"
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full py-4 mt-4 rounded-xl bg-indigo-600 text-white font-bold uppercase tracking-widest text-sm"
              >
                Connect System
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
