
import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  return (
    <section id="intelligence" className="relative py-24">
      <div className="sticky top-24 mb-32 z-10 pointer-events-none">
        <h2 className="text-7xl md:text-9xl font-black text-white/5 uppercase tracking-tighter select-none">
          SYSTEM.01
        </h2>
      </div>

      <div className="space-y-40">
        {[
          {
            title: "Phase 1: Deep Ingestion",
            subtitle: "The Foundation",
            description: "NeuroNest connects to every endpoint in your ecosystem. It maps the flow of logic, identifying latent bottlenecks before they become obstacles.",
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
          },
          {
            title: "Phase 2: Cognitive Mapping",
            subtitle: "The Refinement",
            description: "Our neural clusters refine raw data into structured insights. Using advanced semantic search, it provides context-aware answers to your toughest questions.",
            img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200"
          },
          {
            title: "Phase 3: Hyper Execution",
            subtitle: "The Result",
            description: "Deploy workflows that execute with zero manual oversight. Watch as your productivity multipliers stack horizontally without increasing overhead.",
            img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200"
          }
        ].map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-6">
              <div className="text-indigo-500 font-mono text-sm tracking-widest">{step.subtitle}</div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight">{step.title}</h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>
            <div className="flex-1 w-full aspect-video rounded-[3rem] overflow-hidden glass">
              <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-50 hover:opacity-80 transition-opacity duration-700" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
