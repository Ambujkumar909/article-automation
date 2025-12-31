import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, BookOpen, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_URL = "http://127.0.0.1:8000/api/articles";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isExplored, setIsExplored] = useState(false);

  useEffect(() => {
    axios.get(API_URL).then(res => setArticles(res.data)).catch(e => console.error(e));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans selection:bg-blue-100">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#FDFCF0]/80 backdrop-blur-xl border-b border-black/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-200">B</div>
          <span className="font-black text-xl tracking-tighter uppercase">BeyondChats</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-50">
          <button className="hover:opacity-100 transition">Solutions</button>
          <button className="hover:opacity-100 transition">Case Studies</button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <AnimatePresence>
        {!isExplored && (
          <motion.section 
            exit={{ opacity: 0, y: -100 }}
            className="h-screen flex flex-col justify-center items-center text-center px-6"
          >
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-[12vw] font-black leading-[0.85] tracking-tighter mb-12"
            >
              THINK <br /> <span className="font-serif italic font-light text-[#2563eb]">Better.</span>
            </motion.h1>
            <motion.p className="max-w-md text-lg text-black/50 mb-10">
              Transforming standard blogs into high-ranking editorial masterpieces using AI-powered insights.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setIsExplored(true)}
              className="bg-[#1A1A1A] text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 shadow-2xl"
            >
              Explore Articles <ArrowRight size={20} />
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. ARTICLE GRID (BENTO STYLE) */}
      {isExplored && (
        <motion.main 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 pt-40 pb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelected(art)}
                className="group bg-white p-10 rounded-[3rem] border border-black/5 cursor-pointer transition-all hover:shadow-2xl hover:shadow-black/5"
              >
                <div className="flex items-center gap-2 text-[#2563eb] text-[10px] font-black uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> AI Refined
                </div>
                <h2 className="text-3xl font-serif font-bold leading-tight mb-6 group-hover:text-[#2563eb] transition-colors">{art.title}</h2>
                <p className="text-black/40 text-sm leading-relaxed mb-8 line-clamp-3 italic">"{art.summary || "Click to generate summary..."}"</p>
                <div className="flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-4">
                  VIEW TRANSFORMATION <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.main>
      )}

      {/* 4. EDITORIAL MODAL (FULL SCREEN) */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#FDFCF0] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-20 relative">
              <button onClick={() => setSelected(null)} className="fixed top-10 right-10 z-[70] bg-[#1A1A1A] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition"><X size={24} /></button>
              
              <header className="max-w-4xl mb-24">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10">{selected.title}</h1>
                <div className="flex flex-wrap gap-4">
                  <a href={selected.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-black/5 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black/10 transition"><Globe size={16}/> View Source Blog</a>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* LEFT: ORIGINAL (RAW) */}
                <div className="lg:sticky lg:top-32">
                  <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 mb-8"><BookOpen size={14}/> Original Archive</h3>
                  <div className="text-xl leading-relaxed text-black/40 font-serif italic border-l-2 border-black/5 pl-8">
                    {selected.original_content}
                  </div>
                </div>
                
                {/* RIGHT: UPDATED (STYLISH) */}
                <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-black/5">
                  <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2563eb] mb-10"><Sparkles size={14}/> Refined Editorial</h3>
                  
                  {/* PROSE class fixes your bullets and architecture */}
                  <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-slate-700 prose-p:leading-relaxed
                    prose-li:text-slate-700 prose-strong:text-[#1A1A1A]
                    prose-ul:list-disc prose-ol:list-decimal">
                    
                    <ReactMarkdown>{selected.updated_content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;