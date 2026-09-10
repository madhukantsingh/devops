import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { AlertTriangle } from 'lucide-react';

interface Props { slide: SlideData; }

const problems = [
  {
    id: 'versions',
    icon: '📁',
    label: 'Which version is latest?',
    desc: 'project-final-latest-REAL-FINAL.zip — no one knows what changed or when.',
    color: '#ffa657',
  },
  {
    id: 'who',
    icon: '🤷',
    label: 'Who changed what?',
    desc: 'No record of who made which change. "Not me!" is always the first answer.',
    color: '#f85149',
  },
  {
    id: 'combine',
    icon: '🔀',
    label: 'Combining two people\'s work',
    desc: 'Alice and Bob both edited app.js and emailed their copies. Now what?',
    color: '#bc8cff',
  },
  {
    id: 'recover',
    icon: '🔙',
    label: 'Recovering a previous version',
    desc: 'You need to undo last Friday\'s changes. Which zip was last Thursday?',
    color: '#58a6ff',
  },
  {
    id: 'review',
    icon: '👀',
    label: 'Reviewing changes before release',
    desc: 'What exactly changed in this zip vs the last one? No one can easily tell.',
    color: '#3fb950',
  },
  {
    id: 'experiment',
    icon: '🧪',
    label: 'Safely experimenting',
    desc: 'Trying something new means duplicating the whole folder — again.',
    color: '#d29922',
  },
];

const fileNames = [
  'project-final.zip',
  'project-final-2.zip',
  'project-final-latest.zip',
  'project-final-latest-REAL.zip',
  'project-final-latest-REAL-FINAL.zip',
  'project-final-latest-REAL-FINAL-v2.zip',
];

export default function GitBeforeSlide({ slide }: Props) {
  const [activeProblem, setActiveProblem] = useState<string | null>(null);
  const active = problems.find((p) => p.id === activeProblem);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        Before version control, teams relied on file naming, email attachments, and hope.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* File chaos column */}
        <div style={{ minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            📂 project_folder/
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {fileNames.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: i === fileNames.length - 1 ? 'rgba(248,81,73,0.12)' : 'var(--bg-card)',
                  border: `1px solid ${i === fileNames.length - 1 ? '#f8514940' : 'var(--border)'}`,
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  color: i === fileNames.length - 1 ? '#f85149' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 14 }}>📦</span>
                {name}
                {i === fileNames.length - 1 && (
                  <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: '#f8514920', color: '#f85149', borderRadius: 4, padding: '1px 6px' }}>
                    LATEST?
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: 12,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              background: 'rgba(210,153,34,0.1)',
              border: '1px solid rgba(210,153,34,0.3)',
              borderRadius: 9,
              padding: '10px 12px',
            }}
          >
            <AlertTriangle size={14} style={{ color: '#d29922', flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              <strong style={{ color: '#d29922' }}>Real quote from real teams:</strong><br />
              "Just use the REAL FINAL one. No, the other one."
            </p>
          </motion.div>
        </div>

        {/* Problems column */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            Problems without version control
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 8 }}>
            {problems.map((p, i) => {
              const isActive = activeProblem === p.id;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setActiveProblem(isActive ? null : p.id)}
                  style={{
                    background: isActive ? `${p.color}18` : 'var(--bg-card)',
                    border: `1px solid ${isActive ? p.color + '60' : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>{p.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? p.color : 'var(--text-primary)', lineHeight: 1.3 }}>
                      {p.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 12,
                  background: `${active.color}12`,
                  border: `1px solid ${active.color}40`,
                  borderRadius: 10,
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20 }}>{active.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: active.color, marginBottom: 4 }}>{active.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{active.desc}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!active && (
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, fontStyle: 'italic' }}>
              ↑ Click a problem to see how it manifests
            </p>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
}
