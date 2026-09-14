import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { RotateCcw, AlertTriangle, CheckCircle, Flame, Layers, ShieldAlert } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitResetDetailsSlide({ slide }: Props) {
  const [resetMode, setResetMode] = useState<'soft' | 'mixed' | 'hard'>('soft');

  const modeInfo = {
    soft: {
      name: 'git reset --soft HEAD~1',
      safety: 'SAFE',
      safetyColor: 'var(--success)',
      headMove: 'Moves HEAD pointer back 1 commit',
      stagingIndex: 'KEPT (Files stay staged for re-committing)',
      workingDir: 'KEPT (Working files untouched)',
      summary: 'Best for re-doing a commit message or grouping recent commits together before pushing.',
      color: 'var(--success)',
    },
    mixed: {
      name: 'git reset --mixed HEAD~1 (DEFAULT)',
      safety: 'SAFE',
      safetyColor: 'var(--warning)',
      headMove: 'Moves HEAD pointer back 1 commit',
      stagingIndex: 'CLEARED (Files removed from staging)',
      workingDir: 'KEPT (Changes remain in your working code)',
      summary: 'Best when you want to unstage changes and carefully re-add selected files.',
      color: 'var(--warning)',
    },
    hard: {
      name: 'git reset --hard HEAD~1',
      safety: 'DANGEROUS',
      safetyColor: '#f85149',
      headMove: 'Moves HEAD pointer back 1 commit',
      stagingIndex: 'DISCARDED (Completely erased)',
      workingDir: 'DISCARDED (All uncommitted code changes wiped!)',
      summary: 'DANGER: Completely destroys uncommitted working directory changes. Use only when abandoning work!',
      color: '#f85149',
    },
  };

  const active = modeInfo[resetMode];

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git reset</code> moves the branch pointer backward. The flag (<code style={{ color: 'var(--success)' }}>--soft</code>, <code style={{ color: 'var(--warning)' }}>--mixed</code>, or <code style={{ color: '#f85149' }}>--hard</code>) determines what happens to your files!
      </p>

      {/* Mode Selector Buttons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { id: 'soft', label: '1. Soft Reset (--soft)', color: 'var(--success)' },
          { id: 'mixed', label: '2. Mixed Reset (--mixed)', color: 'var(--warning)' },
          { id: 'hard', label: '3. Hard Reset (--hard)', color: '#f85149' },
        ].map((m) => {
          const isSel = resetMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setResetMode(m.id as any)}
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: 10,
                border: isSel ? `2px solid ${m.color}` : '1px solid var(--border)',
                background: isSel ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* 3 Area Matrix Visualization */}
      <div style={{ background: 'var(--code-bg)', border: `1px solid ${active.color}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <code style={{ fontSize: 14, fontWeight: 800, color: active.color, fontFamily: 'JetBrains Mono, monospace' }}>
            $ {active.name}
          </code>
          <span style={{ fontSize: 11, fontWeight: 800, background: 'rgba(255,255,255,0.05)', color: active.safetyColor, border: `1px solid ${active.safetyColor}`, padding: '2px 8px', borderRadius: 6 }}>
            {active.safety}
          </span>
        </div>

        {/* 3 Column Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
          {/* Working Directory */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              WORKING DIRECTORY
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: resetMode === 'hard' ? '#f85149' : 'var(--success)' }}>
              {resetMode === 'hard' ? '❌ WIPED' : '✅ KEPT UNTOUCHED'}
            </div>
          </div>

          {/* Staging Index */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              STAGING INDEX (INDEX)
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: resetMode === 'soft' ? 'var(--success)' : resetMode === 'mixed' ? 'var(--warning)' : '#f85149' }}>
              {resetMode === 'soft' ? '✅ STAGED' : resetMode === 'mixed' ? '⚠️ UNSTAGED' : '❌ WIPED'}
            </div>
          </div>

          {/* HEAD Commit Pointer */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              HEAD COMMIT POINTER
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>
              ⏮️ MOVED BACK 1 COMMIT
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
          {active.summary}
        </p>
      </div>

      {/* Warning Box */}
      <div style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.25)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <ShieldAlert size={18} style={{ color: '#f85149', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          <strong>Crucial Golden Rule:</strong> Never perform <code style={{ color: '#f85149' }}>git reset --hard</code> on commits that have already been pushed to shared remote branches! Use <code style={{ color: 'var(--success)' }}>git revert</code> instead for shared history.
        </span>
      </div>
    </SlideWrapper>
  );
}
