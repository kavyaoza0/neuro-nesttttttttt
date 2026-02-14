
import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { X, ArrowRight, Zap } from 'lucide-react';

// --- Text Scramble Hook ---
const useScramble = (text: string, speed: number = 40) => {
  const [displayedText, setDisplayedText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((char, index) => {
            if (index < i) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      i += 1/3; 
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const scrambled = useScramble(text);
  return <span className={className}>{scrambled}</span>;
};

// --- Magnet Button ---
const MagnetButton: React.FC<{ children?: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  // Only enable magnet effect on non-touch devices
  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
      setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className="group relative px-8 md:px-12 py-4 md:py-5 rounded-sm bg-white text-black font-bold text-[10px] md:text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
    >
      <div className="relative z-10 flex items-center gap-3 md:gap-4">
        <span>Initialize System</span>
        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
      </div>
      <div className="absolute inset-0 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mix-blend-difference" />
    </motion.button>
  );
};

// --- Particle Field (Canvas) ---
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // optimize context
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse pos
      mouseRef.current = {
        x: (e.clientX / width) - 0.5,
        y: (e.clientY / height) - 0.5
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Reduced particle count for better mobile performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 12 : 40; 
    
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.05, 
      vy: (Math.random() - 0.5) * 0.05,
      size: Math.random() * (isMobile ? 0.8 : 1.2) + 0.3,
      alpha: Math.random() * 0.2 + 0.1,
      depth: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Less parallax on mobile to save calc
        const moveFactor = isMobile ? 10 : 30;
        const offsetX = -(mouseRef.current.x * moveFactor * p.depth);
        const offsetY = -(mouseRef.current.y * moveFactor * p.depth);

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 255, ${p.alpha})`; 
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[5] pointer-events-none opacity-60" />;
};

const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  
  // Simplified effects for mobile to prevent painting heavy filters
  const opacity = useTransform(scrollY, [0, 800], [0.35, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  // Use opacity fade instead of blur on very small screens if needed, 
  // but here we just clamp the blur value
  const blur = useTransform(scrollY, [0, 800], ["blur(1px)", "blur(8px)"]);
  const y = useTransform(scrollY, [0, 1000], [0, 150]); 

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#010102]"
        style={{ opacity, scale, y }}
    >
      <motion.video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover mix-blend-screen pointer-events-none will-change-transform"
        style={{ filter: blur }}
        poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=40&w=480&auto=format&fit=crop"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-network-connection-background-3049-large.mp4" type="video/mp4" />
      </motion.video>
      
      <div className="absolute inset-0 bg-indigo-950/50 mix-blend-multiply z-10" />
      <div className="absolute inset-0 bg-black/40 mix-blend-overlay z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-90 z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-20" />
    </motion.div>
  );
};

const CyberGrid = () => {
    return (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden perspective-[1200px]">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 4 }}
                className="w-[200%] h-[200%] absolute -left-[50%] top-[-30%] bg-[linear-gradient(rgba(99,102,241,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] origin-bottom will-change-transform"
                style={{ transform: "rotateX(75deg) translateZ(-200px)" }}
            />
        </div>
    )
}

// Extracted Letter Component to fix hook rules violation
const Letter = ({ char, index, total, mouseX, mouseY, shouldAnimate }: any) => {
    const x = useTransform(mouseX, [0, 1], [(index - total/2) * -3, (index - total/2) * 3]);
    const y = useTransform(mouseY, [0, 1], [-6, 6]);
    const z = useTransform(mouseX, [0, 1], [Math.abs(index - 4) * 3, Math.abs(index - 4) * -3]);
    
    // Ghost effect transforms
    const ghostX = useTransform(mouseX, [0, 1], [8, -8]);
    const ghostY = useTransform(mouseY, [0, 1], [8, -8]);

    return (
        <motion.span
            style={{ 
                x: shouldAnimate ? x : 0,
                y: shouldAnimate ? y : 0,
                z: shouldAnimate ? z : 0,
            }}
            className={`relative inline-block transition-colors duration-700 ${index > 4 ? 'text-gray-500 group-hover:text-indigo-400' : 'text-white'}`}
        >
            {shouldAnimate && (
                <motion.span 
                    style={{ 
                        x: ghostX,
                        y: ghostY,
                        opacity: 0.12
                    }}
                    className="absolute top-0 left-0 -z-10 text-indigo-600 blur-[3px]"
                >
                    {char}
                </motion.span>
            )}
            {char}
        </motion.span>
    );
};

const ThreeDText = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    const title = "NEURONEST";
    const letters = title.split("");
    
    // Check for reduced motion preference or small screen
    const [shouldAnimate, setShouldAnimate] = useState(true);
    useEffect(() => {
        const check = () => {
            const isSmall = window.innerWidth < 768;
            setShouldAnimate(!isSmall);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Conditional transformations
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 60, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 60, damping: 20 });
    
    // Flat values for mobile
    const flatRotate = 0;

    return (
        <div className="relative z-20 perspective-[1000px] group cursor-default select-none mb-6 md:mb-10 w-full px-4">
             <motion.div
                style={{ 
                    rotateX: shouldAnimate ? rotateX : flatRotate, 
                    rotateY: shouldAnimate ? rotateY : flatRotate 
                }}
                className="relative text-[12vw] sm:text-7xl md:text-9xl font-bold tracking-tighter flex justify-center py-2 md:py-4 flex-wrap will-change-transform leading-none"
             >
                {letters.map((char, i) => (
                    <Letter 
                        key={i} 
                        char={char} 
                        index={i} 
                        total={letters.length} 
                        mouseX={mouseX} 
                        mouseY={mouseY} 
                        shouldAnimate={shouldAnimate} 
                    />
                ))}
             </motion.div>
             
             <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: "circOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent w-full mt-4 md:mt-6 opacity-40"
              />
        </div>
    )
}

const HoloCard = ({ label, subtext, src, className, mouseX, mouseY, depth = 1 }: any) => {
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10 * depth, -10 * depth]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10 * depth, 10 * depth]), { stiffness: 50, damping: 20 });
  const x = useTransform(mouseX, [0, 1], [-30 * depth, 30 * depth]);
  const y = useTransform(mouseY, [0, 1], [-30 * depth, 30 * depth]);

  // Hide entirely on mobile (via class hidden lg:flex) handled in parent props
  return (
    <motion.div
      style={{ rotateX, rotateY, x, y, perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={`absolute z-10 hidden lg:flex flex-col gap-2 pointer-events-none will-change-transform ${className}`}
    >
        <div className="flex items-center gap-2 opacity-40 pl-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-[8px] font-mono text-indigo-200 uppercase tracking-widest">{label}</span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl group">
           <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen contrast-125 saturate-0 group-hover:saturate-50 transition-all duration-1000">
              <source src={src} type="video/mp4" />
           </video>
           <div className="absolute bottom-3 left-4 right-4 z-30 flex justify-between items-center">
              <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">{subtext}</span>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full opacity-50" />
           </div>
        </div>
    </motion.div>
  );
}

const Hero: React.FC = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <BackgroundVideo />
        <CyberGrid />
        <ParticleField />

        <div className="absolute top-0 left-0 w-full h-full z-[2] pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-indigo-900/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vh] bg-purple-900/5 blur-[150px] rounded-full" />
        </div>

        <div className="absolute inset-0 w-full h-full max-w-[1600px] mx-auto pointer-events-none z-10">
            <HoloCard 
              label="SYNAPTIC_ARRAY // RX-9"
              subtext="Weights: Stable"
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-dots-and-lines-42458-large.mp4"
              className="top-[20%] left-[5%] w-[220px] h-[140px]"
              mouseX={mouseX} mouseY={mouseY} depth={0.6}
            />
            <HoloCard 
              label="COGNITIVE_TRANSFORM"
              subtext="Inf: 0.4ms"
              src="https://assets.mixkit.co/videos/preview/mixkit-abstract-white-and-blue-data-visualization-conduit-44445-large.mp4"
              className="bottom-[25%] right-[6%] w-[250px] h-[160px]"
              mouseX={mouseX} mouseY={mouseY} depth={0.9}
            />
        </div>

        <div className="relative z-30 text-center px-4 w-full max-w-5xl flex flex-col items-center pt-24 md:pt-0">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, delay: 0.5 }}
             className="mb-6 md:mb-10 flex items-center gap-3 border border-white/5 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2 rounded-full shadow-lg"
           >
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
             <span className="text-[8px] md:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-400">
               Core Intelligence <span className="text-gray-700 mx-1 md:mx-2">|</span> Operational
             </span>
           </motion.div>

           <ThreeDText mouseX={mouseX} mouseY={mouseY} />
           
           <div className="h-8 md:h-12 mb-6 md:mb-8 overflow-hidden px-4">
               <div className="text-indigo-400 font-mono text-[8px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase opacity-80">
                 <ScrambleText text="Advanced Cognitive Infrastructure" />
               </div>
           </div>

           <motion.p
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1, duration: 1.2 }}
             className="text-gray-400 text-sm md:text-lg max-w-sm md:max-w-lg mx-auto font-light leading-relaxed mb-10 md:mb-12 tracking-wide px-4"
           >
             High-dimensional logic for critical systems. <br className="hidden md:block" /> 
             Engineered for agency at biological scale.
           </motion.p>
           
           <div className="relative scale-90 md:scale-100">
             <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500" />
             <MagnetButton onClick={() => setIsModalOpen(true)} />
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2.5, duration: 1.5 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3 z-20"
        >
          <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.3em] text-gray-600">Enter System</span>
          <div className="w-px h-8 md:h-12 bg-gradient-to-b from-indigo-500/50 to-transparent" />
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsModalOpen(false)} 
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ clipPath: "inset(50% 0 50% 0)", opacity: 0, scale: 0.9 }} 
                animate={{ clipPath: "inset(0 0 0 0)", opacity: 1, scale: 1 }} 
                exit={{ clipPath: "inset(50% 0 50% 0)", opacity: 0, scale: 0.9 }} 
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }} 
                className="relative w-full max-w-lg bg-[#050505] border border-white/10 shadow-2xl overflow-hidden group"
              >
                {/* Tech Deco Lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-indigo-500/50" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-indigo-500/50" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-indigo-500/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-indigo-500/50" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12">
                   {/* Close */}
                   <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-white/20 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                   </button>
                   
                   {/* Header */}
                   <div className="mb-10">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400">System Access Node</span>
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight text-white">Initialize Connection</h2>
                   </div>

                   {/* Form */}
                   <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                      <div className="space-y-2 group/input">
                         <label className="text-[9px] uppercase tracking-widest text-gray-500 font-mono transition-colors group-hover/input:text-indigo-400">Neural ID</label>
                         <input type="email" placeholder="credentials@neuronest.ai" className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:outline-none focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all font-mono text-sm" />
                      </div>
                      
                      <button className="relative w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-50 transition-colors overflow-hidden">
                         <span className="relative z-10">Sync Now</span>
                      </button>
                   </form>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,23,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </section>
  );
};

export default Hero;
