import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const commands = [
  {
    id: 'status',
    cmd: 'git status',
    color: '#58a6ff',
    icon: '🔍',
    what: 'Show what has changed in the working directory and staging area.',
    why: 'Run this before every other command. It tells you exactly where you are.',
    where: 'Reads working directory & staging area — changes nothing.',
    expect: 'List of modified, untracked, and staged files.',
    ifFails: 'Check you are inside a Git repository folder.',
  },
  {
    id: 'add',
    cmd: 'git add <file>',
    color: '#d29922',
    icon: '➕',
    what: 'Move changes from the working directory to the staging area.',
    why: 'You choose exactly which changes are included in the next commit.',
    where: 'Working Directory → Staging Area.',
    expect: 'No output — run git status to confirm files are now staged.',
    ifFails: 'Check file path. Make sure you are in the right directory.',
  },
  {
    id: 'commit',
    cmd: 'git commit -m "message"',
    color: '#bc8cff',
    icon: '💾',
    what: 'Save staged changes as a permanent snapshot in local history.',
    why: 'Creates an auditable record: who, when, what, why.',
    where: 'Staging Area → Local Repository. Remote is unchanged.',
    expect: 'Output shows commit hash and summary of files changed.',
    ifFails: 'If nothing is staged, git status will show "nothing to commit".',
  },
  {
    id: 'push',
    cmd: 'git push',
    color: '#3fb950',
    icon: '⬆️',
    what: 'Send local commits to the remote repository on GitHub.',
    why: 'Share your work, trigger CI/CD, and allow code review.',
    where: 'Local Repository → Remote Repository (GitHub).',
    expect: 'Output shows which branch was updated and the commit range.',
    ifFails: 'If rejected: pull first (remote has new commits). Check branch permissions.',
  },
  {
    id: 'pull',
    cmd: 'git pull',
    color: '#ffa657',
    icon: '⬇️',
    what: 'Download remote commits and merge them into your current branch.',
    why: 'Stay up to date with your teammates\' latest work.',
    where: 'Remote → Local (may trigger a merge).',
    expect: 'Shows files that were updated. May show merge conflicts.',
    ifFails: 'If conflicts: resolve each conflicted file, then git add + git commit.',
  },
  {
    id: 'log',
    cmd: 'git log',
    color: '#56d364',
    icon: '📜',
    what: 'Show the commit history of the current branch.',
    why: 'Understand what changed, when, and who made each change.',
    where: 'Read-only — shows history, changes nothing.',
    expect: 'List of commits with hash, author, date, message.',
    ifFails: 'Press Q to exit if output is long. Use --oneline for compact view.',
  },
  {
    id: 'branch',
    cmd: 'git branch',
    color: '#58a6ff',
    icon: '🌿',
    what: 'List, create, or inspect branches.',
    why: 'See what branches exist and which one you are currently on.',
    where: 'Read-only (list mode). Creates a branch when given a name.',
    expect: 'List of branches with * marking the current branch.',
    ifFails: 'If branch already exists, use a different name.',
  },
  {
    id: 'switch',
    cmd: 'git switch <branch>',
    color: '#bc8cff',
    icon: '🔀',
    what: 'Move to a different branch.',
    why: 'Work on a different feature or review another branch.',
    where: 'Changes HEAD pointer. Working directory updates to match the branch.',
    expect: 'Confirmation: "Switched to branch \'name\'".',
    ifFails: 'Make sure you have committed or stashed local changes first.',
  },
  {
    id: 'merge',
    cmd: 'git merge <branch>',
    color: '#3fb950',
    icon: '🔀',
    what: 'Combine another branch\'s history into the current branch.',
    why: 'Bring a feature branch into main after review.',
    where: 'Combines commit histories. May create a merge commit.',
    expect: 'Success or conflict markers in files if two versions conflict.',
    ifFails: 'Resolve conflicts, then git add + git commit to complete the merge.',
  },
  {
    id: 'diff',
    cmd: 'git diff',
    color: '#d29922',
    icon: '🔎',
    what: 'Show line-by-line differences in changed files.',
    why: 'Inspect exactly what you are about to commit.',
    where: 'Read-only — compares working directory to last commit.',
    expect: 'Lines prefixed with + (added) and - (removed).',
    ifFails: 'If no output, no changes detected. Check if changes are already staged.',
  },
];

export default function GitActionsSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>('status');
  const activeCmd = commands.find((c) => c.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
        Click any command to see WHAT it does, WHY, WHERE the change goes, WHAT to expect, and WHAT IF it fails.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Command grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 6, flex: 1, minWidth: 280, alignContent: 'start' }}>
          {commands.map((cmd) => {
            const isActive = active === cmd.id;
            return (
              <button
                key={cmd.id}
                onClick={() => setActive(isActive ? null : cmd.id)}
                style={{
                  background: isActive ? `${cmd.color}18` : 'var(--bg-card)',
                  border: `1px solid ${isActive ? cmd.color + '60' : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: '8px 10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.18s',
                }}
              >
                <span style={{ fontSize: 16, display: 'block', marginBottom: 4 }}>{cmd.icon}</span>
                <code style={{ fontSize: 11, color: isActive ? cmd.color : 'var(--text-secondary)', fontFamily: 'monospace', fontWeight: 700 }}>
                  {cmd.cmd.split(' ')[0]} {cmd.cmd.split(' ')[1]}
                </code>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <AnimatePresence mode="wait">
            {activeCmd ? (
              <motion.div
                key={activeCmd.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: `${activeCmd.color}10`,
                  border: `1px solid ${activeCmd.color}35`,
                  borderRadius: 14,
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 26 }}>{activeCmd.icon}</span>
                  <code style={{ fontSize: 14, color: activeCmd.color, fontFamily: 'monospace', fontWeight: 800 }}>{activeCmd.cmd}</code>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'WHAT?', value: activeCmd.what },
                    { label: 'WHY?', value: activeCmd.why },
                    { label: 'WHERE?', value: activeCmd.where },
                    { label: 'EXPECT?', value: activeCmd.expect },
                    { label: 'IF FAILS?', value: activeCmd.ifFails },
                  ].map((item) => (
                    <div key={item.label}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: activeCmd.color, letterSpacing: 1.5, textTransform: 'uppercase', marginRight: 6 }}>{item.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.value}</span>
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
                ← Click a command to learn it
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
