import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const terms = [
  { term: 'Repository', icon: '📁', color: '#58a6ff', def: 'A project folder tracked by Git. Contains the code, configuration, and the entire history of all changes.', advanced: false },
  { term: 'Commit', icon: '💾', color: '#bc8cff', def: 'A permanent snapshot of staged changes, saved to the project history with a unique ID, author, timestamp, and message.', advanced: false },
  { term: 'Branch', icon: '🌿', color: '#3fb950', def: 'An independent line of development. Allows work to happen in parallel without affecting the main codebase.', advanced: false },
  { term: 'Remote', icon: '🌐', color: '#58a6ff', def: 'A version of the repository hosted on a server (like GitHub). Developers push and pull to keep local and remote in sync.', advanced: false },
  { term: 'Working Directory', icon: '✏️', color: '#ffa657', def: 'The files on your disk as you are currently editing them. Changes here are not tracked by Git until you stage them.', advanced: false },
  { term: 'Staging Area', icon: '📋', color: '#d29922', def: 'A holding area (also called the "index") where you choose which changes will be included in the next commit.', advanced: false },
  { term: 'Push', icon: '⬆️', color: '#3fb950', def: 'Send local commits to the remote repository. Makes your work visible to the team and can trigger CI/CD.', advanced: false },
  { term: 'Pull', icon: '⬇️', color: '#56d364', def: 'Download remote commits and merge them into your local branch. Equivalent to git fetch + git merge.', advanced: false },
  { term: 'Fetch', icon: '📡', color: '#bc8cff', def: 'Download information about remote changes without automatically merging them into your current branch.', advanced: false },
  { term: 'Merge', icon: '🔀', color: '#3fb950', def: 'Combine the histories of two branches. May create a "merge commit" or fast-forward if no conflicts exist.', advanced: false },
  { term: 'Conflict', icon: '⚔️', color: '#f85149', def: 'Occurs when two branches modify the same part of the same file differently. Git cannot auto-resolve — a human must decide.', advanced: false },
  { term: 'Pull Request', icon: '📋', color: '#ffa657', def: 'A proposal on GitHub to merge one branch into another. Enables code review, discussion, and automated checks before merging.', advanced: false },
  { term: 'Clone', icon: '📋', color: '#8b949e', def: 'Download a complete copy of a remote repository (including all history) to your local machine.', advanced: false },
  { term: 'Fork', icon: '🍴', color: '#8b949e', def: 'Create your own copy of someone else\'s GitHub repository under your account. Common in open-source workflows.', advanced: false },
  { term: 'Tag', icon: '🏷️', color: '#d29922', def: 'A permanent label on a specific commit. Used to mark releases: v1.0, v2.3.1. Unlike branches, tags don\'t move.', advanced: false },
  { term: 'HEAD', icon: '🎯', color: '#f85149', def: 'A special pointer that indicates the current position in Git history — usually pointing to the latest commit on the current branch.', advanced: true },
];

export default function GitVocabularySlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const activeTerm = terms.find((t) => t.term === active);

  const visibleTerms = showAdvanced ? terms : terms.filter((t) => !t.advanced);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
        A shared vocabulary helps teams communicate clearly about code changes. Click any term for a definition.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Terms grid */}
        <div style={{ flex: 2, minWidth: 280 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 7 }}>
            {visibleTerms.map((t, i) => {
              const isActive = active === t.term;
              return (
                <motion.button
                  key={t.term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setActive(isActive ? null : t.term)}
                  style={{
                    background: isActive ? `${t.color}18` : 'var(--bg-card)',
                    border: `1px solid ${isActive ? t.color + '60' : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: '8px 10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.18s',
                  }}
                >
                  <span style={{ fontSize: 18, display: 'block', marginBottom: 3 }}>{t.icon}</span>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? t.color : 'var(--text-primary)', lineHeight: 1.3 }}>
                    {t.term}
                  </div>
                  {t.advanced && (
                    <div style={{ fontSize: 8, color: '#f85149', fontWeight: 700, marginTop: 2 }}>ADVANCED</div>
                  )}
                </motion.button>
              );
            })}
          </div>
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 11,
              color: 'var(--text-muted)',
            }}
          >
            {showAdvanced ? '− Hide advanced terms' : '+ Show advanced terms (HEAD)'}
          </button>
        </div>

        {/* Definition panel */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <AnimatePresence mode="wait">
            {activeTerm ? (
              <motion.div
                key={activeTerm.term}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: `${activeTerm.color}10`,
                  border: `1px solid ${activeTerm.color}40`,
                  borderRadius: 14,
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{activeTerm.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: activeTerm.color }}>{activeTerm.term}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {activeTerm.def}
                </div>
                {activeTerm.advanced && (
                  <div style={{ marginTop: 10, fontSize: 11, color: '#f85149', fontWeight: 700 }}>
                    ⚠️ Advanced concept — skip if short on time
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
                  padding: '30px 20px',
                  textAlign: 'center',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                }}
              >
                ← Click any term to see its definition
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
