
import React from 'react';
import { motion } from 'framer-motion';

export const HeroHeading: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 w-full select-none max-w-screen-xl mx-auto">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-neutral-500 mb-4 md:mb-8"
      >
        Intelligence Reimagined
      </motion.span>
      
      <h2 className="relative flex flex-col items-center font-serif tracking-tight leading-[1.1] md:leading-[1.0]">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] text-black"
        >
          AI-Powered
        </motion.span>
        
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] text-stone-500"
        >
          Content
        </motion.span>

        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] text-neutral-800"
        >
          Intelligence.
        </motion.span>
      </h2>
    </div>
  );
};

export const WarmFadeQuote: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => (
  <motion.p
    initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
    className="text-neutral-600 text-[13px] md:text-[15px] lg:text-[16px] font-light leading-relaxed italic max-w-xs md:max-w-md lg:max-w-lg mx-auto px-4 text-center"
  >
    {text}
  </motion.p>
);
