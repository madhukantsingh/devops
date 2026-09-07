import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { ChevronDown } from 'lucide-react';

interface Props { slide: SlideData; }

const flow1 = [
  { label: 'Developer Laptop', sub: 'writes code locally', color: '#58a6ff' },
  { label: 'git commit', sub: 'saves a snapshot', color: '#bc8cff', isAction: true },
  { label: 'Git History', sub: 'local version history', color: '#79c0ff' },
  { label: 'git push', sub: 'uploads to GitHub', color: '#bc8cff', isAction: true },
  { label: 'GitHub', sub: 'shared remote repository', color: '#3fb950' },
];

const flow2 = [
  { label: 'Feature Branch', sub: 'git checkout -b feature', color: '#ffa657' },
  { label: 'Pull Request', sub: 'Propose changes on GitHub', color: '#58a6ff' },
  { label: 'Code Review', sub: 'Team discusses & approves', color: '#bc8cff' },
  { label: 'Merge', sub: 'Changes join the main branch', color: '#56d364', isAction: true },
  { label: 'Main Branch', sub: 'Code is ready for CI/CD', color: '#3fb950' },
];

export default function LocalToGitHubSlide({ slide }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>{slide.title}</h2>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 24 }}>
        {/* Flow 1 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>Code Journey</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
            {flow1.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: step.isAction ? 'transparent' : `${step.color}18`,
                    border: step.isAction ? 'none' : `1px solid ${step.color}44`,
                    borderRadius: step.isAction ? 0 : 10,
                    padding: step.isAction ? '4px 16px' : '12px 20px',
                    minWidth: 200,
                  }}
                >
                  <div style={{ fontSize: step.isAction ? 12 : 14, fontWeight: 700, color: step.color, fontFamily: step.isAction ? 'monospace' : 'inherit' }}>
                    {step.isAction ? `$ ${step.label}` : step.label}
                  </div>
                  {step.sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{step.sub}</div>}
                </motion.div>
                {i < flow1.length - 1 && (
                  <div style={{ width: 2, height: 10, background: 'var(--border)', marginLeft: 24 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Flow 2: PR workflow */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>Collaboration Flow</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
            {flow2.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{
                    background: step.isAction ? 'transparent' : `${step.color}18`,
                    border: step.isAction ? 'none' : `1px solid ${step.color}44`,
                    borderRadius: step.isAction ? 0 : 10,
                    padding: step.isAction ? '4px 16px' : '12px 20px',
                    minWidth: 220,
                  }}
                >
                  <div style={{ fontSize: step.isAction ? 12 : 14, fontWeight: 700, color: step.color, fontFamily: step.isAction ? 'monospace' : 'inherit' }}>
                    {step.label}
                  </div>
                  {step.sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{step.sub}</div>}
                </motion.div>
                {i < flow2.length - 1 && (
                  <div style={{ width: 2, height: 10, background: 'var(--border)', marginLeft: 24 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
        Why does this matter?
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: 8, padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Key insight:</strong> The code running on a developer's laptop is never the same thing as the production application. Code must be committed, pushed, reviewed, merged, and then deployed through a controlled pipeline before any user sees it. This controlled flow prevents accidental overwrites, maintains quality through review, and provides a complete audit trail.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
