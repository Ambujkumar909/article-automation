import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import type { ViewState, Article } from './types';
import { fetchArticles } from './services/articles';

import { ArticleList } from './components/ArticleList.tsx';
import { ComparisonView } from './components/ComparisonView';
import { Logo } from './components/Logo.tsx';
import { EdgeCollage } from './components/EdgeCollage.tsx';
import { HeroHeading, WarmFadeQuote } from './components/Typography.tsx';
import { AmbientBackground } from './components/AmbientBackground.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ currentView: 'landing' });
  const [articles, setArticles] = useState<Article[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  // 🔹 Fetch articles from Laravel API
  useEffect(() => {
    async function loadArticles() {
      try {
        setIsListLoading(true);
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        console.error("Failed to load articles", err);
      } finally {
        setIsListLoading(false);
      }
    }

    loadArticles();
  }, []);

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

  const navigateTo = (next: ViewState['currentView'], id?: number) => {
    setView({ currentView: next, selectedArticleId: id });
  };

  const selectedArticle = articles.find(
    a => a.id === view.selectedArticleId
  );

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
              <h1 className="text-[10px] md:text-[11px] font-serif font-bold tracking-[0.1em] uppercase text-neutral-950">
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
              exit={{ opacity: 0 }}
              className="relative flex-1 flex flex-col items-center justify-center min-h-[100dvh] px-6"
            >
              <HeroHeading />
              <WarmFadeQuote
                delay={1}
                text="Logic meets legacy. We refine raw synthesis into editorial excellence."
              />

              <motion.button
                ref={buttonRef}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('list')}
                className="mt-12 px-20 py-6 bg-[#1a1815] text-[#f3ebd6] rounded-full"
              >
                Explore Articles
              </motion.button>

              <EdgeCollage />
            </motion.section>
          )}

          {view.currentView === 'list' && (
            <ArticleList
              articles={articles}
              isLoading={isListLoading}
              onSelect={(id) => navigateTo('comparison', id)}
            />
          )}

          {view.currentView === 'comparison' && selectedArticle && (
            <ComparisonView
              article={selectedArticle}
              onBack={() => navigateTo('list')}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
