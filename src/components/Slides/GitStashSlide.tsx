import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Archive, ArrowRight, CheckCircle, RefreshCcw, Layers, Terminal, AlertTriangle, Sparkles } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitStashSlide({ slide }: Props) {
  const [stashState, setStashState] = useState<'clean' | 'dirty' | 'stashed'>('dirty');
  const [stashList, setStashList] = useState<string[]>([]);
  const [logText, setLogText] = useState('Modifications in working directory: src/checkout.ts');

  const handleStash = () => {
    setStashList(['stash@{0}: WIP on feature/checkout: a8f3b91 Add payment gateway endpoint', ...stashList]);
    setStashState('stashed');
    setLogText('Saved working directory and index state WIP on feature/checkout.\nHEAD is now clean!');
  };

  const handlePop = () => {
    if (stashList.length === 0) return;
    setStashList(stashList.slice(1));
    setStashState('dirty');
    setLogText('On branch feature/checkout\nChanges restored to working directory:\n  modified: src/checkout.ts\nDropped stash@{0}');
  };

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git stash</code> temporarily shelves (or stores) uncommitted changes so you can switch branches without committing unfinished work.
      </p>

      {/* Interactive Workflow Scenario Box */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--warning)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={14} /> Real World Scenario
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
          You are half-way through building a feature when an urgent hotfix is requested on <code style={{ color: 'var(--accent)' }}>main</code>. You aren't ready to commit your broken feature code yet!
        </p>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <button
            onClick={handleStash}
            disabled={stashState === 'stashed'}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(135deg, #d29922 0%, #f0883e 100%)',
              color: '#0d1117',
              fontSize: 13,
              fontWeight: 800,
              cursor: stashState === 'stashed' ? 'not-allowed' : 'pointer',
              opacity: stashState === 'stashed' ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Archive size={15} /> 1. Run $ git stash
          </button>

          <button
            onClick={handlePop}
            disabled={stashList.length === 0}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(135deg, #238636 0%, #2ea043 100%)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 800,
              cursor: stashList.length === 0 ? 'not-allowed' : 'pointer',
              opacity: stashList.length === 0 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <RefreshCcw size={15} /> 2. Run $ git stash pop
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Terminal Output */}
        <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={12} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>Git Status & Logs</span>
          </div>
          <div style={{ padding: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--code-text)', whiteSpace: 'pre-wrap', lineHeight: 1.6, minHeight: 140 }}>
            {logText}
          </div>
        </div>

        {/* Stash Shelf / Container Visual */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Archive size={14} /> Git Stash Shelf (Memory Storage)
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnimatePresence>
              {stashList.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', padding: '30px 0' }}>
                  (Stash shelf is currently empty)
                </div>
              ) : (
                stashList.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{
                      background: 'var(--bg-card-hover)',
                      border: '1px solid var(--warning-glow)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 11,
                      fontFamily: 'monospace',
                      color: 'var(--warning)',
                    }}
                  >
                    📦 {item}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Commands Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, fontSize: 11 }}>
        <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
          <code style={{ color: 'var(--accent)', fontWeight: 700 }}>git stash</code>
          <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>Save dirty work</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
          <code style={{ color: 'var(--success)', fontWeight: 700 }}>git stash pop</code>
          <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>Restore & remove</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
          <code style={{ color: 'var(--warning)', fontWeight: 700 }}>git stash apply</code>
          <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>Restore & keep on shelf</div>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
          <code style={{ color: '#f85149', fontWeight: 700 }}>git stash list</code>
          <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>View stashed items</div>
        </div>
      </div>
    </SlideWrapper>
  );
}
