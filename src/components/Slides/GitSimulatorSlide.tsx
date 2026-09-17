import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { ChevronRight } from 'lucide-react';

interface Props { slide: SlideData; }

type Step = 'idle' | 'edit' | 'status' | 'add' | 'commit' | 'pull' | 'push';

const steps: { id: Step; label: string; command?: string; color: string }[] = [
  { id: 'idle', label: 'Start', color: '#8b949e' },
  { id: 'edit', label: 'Edit File', color: '#ffa657' },
  { id: 'status', label: 'git status', command: 'git status', color: '#d29922' },
  { id: 'add', label: 'git add', command: 'git add app.js', color: '#bc8cff' },
  { id: 'commit', label: 'git commit', command: 'git commit -m "Add login validation"', color: '#58a6ff' },
  { id: 'pull', label: 'git pull', command: 'git pull origin main', color: '#e3b341' },
  { id: 'push', label: 'git push', command: 'git push', color: '#3fb950' },
];

const stepOrder: Step[] = ['idle', 'edit', 'status', 'add', 'commit', 'pull', 'push'];

const outputs: Record<Step, { title: string; content: string[]; area: string; areaColor: string }> = {
  idle: {
    title: 'Project files (unchanged)',
    content: [
      'project/',
      '├── app.js         (unchanged)',
      '├── index.html     (unchanged)',
      '└── style.css      (unchanged)',
    ],
    area: 'Working Directory',
    areaColor: '#8b949e',
  },
  edit: {
    title: 'After editing app.js',
    content: [
      'project/',
      '├── app.js  ← MODIFIED ✎',
      '├── index.html',
      '└── style.css',
      '',
      '  app.js saved on disk.',
      '  Git sees the change but has NOT recorded it.',
    ],
    area: 'Working Directory',
    areaColor: '#ffa657',
  },
  status: {
    title: '$ git status',
    content: [
      'On branch main',
      'Changes not staged for commit:',
      '  (use "git add <file>..." to stage)',
      '',
      '        modified:   app.js',
      '',
      'nothing added to commit',
      'use "git add" to stage',
    ],
    area: 'Working Directory',
    areaColor: '#ffa657',
  },
  add: {
    title: '$ git add app.js',
    content: [
      'On branch main',
      'Changes to be committed:',
      '  (use "git restore --staged <file>"',
      '   to unstage)',
      '',
      '        modified:   app.js  ✓ STAGED',
      '',
      'app.js is now ready to commit.',
    ],
    area: 'Staging Area',
    areaColor: '#d29922',
  },
  commit: {
    title: '$ git commit -m "Add login validation"',
    content: [
      '[main abc1234] Add login validation',
      ' 1 file changed, 12 insertions(+), 1 deletion(-)',
      '',
      '  ✓ Commit created in local repository',
      '  ✓ Hash: abc1234',
      '  ✓ Message: Add login validation',
      '  ✓ Recorded in project history',
    ],
    area: 'Local Repository',
    areaColor: '#58a6ff',
  },
  pull: {
    title: '$ git pull origin main',
    content: [
      'From https://github.com/org/project',
      ' * branch            main       -> FETCH_HEAD',
      'Already up to date.',
      '',
      '  ✓ Pulled latest changes from main branch',
      '  ✓ Local repository synchronized with remote',
      '  ✓ Prevents push rejection & resolves conflicts early',
    ],
    area: 'Sync Remote with Local',
    areaColor: '#e3b341',
  },
  push: {
    title: '$ git push',
    content: [
      'Enumerating objects: 3, done.',
      'Counting objects: 100% (3/3), done.',
      'Writing objects: 100% (2/2), done.',
      '',
      'To https://github.com/org/project.git',
      '   prev123..abc1234  main → main',
      '',
      '  ✓ Commit is now on GitHub',
      '  ✓ Team can see the change',
      '  ✓ CI/CD pipeline may trigger',
    ],
    area: 'Remote Repository (GitHub)',
    areaColor: '#3fb950',
  },
};

