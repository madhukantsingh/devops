import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

type Op = 'push' | 'pull' | 'fetch';

const ops: { id: Op; icon: string; label: string; color: string; direction: string; when: string; detail: string; command: string }[] = [
  {
    id: 'push',
    icon: '⬆️',
    label: 'git push',
    color: '#58a6ff',
    direction: 'Local → Remote',
    when: 'After committing locally, you want to share your work with the team or back it up on GitHub.',
    detail: 'If the remote has commits you don\'t have, your push will be "rejected." You need to pull first and reconcile.',
    command: 'git push origin feature/login',
  },
  {
    id: 'pull',
    icon: '⬇️',
    label: 'git pull',
    color: '#3fb950',
    direction: 'Remote → Local (download + merge)',
    when: 'You want to get your teammate\'s latest commits and immediately apply them to your current branch.',
    detail: 'pull = fetch + merge in one command. Can cause a merge conflict if your local changes overlap with remote changes.',
    command: 'git pull origin main',
  },
  {
    id: 'fetch',
    icon: '📡',
    label: 'git fetch',
    color: '#bc8cff',
    direction: 'Remote info → Local Git (download only)',
    when: 'You want to see what changed on the remote without changing your working directory or local branch.',
    detail: 'Safe to run anytime. After fetch, you can inspect what\'s changed before deciding to merge. "Look before you leap."',
    command: 'git fetch origin',
  },
];

export default function GitPushPullSlide({ slide }: Props) {
  const [active, setActive] = useState<Op | null>('push');
  const activeOp = ops.find((o) => o.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        Three commands for syncing between your local machine and GitHub. Click each to understand when and why.
      </p>

      {/* Visual diagram */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '20px',
        marginBottom: 18,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
          {/* Local */}
          <div style={{
            background: 'rgba(248,81,73,0.08)',
            border: '1px solid rgba(248,81,73,0.3)',
            borderRadius: 12,
            padding: '14px 20px',
            textAlign: 'center',
            minWidth: 130,
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>💻</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f85149' }}>Local Repository</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>Your machine</div>
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <motion.div
              animate={{ opacity: active === 'push' ? 1 : 0.3, scale: active === 'push' ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: active === 'push' ? 'rgba(88,166,255,0.15)' : 'transparent',
                border: `1px solid ${active === 'push' ? '#58a6ff40' : 'transparent'}`,
                borderRadius: 8,
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
              onClick={() => setActive('push')}
            >
              <span style={{ fontSize: 14 }}>⬆️</span>
              <code style={{ fontSize: 12, color: '#58a6ff', fontFamily: 'monospace', fontWeight: 700 }}>git push</code>
              <span style={{ fontSize: 12, color: '#58a6ff' }}>→</span>
            </motion.div>

            <motion.div
              animate={{ opacity: active === 'pull' ? 1 : 0.3, scale: active === 'pull' ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: active === 'pull' ? 'rgba(63,185,80,0.15)' : 'transparent',
                border: `1px solid ${active === 'pull' ? '#3fb95040' : 'transparent'}`,
                borderRadius: 8,
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
              onClick={() => setActive('pull')}
            >
              <span style={{ fontSize: 12, color: '#3fb950' }}>←</span>
              <code style={{ fontSize: 12, color: '#3fb950', fontFamily: 'monospace', fontWeight: 700 }}>git pull</code>
              <span style={{ fontSize: 14 }}>⬇️</span>
            </motion.div>

            <motion.div
              animate={{ opacity: active === 'fetch' ? 1 : 0.3, scale: active === 'fetch' ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: active === 'fetch' ? 'rgba(188,140,255,0.15)' : 'transparent',
                border: `1px solid ${active === 'fetch' ? '#bc8cff40' : 'transparent'}`,
                borderRadius: 8,
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
              onClick={() => setActive('fetch')}
            >
              <span style={{ fontSize: 12, color: '#bc8cff' }}>←</span>
              <code style={{ fontSize: 12, color: '#bc8cff', fontFamily: 'monospace', fontWeight: 700 }}>git fetch</code>
              <span style={{ fontSize: 14 }}>📡</span>
            </motion.div>
          </div>

          {/* Remote */}
          <div style={{
            background: 'rgba(88,166,255,0.08)',
            border: '1px solid rgba(88,166,255,0.3)',
            borderRadius: 12,
            padding: '14px 20px',
            textAlign: 'center',
            minWidth: 130,
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🌐</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#58a6ff' }}>GitHub</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>Remote repository</div>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        {ops.map((op) => (
          <button
            key={op.id}
            onClick={() => setActive(op.id)}
            style={{
              flex: 1,
              minWidth: 100,
              background: active === op.id ? `${op.color}18` : 'var(--bg-card)',
              border: `1px solid ${active === op.id ? op.color + '60' : 'var(--border)'}`,
              borderRadius: 10,
              padding: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.18s',
            }}
          >
            <span style={{ fontSize: 18, display: 'block', marginBottom: 2 }}>{op.icon}</span>
            <code style={{ fontSize: 12, color: active === op.id ? op.color : 'var(--text-secondary)', fontFamily: 'monospace', fontWeight: 700 }}>{op.label}</code>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeOp && (
          <motion.div
            key={activeOp.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${activeOp.color}10`,
              border: `1px solid ${activeOp.color}40`,
              borderRadius: 12,
              padding: '14px 18px',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 22 }}>{activeOp.icon}</span>
              <div>
                <code style={{ fontSize: 14, color: activeOp.color, fontFamily: 'monospace', fontWeight: 800 }}>{activeOp.label}</code>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{activeOp.direction}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: activeOp.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>When to use</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{activeOp.when}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: activeOp.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Watch out for</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{activeOp.detail}</div>
              </div>
            </div>
            <div style={{ marginTop: 10, background: 'var(--code-bg)', borderRadius: 8, padding: '8px 12px' }}>
              <code style={{ fontSize: 12, color: activeOp.color, fontFamily: 'monospace' }}>$ {activeOp.command}</code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
