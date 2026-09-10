import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Play, RotateCcw } from 'lucide-react';

interface Props { slide: SlideData; }

const journeySteps = [
  { id: 'edit', label: 'Developer edits file', icon: '✏️', color: '#ffa657', desc: 'app.js is modified on the developer\'s laptop' },
  { id: 'wd', label: 'Working Directory', icon: '📁', color: '#ffa657', desc: 'File is changed but not yet tracked by Git' },
  { id: 'status', label: 'git status', icon: '🔍', color: '#d29922', desc: 'Developer sees "modified: app.js"' },
  { id: 'add', label: 'git add', icon: '➕', color: '#d29922', desc: 'File moves to Staging Area' },
  { id: 'staging', label: 'Staging Area', icon: '📋', color: '#d29922', desc: 'Change is selected for the next commit' },
  { id: 'commit', label: 'git commit', icon: '💾', color: '#58a6ff', desc: 'Permanent checkpoint created in local history' },
  { id: 'localrepo', label: 'Local Repository', icon: '🗄️', color: '#58a6ff', desc: 'Commit stored in .git/ folder with hash, author, message' },
  { id: 'push', label: 'git push', icon: '⬆️', color: '#bc8cff', desc: 'Commit travels from laptop to GitHub' },
  { id: 'github', label: 'GitHub Repository', icon: '🌐', color: '#bc8cff', desc: 'Team can see the commit. CI/CD may trigger.' },
  { id: 'pr', label: 'Pull Request', icon: '📋', color: '#3fb950', desc: 'Developer proposes to merge into main' },
  { id: 'review', label: 'Code Review', icon: '👀', color: '#3fb950', desc: 'Teammates review, comment, approve' },
  { id: 'merge', label: 'Merge', icon: '🔀', color: '#56d364', desc: 'Feature is combined into main branch' },
  { id: 'cicd', label: 'CI/CD Triggers', icon: '🚀', color: '#f85149', desc: 'Automated pipeline: build → test → deploy' },
];

export default function GitJourneySlide({ slide }: Props) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    if (!playing) return;
    if (current >= journeySteps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setCurrent((c) => c + 1), 900);
    return () => clearTimeout(timer);
  }, [playing, current]);

  const start = () => {
    setCurrent(-1);
    setPlaying(true);
    setTimeout(() => setCurrent(0), 100);
  };
  const reset = () => { setPlaying(false); setCurrent(-1); };

  const isDone = current === journeySteps.length - 1;

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
        Press Play to watch code travel from a developer's editor to CI/CD.
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <button
          onClick={playing ? undefined : start}
          disabled={playing}
          style={{
            background: playing ? 'var(--border)' : 'var(--accent)',
            border: 'none',
            borderRadius: 10,
            padding: '9px 20px',
            cursor: playing ? 'wait' : 'pointer',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Play size={14} />
          {playing ? 'Playing…' : isDone ? 'Replay Journey' : 'Play Journey'}
        </button>
        <button
          onClick={reset}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '9px 14px',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <RotateCcw size={13} />
          Reset
        </button>
        {current >= 0 && (
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 4 }}>
            Step {current + 1} of {journeySteps.length}
          </span>
        )}
      </div>

      {/* Journey steps */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {journeySteps.map((step, i) => {
          const isActive = i === current;
          const isPast = i < current;
          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <motion.div
                animate={{
                  background: isActive ? `${step.color}25` : isPast ? `${step.color}10` : 'var(--bg-card)',
                  borderColor: isActive ? step.color : isPast ? `${step.color}50` : 'var(--border)',
                  scale: isActive ? 1.06 : 1,
                }}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '8px 10px',
                  textAlign: 'center',
                  minWidth: 76,
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 3 }}>{step.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: isActive ? step.color : isPast ? step.color + 'aa' : 'var(--text-muted)', lineHeight: 1.3 }}>
                  {step.label}
                </div>
              </motion.div>
              {i < journeySteps.length - 1 && (
                <motion.div
                  animate={{ color: isPast ? step.color : 'var(--text-muted)', opacity: isPast ? 1 : 0.3 }}
                  style={{ fontSize: 14, fontWeight: 700 }}
                >
                  ↓
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active step detail */}
      <AnimatePresence mode="wait">
        {current >= 0 && (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${journeySteps[current]?.color}10`,
              border: `1px solid ${journeySteps[current]?.color}40`,
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28 }}>{journeySteps[current]?.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: journeySteps[current]?.color }}>
                {journeySteps[current]?.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {journeySteps[current]?.desc}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDone && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 10,
            background: 'rgba(63,185,80,0.1)',
            border: '1px solid rgba(63,185,80,0.3)',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: 13,
            color: '#3fb950',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          🎉 Code has made the full journey from editor → CI/CD pipeline
        </motion.div>
      )}
    </SlideWrapper>
  );
}
