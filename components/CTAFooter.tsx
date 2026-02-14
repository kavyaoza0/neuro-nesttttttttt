
import React from 'react';
import { motion } from 'framer-motion';

const CTAFooter: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/10 bg-[#020205]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-black z-0"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/10 blur-[100px] md:blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 blur-[100px] md:blur-[150px] rounded-full"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight">
            Ready to evolve your <br className="hidden sm:block" />
            <span className="italic font-light opacity-60">decision framework?</span>
          </h2>
          <p className="text-base md:text-xl text-indigo-200/40 mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join the elite teams already optimizing their future with NeuroNest. Limited slots available for the Private Beta.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-full bg-white text-black font-black text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-xl">
              Apply for Beta Access
            </button>
            <button className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm md:text-base backdrop-blur-md hover:bg-white/10 transition-all">
              Talk to an Expert
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFooter;
