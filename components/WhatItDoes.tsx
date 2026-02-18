
import React, { useEffect, useMemo, useRef } from 'react';
// Added useMotionTemplate to the imports from framer-motion
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const WhatItDoes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 35, damping: 25 });
  
  // --- 3D Model Scroll Transforms ---
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-45, 0, 45]);
  const containerScale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.8, 1.1, 1.1, 0.8]);
  const modelY = useTransform(smoothProgress, [0, 1], [100, -100]);
  const internalRotation = useTransform(smoothProgress, [0, 1], [-90, 90]);
  
  // Expanding rings on scroll
  const ringZ = useTransform(smoothProgress, [0, 0.5, 1], [-100, 0, 100]);
  
  // --- Text Scroll Transforms (Staggered + Blur Reveal) ---
  const textBlur = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [10, 0, 0, 0, 0, 10]);
  
  const labelOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const labelX = useTransform(smoothProgress, [0.1, 0.2], [-30, 0]);

  const titleOpacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);
  const titleX = useTransform(smoothProgress, [0.15, 0.3], [-50, 0]);

  const descOpacity = useTransform(smoothProgress, [0.2, 0.35], [0, 1]);
  const descY = useTransform(smoothProgress, [0.2, 0.35], [40, 0]);

  const statsOpacity = useTransform(smoothProgress, [0.25, 0.4], [0, 1]);
  const statsY = useTransform(smoothProgress, [0.25, 0.4], [50, 0]);

  // Scanning line Y position
  const scanLineY = useTransform(smoothProgress, [0, 1], ["-20%", "120%"]);

  // --- Mouse Interactivity ---
  const modelMouseY = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), { stiffness: 50, damping: 30 });
  const modelMouseX = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Normalizing mouse position within the section
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  // Generate random data points for the neural network lattice
  const latticePoints = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      x: Math.random() * 70 - 35,
      y: Math.random() * 70 - 35,
      z: Math.random() * 70 - 35,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <section ref={containerRef} id="capabilities" className="relative py-24 md:py-48 overflow-visible">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center relative z-10">
        
        {/* Text Content Section */}
        <div className="flex-1 order-2 lg:order-1 relative w-full">
          <motion.div 
            style={{ filter: useMotionTemplate`blur(${textBlur}px)` }}
            className="space-y-10 md:space-y-14"
          >
            <motion.div 
              style={{ opacity: labelOpacity, x: labelX }}
              className="flex items-center gap-4"
            >
               <div className="h-[1px] w-10 md:w-16 bg-indigo-500" />
               <span className="text-indigo-400 font-bold text-[9px] md:text-[11px] tracking-[0.5em] uppercase mono-font">System_Architecture_v4.2</span>
            </motion.div>
            
            <motion.h2 
              style={{ opacity: titleOpacity, x: titleX }}
              className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.85] display-font"
            >
              Cognitive <br /> <span className="text-white/30 italic transition-colors duration-700 hover:text-white/60">Synthesis.</span>
            </motion.h2>
            
            <motion.p 
              style={{ opacity: descOpacity, y: descY }}
              className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl"
            >
              NeuroNest is more than an engine; it's a structural home for high-dimensional intelligence. We bridge biological intuition with industrial-scale execution through a distributed neural mesh.
            </motion.p>
            
            <motion.div 
              style={{ opacity: statsOpacity, y: statsY }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20 pt-12 md:pt-20 border-t border-white/5"
            >
              <div className="space-y-3">
                <div className="text-4xl md:text-6xl font-black tracking-tighter text-white/90 display-font">Hybrid-Mesh</div>
                <div className="text-[9px] md:text-[11px] text-gray-500 uppercase tracking-[0.4em] font-mono">Neural Ingestion Core</div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl md:text-6xl font-black tracking-tighter text-white/90 display-font">Zero-Agent</div>
                <div className="text-[9px] md:text-[11px] text-gray-500 uppercase tracking-[0.4em] font-mono">Autonomous Reasoning</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 3D Visual Section */}
        <div className="flex-1 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
           <motion.div 
             style={{ 
               rotateX, 
               rotateY, 
               scale: containerScale, 
               y: modelY,
               transformStyle: 'preserve-3d', 
               perspective: 2000,
             }}
             className="relative aspect-square w-full max-w-[600px] rounded-[3rem] md:rounded-[6rem] overflow-hidden flex items-center justify-center border border-white/10 bg-[#020202] shadow-[0_0_100px_rgba(99,102,241,0.05)] will-change-transform group"
           >
              {/* Background Video Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-[0.08] scale-150 transition-opacity duration-1000">
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-neural-network-structure-background-42460-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)]" />
              </div>

              {/* Scanning Pulse Line */}
              <motion.div 
                style={{ top: scanLineY }}
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-20 blur-[1px] opacity-40 pointer-events-none shadow-[0_0_20px_rgba(99,102,241,1)]"
              />

              {/* 3D Content Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                <motion.div 
                  style={{ 
                    rotateZ: internalRotation, 
                    rotateY: modelMouseY,
                    rotateX: modelMouseX,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-4/5 h-4/5 will-change-transform"
                >
                  {/* Floating Rings with Scroll Expansion */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{ 
                        transform: useMotionTemplate`translateZ(${useTransform(smoothProgress, [0, 1], [(i * 40) - 100, (i * 40) + 20])}px) rotateZ(${i * 20}deg)`,
                        opacity: 0.15 - (i * 0.02),
                        borderColor: i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(192, 132, 252, 0.3)',
                        scale: useTransform(smoothProgress, [0.3, 0.7], [0.9, 1.1])
                      }}
                      animate={{ 
                        rotateZ: [i * 20, i * 20 + 360],
                      }}
                      transition={{ 
                        rotateZ: { duration: 30 + i * 5, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute inset-0 border border-white/10 rounded-[4rem] md:rounded-[7rem] bg-indigo-500/[0.005] will-change-transform"
                    />
                  ))}

                  {/* Neural Lattice SVG with Flowing Data */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible opacity-50">
                    <defs>
                      <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {latticePoints.map((p, i) => {
                      const next = latticePoints[(i + 1) % latticePoints.length];
                      return (
                        <g key={i}>
                          <motion.line 
                            x1={`${50 + p.x}%`} y1={`${50 + p.y}%`} 
                            x2={`${50 + next.x}%`} y2={`${50 + next.y}%`} 
                            stroke="url(#flowGrad)" 
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                            animate={{ strokeDashoffset: [0, -20] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: p.delay }}
                          />
                          <circle 
                            cx={`${50 + p.x}%`} cy={`${50 + p.y}%`} 
                            r={p.size} 
                            fill="white" 
                            className="animate-pulse" 
                            style={{ opacity: 0.6 }} 
                          />
                        </g>
                      );
                    })}
                  </svg>
                </motion.div>
                
                {/* Internal Pulsing Light Source */}
                <motion.div 
                  style={{ 
                    scale: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.5, 0.8]),
                    opacity: useTransform(smoothProgress, [0.2, 0.5, 0.8], [0.05, 0.4, 0.05]),
                  }}
                  className="absolute w-64 md:w-96 h-64 md:h-96 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse mix-blend-screen pointer-events-none"
                />
              </div>
              
              {/* Outer Glass Rim */}
              <div className="absolute inset-0 border border-white/5 rounded-[3rem] md:rounded-[6rem] pointer-events-none z-30 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]" />
              
              {/* Floating UI Meta-Tags (Parallax) */}
              {[
                  { label: "NODE: 0x4f2", top: "15%", left: "15%", depth: 0.2 },
                  { label: "LATENCY: 0.4ms", bottom: "20%", right: "15%", depth: 0.4 },
                  { label: "SYNC: STABLE", top: "40%", right: "10%", depth: 0.1 }
              ].map((tag, i) => (
                  <motion.div
                    key={i}
                    style={{
                        top: tag.top, left: tag.left, bottom: tag.bottom, right: tag.right,
                        x: useTransform(mouseX, [-0.5, 0.5], [-20 * tag.depth, 20 * tag.depth]),
                        y: useTransform(mouseY, [-0.5, 0.5], [-20 * tag.depth, 20 * tag.depth]),
                        opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 0.4])
                    }}
                    className="absolute z-40 hidden md:block px-3 py-1 bg-white/5 border border-white/10 rounded backdrop-blur-md"
                  >
                      <span className="text-[7px] font-mono text-indigo-400 tracking-tighter uppercase">{tag.label}</span>
                  </motion.div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatItDoes;
