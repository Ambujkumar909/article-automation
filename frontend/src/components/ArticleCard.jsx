import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ArticleCard({ article, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group bg-white p-8 rounded-[2.5rem] border border-charcoal/5 cursor-pointer transition-all hover:shadow-2xl hover:shadow-charcoal/5"
    >
      <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6">
        <Sparkles size={14} /> AI Enhanced
      </div>
      
      <h2 className="text-3xl font-serif font-bold leading-tight mb-4 group-hover:text-accent transition-colors">
        {article.title}
      </h2>
      
      <p className="text-charcoal/50 text-sm leading-relaxed mb-8 line-clamp-3">
        {article.summary || "Generating intelligent insights..."}
      </p>

      <div className="flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-4">
        READ CASE STUDY <ArrowRight size={16} />
      </div>
    </motion.div>
  );
}