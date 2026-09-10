import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const workflowSteps = [
  {
    id: 'create',
    step: '1',
    label: 'Create Branch',
    command: 'git switch -c feature/login',
    color: '#58a6ff',
    icon: '🌿',
    explanation: 'Create a new branch off main. Your work is now isolated — changes here won\'t affect main until you choose to merge.',
    who: 'Developer',
  },
  {
    id: 'edit',
    step: '2',
    label: 'Edit & Commit',
    command: 'git add . && git commit -m "..."',
    color: '#bc8cff',
    icon: '✏️',
    explanation: 'Make changes, stage them, commit. Repeat as many times as needed. Each commit is a checkpoint you can return to.',
    who: 'Developer',
  },
  {
    id: 'push',
    step: '3',
    label: 'Push to GitHub',
    command: 'git push origin feature/login',
    color: '#ffa657',
    icon: '☁️',
    explanation: 'Send your local branch to GitHub. Now the team can see your branch. The CI/CD pipeline may start running checks.',
    who: 'Developer',
  },
  {
    id: 'pr',
    step: '4',
    label: 'Open Pull Request',
    command: 'GitHub UI → New Pull Request',
    color: '#d29922',
    icon: '📋',
    explanation: 'On GitHub, open a PR to propose merging your branch into main. Add a description of what changed and why.',
    who: 'Developer + GitHub',
  },
  {
    id: 'review',
    step: '5',
    label: 'Code Review',
    command: 'Review on GitHub',
    color: '#3fb950',
    icon: '👀',
    explanation: 'Teammates review the diff. They can leave comments, request changes, or approve. The developer may push additional commits to address feedback.',
    who: 'Reviewer',
  },
  {
    id: 'checks',
    step: '6',
    label: 'Automated Checks',
    command: 'CI/CD pipeline runs',
    color: '#56d364',
    icon: '✅',
    explanation: 'Tests, linting, security scans run automatically. All checks must pass before the PR can be merged.',
    who: 'CI/CD',
  },
  {
    id: 'merge',
    step: '7',
    label: 'Merge',
    command: 'Merge on GitHub',
    color: '#58a6ff',
    icon: '🔀',
    explanation: 'Once approved and all checks pass, the branch is merged into main. The feature is now part of the official codebase.',
    who: 'Maintainer',
  },
];

export default function GitBranchWorkflowSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeStep = workflowSteps.find((s) => s.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        Every feature follows this path. Click each step to understand what happens.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Steps list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 240 }}>
          {workflowSteps.map((s, i) => {
            const isActive = active === s.id;
            return (
              <React.Fragment key={s.id}>
                <motion.button
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setActive(isActive ? null : s.id)}
                  style={{
                    background: isActive ? `${s.color}18` : 'var(--bg-card)',
                    border: `1px solid ${isActive ? s.color + '60' : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: '9px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: isActive ? s.color : `${s.color}20`,
                    color: isActive ? '#fff' : s.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                    transition: 'all 0.18s',
                  }}>
                    {s.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14 }}>{s.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? s.color : 'var(--text-primary)' }}>
                        {s.label}
                      </span>
                    </div>
                    <code style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{s.command}</code>
                  </div>
                </motion.button>
                {i < workflowSteps.length - 1 && (
                  <div style={{ width: 2, height: 8, background: 'var(--border)', marginLeft: 24 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <AnimatePresence mode="wait">
            {activeStep ? (
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div style={{
                  background: `${activeStep.color}10`,
                  border: `1px solid ${activeStep.color}40`,
                  borderRadius: 14,
                  padding: '18px',
                  marginBottom: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 30 }}>{activeStep.icon}</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: activeStep.color }}>
                        Step {activeStep.step}: {activeStep.label}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        Done by: <strong style={{ color: 'var(--text-secondary)' }}>{activeStep.who}</strong>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {activeStep.explanation}
                  </div>
                  <div style={{
                    marginTop: 10,
                    background: 'var(--code-bg)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    color: activeStep.color,
                  }}>
                    $ {activeStep.command}
                  </div>
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
                  padding: '30px 20px',
                  textAlign: 'center',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                }}
              >
                ← Click any step to see what happens
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key insight */}
          <div style={{
            background: 'rgba(63,185,80,0.08)',
            border: '1px solid rgba(63,185,80,0.25)',
            borderRadius: 10,
            padding: '12px 14px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#3fb950', marginBottom: 4 }}>Key insight</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Code never goes directly to main without passing through review and automated checks. This protects the stability of the production codebase.
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
