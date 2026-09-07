import React from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

interface TimerProps {
  elapsed: number;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
}

function fmt(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function Timer({ elapsed, running, onToggle, onReset }: TimerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Clock size={12} style={{ color: 'var(--text-muted)' }} />
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 13,
          color: running ? 'var(--text-primary)' : 'var(--text-muted)',
          minWidth: 40,
        }}
      >
        {fmt(elapsed)}
      </span>
      <button
        onClick={onToggle}
        title={running ? 'Pause timer' : 'Start timer'}
        style={{
          background: 'none',
          border: 'none',
          color: running ? 'var(--warning)' : 'var(--success)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {running ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <button
        onClick={onReset}
        title="Reset timer"
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
      >
        <RotateCcw size={12} />
      </button>
    </div>
  );
}
