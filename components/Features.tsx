
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Brain, Zap, Shield, Globe, Cpu, BarChart3 } from 'lucide-react';

// --- Spotlight Card ---
const SpotlightCard = ({ title, description, icon: Icon, span = "", mouseX, mouseY, index }: any) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { 
            scale: 1.03, 
            rotateZ: 0.5,
            boxShadow: "0 0 40px -10px rgba(99, 102, 241, 0.3)",
            borderColor: "rgba(99, 102, 241, 0.5)",
            transition: { duration: 0.3, ease: "easeOut" }
        },
        tap: { scale: 0.98 }
      }}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative rounded-xl border border-white/10 bg-white/[0.02] px-6 py-8 md:px-8 md:py-10 overflow-hidden ${span} backdrop-blur-sm`}
    >
      {/* Spotlight Effect - Desktop */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Mobile Ambient Glow */}
      <motion.div 
        className="absolute inset-0 md:hidden pointer-events-none opacity-20"
        animate={{
            background: [
                "radial-gradient(400px circle at 0% 0%, rgba(99, 102, 241, 0.15), transparent 70%)",
                "radial-gradient(400px circle at 100% 100%, rgba(99, 102, 241, 0.15), transparent 70%)",
                "radial-gradient(400px circle at 0% 0%, rgba(99, 102, 241, 0.15), transparent 70%)"
            ]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 1.5 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Floating Icon Wrapper */}
        <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            className="mb-5 md:mb-6 inline-flex p-2.5 md:p-3 rounded-lg bg-white/5 border border-white/10 w-fit group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors duration-500"
        >
           <motion.div variants={{ hover: { rotate: 15, scale: 1.1 } }} transition={{ duration: 0.3 }}>
               <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors" />
           </motion.div>
        </motion.div>
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-tight group-hover:text-indigo-200 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
      
      {/* Existing border overlay kept for gradient effect, effectively enhanced by parent borderColor variant */}
      <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/10 rounded-xl transition-colors duration-500" />
    </motion.div>
  );
};

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if(el) {
        const handleMouseMove = (e: MouseEvent) => {
            const { left, top } = el.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        };
        el.addEventListener("mousemove", handleMouseMove);
        return () => el.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <section id="capabilities" className="relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
         <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
               <span className="text-[8px] md:text-xs font-mono uppercase tracking-widest text-indigo-400">Architecture v.2</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6 leading-tight">
               Cognitive Agency. <br className="hidden md:block" />
               <span className="text-gray-500">Distributed Intelligence.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-lg font-light leading-relaxed">
               Our neural mesh doesn't just process data. It understands context, intent, and execution velocity.
            </p>
         </div>
         <button className="px-5 py-2.5 md:px-6 md:py-3 border border-white/10 rounded-full text-[9px] md:text-xs font-mono uppercase hover:bg-white hover:text-black transition-colors active:scale-95">
            Full Specifications
         </button>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <SpotlightCard 
          index={0}
          span="md:col-span-2"
          title="Neural Synthesis"
          description="High-fidelity inference core designed for high-dimensional semantic orchestration. Deciphers complex operational context with biological-grade intuition."
          icon={Brain} mouseX={mouseX} mouseY={mouseY}
        />
        <SpotlightCard 
          index={1}
          title="Edge Velocity"
          description="Distributed node-level responses with sub-millisecond latencies for real-time critical frameworks."
          icon={Zap} mouseX={mouseX} mouseY={mouseY}
        />
        <SpotlightCard 
          index={2}
          title="Vault Security"
          description="Zero-knowledge encryption layer ensuring cognitive privacy and secure logic execution."
          icon={Shield} mouseX={mouseX} mouseY={mouseY}
        />
        <SpotlightCard 
          index={3}
          title="Visual Cortex"
          description="Spatial reasoning engine processing real-time video streams with semantic object mapping."
          icon={BarChart3} mouseX={mouseX} mouseY={mouseY}
        />
        <SpotlightCard 
          index={4}
          title="Deep Calibration"
          description="Custom logic fine-tuning tailored for proprietary organizational structures."
          icon={Cpu} mouseX={mouseX} mouseY={mouseY}
        />
      </div>
    </section>
  );
};

export default Features;
