
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  article: Article;
  onBack: () => void;
}

export const ComparisonView: React.FC<Props> = ({ article, onBack }) => {
  const originalRef = useRef<HTMLDivElement>(null);
  const updatedRef = useRef<HTMLDivElement>(null);

  const handleScroll = (source: 'orig' | 'upd') => {
    const src = source === 'orig' ? originalRef.current : updatedRef.current;
    const dest = source === 'orig' ? updatedRef.current : originalRef.current;
    
    if (src && dest && window.innerWidth > 768) {
      const scrollRatio = src.scrollTop / (src.scrollHeight - src.clientHeight);
      dest.scrollTop = scrollRatio * (dest.scrollHeight - dest.clientHeight);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-[#f3ebd6] z-[150] flex flex-col h-[100dvh] overflow-hidden"
    >
      {/* Uniform Beige Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex items-center justify-between px-6 md:px-12 py-4 md:py-6 border-b border-[#2a2620]/12 bg-[#f3ebd6]/90 backdrop-blur-xl"
      >
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="group flex items-center space-x-2.5 text-[#a8a18c] hover:text-[#1a1815] transition-all duration-300"
          >
            <div className="p-2 md:p-2.5 rounded-none group-hover:bg-[#dfd8c2]/50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Archive</span>
          </button>
        </div>
        
        <div className="text-center flex flex-col items-center flex-1 mx-6 overflow-hidden">
          <h1 className="text-[11px] md:text-[13px] font-serif font-bold mb-0 truncate max-w-[220px] md:max-w-md uppercase tracking-[0.2em] leading-tight text-[#1a1815]">{article.title}</h1>
          <p className="text-[7.5px] uppercase tracking-[0.4em] text-[#a8a18c] font-bold mt-1.5">Refinement Flow</p>
        </div>

        <div className="flex items-center">
          <button className="p-2.5 hover:bg-[#dfd8c2]/50 rounded-none transition-all duration-300 text-[#a8a18c]">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.header>

      {/* Comparison Grid with Uniform Tonal Shifts */}
      <div className="relative z-10 flex-1 flex flex-col md:grid md:grid-cols-2 overflow-hidden">
        
        {/* Original Version Section */}
        <div className="flex flex-col h-[40dvh] md:h-full border-b md:border-b-0 md:border-r border-[#2a2620]/12">
          <div className="px-10 py-4 border-b border-[#2a2620]/12 flex justify-between items-center bg-[#ede5cd]/40">
            <span className="text-[7.5px] font-bold uppercase tracking-[0.35em] text-[#a8a18c]">01 / Input</span>
            <span className="text-[8.5px] text-[#a8a18c] font-medium italic">Original Draft</span>
          </div>
          <div 
            ref={originalRef}
            onScroll={() => handleScroll('orig')}
            className="flex-1 overflow-y-auto p-10 md:p-20 lg:p-28 scrollbar-hide bg-[#f3ebd6]"
          >
            <div className="max-w-lg mx-auto">
              <p className="text-[15.5px] md:text-[17.5px] text-[#7d776b] font-light leading-relaxed selection:bg-[#dfd8c2]">
                {article.originalContent}
              </p>
            </div>
          </div>
        </div>

        {/* Updated Version Section - Uniform Beige Shade */}
        <div className="flex flex-col h-[60dvh] md:h-full">
          <div className="px-10 py-4 border-b border-[#2a2620]/12 flex justify-between items-center bg-[#ede5cd]/60">
            <span className="text-[7.5px] font-bold uppercase tracking-[0.35em] text-[#4a3a20]">02 / Synthesis</span>
            <span className="text-[8.5px] text-[#4a3a20] font-bold tracking-[0.2em] uppercase">Refined Mastery</span>
          </div>
          <div 
            ref={updatedRef}
            onScroll={() => handleScroll('upd')}
            className="flex-1 overflow-y-auto p-10 md:p-20 lg:p-28 bg-[#f3ebd6]"
          >
            <div className="max-w-lg mx-auto">
              <p className="text-[17px] md:text-[21px] text-[#1a1815] font-serif leading-relaxed md:leading-[1.9] selection:bg-[#dfd8c2]">
                {article.updatedContent}
              </p>
              <div className="mt-14 pt-10 border-t border-[#2a2620]/15">
                <div className="flex items-center space-x-3.5 text-[#dcd6c8]">
                  <Logo className="w-4 h-4 opacity-70" />
                  <span className="text-[11px] font-serif italic">Beyond Editorial Studio.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
