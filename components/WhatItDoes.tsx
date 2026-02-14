
import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const WhatItDoes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  
  // 3D Model Scroll Transforms
  const rotateX = useTransform(smoothProgress, [0, 1], [25, -25]);
  const rotateY = useTransform(smoothProgress, [0, 1], [-25, 25]);
  const containerScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  const modelY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const internalRotation = useTransform(smoothProgress, [0, 1], [-45, 45]);

  // Text Scroll Transforms (Staggered)
  const labelOpacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const labelX = useTransform(smoothProgress, [0.1, 0.25], [-20, 0]);

  const titleOpacity = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);
  const titleX = useTransform(smoothProgress, [0.15, 0.35], [-40, 0]);

  const descOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);
  const descY = useTransform(smoothProgress, [0.2, 0.4], [30, 0]);

  const statsOpacity = useTransform(smoothProgress, [0.25, 0.5], [0, 1]);
  const statsY = useTransform(smoothProgress, [0.25, 0.5], [40, 0]);

  // Hoisted Mouse Transforms for Model
  const modelMouseY = useSpring(useTransform(mouseX, [-0.5, 0.5], [25, -25]), { stiffness: 45, damping: 35 });
  const modelMouseX = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), { stiffness: 45, damping: 35 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const latticePoints = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      z: Math.random() * 60 - 30,
      size: Math.random() * 1.2 + 0.8,
    }));
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative py-16 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center relative z-10">
        
        {/* Text Section with Scroll-Linked Animation */}
        <div className="flex-1 order-2 lg:order-1 relative w-full">
          <div className="space-y-8 md:space-y-12">
            
            <motion.div 
              style={{ opacity: labelOpacity, x: labelX }}
              className="flex items-center gap-4"
            >
               <div className="h-[1px] w-8 md:w-12 bg-indigo-500/50" />
               <span className="text-indigo-400/80 font-black text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase">Core Infrastructure</span>
            </motion.div>
            
            <motion.h2 
              style={{ opacity: titleOpacity, x: titleX }}
              className="text-4xl sm:text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.82]"
            >
              Cognitive <br /> <span className="text-white/10">Architecture.</span>
            </motion.h2>
            
            <motion.p 
              style={{ opacity: descOpacity, y: descY }}
              className="text-gray-500 text-base md:text-2xl font-light leading-relaxed max-w-xl"
            >
              NeuroNest is more than an engine; it's a structural home for high-dimensional intelligence. We bridge biological intuition with industrial-scale execution.
            </motion.p>
            
            <motion.div 
              style={{ opacity: statsOpacity, y: statsY }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 pt-8 md:pt-16 border-t border-white/5"
            >
              <div className="space-y-2 md:space-y-3">
                <div className="text-3xl md:text-5xl font-black tracking-tighter text-white/90">Multi-Modal</div>
                <div className="text-[8px] md:text-[10px] text-gray-600 uppercase tracking-[0.4em] md:tracking-[0.5em] font-black">Neural Ingestion</div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="text-3xl md:text-5xl font-black tracking-tighter text-white/90">Autonomous</div>
                <div className="text-[8px] md:text-[10px] text-gray-600 uppercase tracking-[0.4em] md:tracking-[0.5em] font-black">Logic Orchestration</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* 3D Model Section */}
        <div className="flex-1 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
           <motion.div 
             style={{ 
               rotateX, 
               rotateY, 
               scale: containerScale, 
               y: modelY,
               transformStyle: 'preserve-3d', 
               perspective: 1500,
             }}
             className="relative aspect-square w-full max-w-[520px] rounded-3xl md:rounded-[5rem] overflow-hidden flex items-center justify-center border border-white/5 bg-[#010101] shadow-2xl will-change-transform"
           >
              {/* Background Video */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-[0.06] scale-125">
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-neural-network-structure-background-42460-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_95%)]" />
              </div>

              {/* Interactive 3D Elements */}
              <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                <motion.div 
                  style={{ 
                    rotateZ: internalRotation, 
                    rotateY: modelMouseY,
                    rotateX: modelMouseX,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-3/4 h-3/4 md:w-2/3 md:h-2/3 will-change-transform"
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{ 
                        transform: `translateZ(${i * 40 - 60}px) rotateZ(${i * 15}deg)`,
                        opacity: 0.1 - (i * 0.02),
                        borderColor: i % 2 === 0 ? 'rgba(129, 140, 248, 0.3)' : 'rgba(192, 132, 252, 0.2)',
                      }}
                      animate={{ 
                        rotateZ: [i * 15, i * 15 + 360],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        rotateZ: { duration: 40 + i * 10, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-0 border border-white/5 rounded-2xl md:rounded-[4rem] bg-white/[0.005] will-change-transform"
                    />
                  ))}

                  {/* Lattice Lines */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible opacity-30">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {latticePoints.map((p, i) => {
                      const next = latticePoints[(i + 1) % latticePoints.length];
                      return (
                        <g key={i}>
                          <line x1={`${50 + p.x}%`} y1={`${50 + p.y}%`} x2={`${50 + next.x}%`} y2={`${50 + next.y}%`} stroke="url(#lineGrad)" strokeWidth="0.5" />
                          <circle cx={`${50 + p.x}%`} cy={`${50 + p.y}%`} r={p.size} fill="white" className="animate-pulse" style={{ opacity: 0.8 }} />
                        </g>
                      );
                    })}
                  </svg>
                </motion.div>
                
                {/* Glowing Core */}
                <motion.div 
                  style={{ 
                    scale: useTransform(smoothProgress, [0, 1], [0.8, 1.4]),
                    opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.5, 0.1]),
                  }}
                  className="absolute w-48 md:w-64 h-48 md:h-64 bg-indigo-500/10 blur-[80px] rounded-full animate-pulse mix-blend-screen"
                />
              </div>
              
              {/* Card Border */}
              <div className="absolute inset-0 border border-white/5 rounded-3xl md:rounded-[5rem] pointer-events-none" />
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatItDoes;
