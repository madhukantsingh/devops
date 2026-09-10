import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

type Op = 'restore' | 'revert' | 'reset';

const ops: {
  id: Op;
  icon: string;
  label: string;
  color: string;
  situation: string;
  safe: boolean;
  command: string;
  what: string;
  warning?: string;
}[] = [
  {
    id: 'restore',
    icon: '📂',
    label: 'git restore',
    color: '#3fb950',
    situation: '"I changed a file but I don\'t want these changes anymore."',
    safe: true,
    command: 'git restore app.js',
    what: 'Discards uncommitted changes to a file. Reverts the file back to its last committed state. Can also unstage changes with --staged flag.',
    warning: undefined,
  },
  {
    id: 'revert',
    icon: '↩️',
    label: 'git revert',
    color: '#58a6ff',
    situation: '"I want to undo a commit that has already been shared with the team."',
    safe: true,
    command: 'git revert abc1234',
    what: 'Creates a NEW commit that reverses the changes of a previous commit. The history is preserved — the reversal is visible to everyone. Safe to use on shared branches.',
    warning: undefined,
  },
  {
    id: 'reset',
    icon: '⏮️',
    label: 'git reset',
    color: '#f85149',
    situation: '"I want to move my local branch back to a previous state."',
    safe: false,
    command: 'git reset --soft HEAD~1',
    what: 'Moves the current branch pointer to a previous commit. The --soft flag keeps changes staged. The --hard flag discards changes entirely. Use with caution on branches shared with others.',
    warning: 'Never use git reset --hard on commits that have already been pushed to a shared branch. This rewrites history and can break teammates\' work.',
  },
];

const historyCommits = [
  { hash: 'f9e8d7c', msg: 'Add 2FA to login', author: 'Alice', date: 'Today', current: true },
  { hash: 'b6a5e4d', msg: 'Fix payment timeout', author: 'Bob', date: 'Yesterday' },
  { hash: '3c2b1a0', msg: 'Update dashboard', author: 'Alice', date: '3 days ago' },
  { hash: 'a1b2c3d', msg: 'Initial commit', author: 'Bob', date: '1 week ago' },
];

export default function GitHistoryRevertSlide({ slide }: Props) {
  const [active, setActive] = useState<Op | null>(null);
  const activeOp = ops.find((o) => o.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        Git can undo changes in multiple ways. Choosing the right one depends on your situation.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* History timeline */}
        <div style={{ minWidth: 220 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            Git history (git log)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {historyCommits.map((c, i) => (
              <React.Fragment key={c.hash}>
                <div style={{
                  background: c.current ? 'var(--accent-dim)' : 'var(--bg-card)',
                  border: `1px solid ${c.current ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 9,
                  padding: '9px 12px',
                }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3 }}>
                    <code style={{ fontSize: 10, color: c.current ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'monospace' }}>{c.hash}</code>
                    {c.current && <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--accent)', background: 'var(--accent-dim)', borderRadius: 4, padding: '1px 5px' }}>HEAD</span>}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{c.msg}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.author} · {c.date}</div>
                </div>
                {i < historyCommits.length - 1 && <div style={{ width: 2, height: 8, background: 'var(--border)', marginLeft: 18 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Undo operations */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            Three ways to undo
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {ops.map((op) => (
              <button
                key={op.id}
                onClick={() => setActive(active === op.id ? null : op.id)}
                style={{
                  background: active === op.id ? `${op.color}15` : 'var(--bg-card)',
                  border: `1px solid ${active === op.id ? op.color + '60' : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: '10px 14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22 }}>{op.icon}</span>
                <div>
                  <code style={{ fontSize: 13, color: active === op.id ? op.color : 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 700 }}>{op.label}</code>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{op.situation}</div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  fontSize: 9,
                  fontWeight: 700,
                  color: op.safe ? '#3fb950' : '#f85149',
                  background: op.safe ? 'rgba(63,185,80,0.1)' : 'rgba(248,81,73,0.1)',
                  borderRadius: 5,
                  padding: '2px 7px',
                  flexShrink: 0,
                }}>
                  {op.safe ? 'SAFE' : 'CAUTION'}
                </div>
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
              >
                <div style={{
                  background: `${activeOp.color}10`,
                  border: `1px solid ${activeOp.color}40`,
                  borderRadius: 10,
                  padding: '14px',
                  marginBottom: 8,
                }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 10 }}>
                    {activeOp.what}
                  </div>
                  <div style={{ background: 'var(--code-bg)', borderRadius: 8, padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: activeOp.color }}>
                    $ {activeOp.command}
                  </div>
                </div>
                {activeOp.warning && (
                  <div style={{
                    background: 'rgba(248,81,73,0.1)',
                    border: '1px solid rgba(248,81,73,0.35)',
                    borderRadius: 9,
                    padding: '10px 12px',
                    fontSize: 12,
                    color: '#f85149',
                    lineHeight: 1.6,
                  }}>
                    ⚠️ <strong>Warning:</strong> {activeOp.warning}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
