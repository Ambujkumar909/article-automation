
import React, { useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Article } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  articles: Article[];
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

const SkeletonRow = () => (
  <div className="relative py-8 flex flex-col md:flex-row md:items-start justify-between border-b border-[#2a2620]/8 px-4 md:px-8 -mx-4 md:-mx-8 overflow-hidden">
    <div className="flex-1 md:pr-12">
      <div className="flex items-center space-x-4 mb-3">
        <div className="h-1.5 w-3 bg-[#dfd8c2] rounded animate-pulse" />
        <div className="h-[1px] w-4 bg-[#dfd8c2]/40" />
        <div className="h-1.5 w-12 bg-[#dfd8c2] rounded animate-pulse" />
      </div>
      <div className="h-5 w-1/2 bg-[#dfd8c2]/40 rounded-lg mb-3 animate-pulse" />
    </div>
  </div>
);

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const articleItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const DustMote = ({ index }: { index: number }) => {
  const randomDelay = useMemo(() => Math.random() * 15, []);
  const initialX = useMemo(() => Math.random() * 100, []);
  const initialY = useMemo(() => Math.random() * 100, []);
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full opacity-20 blur-[1px]"
      style={{ left: `${initialX}%`, top: `${initialY}%` }}
      animate={{
        y: [0, -160, 0],
        opacity: [0.05, 0.25, 0.05],
      }}
      transition={{
        duration: 30 + index * 3,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
      }}
    />
  );
};

export const ArticleList: React.FC<Props> = ({ articles, onSelect, isLoading = false }) => {
  const motes = useMemo(() => Array.from({ length: 8 }), []);

  return (
    <div className="relative min-h-screen w-full bg-[#f3ebd6] pb-16 md:pb-32 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {motes.map((_, i) => <DustMote key={i} index={i} />)}
      </div>

      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 relative z-10 pt-16 md:pt-32">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="skeleton" className="space-y-1"><SkeletonRow /><SkeletonRow /><SkeletonRow /></motion.div>
          ) : (
            <motion.div
              key="content"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2 md:space-y-6"
            >
              {articles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  variants={articleItemVariants}
                  whileHover={{ 
                    x: 8, 
                    backgroundColor: "rgba(237, 229, 205, 0.4)",
                    boxShadow: "0 30px 70px -30px rgba(120, 100, 70, 0.15)"
                  }}
                  className="group relative cursor-pointer border-b border-[#2a2620]/10 py-8 md:py-16 flex flex-col md:flex-row md:items-start justify-between transition-all duration-500 px-7 md:px-14 -mx-7 md:-mx-14 rounded-none"
                  onClick={() => onSelect(article.id)}
                >
                  <div className="flex-1 md:pr-10 relative z-10">
                    <div className="flex items-center space-x-3 mb-3 md:mb-6">
                      <span className="text-[8px] font-bold text-[#a8a18c] tracking-[0.2em]">0{idx + 1}</span>
                      <span className="h-[1px] w-5 bg-[#dfd8c2] group-hover:bg-[#4a3a20]/40 transition-all duration-500" />
                      <span className="text-[8px] font-bold text-[#a8a18c] uppercase tracking-[0.15em]">
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl lg:text-[28px] font-serif text-[#1a1815] group-hover:text-[#4a3a20] mb-4 md:mb-6 transition-colors duration-500 leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-[#6d665a] font-light text-[14px] md:text-[16px] leading-relaxed max-w-lg line-clamp-2 md:line-clamp-none">
                      {article.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 md:mt-2 flex items-center space-x-6 md:space-x-12 relative z-10">
                    <div className="text-right hidden sm:block">
                      <p className="text-[7px] uppercase tracking-[0.2em] text-[#a8a18c] font-bold mb-1.5">Editor</p>
                      <p className="text-[11px] font-medium italic font-serif text-[#1a1815]">{article.author}</p>
                    </div>
                    
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-none border border-[#dfd8c2] flex items-center justify-center group-hover:bg-[#1a1815] group-hover:border-[#1a1815] transition-all duration-500 shadow-sm">
                      <ArrowRight className="w-4 h-4 md:w-6 md:h-6 transition-colors text-[#a8a18c] group-hover:text-[#f3ebd6]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
