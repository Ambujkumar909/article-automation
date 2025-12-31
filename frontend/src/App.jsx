import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, BookOpen, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Navigation Constants
const VIEW = { HERO: 'hero', LIST: 'list', ARTICLE: 'article' };

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isExplored, setIsExplored] = useState(false);

  // 1. INITIALIZE HISTORY
  useEffect(() => {
    // Set the initial state so the back button knows where the 'start' is
    window.history.replaceState({ view: VIEW.HERO }, '');
  }, []);

  // 2. CENTRALIZED BACK-BUTTON LOGIC
  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;

      if (!state || state.view === VIEW.HERO) {
        // Navigate back to Hero
        setSelected(null);
        setIsExplored(false);
      } else if (state.view === VIEW.LIST) {
        // Navigate back to Grid
        setSelected(null);
        setIsExplored(true);
      } else if (state.view === VIEW.ARTICLE) {
        // Navigate back into a specific article (if forward button used)
        const article = articles.find(a => a.id === state.articleId);
        if (article) {
          setSelected(article);
          setIsExplored(true);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles, selected]);

  // 3. NAVIGATION HELPERS
  const openGrid = () => {
    setIsExplored(true);
    window.history.pushState({ view: VIEW.LIST }, '');
  };

  const openArticle = (art) => {
    setSelected(art);
    window.history.pushState({ view: VIEW.ARTICLE, articleId: art.id }, '');
  };

  const closeToGrid = () => {
    setSelected(null);
    // Instead of pushing new state, we move back in history to keep it clean
    window.history.back(); 
  };

  // Fetch articles from Laravel Backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setArticles(res.data))
      .catch(e => console.error("Backend connection error:", e));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans selection:bg-[#2563eb] selection:text-white">
      
      {/* 1. BRAND NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#FDFCF0]/80 backdrop-blur-xl border-b border-black/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
          <img src="/logo.png" alt="BeyondChats Logo" className="h-10 w-auto object-contain" />
          <span className="font-black text-xl tracking-tighter uppercase">BeyondChats</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
          <button className="hover:opacity-100 transition">Editorial</button>
          <button className="hover:opacity-100 transition">Intelligence</button>
          <button className="hover:opacity-100 transition">Archive</button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <AnimatePresence>
        {!isExplored && (
          <motion.section 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="h-screen flex flex-col justify-center items-center text-center px-6"
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="text-[14vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter mb-12">
                THINK <br /> <span className="font-serif italic font-light text-[#2563eb]">Better.</span>
              </h1>
              <p className="max-w-md mx-auto text-lg text-black/50 mb-12 font-medium text-center">
                Transforming legacy content into high-authority editorial masterpieces.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openGrid}
                className="mx-auto bg-[#1A1A1A] text-white px-12 py-6 rounded-full font-bold flex items-center gap-3 shadow-2xl hover:bg-[#2563eb] transition-colors"
              >
                Explore Insights <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. BENTO ARTICLE GRID */}
      {isExplored && (
        <motion.main 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 pt-40 pb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                onClick={() => openArticle(art)}
                className="group bg-white p-10 rounded-[3rem] border border-black/5 cursor-pointer transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-2 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  <Sparkles size={14} className="animate-pulse" /> AI Refined
                </div>
                <h2 className="text-3xl font-serif font-bold leading-tight mb-6 group-hover:text-[#2563eb] transition-colors">
                  {art.title}
                </h2>
                <p className="text-black/40 text-sm leading-relaxed mb-8 line-clamp-3 italic">
                  "{art.summary || "Archival analysis in progress..."}"
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest transition-all group-hover:gap-4">
                  VIEW TRANSFORMATION <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.main>
      )}

      {/* 4. COMPARISON MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 250 }}
            className="fixed inset-0 z-[60] bg-[#FDFCF0] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-20 relative">
              <button 
                onClick={closeToGrid} 
                className="fixed top-10 right-10 z-[70] bg-[#1A1A1A] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition"
              >
                <X size={24} />
              </button>
              
              <header className="max-w-4xl mb-16">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
                  {selected.title}
                </h1>
                <a href={selected.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-black/5 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Globe size={16}/> Source Integrity Link
                </a>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch h-[75vh] mb-10">
                <div className="flex flex-col h-full bg-black/[0.03] rounded-[3rem] p-8 border border-black/5">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-8">
                    <BookOpen size={14} /> The Original Archive
                  </div>
                  <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar font-serif italic text-black/60">
                    <ReactMarkdown>{selected.original_content}</ReactMarkdown>
                  </div>
                </div>
                
                <div className="flex flex-col h-full bg-white rounded-[4rem] p-8 md:p-16 shadow-2xl border border-black/5">
                  <div className="flex items-center gap-2 text-[#2563eb] text-[10px] font-black uppercase mb-12">
                    <Sparkles size={16} className="animate-pulse" /> Refined Intelligence
                  </div>
                  <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar prose prose-lg prose-slate max-w-none prose-p:leading-[1.8]">
                    <ReactMarkdown>{selected.updated_content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MINIMALIST PROFESSIONAL FOOTER */}
      <footer className="mt-20 py-12 border-t border-black/5 bg-[#FDFCF0]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563eb] mb-1">Developed By</h4>
              <p className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A]">Ambuj Kumar</p>
              <a href="mailto:ambujkr8@gmail.com" className="text-xs text-black/40 hover:text-[#2563eb] transition-all font-medium tracking-wide">
                ambujkr8@gmail.com
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.2em] mb-2">
                © {new Date().getFullYear()} BeyondChats Editorial
              </p>
              <div className="h-1 w-12 bg-[#2563eb]/20 ml-auto hidden md:block rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;