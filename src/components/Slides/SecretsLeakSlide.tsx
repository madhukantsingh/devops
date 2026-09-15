import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { AlertTriangle, Shield, RefreshCw, GitBranch, Server, CheckCircle } from 'lucide-react';

interface Props { slide: SlideData; }

const steps = [
  {
    id: 'what-happened',
    step: '0',
    icon: '🚨',
    label: 'What Happened?',
    color: '#f85149',
    summary: 'You committed .env and pushed to GitHub',
    detail: 'Even if you delete the file in a new commit, the secret still lives in Git history. Anyone can run `git show <commit>:.env` or browse to the old commit URL on GitHub and see your credentials.',
    commands: [
      '# See what commit introduced .env',
      'git log --all --full-history -- .env',
      '',
      '# Read the secret from old commit',
      'git show 4296efe:.env   ← still visible!',
    ],
    warning: 'Deleting the file in a new commit is NOT enough.',
  },
  {
    id: 'rotate',
    step: '1',
    icon: '🔄',
    label: 'Rotate Credentials',
    color: '#f85149',
    summary: 'Invalidate the leaked secret immediately — before anything else',
    detail: 'Assume the secret is already compromised. Someone may have scraped it the moment it was pushed. Rotating first ensures the leaked value is worthless even if someone already copied it.',
    commands: [
      '# Database password → change it in the DB',
      'ALTER USER demo WITH PASSWORD \'new-pass\';',
      '',
      '# AWS key → deactivate in IAM console',
      '# GitHub token → Settings → Revoke',
      '# Stripe key → Dashboard → Roll key',
    ],
    warning: 'Do this FIRST — before cleaning Git history.',
  },
  {
    id: 'filter',
    step: '2',
    icon: '🧹',
    label: 'Remove from History',
    color: '#ffa657',
    summary: 'Rewrite every commit to erase the secret file using git filter-repo',
    detail: '`git filter-repo` rewrites the entire Git history, removing the specified file from every single commit snapshot. All commit hashes change after this operation.',
    commands: [
      '# Install git-filter-repo',
      'pip install git-filter-repo',
      '',
      '# Rewrite history — removes .env from ALL commits',
      'git filter-repo --path .env --invert-paths',
      '',
      '# Verify it is truly gone',
      'git log --all -- .env  # should return nothing',
    ],
    warning: null,
  },
  {
    id: 'force-push',
    step: '3',
    icon: '☁️',
    label: 'Force Push to GitHub',
    color: '#d29922',
    summary: 'Replace GitHub\'s history with your cleaned local history',
    detail: 'filter-repo removes the remote for safety. Re-add it, then force push. This overwrites GitHub\'s copy of the history with your cleaned version. Notify teammates first — their local clones will be out of sync.',
    commands: [
      '# Re-add the remote (filter-repo removes it)',
      'git remote add origin git@github.com:org/repo.git',
      '',
      '# Force push cleaned history to all branches',
      'git push origin --force --all',
      'git push origin --force --tags',
    ],
    warning: 'Notify all teammates — they must re-clone after this.',
  },
  {
    id: 'github-cache',
    step: '4',
    icon: '🗑️',
    label: 'Purge GitHub Cache',
    color: '#bc8cff',
    summary: 'Request GitHub to clear server-side cached views of the old commits',
    detail: 'GitHub caches commit views. Even after force-pushing, the old commit URL may still show the file briefly. Request a cache purge via GitHub Support or the repo settings. GitHub also auto-scans public repos for known secret patterns.',
    commands: [
      '# Go to GitHub repo →',
      '# Settings → Danger Zone → Delete cached views',
      '',
      '# OR file a GitHub Support ticket:',
      '# support.github.com',
      '# → "Remove cached sensitive data"',
      '',
      '# Verify old commit URL returns 404:',
      '# github.com/org/repo/blob/<old-hash>/.env',
    ],
    warning: null,
  },
  {
    id: 'server',
    step: '5',
    icon: '🖥️',
    label: 'Fix the Server',
    color: '#3fb950',
    summary: 'Update .env on EC2 with new rotated credentials and restart Docker',
    detail: 'The EC2 server\'s .env file has the old credentials. Update it with the newly rotated values, then restart the Docker containers so the app connects with the new password.',
    commands: [
      '# SSH into EC2',
      'ssh -i your-key.pem ubuntu@<EC2-IP>',
      '',
      '# Update .env with new credentials',
      'nano demo-app/.env',
      '',
      '# Pull latest code (now without .env in history)',
      'git fetch origin && git reset --hard origin/main',
      '',
      '# Restart containers',
      'docker compose down && docker compose up -d',
    ],
    warning: null,
  },
  {
    id: 'prevent',
    step: '✓',
    icon: '🛡️',
    label: 'Prevent Recurrence',
    color: '#58a6ff',
    summary: 'Add a pre-commit hook so Git refuses to stage .env ever again',
    detail: 'A pre-commit hook runs before every `git commit`. If it detects a .env file is staged, it aborts the commit with an error message. Also ensure .gitignore is the very first file committed in any new project.',
    commands: [
      '# Create the hook file',
      'cat > .git/hooks/pre-commit << \'EOF\'',
      '#!/bin/bash',
      'if git diff --cached --name-only | grep -q "\\.env$"; then',
      '  echo "❌ You are staging a .env file! Aborting."',
      '  echo "   git restore --staged .env"',
      '  exit 1',
      'fi',
      'EOF',
      'chmod +x .git/hooks/pre-commit',
    ],
    warning: null,
  },
];

