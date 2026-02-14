
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Complex 3D Wireframe Shape
const TorusKnot = () => {
    return (
        <div className="absolute right-[-20%] top-[20%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.07] pointer-events-none perspective-[1000px] z-0">
            <motion.div
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-full h-full transform-style-3d"
            >
                {/* Simulated Knot Rings */}
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute inset-0 border border-indigo-400/40 rounded-full"
                        style={{ 
                            transform: `rotateX(${i * 30}deg) rotateY(${i * 60}deg) scale(${0.5 + i * 0.1})` 
                        }} 
                    />
                ))}
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={`b-${i}`} 
                        className="absolute inset-0 border border-white/20 rounded-full border-dashed"
                        style={{ 
                            transform: `rotateX(${i * -30}deg) rotateY(${i * -60}deg) scale(${0.4 + i * 0.1})` 
                        }} 
                    />
                ))}
            </motion.div>
        </div>
    )
}

const Process: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="process" className="relative py-24 overflow-hidden">
      <TorusKnot />
      
      <div className="sticky top-24 mb-32 z-10 pointer-events-none mix-blend-difference">
        <h2 className="text-7xl md:text-9xl font-black text-white/10 uppercase tracking-tighter select-none blur-[2px]">
          SYSTEM.01
        </h2>
      </div>

      <div className="space-y-40 relative z-10">
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
            className="flex flex-col md:flex-row items-center gap-12 group"
          >
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-[1px] bg-indigo-500" />
                 <div className="text-indigo-500 font-mono text-sm tracking-widest uppercase">{step.subtitle}</div>
              </div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight">{step.title}</h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>
            <div className="flex-1 w-full perspective-[1500px]">
               <motion.div 
                  style={{ rotateY: i % 2 === 0 ? 5 : -5 }}
                  whileHover={{ rotateY: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border-white/5 shadow-2xl relative"
               >
                  <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10" />
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  
                  {/* Floating UI Elements within image */}
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i }}
                     className="absolute bottom-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-20"
                  >
                      <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Processing</span>
                      </div>
                  </motion.div>
               </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
