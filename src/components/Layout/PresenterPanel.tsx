import React from 'react';
import { SlideData } from '../../data/slides';
import { Clock, SkipForward, Play, Pause, RotateCcw, Lightbulb, BookOpen } from 'lucide-react';

interface PresenterPanelProps {
  current: SlideData;
  next?: SlideData;
  elapsed: number;
  timerRunning: boolean;
  onTimerToggle: () => void;
  onTimerReset: () => void;
  remaining: number;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PresenterPanel({
  current,
  next,
  elapsed,
  timerRunning,
  onTimerToggle,
  onTimerReset,
  remaining,
}: PresenterPanelProps) {
  const durationSecs = current.duration * 60;
  const over = elapsed > durationSecs;

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, fontSize: 13 }}>


      {/* Key Takeaway */}
      <div
        style={{
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-glow)',
          borderRadius: 10,
          padding: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <Lightbulb size={12} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--accent)', textTransform: 'uppercase' }}>Key Takeaway</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{current.takeaway}</p>
      </div>

      {/* Speaker Notes */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <BookOpen size={12} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Speaker Notes</span>
        </div>
        <ol style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {current.notes.map((note, i) => (
            <li key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {note}
            </li>
          ))}
        </ol>
      </div>

      {/* Next slide */}
      {next && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <SkipForward size={12} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Next Slide</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{next.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Clock size={10} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{next.duration} min</span>
            {next.label === 'OPTIONAL' && (
              <span style={{ fontSize: 9, background: 'var(--warning-dim)', color: 'var(--warning)', borderRadius: 4, padding: '1px 5px', fontWeight: 700 }}>OPTIONAL</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