export default function SecretsLeakSlide({ slide }: Props) {
  const [active, setActive] = useState<string>('what-happened');
  const activeStep = steps.find((s) => s.id === active)!;

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(16px,2.8vw,30px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
        A developer accidentally commits <code style={{ background: 'var(--code-bg)', padding: '1px 6px', borderRadius: 4, color: '#f85149' }}>.env</code> and pushes to GitHub. Here's the full recovery playbook — in order.
      </p>

      <div style={{ display: 'flex', gap: 14 }}>
        {/* Step list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 170 }}>
          {steps.map((s, i) => {
            const isActive = active === s.id;
            return (
              <React.Fragment key={s.id}>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActive(s.id)}
                  style={{
                    background: isActive ? `${s.color}18` : 'var(--bg-card)',
                    border: `1px solid ${isActive ? s.color + '70' : 'var(--border)'}`,
                    borderRadius: 8,
                    padding: '8px 10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div style={{
                    width: 22, height: 22,
                    borderRadius: '50%',
                    background: isActive ? s.color : `${s.color}20`,
                    color: isActive ? '#fff' : s.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 800, flexShrink: 0,
                  }}>
                    {s.step}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? s.color : 'var(--text-primary)' }}>
                      {s.icon} {s.label}
                    </div>
                  </div>
                </motion.button>
                {i < steps.length - 1 && (
                  <div style={{ width: 2, height: 6, background: 'var(--border)', marginLeft: 20 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* Header */}
              <div style={{
                background: `${activeStep.color}10`,
                border: `1px solid ${activeStep.color}40`,
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 22 }}>{activeStep.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: activeStep.color }}>
                      {activeStep.step !== '✓' ? `Step ${activeStep.step}: ` : '✅ '}{activeStep.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>
                      {activeStep.summary}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {activeStep.detail}
                </div>
                {activeStep.warning && (
                  <div style={{
                    marginTop: 8,
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(248,81,73,0.1)',
                    border: '1px solid rgba(248,81,73,0.3)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    fontSize: 11,
                    color: '#f85149',
                    fontWeight: 600,
                  }}>
                    ⚠️ {activeStep.warning}
                  </div>
                )}
              </div>

              {/* Terminal */}
              <div style={{
                background: 'var(--code-bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '10px 12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                lineHeight: 1.8,
              }}>
                {activeStep.commands.map((line, i) => (
                  <div key={i}>
                    {line === '' ? (
                      <br />
                    ) : line.startsWith('#') ? (
                      <span style={{ color: '#6e7681' }}>{line}</span>
                    ) : (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <span style={{ color: 'var(--accent)', userSelect: 'none' }}>$</span>
                        <span style={{ color: activeStep.color === '#f85149' ? '#ffa657' : activeStep.color }}>{line}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom takeaway */}
      <div style={{
        marginTop: 12,
        background: 'rgba(248,81,73,0.06)',
        border: '1px solid rgba(248,81,73,0.25)',
        borderRadius: 8,
        padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12, color: 'var(--text-primary)',
      }}>
        <span style={{ fontSize: 16 }}>🔑</span>
        <span>
          <strong style={{ color: '#f85149' }}>Golden rule:</strong>{' '}
          <code style={{ background: 'var(--code-bg)', padding: '1px 5px', borderRadius: 3 }}>.gitignore</code> must be the very first file you commit in every project. <code style={{ background: 'var(--code-bg)', padding: '1px 5px', borderRadius: 3 }}>.env</code> stores secrets — <code style={{ background: 'var(--code-bg)', padding: '1px 5px', borderRadius: 3 }}>.env.example</code> is the safe template to commit.
        </span>
      </div>
    </SlideWrapper>
  );
}
