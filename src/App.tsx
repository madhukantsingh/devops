import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides, getSlidesForMode, SlideData } from './data/slides';
import HomeScreen from './components/HomeScreen';
import ProgressBar from './components/Layout/ProgressBar';
import SlideNavigator from './components/Layout/SlideNavigator';
import PresenterPanel from './components/Layout/PresenterPanel';
import Timer from './components/UI/Timer';
import SlideRenderer from './components/Slides/SlideRenderer';
import { ChevronLeft, ChevronRight, Grid, User, Clock, Keyboard, X, Sun, Moon } from 'lucide-react';

export type TimeMode = 60 | 45 | 30;
export type Theme = 'dark' | 'light';

// ── Theme Context ──────────────────────────────────────────────────────────
export const ThemeContext = createContext<Theme>('dark');
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [started, setStarted] = useState(false);
  const [timeMode, setTimeMode] = useState<TimeMode>(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [presenterMode, setPresenterMode] = useState(false);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeSlides: SlideData[] = getSlidesForMode(timeMode);
  const current = activeSlides[currentIndex];
  const total = activeSlides.length;

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) { setDirection(1); setCurrentIndex((i) => i + 1); }
  }, [currentIndex, total]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) { setDirection(-1); setCurrentIndex((i) => i - 1); }
  }, [currentIndex]);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setNavigatorOpen(false);
  }, [currentIndex]);

  const toggleTheme = () => setTheme((t) => t === 'dark' ? 'light' : 'dark');

  // Keyboard navigation
  useEffect(() => {
    if (!started) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key) {
        case 'ArrowRight': case ' ': e.preventDefault(); goNext(); break;
        case 'ArrowLeft': e.preventDefault(); goPrev(); break;
        case 'Home': e.preventDefault(); goTo(0); break;
        case 'End': e.preventDefault(); goTo(total - 1); break;
        case 'f': case 'F':
          if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
          else document.exitFullscreen?.();
          break;
        case 'p': case 'P': setPresenterMode((v) => !v); break;
        case 'd': case 'D': toggleTheme(); break;
        case '?': setShortcutsOpen((v) => !v); break;
        case 'Escape':
          setNavigatorOpen(false); setShortcutsOpen(false); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, goNext, goPrev, goTo, total]);

  const isDark = theme === 'dark';

  if (!started) {
    return (
      <ThemeContext.Provider value={theme}>
        <HomeScreen
          onStart={() => setStarted(true)}
          timeMode={timeMode}
          setTimeMode={setTimeMode}
          slides={slides}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </ThemeContext.Provider>
    );
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
  };

  const btnStyle = (active?: boolean): React.CSSProperties => ({
    background: active ? 'var(--accent-dim)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text-secondary)',
    border: 'none',
    borderRadius: 8,
    padding: '6px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    transition: 'all 0.15s',
  });

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          transition: 'background 0.25s, color 0.25s',
        }}
      >
        {/* ── Top Bar ─────────────────────────────────────────────── */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            zIndex: 20,
            minHeight: 44,
          }}
        >
          {/* Left: section + slide count + optional badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span
              className="topbar-section-label"
              style={{
                background: 'var(--accent-dim)',
                color: 'var(--accent)',
                border: '1px solid var(--accent-glow)',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {current.section}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap' }}>
              {currentIndex + 1}/{total}
            </span>
            {current.label === 'OPTIONAL' && (
              <span style={{ background: 'var(--warning-dim)', color: 'var(--warning)', border: '1px solid rgba(210,153,34,0.3)', borderRadius: 5, padding: '1px 6px', fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>
                OPT
              </span>
            )}
          </div>

          {/* Center: progress bar */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <ProgressBar current={currentIndex + 1} total={total} />
          </div>

          {/* Right: controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <Timer
              elapsed={elapsed}
              running={timerRunning}
              onToggle={() => setTimerRunning((v) => !v)}
              onReset={() => { setTimerRunning(false); setElapsed(0); }}
            />
            <button onClick={() => setNavigatorOpen((v) => !v)} title="Slide Navigator" style={btnStyle(navigatorOpen)}>
              <Grid size={16} />
            </button>
            <button onClick={() => setPresenterMode((v) => !v)} title="Presenter Mode (P)" style={btnStyle(presenterMode)}>
              <User size={16} />
            </button>
            <button onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode (D)`} style={btnStyle()}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setShortcutsOpen((v) => !v)} title="Keyboard shortcuts (?)" style={btnStyle()}>
              <Keyboard size={16} />
            </button>
            <button
              onClick={() => { setStarted(false); setCurrentIndex(0); setElapsed(0); setTimerRunning(false); }}
              title="Back to Home"
              style={{ ...btnStyle(), color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Main ────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          {/* Slide area */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
                className="scrollable"
              >
                <SlideRenderer slide={current} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Presenter Panel */}
          <AnimatePresence>
            {presenterMode && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: 'clamp(260px, 30vw, 320px)',
                  borderLeft: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  flexShrink: 0,
                  overflowY: 'auto',
                }}
                className="scrollable"
              >
                <PresenterPanel
                  current={current}
                  next={activeSlides[currentIndex + 1]}
                  elapsed={elapsed}
                  timerRunning={timerRunning}
                  onTimerToggle={() => setTimerRunning((v) => !v)}
                  onTimerReset={() => { setTimerRunning(false); setElapsed(0); }}
                  remaining={total - currentIndex - 1}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom Nav ──────────────────────────────────────────── */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border)',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            gap: 8,
          }}
        >
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            style={{
              background: currentIndex === 0 ? 'transparent' : 'var(--bg-card)',
              color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '7px 14px',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 13,
              fontWeight: 500,
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={15} />
            <span>Prev</span>
          </button>

          {/* Center info */}
          <div style={{ textAlign: 'center', flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {current.title.length > 50 ? current.title.slice(0, 50) + '…' : current.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 2 }}>
              <Clock size={10} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{current.duration} min</span>
            </div>
          </div>

          <button
            onClick={goNext}
            disabled={currentIndex === total - 1}
            style={{
              background: currentIndex === total - 1 ? 'transparent' : 'var(--accent)',
              color: currentIndex === total - 1 ? 'var(--text-muted)' : '#fff',
              border: currentIndex === total - 1 ? '1px solid var(--border)' : 'none',
              borderRadius: 8,
              padding: '7px 14px',
              cursor: currentIndex === total - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <span>Next</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* ── Slide Navigator Modal ──────────────────────────────── */}
        <AnimatePresence>
          {navigatorOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setNavigatorOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: 'fixed',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  zIndex: 50,
                  width: 'min(95vw, 860px)',
                  maxHeight: '80vh',
                  display: 'flex', flexDirection: 'column',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15 }}>Slide Navigator</h3>
                  <button onClick={() => setNavigatorOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={18} /></button>
                </div>
                <div className="overflow-y-auto scrollable flex-1 p-4" style={{ padding: 16 }}>
                  <SlideNavigator slides={activeSlides} currentIndex={currentIndex} onGoTo={goTo} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Keyboard Shortcuts Modal ────────────────────────────── */}
        <AnimatePresence>
          {shortcutsOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShortcutsOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: 'fixed',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  zIndex: 50,
                  width: 'min(90vw, 360px)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 22,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15 }}>Keyboard Shortcuts</h3>
                  <button onClick={() => setShortcutsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={18} /></button>
                </div>
                {[
                  ['→ / Space', 'Next slide'],
                  ['←', 'Previous slide'],
                  ['Home', 'First slide'],
                  ['End', 'Last slide'],
                  ['F', 'Toggle fullscreen'],
                  ['P', 'Presenter mode'],
                  ['D', 'Toggle dark/light'],
                  ['?', 'Keyboard shortcuts'],
                  ['Esc', 'Close modals'],
                ].map(([key, desc]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <kbd style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontFamily: 'monospace', color: 'var(--accent)' }}>{key}</kbd>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{desc}</span>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
