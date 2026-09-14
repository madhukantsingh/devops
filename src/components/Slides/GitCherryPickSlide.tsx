import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { GitBranch, GitCommit, ArrowRight, Check, Sparkles, Copy, AlertCircle } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitCherryPickSlide({ slide }: Props) {
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null);
  const [mainCommits, setMainCommits] = useState<Array<{ hash: string; msg: string; source?: string }>>([
    { hash: 'm1a23', msg: 'initial setup' },
    { hash: 'm2b45', msg: 'add user authentication' },
  ]);

  const featureCommits = [
    { hash: 'f91ab', msg: 'wip: experimental redesign UI', isTarget: false },
    { hash: 'c73ef', msg: 'fix: critical security vulnerability in tokens', isTarget: true },
    { hash: 'f82cd', msg: 'wip: new navigation sidebar', isTarget: false },
  ];

  const handleCherryPick = (commit: { hash: string; msg: string }) => {
    setSelectedCommit(commit.hash);
    setTimeout(() => {
      setMainCommits((prev) => [
        ...prev,
        { hash: `${commit.hash}-pick`, msg: commit.msg, source: commit.hash },
      ]);
    }, 400);
  };

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git cherry-pick &lt;commit-hash&gt;</code> copies an individual commit from one branch and applies it onto your current branch.
      </p>

      {/* Concept Box */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#a371f7', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} /> Why Cherry-Pick?
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
          Suppose a feature branch contains an unfinished UI redesign, but also contains a <strong>critical bug fix</strong>. You want that bug fix on <code style={{ color: 'var(--accent)' }}>main</code> immediately without merging the unfinished feature!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Source Feature Branch */}
        <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <GitBranch size={16} /> Branch: feature/redesign
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {featureCommits.map((c) => (
              <div
                key={c.hash}
                style={{
                  background: c.isTarget ? 'rgba(210,153,34,0.15)' : 'rgba(255,255,255,0.03)',
                  border: c.isTarget ? '1px solid var(--warning)' : '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: c.isTarget ? 'var(--warning)' : 'var(--text-muted)' }}>
                    commit {c.hash}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500, marginTop: 2 }}>{c.msg}</div>
                </div>

                <button
                  onClick={() => handleCherryPick(c)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: c.isTarget ? 'var(--warning)' : 'var(--accent)',
                    color: '#0d1117',
                    fontWeight: 700,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  Pick <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Target Main Branch */}
        <div style={{ background: 'var(--code-bg)', border: '1px solid var(--accent-glow)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <GitBranch size={16} /> Target Branch: main
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mainCommits.map((c, idx) => (
              <motion.div
                key={c.hash}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: c.source ? 'rgba(56,139,253,0.15)' : 'rgba(255,255,255,0.03)',
                  border: c.source ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>commit {c.hash}</span>
                  {c.source && (
                    <span style={{ fontSize: 10, background: 'var(--accent-dim)', color: 'var(--accent)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                      Cherry-picked from {c.source}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500, marginTop: 2 }}>{c.msg}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--code-text)' }}>
        <span style={{ color: 'var(--text-muted)' }}># Command syntax:</span><br />
        <span style={{ color: '#79c0ff' }}>$ git checkout main</span><br />
        <span style={{ color: '#3fb950' }}>$ git cherry-pick c73ef</span>
      </div>
    </SlideWrapper>
  );
}
