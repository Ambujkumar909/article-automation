
import React from 'react';
import { motion } from 'framer-motion';

const edgeImages = [
  { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600', alt: 'Library' },
  { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600', alt: 'Writing' },
  { url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600', alt: 'Books' },
  { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600', alt: 'Archive' },
  { url: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=600', alt: 'Journal' },
];

export const EdgeCollage: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center items-end px-4 md:px-8 lg:px-24 gap-3 md:gap-5 overflow-hidden h-[12vh] md:h-[20vh] pointer-events-none translate-y-6 md:translate-y-10">
      {edgeImages.map((img, i) => (
        <motion.div
          key={i}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          whileHover={{ 
            opacity: 1, 
            y: -30, 
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          transition={{ 
            delay: 1.6 + (i * 0.1), 
            duration: 2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative flex-shrink-0 w-[18%] md:w-[15%] max-w-[180px] aspect-[4/5] rounded-none overflow-hidden border border-[#2a2620]/10 pointer-events-auto bg-[#e8e2d5] shadow-[0_10px_30px_rgba(0,0,0,0.1)] group"
        >
          {/* Depth effect adapted for sharp edges */}
          <div className="absolute inset-0 z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)] pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
          
          <motion.img 
            src={img.url} 
            alt={img.alt} 
            className="w-full h-full object-cover grayscale-[0.7] sepia-[0.4] brightness-95 transition-all duration-1000 ease-in-out"
            whileHover={{ 
              filter: "grayscale(0.1) sepia(0.1) saturate(1.1) contrast(1.1) brightness(1)",
              scale: 1.12
            }}
          />
          <div className="absolute inset-0 bg-[#4a3a20]/15 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-1000" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};
