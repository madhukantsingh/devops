import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

type Area = 'working' | 'staging' | 'local' | 'remote';

const areas: {
  id: Area;
  label: string;
  icon: string;
  color: string;
  command: string;
  description: string;
  whatHappens: string;
  example: string;
}[] = [
  {
    id: 'working',
    label: 'Working Directory',
    icon: '✏️',
    color: '#ffa657',
    command: '(editing files)',
    description: 'Files on disk that the developer is currently editing.',
    whatHappens: 'You open a file, make changes, save it. Git sees the file as "modified" but has not recorded anything yet.',
    example: 'You edit app.js to add a new login feature. The file is saved on your computer but Git has not done anything yet.',
  },
  {
    id: 'staging',
    label: 'Staging Area',
    icon: '📋',
    color: '#d29922',
    command: 'git add <file>',
    description: 'A holding area where you choose which changes will go into the next commit.',
    whatHappens: 'You run "git add app.js" and Git copies the current state of that file into the staging area. Only staged files are included in the next commit.',
    example: 'You edited 3 files but only want to commit 2 of them. You "git add" only those 2 files — the third stays unstaged.',
  },
  {
    id: 'local',
    label: 'Local Repository',
    icon: '💾',
    color: '#58a6ff',
    command: 'git commit -m "message"',
    description: 'The permanent record of commits stored in the hidden .git/ folder on your machine.',
    whatHappens: 'You run "git commit" and Git permanently saves a snapshot of all staged files. This creates a new entry in the project history with a unique ID, your name, and the timestamp.',
    example: 'After committing, git log shows a new entry: "Add login feature — abc1234 — Alice — today at 14:32"',
  },
  {
    id: 'remote',
    label: 'Remote Repository',
    icon: '☁️',
    color: '#3fb950',
    command: 'git push',
    description: 'The shared copy of the repository hosted on GitHub, accessible by the whole team.',
    whatHappens: 'You run "git push" and your local commits travel to GitHub. Now your teammates can see them, and CI/CD can trigger.',
    example: 'After pushing, the commit appears in the GitHub repository. Your teammates can see it and begin a code review.',
  },
];

export default function GitAreasSlide({ slide }: Props) {
  const [active, setActive] = useState<Area | null>(null);
  const activeArea = areas.find((a) => a.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
        Code moves through four distinct states before reaching GitHub. Click each area to understand it.
      </p>

      {/* Flow diagram */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'center',
      }}>
        {areas.map((area, i) => {
          const isActive = active === area.id;
          return (
            <React.Fragment key={area.id}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(isActive ? null : area.id)}
                style={{
                  background: isActive ? `${area.color}20` : 'var(--bg-card)',
                  border: `2px solid ${isActive ? area.color : 'var(--border)'}`,
                  borderRadius: 14,
                  padding: '14px 18px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  minWidth: 110,
                  boxShadow: isActive ? `0 0 20px ${area.color}30` : 'none',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 6 }}>{area.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? area.color : 'var(--text-primary)', lineHeight: 1.3 }}>
                  {area.label}
                </div>
                <div style={{
                  marginTop: 6,
                  fontFamily: 'monospace',
                  fontSize: 10,
                  color: isActive ? area.color : 'var(--text-muted)',
                  background: isActive ? `${area.color}15` : 'transparent',
                  borderRadius: 4,
                  padding: '2px 4px',
                }}>
                  {area.command}
                </div>
              </motion.button>

              {i < areas.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
                >
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                  <div style={{ fontSize: 16, color: 'var(--text-muted)' }}>↓</div>
                  <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeArea ? (
          <motion.div
            key={activeArea.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${activeArea.color}10`,
              border: `1px solid ${activeArea.color}40`,
              borderRadius: 14,
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{activeArea.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: activeArea.color }}>{activeArea.label}</div>
                <code style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{activeArea.command}</code>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: activeArea.color, marginBottom: 4, textTransform: 'uppercase' }}>What it is</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{activeArea.description}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: activeArea.color, marginBottom: 4, textTransform: 'uppercase' }}>Real example</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{activeArea.example}</div>
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
              padding: '14px 18px',
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--text-muted)',
            }}
          >
            ↑ Click any area above to understand what happens at that stage
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
