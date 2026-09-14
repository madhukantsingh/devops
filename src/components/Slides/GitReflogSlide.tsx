import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { History, LifeBuoy, Terminal, Search, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitReflogSlide({ slide }: Props) {
  const [recovered, setRecovered] = useState(false);

  const reflogEntries = [
    { ref: 'HEAD@{0}', action: 'reset: moving to HEAD~1', hash: 'e9b1a03', date: 'Just now', danger: true },
    { ref: 'HEAD@{1}', action: 'commit: feat: critical feature code', hash: 'a8f3b91', date: '5 mins ago', target: true },
    { ref: 'HEAD@{2}', action: 'checkout: moving from main to feature', hash: 'c7d2e45', date: '15 mins ago' },
    { ref: 'HEAD@{3}', action: 'commit: fix: handle token expiration', hash: 'c7d2e45', date: '1 hour ago' },
  ];

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git reflog</code> (Reference Log) is Git's ultimate local safety net. It records every action you take locally — even deleted commits!
      </p>

      {/* Scenario Hero Box */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#f85149', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertCircle size={14} /> Panic Scenario & Recovery
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
          You accidentally ran <code style={{ color: '#f85149' }}>git reset --hard HEAD~1</code> and deleted your latest commit <code style={{ color: 'var(--accent)' }}>a8f3b91</code>! Standard <code style={{ color: 'var(--text-muted)' }}>git log</code> won't show it anymore. How do you bring it back?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Reflog Output Table */}
        <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={12} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>$ git reflog</span>
          </div>

          <div style={{ padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
            {reflogEntries.map((entry) => (
              <div
                key={entry.ref}
                style={{
                  padding: '8px 10px',
                  borderRadius: 6,
                  marginBottom: 6,
                  background: entry.target ? 'rgba(63,185,80,0.15)' : entry.danger ? 'rgba(248,81,73,0.1)' : 'transparent',
                  border: entry.target ? '1px solid var(--success)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d29922', fontWeight: 700 }}>
                  <span>{entry.hash} ({entry.ref})</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{entry.date}</span>
                </div>
                <div style={{ color: entry.target ? '#3fb950' : entry.danger ? '#f85149' : '#e6edf3', marginTop: 2 }}>
                  {entry.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Action Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--success)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <LifeBuoy size={16} /> Recovering Lost Commit Step-by-Step
            </div>
            <ol style={{ fontSize: 12, color: 'var(--text-secondary)', paddingLeft: 16, lineHeight: 1.6, margin: 0 }}>
              <li>Run <code style={{ color: 'var(--accent)' }}>git reflog</code> to find the hash before the reset (<code style={{ color: '#3fb950' }}>a8f3b91</code> or <code style={{ color: '#3fb950' }}>HEAD@{"{1}"}</code>).</li>
              <li>Compare changes with <code style={{ color: 'var(--accent)' }}>git diff HEAD@{"{1}"}</code>.</li>
              <li>Restore commit with <code style={{ color: 'var(--accent)' }}>git reset --hard a8f3b91</code>!</li>
            </ol>
          </div>

          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setRecovered(true)}
              disabled={recovered}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: 'none',
                background: recovered ? 'var(--success)' : 'linear-gradient(135deg, #238636 0%, #2ea043 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: 13,
                cursor: recovered ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {recovered ? <Check size={16} /> : <LifeBuoy size={16} />}
              {recovered ? 'Commit Successfully Recovered!' : 'Click to Perform Recovery ($ git reset --hard HEAD@{1})'}
            </button>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
