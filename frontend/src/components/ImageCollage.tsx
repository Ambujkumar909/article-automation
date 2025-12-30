
import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { 
    url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600', 
    size: 'h-40 w-28 md:h-52 md:w-40', 
    x: -110, y: -70, rotate: -8, delay: 0.2,
    alt: "Scientific structure and precision"
  },
  { 
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', 
    size: 'h-52 w-40 md:h-64 md:w-48', 
    x: 90, y: -110, rotate: 6, delay: 0.4,
    alt: "Minimalist urban geometry"
  },
  { 
    url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=600', 
    size: 'h-48 w-32 md:h-56 md:w-44', 
    x: -130, y: 110, rotate: -4, delay: 0.6,
    alt: "Abstract neural data waves"
  },
  { 
    url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600', 
    size: 'h-32 w-24 md:h-44 md:w-36', 
    x: 130, y: 90, rotate: 10, delay: 0.8,
    alt: "Editorial paper texture and space"
  },
  { 
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', 
    size: 'h-64 w-44 md:h-80 md:w-56', 
    x: 0, y: 0, rotate: 0, delay: 0, zIndex: 10,
    alt: "Fluid intelligence synthesis"
  },
];

export const ImageCollage: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-visible pointer-events-none md:pointer-events-auto">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${img.size} rounded-none overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-sm`}
          style={{ zIndex: img.zIndex || 5 }}
          initial={{ opacity: 0, scale: 0.85, x: img.x, y: img.y, rotate: img.rotate }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [img.y - 12, img.y + 12, img.y - 12],
          }}
          transition={{
            opacity: { duration: 1.2, delay: img.delay },
            scale: { duration: 1.8, delay: img.delay, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: img.delay }
          }}
          whileHover={{ 
            scale: 1.08, 
            rotate: 0, 
            zIndex: 60, 
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          <img 
            src={img.url} 
            alt={img.alt} 
            className="w-full h-full object-cover grayscale-[20%] brightness-[0.9] contrast-[1.1] hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-in-out" 
          />
          
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
          
          <div className="absolute inset-0 border border-white/10 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};
