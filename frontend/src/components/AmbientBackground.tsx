
import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f3ebd6]">
      {/* Primary Warm Light Source - Upper right soft amber-honey lamp glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.25, 1],
          x: [-25, 25, -25],
          y: [-20, 30, -20],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[30%] -right-[20%] w-[130%] h-[130%] rounded-full bg-[#fffaec] blur-[220px]"
      />

      {/* Secondary Soft Fill - Center deep honey-beige bloom */}
      <motion.div
        animate={{
          opacity: [0.18, 0.35, 0.18],
          x: [60, -60, 60],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-[25%] -left-[15%] w-[110%] h-[110%] rounded-full bg-[#fdfaf2] blur-[240px]"
      />

      {/* Lower Shadow Depth - Muted clay-beige shadow bloom */}
      <motion.div
        animate={{
          opacity: [0.12, 0.25, 0.12],
          scale: [1.3, 1, 1.3],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-0 right-[10%] w-[90%] h-[90%] rounded-full bg-[#f1e9d0] blur-[180px]"
      />

      {/* Ultra-fine Editorial Grain Texture - Higher opacity for the richer beige */}
      <div className="absolute inset-0 opacity-[0.055] mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Warm Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,transparent_0%,rgba(140,120,80,0.1)_100%)]" />
    </div>
  );
};