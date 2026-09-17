import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Terminal, User, Calendar } from 'lucide-react';

interface Props { slide: SlideData; }

const commits = [
  { hash: 'a8f3b91', author: 'Alex Rivera',  date: '10 min ago',  message: 'feat: add payment gateway checkout endpoint',    tags: ['HEAD → feature/checkout'] },
  { hash: 'c7d2e45', author: 'Sarah Chen',   date: '2 hours ago', message: 'fix: handle token expiration gracefully in API', tags: ['origin/main', 'main'] },
  { hash: 'e9b1a03', author: 'Alex Rivera',  date: 'Yesterday',   message: 'refactor: extract user validation middleware',   tags: [] },
  { hash: '4f8d2e1', author: 'Mike Johnson', date: '2 days ago',  message: 'docs: update deployment environment guide',      tags: ['v1.2.0'] },
  { hash: '1b9c3a7', author: 'Sarah Chen',   date: '3 days ago',  message: 'feat: initialize database migration scripts',    tags: [] },
];

const views = [
  {
    id: 'standard',
    label: '📋 Full Log',
    cmd: 'git log',
    plain: 'Shows the FULL details of every save — who made it, when, and what the message says. Think of it as a detailed diary of everything that happened in the project.',
  },
  {
    id: 'oneline',
    label: '⚡ One Line',
    cmd: 'git log --oneline',
    plain: 'Same history, but squeezed to one line per save. Perfect for getting a quick overview — like scanning headlines in a newspaper instead of reading every article.',
  },
] as const;

type ViewId = typeof views[number]['id'];

export default function GitLogSlide({ slide }: Props) {
  const [active, setActive] = useState<ViewId>('standard');
  const view = views.find((v) => v.id === active)!;

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git log</code> shows the full history of saves (commits) in your project — who did what, and when.
      </p>

      {/* View Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {views.map((v) => {
          const isActive = active === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              style={{
                background: isActive ? 'var(--accent-dim)' : 'var(--bg-card)',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--accent-glow)' : 'var(--border)'}`,
                borderRadius: 8, padding: '7px 16px',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Plain English Explanation Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div style={{
            background: 'var(--accent-dim)',
            border: '1px solid var(--accent-glow)',
            borderRadius: 10, padding: '12px 16px', marginBottom: 14,
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>💬</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 1, marginBottom: 4 }}>
                WHAT THIS MEANS IN PLAIN ENGLISH
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {view.plain}
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Terminal header */}
            <div style={{
              padding: '8px 14px', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Terminal size={12} style={{ color: 'var(--accent)' }} />
              <code style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                $ {view.cmd}
              </code>
            </div>

            {/* Commit list */}
            <div style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.65 }}>
              {commits.map((c, i) => (
                <motion.div
                  key={c.hash}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ marginBottom: active === 'standard' ? 16 : 6 }}
                >

                  {/* ── FULL LOG ── */}
                  {active === 'standard' && (
                    <div style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderLeft: '3px solid var(--accent)',
                      borderRadius: '0 8px 8px 0',
                      padding: '10px 12px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ color: '#d29922', fontWeight: 700 }}>commit {c.hash}</span>
                        {c.tags.map((t) => (
                          <span key={t} style={{
                            background: 'rgba(56,139,253,0.15)', color: '#79c0ff',
                            padding: '1px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                          }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 11, display: 'flex', gap: 18, marginTop: 4 }}>
                        <span><User size={10} style={{ verticalAlign: 'middle', marginRight: 4 }} />Author: {c.author}</span>
                        <span><Calendar size={10} style={{ verticalAlign: 'middle', marginRight: 4 }} />Date: {c.date}</span>
                      </div>
                      <div style={{ color: 'var(--code-text)', marginTop: 6, paddingLeft: 4, fontWeight: 500 }}>
                        {c.message}
                      </div>
                    </div>
                  )}

                  {/* ── ONE LINE ── */}
                  {active === 'oneline' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ color: '#d29922', fontWeight: 700, flexShrink: 0 }}>{c.hash}</span>
                      {c.tags.map((t) => (
                        <span key={t} style={{
                          background: 'rgba(56,139,253,0.15)', color: '#79c0ff',
                          padding: '1px 6px', borderRadius: 4, fontSize: 10,
                        }}>({t})</span>
                      ))}
                      <span style={{ color: 'var(--code-text)' }}>{c.message}</span>
                    </div>
                  )}

                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom tip */}
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
        💡 <strong>Quick tips:</strong>{' '}
        <code style={{ color: 'var(--accent)' }}>git log -n 5</code> — show last 5 only &nbsp;·&nbsp;
        <code style={{ color: 'var(--accent)' }}>git log --author="Alex"</code> — filter by person &nbsp;·&nbsp;
        <code style={{ color: 'var(--accent)' }}>git log -p</code> — show what changed in each save
      </div>
    </SlideWrapper>
  );
}
