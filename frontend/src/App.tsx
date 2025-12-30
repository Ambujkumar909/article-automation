
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ViewState, Article } from './types';
import { ARTICLES_MOCK } from './constants';
import { ArticleList } from './components/ArticleList';
import { ComparisonView } from './components/ComparisonView';
import { Logo } from './components/Logo';
import { EdgeCollage } from './components/EdgeCollage';
import { HeroHeading, WarmFadeQuote } from './components/Typography';
import { AmbientBackground } from './components/AmbientBackground';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ currentView: 'landing' });
  const [articles] = useState<Article[]>(ARTICLES_MOCK);
  const [isListLoading, setIsListLoading] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view.currentView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const navigateTo = (next: ViewState['currentView'], id?: string) => {
    if (next === 'list') {
      setIsListLoading(true);
      setTimeout(() => setIsListLoading(false), 1200);
    }
    setView({ currentView: next, selectedArticleId: id });
  };

  const selectedArticle = articles.find(a => a.id === view.selectedArticleId);

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#f3ebd6]">
      <AmbientBackground />

      <AnimatePresence>
        {view.currentView !== 'comparison' && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 lg:px-14 py-4 md:py-6 flex justify-between items-center pointer-events-none"
          >
            <div 
              className="pointer-events-auto cursor-pointer flex items-center space-x-2.5 group" 
              onClick={() => navigateTo('landing')}
            >
              <Logo className="w-5 h-5 md:w-6 transition-transform duration-700 group-hover:rotate-180 text-neutral-900" />
              <h1 className="text-[10px] md:text-[11px] font-serif font-bold tracking-[0.1em] uppercase text-neutral-950 transition-opacity group-hover:opacity-60">
                Beyond Chats.
              </h1>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {view.currentView === 'landing' && (
            <motion.section
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-1 flex flex-col items-center justify-center min-h-[100dvh] pt-12 pb-16 md:pt-0 md:pb-12 px-6 overflow-hidden"
            >
              <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center space-y-4 md:space-y-8 relative z-20">
                <HeroHeading />
                
                <div className="flex flex-col items-center space-y-6 md:space-y-10 w-full">
                  <WarmFadeQuote 
                    delay={1}
                    text="Logic meets legacy. We refine raw synthesis into editorial excellence, defining the new standard of content intelligence."
                  />

                  <div className="relative group">
                    <motion.div 
                      style={{ x: springX, y: springY }}
                      className="absolute inset-0 bg-amber-900/10 blur-[60px] rounded-full scale-125 transition-transform duration-1000 opacity-0 group-hover:opacity-70 group-hover:scale-150" 
                    />
                    
                    <motion.button
                      ref={buttonRef}
                      style={{ x: springX, y: springY }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigateTo('list')}
                      className="relative px-14 md:px-24 py-5 md:py-7 bg-[#1a1815] text-[#f3ebd6] rounded-full overflow-hidden transition-all duration-700 hover:shadow-[0_30px_100px_-20px_rgba(100,80,40,0.35)] flex items-center justify-center min-w-[220px] md:min-w-[280px] border border-white/5 group"
                    >
                      <motion.span 
                        className="relative z-20 text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase transition-all duration-700 group-hover:tracking-[0.6em] group-hover:text-white"
                      >
                        Explore Articles
                      </motion.span>
                      
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] opacity-50"
                      />

                      <motion.div 
                        initial={{ x: "-150%" }}
                        whileHover={{ x: "150%" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] z-10"
                      />

                      <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <EdgeCollage />
            </motion.section>
          )}

          {view.currentView === 'list' && (
            <motion.section
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="min-h-screen"
            >
              <ArticleList 
                articles={articles} 
                onSelect={(id) => navigateTo('comparison', id)} 
                isLoading={isListLoading}
              />
            </motion.section>
          )}

          {view.currentView === 'comparison' && selectedArticle && (
            <ComparisonView 
              article={selectedArticle} 
              onBack={() => navigateTo('list')} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 md:py-8 flex flex-col items-center mt-auto bg-transparent relative z-20 pointer-events-none">
        <div className="h-[1px] w-4 bg-[#dfd8c2] mb-3" />
        <p className="text-[7px] uppercase tracking-[0.4em] font-bold text-[#a8a18c]">Est. 2025 Studio</p>
      </footer>
    </div>
  );
};

export default App;