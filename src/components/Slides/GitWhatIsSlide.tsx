import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const pillars = [
  {
    id: 'track',
    icon: '📝',
    label: 'Track Changes',
    color: '#58a6ff',
    desc: 'Git records every modification to every file — who changed what, when, and why.',
    detail: 'Every time you commit, Git saves a snapshot of all tracked files. You can see the complete history of the project at any point.',
  },
  {
    id: 'compare',
    icon: '🔍',
    label: 'Compare Changes',
    color: '#3fb950',
    desc: 'See exactly what changed between any two points in time.',
    detail: 'git diff shows you line-by-line what was added (green) and removed (red). This is how code reviews work.',
  },
  {
    id: 'recover',
    icon: '🔙',
    label: 'Recover Versions',
    color: '#bc8cff',
    desc: 'Go back to any previous state of the project.',
    detail: 'If a bug was introduced last Tuesday, you can go back to Monday\'s code. If you delete a file, you can restore it from history.',
  },
  {
    id: 'collaborate',
    icon: '🤝',
    label: 'Collaborate',
    color: '#ffa657',
    desc: 'Multiple people can work on the same project simultaneously.',
    detail: 'Git manages parallel lines of development (branches) and can merge them together — resolving conflicts when needed.',
  },
];

export default function GitWhatIsSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activePillar = pillars.find((p) => p.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
        Git is a <strong style={{ color: 'var(--text-primary)' }}>Version Control System</strong> — a tool that tracks changes to files over time.
      </p>

      {/* Core statement */}
      <div style={{
        background: 'var(--accent-dim)',
        border: '1px solid var(--accent-glow)',
        borderRadius: 12,
        padding: '14px 18px',
        marginBottom: 22,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 'clamp(13px,2vw,18px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.5 }}>
          "Git tracks changes to files over time so developers can<br />
          safely work, understand what changed, and recover previous versions."
        </div>
      </div>

      {/* Four pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10, marginBottom: 16 }}>
        {pillars.map((p, i) => {
          const isActive = active === p.id;
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActive(isActive ? null : p.id)}
              style={{
                background: isActive ? `${p.color}18` : 'var(--bg-card)',
                border: `1px solid ${isActive ? p.color + '60' : 'var(--border)'}`,
                borderRadius: 12,
                padding: '14px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.18s',
              }}
            >
              <span style={{ fontSize: 26, display: 'block', marginBottom: 8 }}>{p.icon}</span>
              <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? p.color : 'var(--text-primary)', marginBottom: 4 }}>
                {p.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {p.desc}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activePillar && (
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${activePillar.color}10`,
              border: `1px solid ${activePillar.color}40`,
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 14,
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}
          >
            <span style={{ fontSize: 18, marginRight: 8 }}>{activePillar.icon}</span>
            <strong style={{ color: activePillar.color }}>{activePillar.label}: </strong>
            {activePillar.detail}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Critical distinction */}
      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div style={{
          flex: 1,
          minWidth: 200,
          background: 'rgba(88,166,255,0.08)',
          border: '1px solid rgba(88,166,255,0.25)',
          borderRadius: 10,
          padding: '12px 14px',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#58a6ff', marginBottom: 4 }}>✓ Git CAN work offline</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Git runs entirely on your computer. No internet required. You can commit, branch, and view history without a network connection.
          </div>
        </div>
        <div style={{
          flex: 1,
          minWidth: 200,
          background: 'rgba(248,81,73,0.08)',
          border: '1px solid rgba(248,81,73,0.25)',
          borderRadius: 10,
          padding: '12px 14px',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f85149', marginBottom: 4 }}>⚠ Git ≠ GitHub</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Git is the tool. GitHub is a website. They are not the same thing. The next slide explains this distinction.
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
