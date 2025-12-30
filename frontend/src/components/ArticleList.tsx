import React, { useMemo } from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import type { Article } from '../types';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Props {
  articles: Article[];
  onSelect: (id: number) => void;
  isLoading?: boolean;
}

const SkeletonRow = () => (
  <div className="relative py-8 border-b border-[#2a2620]/8 animate-pulse">
    <div className="h-5 w-1/2 bg-[#dfd8c2]/40 rounded mb-3" />
    <div className="h-3 w-2/3 bg-[#dfd8c2]/30 rounded" />
  </div>
);

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

export const ArticleList: React.FC<Props> = ({
  articles,
  onSelect,
  isLoading = false
}) => {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-32">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        ) : (
          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {articles.map((article, idx) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                onClick={() => onSelect(article.id)}
                whileHover={{ x: 6 }}
                className="cursor-pointer border-b border-[#2a2620]/10 pb-10"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-[9px] tracking-widest text-[#a8a18c] font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#a8a18c]">
                    {article.category ?? 'Editorial'}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif mb-3 text-[#1a1815]">
                  {article.title}
                </h3>

                <p className="text-[#6d665a] max-w-2xl leading-relaxed">
                  {article.summary ?? 'Refined editorial analysis.'}
                </p>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xs italic text-[#a8a18c]">
                    {article.author ?? 'Beyond Editorial'}
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#a8a18c]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