export default function GitSimulatorSlide({ slide }: Props) {
  const [step, setStep] = useState<Step>('idle');

  const currentIdx = stepOrder.indexOf(step);
  const canGoNext = currentIdx < stepOrder.length - 1;
  const canGoPrev = currentIdx > 0;
  const output = outputs[step];

  const goNext = () => {
    if (canGoNext) setStep(stepOrder[currentIdx + 1]);
  };
  const goPrev = () => {
    if (canGoPrev) setStep(stepOrder[currentIdx - 1]);
  };
  const reset = () => setStep('idle');

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Step through the journey from editing a file to it appearing on GitHub.
      </p>

      {/* Step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
        {steps.map((s, i) => {
          const isPast = stepOrder.indexOf(s.id) < currentIdx;
          const isCurrent = s.id === step;
          return (
            <React.Fragment key={s.id}>
              <div
                style={{
                  background: isCurrent ? s.color : isPast ? `${s.color}30` : 'var(--bg-card)',
                  border: `1px solid ${isCurrent ? s.color : isPast ? `${s.color}50` : 'var(--border)'}`,
                  borderRadius: 8,
                  padding: '5px 10px',
                  fontSize: 11,
                  fontWeight: isCurrent ? 800 : 500,
                  color: isCurrent ? '#fff' : isPast ? s.color : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onClick={() => setStep(s.id)}
              >
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Terminal output + area indicator */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: 260 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'var(--code-bg)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div style={{
                padding: '8px 14px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f85149' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#d29922' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fb950' }} />
                </div>
                <code style={{ fontSize: 11, color: 'var(--text-muted)' }}>{output.title}</code>
              </div>
              <div style={{ padding: '14px 16px' }}>
                {output.content.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 12,
                      lineHeight: 1.8,
                      color: line.includes('✓') ? '#3fb950'
                        : line.includes('MODIFIED') || line.includes('STAGED') ? '#ffa657'
                        : line.startsWith('  ') ? 'var(--text-muted)'
                        : 'var(--text-secondary)',
                      whiteSpace: 'pre',
                    }}
                  >
                    {line || '\u00A0'}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* State indicator */}
        <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
            Current state
          </div>
          {[
            { label: 'Working Directory', color: '#ffa657', activeOn: ['idle', 'edit', 'status'] },
            { label: 'Staging Area', color: '#d29922', activeOn: ['add'] },
            { label: 'Local Repository', color: '#58a6ff', activeOn: ['commit'] },
            { label: 'Remote Sync (git pull)', color: '#e3b341', activeOn: ['pull'] },
            { label: 'Remote (GitHub)', color: '#3fb950', activeOn: ['push'] },
          ].map((area) => {
            const isActive = area.activeOn.includes(step);
            return (
              <div
                key={area.label}
                style={{
                  background: isActive ? `${area.color}18` : 'var(--bg-card)',
                  border: `1px solid ${isActive ? area.color + '60' : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: '10px 12px',
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? area.color : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: isActive ? area.color : 'var(--border)',
                  transition: 'all 0.2s',
                }} />
                {area.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          style={{
            background: canGoPrev ? 'var(--bg-card)' : 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: canGoPrev ? 'pointer' : 'not-allowed',
            color: canGoPrev ? 'var(--text-primary)' : 'var(--text-muted)',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <button
          onClick={goNext}
          disabled={!canGoNext}
          style={{
            background: canGoNext ? steps[currentIdx + 1]?.color : 'var(--border)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 20px',
            cursor: canGoNext ? 'pointer' : 'not-allowed',
            color: canGoNext ? '#fff' : 'var(--text-muted)',
            fontSize: 13,
            fontWeight: 700,
            flex: 1,
          }}
        >
          {canGoNext ? `Next: ${steps[currentIdx + 1]?.label} →` : '✓ Complete!'}
        </button>
        <button
          onClick={reset}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 12px',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: 12,
          }}
        >
          Reset
        </button>
      </div>
    </SlideWrapper>
  );
}
