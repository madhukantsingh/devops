import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { User, Clock, FileText, GitCommit } from 'lucide-react';

interface Props { slide: SlideData; }

const commits = [
  {
    id: 'c1',
    hash: 'a1b2c3d',
    message: 'Initial project setup',
    author: 'Alice',
    avatar: '👩‍💻',
    date: '5 days ago',
    files: 4,
    quality: 'ok',
    qualityNote: 'Acceptable for an initial commit.',
  },
  {
    id: 'c2',
    hash: 'e4f5g6h',
    message: 'changes',
    author: 'Bob',
    avatar: '👨‍💻',
    date: '4 days ago',
    files: 3,
    quality: 'bad',
    qualityNote: '"changes" tells us nothing. What changed? Why?',
  },
  {
    id: 'c3',
    hash: 'i7j8k9l',
    message: 'Fix payment timeout on slow mobile connections',
    author: 'Alice',
    avatar: '👩‍💻',
    date: '2 days ago',
    files: 2,
    quality: 'good',
    qualityNote: 'Excellent — explains what was fixed and the context (slow mobile).',
  },
  {
    id: 'c4',
    hash: 'm1n2o3p',
    message: 'final fix',
    author: 'Charlie',
    avatar: '🧑‍💻',
    date: '1 day ago',
    files: 1,
    quality: 'bad',
    qualityNote: '"final fix" — final what? In 6 months, nobody will know.',
  },
  {
    id: 'c5',
    hash: 'q4r5s6t',
    message: 'Add two-factor authentication to login flow',
    author: 'Bob',
    avatar: '👨‍💻',
    date: '3 hours ago',
    files: 5,
    quality: 'good',
    qualityNote: 'Great — describes the feature clearly. Anyone reading history understands.',
  },
];

const qualityColor = { good: '#3fb950', bad: '#f85149', ok: '#d29922' };
const qualityLabel = { good: 'GOOD', bad: 'BAD', ok: 'ACCEPTABLE' };

export default function GitCommitSlide({ slide }: Props) {
  const [selected, setSelected] = useState<string | null>('c3');
  const active = commits.find((c) => c.id === selected);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        A commit is a permanent checkpoint. Click each to evaluate the commit message quality.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flexShrink: 0, minWidth: 220 }}>
          {commits.map((c, i) => {
            const isActive = selected === c.id;
            const color = qualityColor[c.quality as keyof typeof qualityColor];
            return (
              <React.Fragment key={c.id}>
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelected(isActive ? null : c.id)}
                  style={{
                    background: isActive ? 'var(--accent-dim)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <GitCommit size={11} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }} />
                    <code style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{c.hash}</code>
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: 8,
                      fontWeight: 800,
                      background: `${color}20`,
                      color,
                      borderRadius: 4,
                      padding: '1px 5px',
                      letterSpacing: 0.5,
                    }}>
                      {qualityLabel[c.quality as keyof typeof qualityLabel]}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: 4, fontFamily: 'monospace' }}>
                    "{c.message}"
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.avatar} {c.author}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· {c.date}</span>
                  </div>
                </motion.button>
                {i < commits.length - 1 && (
                  <div style={{ width: 2, height: 8, background: 'var(--border)', marginLeft: 18 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* Commit info card */}
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 12,
                }}>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <GitCommit size={13} style={{ color: 'var(--accent)' }} />
                    <code style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'monospace' }}>commit {active.hash}</code>
                  </div>
                  <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 }}>Message</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>"{active.message}"</div>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 }}>Author</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{active.avatar} {active.author}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 }}>When</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{active.date}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 }}>Files</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{active.files} changed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message quality assessment */}
                <div style={{
                  background: `${qualityColor[active.quality as keyof typeof qualityColor]}10`,
                  border: `1px solid ${qualityColor[active.quality as keyof typeof qualityColor]}40`,
                  borderRadius: 10,
                  padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: qualityColor[active.quality as keyof typeof qualityColor], marginBottom: 4 }}>
                    Message Quality: {qualityLabel[active.quality as keyof typeof qualityLabel]}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{active.qualityNote}</div>
                </div>

                {/* Good vs bad guide */}
                {active.quality === 'bad' && (
                  <div style={{ marginTop: 10, background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.25)', borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#3fb950', marginBottom: 4 }}>Better alternatives:</div>
                    <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#3fb950', lineHeight: 1.8 }}>
                      "Fix dashboard loading on first login"<br />
                      "Resolve undefined variable in payment module"
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '20px',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                }}
              >
                ← Click a commit to inspect it
              </motion.div>
            )}
          </AnimatePresence>

          {/* Good commit rules */}
          <div style={{
            marginTop: 12,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 14px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>A good commit message…</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                ['✓', 'Describes a single, meaningful change', '#3fb950'],
                ['✓', 'Explains WHY, not just what', '#3fb950'],
                ['✓', 'Uses present tense: "Fix bug" not "Fixed bug"', '#3fb950'],
                ['✗', 'Is not vague: "fix", "update", "changes"', '#f85149'],
                ['✗', 'Is not a novel — keep it under 72 chars', '#f85149'],
              ].map(([mark, text, color]) => (
                <div key={text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: 'var(--text-secondary)' }}>
                  <span style={{ color: color as string, fontWeight: 800, flexShrink: 0 }}>{mark}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
