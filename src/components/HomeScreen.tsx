import React from 'react';
import { motion } from 'framer-motion';
import { slides, getSlidesForMode, SlideData } from '../data/slides';
import { Play, Clock, ArrowRight, CheckCircle, Sun, Moon } from 'lucide-react';
import { TimeMode, Theme } from '../App';

interface HomeScreenProps {
  onStart: () => void;
  timeMode: TimeMode;
  setTimeMode: (m: TimeMode) => void;
  slides: SlideData[];
  theme: Theme;
  onToggleTheme: () => void;
}

const sections = [
  { num: '01', name: 'The Big Picture', icon: '🗺️' },
  { num: '02', name: 'Git & Source Control', icon: '📚' },
  { num: '03', name: 'Servers & Cloud', icon: '🖥️' },
  { num: '04', name: 'CI/CD', icon: '⚙️' },
  { num: '05', name: 'Docker & Runtime', icon: '📦' },
  { num: '06', name: 'What Happens in the Browser', icon: '🌐' },
  { num: '07', name: 'Debugging', icon: '🔍' },
  { num: '08', name: 'Real Failure Walkthrough', icon: '🚨' },
  { num: '09', name: 'Final Mental Model', icon: '🧠' },
];

const modeDescriptions: Record<TimeMode, { label: string; desc: string }> = {
  60: { label: '60 MIN', desc: 'Full session - all 22 slides' },
  45: { label: '45 MIN', desc: 'Skip deeper optional slides' },
  30: { label: '30 MIN', desc: 'Executive overview - core only' },
};

export default function HomeScreen({ onStart, timeMode, setTimeMode, theme, onToggleTheme }: HomeScreenProps) {
  const isDark = theme === 'dark';
  const activeSlides = getSlidesForMode(timeMode);
  const totalTime = activeSlides.reduce((a, s) => a + s.duration, 0);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(24px,5vw,48px) clamp(16px,4vw,24px) 60px',
        overflowY: 'auto',
        position: 'relative',
        transition: 'background 0.25s, color 0.25s',
      }}
      className="scrollable"
    >
      {/* Theme toggle – top right */}
      <button
        onClick={onToggleTheme}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--text-secondary)',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
        {isDark ? 'Light mode' : 'Dark mode'}
      </button>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: 700, width: '100%', marginBottom: 48 }}
      >
        {/* Journey indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {['IDEA', 'CODE', 'GIT', 'PIPELINE', 'SERVER', 'CUSTOMER'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  color: 'var(--accent)',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-glow)',
                  borderRadius: 6,
                  padding: '3px 10px',
                }}
              >
                {step}
              </span>
              {i < arr.length - 1 && (
                <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #e6edf3 0%, #58a6ff 50%, #79c0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: -1,
          }}
        >
          From Code to Customer
        </h1>

        <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 400 }}>
          How software is built, tested, deployed, and debugged
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          A practical introduction to Git, servers, CI/CD, Docker, deployment, and troubleshooting
        </p>
      </motion.div>


      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        onClick={onStart}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, #79c0ff 100%)',
          color: '#0d1117',
          border: 'none',
          borderRadius: 14,
          padding: '16px 48px',
          fontSize: 18,
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 56,
          letterSpacing: 0.5,
          boxShadow: '0 0 32px rgba(88,166,255,0.3)',
        }}
      >
        <Play size={20} fill="currentColor" />
        Start Presentation
      </motion.button>

      {/* Sections overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ width: '100%', maxWidth: 700 }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>
          Sections
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {sections.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', letterSpacing: 1 }}>{s.num}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.3 }}>{s.name}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Includes</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              '22 interactive slides',
              'Keyboard navigation',
              'Presenter mode',
              'Speaker notes',
              'CI/CD pipeline simulator',
              'Debugging simulator',
              'HTTP error reference',
              'Incident walkthrough',
            ].map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={12} style={{ color: 'var(--success)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
