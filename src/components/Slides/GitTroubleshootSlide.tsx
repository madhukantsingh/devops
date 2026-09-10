import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { ChevronDown } from 'lucide-react';

interface Props { slide: SlideData; }

const scenarios = [
  {
    id: 's1',
    icon: '🚫',
    title: '"My push was rejected"',
    color: '#f85149',
    checks: [
      'Run git status — are you on the right branch?',
      'Run git log --oneline — is your local history ahead or behind?',
      'The remote likely has commits you don\'t have locally',
      'Run git pull to download and merge those commits',
      'Resolve any conflicts that appear',
      'Try git push again',
      'Do NOT force-push unless you understand exactly what it does',
    ],
  },
  {
    id: 's2',
    icon: '👻',
    title: '"My changes disappeared"',
    color: '#ffa657',
    checks: [
      'Run git status — are you in the right repository folder?',
      'Are you on the branch you think you are? Run git branch',
      'Run git log --oneline — do your commits appear in history?',
      'Did you commit the changes at all, or just save the file?',
      'Check git stash list — changes might be stashed',
      'If changes were staged but not committed, check git diff --staged',
      'If changes were never committed, they may be gone — check backups',
    ],
  },
  {
    id: 's3',
    icon: '⚔️',
    title: '"My PR has conflicts"',
    color: '#d29922',
    checks: [
      'On GitHub: the PR shows which files conflict',
      'Locally: git fetch origin, then git merge origin/main',
      'Git will mark conflicted files with <<<, ===, >>> markers',
      'Open each conflicted file and understand both changes',
      'Edit the file to the correct final state',
      'Remove all conflict markers',
      'Run git add <file> for each resolved file',
      'Run git commit to complete the merge',
      'Run tests before pushing the resolution',
    ],
  },
  {
    id: 's4',
    icon: '🤔',
    title: '"Git says nothing changed"',
    color: '#58a6ff',
    checks: [
      'Are you in the correct repository folder? Run pwd',
      'Did you actually save the file? Check your editor',
      'Is the file listed in .gitignore?',
      'Run git status — what does it show?',
      'Are you on the branch you expect?',
      'Did you accidentally stage and commit the file already?',
      'Try git diff to see working directory changes',
      'Try git diff --staged to see staged changes',
    ],
  },
];

export default function GitTroubleshootSlide({ slide }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        When something goes wrong, investigate before running commands. Click a scenario to see the investigation checklist.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {scenarios.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: isOpen ? `${s.color}10` : 'var(--bg-card)',
                border: `1px solid ${isOpen ? s.color + '50' : 'var(--border)'}`,
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'border-color 0.18s',
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : s.id)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: isOpen ? s.color : 'var(--text-primary)', flex: 1 }}>
                  {s.title}
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    color: 'var(--text-muted)',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 16px 14px 16px' }}>
                      <div style={{ height: 1, background: `${s.color}25`, marginBottom: 12 }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {s.checks.map((check, ci) => (
                          <div key={ci} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12 }}>
                            <span style={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              background: `${s.color}20`,
                              color: s.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 9,
                              fontWeight: 800,
                              flexShrink: 0,
                              marginTop: 1,
                            }}>
                              {ci + 1}
                            </span>
                            <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5, paddingTop: 2 }}>{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}
