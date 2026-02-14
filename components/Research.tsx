
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

const StatNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current) + suffix);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white">{display}</motion.span>;
};

const researchAreas = [
  {
    title: "Neural Plasticity",
    desc: "Weight reconfiguration in response to environmental stimuli.",
    value: 99,
    suffix: "%",
    label: "Retention Rate"
  },
  {
    title: "Inference Latency",
    desc: "Bridging human heuristics and transformer inference.",
    value: 2,
    suffix: "ms",
    label: "Response Time"
  },
  {
    title: "Efficiency Gain",
    desc: "Tokenization efficiency minimizing reasoning costs.",
    value: 40,
    suffix: "x",
    label: "Compute Optimization"
  }
];

const Research: React.FC = () => {
  return (
    <section id="research" className="relative py-16 md:py-24 border-t border-white/5">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 md:mb-20">
        <div className="flex-1">
            <h2 className="text-xs md:text-sm font-mono tracking-widest text-indigo-500 uppercase mb-3 md:mb-4">Laboratory Findings</h2>
            <div className="text-3xl md:text-5xl font-bold tracking-tight">
              Measured <br /> <span className="text-white/30">Performance.</span>
            </div>
        </div>
        <div className="flex-1 flex items-end">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                Our benchmarks aren't theoretical. They are measured against the most demanding real-world cognitive loads in the industry.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-xl md:rounded-2xl">
        {researchAreas.map((area, i) => (
          <div key={i} className="bg-black p-6 md:p-10 group relative overflow-hidden">
             
             {/* Hover Gradient */}
             <div className="absolute inset-0 bg-indigo-900/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

             <div className="relative z-10">
                <div className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">{area.label}</div>
                <div className="mb-4 md:mb-6 flex items-baseline gap-1">
                    <StatNumber value={area.value} suffix={area.suffix} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{area.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed group-hover:text-gray-400">{area.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Research;
