
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Activity } from 'lucide-react';

const columns = [
  {
    icon: <Database className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />,
    title: "Unified Ingestion",
    desc: "Our architecture consumes multi-modal data streams without the need for pre-processing. Connect once, analyze everywhere.",
  },
  {
    icon: <Layers className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />,
    title: "Latent Reasoning",
    desc: "Deep reasoning happens at the edge. Our nodes identify patterns in high-dimensional space that traditional models miss.",
  },
  {
    icon: <Activity className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />,
    title: "Autonomous Action",
    desc: "We don't just provide insights; we provide agency. Deploy agents that execute workflows with precision and safety.",
  }
];

const FloatingPrimitives = () => {
    const shapes = [
        { type: "box", delay: 0, x: "10%", y: "20%", size: 40 },
        { type: "tetra", delay: 2, x: "80%", y: "15%", size: 30 },
        { type: "box", delay: 1, x: "20%", y: "80%", size: 20 },
        { type: "tetra", delay: 3, x: "85%", y: "70%", size: 35 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {shapes.map((s, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0, rotate: 0 }}
                    animate={{ y: [0, -40, 0], rotate: [0, 180, 360] }}
                    transition={{ 
                        duration: 15 + i * 5, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: s.delay 
                    }}
                    style={{ 
                        left: s.x, 
                        top: s.y, 
                        width: s.size, 
                        height: s.size 
                    }}
                    className={`absolute opacity-10 border border-white/30 ${s.type === 'box' ? 'rounded-sm' : 'rotate-45'}`}
                />
            ))}
        </div>
    )
}

const WhyItWorks: React.FC = () => {
  return (
    <section id="intelligence" className="py-16 md:py-24 relative overflow-hidden">
      <FloatingPrimitives />
      
      <div className="text-center mb-12 md:mb-24 relative z-10">
        <h2 className="text-xs md:text-sm font-black tracking-[0.4em] md:tracking-[0.6em] text-indigo-500 uppercase mb-4 md:mb-6 opacity-60">The Methodology</h2>
        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter">
          Why it <span className="italic font-light text-white/20">works.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative z-10">
        {columns.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              delay: i * 0.15, 
              duration: 1.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
            whileTap={{ scale: 0.98 }}
            className="relative p-6 md:p-10 glass rounded-2xl md:rounded-[2.5rem] group overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-colors duration-500"
          >
            {/* Shimmer Effect */}
            <motion.div 
               className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12"
               animate={{ left: "200%" }}
               transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, delay: i * 1.5, ease: "easeInOut" }}
            />

            <div className="relative z-10">
                {/* Replaced Rotation with Gentle Levitation */}
                <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
                    className="mb-6 md:mb-8 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500 perspective-[500px]"
                >
                    <div className="transform-style-3d">
                        {col.icon}
                    </div>
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight group-hover:text-white transition-colors duration-300">{col.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light text-xs md:text-base group-hover:text-gray-400 transition-colors duration-500">{col.desc}</p>
            </div>
            
            {/* Visual connector line decoration */}
            <div className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyItWorks;
