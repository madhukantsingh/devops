import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Folder, GitBranch, Clock, FileText, BookOpen } from 'lucide-react';

interface Props { slide: SlideData; }

type View = 'local' | 'remote';

const repoTree = [
  { name: 'Application Code', icon: '⚙️', desc: 'The actual source files: TypeScript, Python, HTML, CSS' },
  { name: 'Configuration', icon: '⚙️', desc: 'Environment config, build settings, deployment rules' },
  { name: 'Documentation', icon: '📄', desc: 'README, guides, API docs' },
  { name: '.git/ (Git History)', icon: '📚', desc: 'Git\'s internal database — every commit, branch, and tag ever created' },
  { name: 'Branches', icon: '🌿', desc: 'Parallel lines of development: main, feature/login, bugfix/header' },
];

export default function GitRepositorySlide({ slide }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [view, setView] = useState<View>('local');
  const activeRepo = repoTree.find((r) => r.name === activeItem);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        A repository is more than just a folder — it contains your project AND its entire history.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Repo contents */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            📁 What's inside a repository
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Folder size={14} style={{ color: 'var(--accent)' }} />
              <code style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'monospace' }}>company-project/</code>
            </div>
            <div style={{ padding: '4px 0' }}>
              {repoTree.map((item, i) => {
                const isActive = activeItem === item.name;
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setActiveItem(isActive ? null : item.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '9px 14px 9px 24px',
                      background: isActive ? 'var(--accent-dim)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                      borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span style={{ fontSize: 12, fontFamily: 'monospace', color: isActive ? 'var(--accent)' : 'var(--text-primary)', fontWeight: isActive ? 700 : 400 }}>
                      {item.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeRepo && (
              <motion.div
                key={activeRepo.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 10,
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-glow)',
                  borderRadius: 9,
                  padding: '10px 14px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: 'var(--accent)' }}>{activeRepo.name}:</strong> {activeRepo.desc}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Local vs Remote */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            Local vs Remote repository
          </div>

          {/* Toggle */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {(['local', 'remote'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  flex: 1,
                  background: view === v ? 'var(--accent)' : 'var(--bg-card)',
                  color: view === v ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${view === v ? 'transparent' : 'var(--border)'}`,
                  borderRadius: 8,
                  padding: '7px',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.15s',
                }}
              >
                {v === 'local' ? '💻 Local' : '🌐 Remote'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {view === 'local' ? (
              <motion.div key="local" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.25)', borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>💻</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f85149', textAlign: 'center', marginBottom: 10 }}>Local Repository</div>
                  <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 2, listStyleType: 'none' }}>
                    <li>📌 Lives on the developer's machine</li>
                    <li>📌 Full history stored in <code style={{ fontFamily: 'monospace', color: '#f85149' }}>.git/</code> folder</li>
                    <li>📌 Works without internet access</li>
                    <li>📌 Private until pushed to remote</li>
                    <li>📌 Commits are saved here first</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div key="remote" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div style={{ background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.25)', borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>🌐</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#58a6ff', textAlign: 'center', marginBottom: 10 }}>Remote Repository (GitHub)</div>
                  <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 2, listStyleType: 'none' }}>
                    <li>📌 Lives on GitHub's servers</li>
                    <li>📌 Shared by the entire team</li>
                    <li>📌 The "source of truth" for the project</li>
                    <li>📌 Accessible via git push / git pull</li>
                    <li>📌 Hosts Pull Requests and CI/CD triggers</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{
            marginTop: 12,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: 12,
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>💡</span>
            Every developer has a <strong style={{ color: 'var(--text-primary)' }}>complete</strong> copy of the repository — Git is a distributed system, not centralized.
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
