import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const mistakes = [
  {
    id: 'm1',
    icon: '🎯',
    title: 'Working directly on main',
    color: '#f85149',
    problem: 'Committing unfinished features, breaking changes, or experimental code directly to main.',
    why: 'Main is usually the source of production deployments. A bad commit can break the live application for all users.',
    better: 'Always create a feature branch. main should only receive changes through a reviewed Pull Request.',
  },
  {
    id: 'm2',
    icon: '🔑',
    title: 'Committing secrets',
    color: '#f85149',
    problem: 'Adding API keys, passwords, database credentials, or .env files to a commit.',
    why: 'Git history is permanent. Even if deleted later, secrets can be recovered from history. A leaked API key can compromise your entire system.',
    better: 'Use .gitignore. Store secrets in environment variables. Use a secrets manager. Audit your commits before pushing.',
  },
  {
    id: 'm3',
    icon: '🧱',
    title: 'Huge unrelated commits',
    color: '#ffa657',
    problem: 'One commit that fixes a bug, adds a feature, refactors a module, AND updates documentation.',
    why: 'Makes code review impossible. Makes reverting a single change impossible. Makes git log useless.',
    better: 'One commit per logical change. Use staging area to compose focused commits.',
  },
  {
    id: 'm4',
    icon: '📝',
    title: 'Poor commit messages',
    color: '#d29922',
    problem: '"update", "fix", "changes", "final", "wip" as commit messages.',
    why: 'Six months later, nobody (including you) knows what changed or why. Git log becomes useless archaeology.',
    better: 'Write messages like: "Fix payment timeout on slow connections" or "Add two-factor authentication to login". Explain WHY.',
  },
  {
    id: 'm5',
    icon: '🔄',
    title: 'Not pulling before pushing',
    color: '#ffa657',
    problem: 'Pushing without first pulling remote changes. Push gets rejected.',
    why: 'If the remote has commits you don\'t have, Git will refuse the push to prevent overwriting history.',
    better: 'Run git pull (or git fetch + merge) before pushing. Make it a habit.',
  },
  {
    id: 'm6',
    icon: '⚔️',
    title: 'Ignoring merge conflicts',
    color: '#ffa657',
    problem: 'Randomly accepting one version of a conflict without understanding both changes.',
    why: 'Resolving incorrectly can silently remove someone else\'s work or introduce bugs.',
    better: 'Read both conflicting versions. Understand the intent. Combine or choose deliberately. Run tests after resolving.',
  },
];

export default function GitMistakesSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeMistake = mistakes.find((m) => m.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Most Git problems come from predictable habits. Click each mistake to understand why it matters.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Mistake grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 7, flex: 2, minWidth: 280, alignContent: 'start' }}>
          {mistakes.map((m, i) => {
            const isActive = active === m.id;
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActive(isActive ? null : m.id)}
                style={{
                  background: isActive ? `${m.color}15` : 'var(--bg-card)',
                  border: `1px solid ${isActive ? m.color + '60' : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: '10px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s',
                }}
              >
                <span style={{ fontSize: 20, display: 'block', marginBottom: 5 }}>{m.icon}</span>
                <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? m.color : 'var(--text-primary)', lineHeight: 1.4 }}>
                  {m.title}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <AnimatePresence mode="wait">
            {activeMistake ? (
              <motion.div
                key={activeMistake.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div style={{
                  background: `${activeMistake.color}10`,
                  border: `1px solid ${activeMistake.color}40`,
                  borderRadius: 12,
                  padding: '14px',
                  marginBottom: 10,
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{activeMistake.icon}</span>
                    <div style={{ fontSize: 14, fontWeight: 800, color: activeMistake.color }}>{activeMistake.title}</div>
                  </div>
                  {[
                    { label: 'Problem', value: activeMistake.problem },
                    { label: 'Why it matters', value: activeMistake.why },
                    { label: 'Better practice', value: activeMistake.better },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: activeMistake.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '30px',
                  textAlign: 'center',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                }}
              >
                ← Click a mistake to understand it
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
