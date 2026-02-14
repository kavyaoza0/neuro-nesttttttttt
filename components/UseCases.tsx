
import React from 'react';
import { motion } from 'framer-motion';

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

const UseCases: React.FC = () => {
  return (
    <section id="usecases">
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">Adaptable <span className="text-indigo-400">Context.</span></h2>
          <p className="text-gray-400 text-sm md:text-lg">NeuroNest isn't built for one niche. It's built for complexity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {cases.map((useCase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="group relative h-[350px] md:h-[450px] rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5"
          >
            <img 
              src={useCase.image} 
              alt={useCase.industry}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
              <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-indigo-400 mb-2 md:mb-4">{useCase.industry}</div>
              <h4 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight">{useCase.benefit}</h4>
              <div className="w-8 md:w-12 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
