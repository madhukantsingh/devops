import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Play, CheckCircle } from 'lucide-react';

interface Props { slide: SlideData; }

const journey = [
  { label: 'Developer changes code', icon: '💻', color: '#58a6ff' },
  { label: 'git commit', icon: '📌', color: '#79c0ff' },
  { label: 'Push to GitHub', icon: '⬆️', color: '#bc8cff' },
  { label: 'Pull Request', icon: '📋', color: '#ffa657' },
  { label: 'Code Review', icon: '👀', color: '#ffa657' },
  { label: 'Merge', icon: '🔀', color: '#56d364' },
  { label: 'CI/CD starts', icon: '⚙️', color: '#58a6ff' },
  { label: 'Build', icon: '🔨', color: '#79c0ff' },
  { label: 'Tests', icon: '🧪', color: '#ffa657' },
  { label: 'Docker image', icon: '📦', color: '#bc8cff' },
  { label: 'Server', icon: '🖥️', color: '#58a6ff' },
  { label: 'Container updated', icon: '🔄', color: '#56d364' },
  { label: 'Application starts', icon: '🚀', color: '#3fb950' },
  { label: 'Health check', icon: '❤️', color: '#3fb950' },
  { label: 'Customer sees new version', icon: '🌟', color: '#3fb950' },
];

export default function DeploymentWalkthroughSlide({ slide }: Props) {
  const [activeCount, setActiveCount] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    if (running) return;
    setActiveCount(0);
    setRunning(true);
    let count = 0;
    intervalRef.current = setInterval(() => {
      count++;
      setActiveCount(count);
      if (count >= journey.length) {
        clearInterval(intervalRef.current!);
        setRunning(false);
      }
    }, 500);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setActiveCount(0);
  };

  return (
    <SlideWrapper slide={slide}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(18px, 3vw, 34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{slide.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Every step between a code change and the customer seeing it.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {activeCount > 0 && !running && (
            <button onClick={reset} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 12 }}>Reset</button>
          )}
          <button
            onClick={play}
            disabled={running}
            style={{
              background: running ? 'var(--bg-card)' : 'linear-gradient(135deg, var(--accent), #79c0ff)',
              color: running ? 'var(--text-muted)' : '#0d1117',
              border: 'none',
              borderRadius: 8,
              padding: '9px 20px',
              cursor: running ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Play size={14} fill={running ? 'none' : 'currentColor'} />
            {running ? 'Playing…' : activeCount >= journey.length ? 'Replay' : 'Play Full Journey'}
          </button>
        </div>
      </div>

      {/* Journey grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
        {journey.map((step, i) => {
          const isActive = i < activeCount;
          const isCurrent = i === activeCount - 1;
          return (
            <motion.div
              key={step.label}
              animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
              transition={isCurrent ? { duration: 0.3 } : {}}
              style={{
                background: isActive ? `${step.color}18` : 'var(--bg-card)',
                border: `1px solid ${isActive ? step.color : 'var(--border)'}`,
                borderRadius: 10,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.3s',
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <span style={{ fontSize: 20 }}>{step.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? step.color : 'var(--text-muted)', lineHeight: 1.3 }}>{step.label}</div>
              </div>
              {isActive && <CheckCircle size={12} style={{ color: step.color, flexShrink: 0 }} />}
            </motion.div>
          );
        })}
      </div>

      {activeCount >= journey.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16, background: 'var(--success-dim)', border: '1px solid var(--success)', borderRadius: 10, padding: '12px 18px', textAlign: 'center' }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>
            ✅ Deployment complete - customer sees the new version
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Deployment is a chain of controlled steps, not one magic button.
          </div>
        </motion.div>
      )}
    </SlideWrapper>
  );
}
