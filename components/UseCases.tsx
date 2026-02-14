
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const cases = [
  {
    industry: "Enterprise Fintech",
    benefit: "Predictive Risk Modeling",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200"
  },
  {
    industry: "Creative Ops",
    benefit: "Automated Asset Orchestration",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200"
  }
];

interface ThreeDCardProps {
    data: {
        industry: string;
        benefit: string;
        image: string;
    };
    index: number;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ data, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1000 }}
            className="relative h-[350px] md:h-[450px]"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                // Auto-tilt animation for mobile where there is no mouse
                animate={{ 
                    rotateX: [0, 2, 0, -2, 0],
                    rotateY: [0, -2, 0, 2, 0]
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 2
                }}
                className="group w-full h-full rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 bg-black/40 relative"
            >
                <div 
                    style={{ transform: "translateZ(0px)" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.img 
                        src={data.image} 
                        alt={data.industry}
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />
                </div>
                
                {/* Floating Content Layer */}
                <div 
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pointer-events-none"
                >
                    <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-indigo-400 mb-2 md:mb-4">{data.industry}</div>
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight shadow-black drop-shadow-lg">{data.benefit}</h4>
                    <div className="w-8 md:w-12 h-[1px] bg-white group-hover:w-full transition-all duration-700" />
                </div>
                
                {/* Glare Effect */}
                <div 
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" 
                    style={{ transform: "translateZ(20px)" }}
                />
            </motion.div>
        </motion.div>
    )
}

const UseCases: React.FC = () => {
  return (
    <section id="usecases" className="perspective-[2000px]">
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">Adaptable <span className="text-indigo-400">Context.</span></h2>
          <p className="text-gray-400 text-sm md:text-lg">NeuroNest isn't built for one niche. It's built for complexity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {cases.map((useCase, index) => (
            <ThreeDCard key={index} data={useCase} index={index} />
        ))}
      </div>
    </section>
  );
};

export default UseCases;
