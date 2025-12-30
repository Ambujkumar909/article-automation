import React from 'react';
import { motion } from 'framer-motion';
import type { Article } from '../types';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  article: Article;
  onBack: () => void;
}

export const ComparisonView: React.FC<Props> = ({ article, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[150] bg-[#f3ebd6] flex flex-col min-h-screen overflow-y-auto"
    >
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center px-6 py-4 border-b border-[#2a2620]/10 bg-[#f3ebd6]/90 backdrop-blur">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#a8a18c] hover:text-[#1a1815] transition"
        >
          <ArrowLeft size={16} />
          <span className="uppercase text-[10px] tracking-widest font-bold">
            Back
          </span>
        </button>

        <h1 className="flex-1 text-center text-[11px] uppercase tracking-[0.3em] font-serif text-[#1a1815] truncate">
          {article.title}
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 grid md:grid-cols-2">
        {/* Original */}
        <section className="border-b md:border-b-0 md:border-r border-[#2a2620]/10">
          <div className="px-6 py-3 text-[9px] tracking-widest uppercase text-[#a8a18c] bg-[#ede5cd]/50">
            Original
          </div>

          <div className="p-8 md:p-14">
            <p className="text-[#7d776b] leading-relaxed whitespace-pre-wrap max-w-3xl mx-auto">
              {article.original_content}
            </p>
          </div>
        </section>

        {/* Refined */}
        <section>
          <div className="px-6 py-3 text-[9px] tracking-widest uppercase text-[#4a3a20] bg-[#ede5cd]/70">
            Refined
          </div>

          <div className="p-8 md:p-14 prose prose-stone prose-lg max-w-none">
            <ReactMarkdown>
              {article.updated_content}
            </ReactMarkdown>
          </div>
        </section>
      </div>
    </motion.div>
  );
};