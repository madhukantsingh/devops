import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const items = [
  { icon: '📝', label: 'TRACK', sub: 'Changes', color: '#58a6ff', desc: 'Every file change recorded' },
  { icon: '💾', label: 'SAVE', sub: 'Commits', color: '#bc8cff', desc: 'Meaningful checkpoints' },
  { icon: '🌿', label: 'BRANCH', sub: 'Independent work', color: '#3fb950', desc: 'Isolated lines of dev' },
  { icon: '⬆️', label: 'SHARE', sub: 'Push / Pull', color: '#ffa657', desc: 'Sync with teammates' },
  { icon: '👀', label: 'REVIEW', sub: 'Pull Request', color: '#d29922', desc: 'Inspect before merge' },
  { icon: '🔀', label: 'COMBINE', sub: 'Merge', color: '#56d364', desc: 'Join work together' },
  { icon: '🔙', label: 'RECOVER', sub: 'History / Revert', color: '#f85149', desc: 'Undo with intention' },
];

const workflow = [
  { step: 'CHANGE', color: '#ffa657' },
  { step: 'STATUS', color: '#d29922' },
  { step: 'ADD', color: '#bc8cff' },
  { step: 'COMMIT', color: '#58a6ff' },
  { step: 'PUSH', color: '#3fb950' },
  { step: 'PULL REQUEST', color: '#56d364' },
  { step: 'REVIEW', color: '#ffa657' },
  { step: 'MERGE', color: '#3fb950' },
  { step: 'CI/CD', color: '#f85149' },
];

export default function GitSummarySlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        The complete Git mental model in one view.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Mental model tree */}
        <div style={{ flex: 2, minWidth: 300 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            What Git gives you
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: `${item.color}12`,
                  border: `1px solid ${item.color}35`,
                  borderRadius: 12,
                  padding: '12px 14px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: item.color, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.sub}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: 14,
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-glow)',
              borderRadius: 12,
              padding: '14px 18px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 'clamp(12px,2vw,16px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.6 }}>
              "Git tracks the history of code.<br />
              GitHub gives the team a place to collaborate around that history."
            </div>
          </motion.div>
        </div>

        {/* Practical workflow */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            The practical workflow
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {workflow.map((w, i) => (
              <React.Fragment key={w.step}>
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  style={{
                    background: `${w.color}12`,
                    border: `1px solid ${w.color}30`,
                    borderRadius: 9,
                    padding: '8px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: w.color,
                    textAlign: 'center',
                  }}
                >
                  {w.step}
                </motion.div>
                {i < workflow.length - 1 && (
                  <div style={{ width: 2, height: 8, background: 'var(--border)', marginLeft: 'auto', marginRight: 'auto' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              marginTop: 12,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 11,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            This workflow applies to every feature, bug fix, and improvement — regardless of team size.
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
