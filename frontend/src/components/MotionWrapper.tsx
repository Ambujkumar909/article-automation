
import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps} from 'framer-motion'
interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const FadeInUp: React.FC<Props> = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeIn: React.FC<Props> = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut", delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const WordReveal: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className }) => {
  const words = text.split(" ");
  
  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em]">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.08,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
