import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { GitBranch, Shield, Users, Lightbulb, CheckCircle2 } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitBranchesSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        A branch is an independent line of development within the same repository.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* SVG Branch Diagram Container */}
        <div style={{ flex: 2, minWidth: 320 }}>
          <div
            style={{
              background: 'var(--code-bg)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 20,
              overflowX: 'auto',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--accent)', marginBottom: 14, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
              <GitBranch size={14} /> Branch Timeline Diagram
            </div>

            <svg width="600" height="210" viewBox="0 0 600 210" style={{ display: 'block', width: '100%', height: 'auto' }}>
              {/* Branch Track Lines */}
              {/* Main line */}
              <line x1="100" y1="45" x2="560" y2="45" stroke="var(--accent)" strokeWidth="3" strokeOpacity="0.8" />
              
              {/* feature/login branch */}
              <path d="M 170 45 C 190 45, 190 110, 210 110 L 370 110 C 390 110, 390 45, 410 45" stroke="var(--success)" strokeWidth="2.5" fill="none" strokeOpacity="0.85" />
              
              {/* bugfix/header branch */}
              <path d="M 170 45 C 190 45, 190 165, 210 165 L 300 165 C 320 165, 320 45, 340 45" stroke="var(--warning)" strokeWidth="2.5" fill="none" strokeOpacity="0.85" />

              {/* Left Branch Labels (Fixed Positioning) */}
              <g transform="translate(10, 33)">
                <rect width="70" height="22" rx="5" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth="1" />
                <text x="35" y="15" fontSize="11" fill="var(--accent)" fontWeight="800" textAnchor="middle" fontFamily="monospace">main</text>
              </g>

              <g transform="translate(10, 98)">
                <rect width="105" height="22" rx="5" fill="var(--success-dim)" stroke="var(--success)" strokeWidth="1" />
                <text x="52" y="15" fontSize="10" fill="var(--success)" fontWeight="800" textAnchor="middle" fontFamily="monospace">feature/login</text>
              </g>

              <g transform="translate(10, 153)">
                <rect width="105" height="22" rx="5" fill="var(--warning-dim)" stroke="var(--warning)" strokeWidth="1" />
                <text x="52" y="15" fontSize="10" fill="var(--warning)" fontWeight="800" textAnchor="middle" fontFamily="monospace">bugfix/header</text>
              </g>

              {/* Commits on main */}
              {[
                { cx: 120, label: 'initial commit', color: 'var(--accent)' },
                { cx: 170, label: 'branch point', color: 'var(--accent)' },
                { cx: 340, label: 'merge fix', color: 'var(--warning)' },
                { cx: 410, label: 'merge feature', color: 'var(--success)' },
                { cx: 520, label: 'v1.0 release', color: 'var(--accent)' },
              ].map((c) => (
                <g key={c.cx}>
                  <circle cx={c.cx} cy={45} r={8} fill="var(--bg-card)" stroke={c.color} strokeWidth="3" />
                  <text x={c.cx} y={24} textAnchor="middle" fontSize="10" fill="var(--code-text)" fontWeight="600" fontFamily="sans-serif">
                    {c.label}
                  </text>
                </g>
              ))}

              {/* feature/login commits */}
              {[
                { cx: 230, label: 'add login form' },
                { cx: 310, label: 'add auth tests' },
              ].map((c) => (
                <g key={c.cx}>
                  <circle cx={c.cx} cy={110} r={7} fill="var(--bg-card)" stroke="var(--success)" strokeWidth="2.5" />
                  <text x={c.cx} y={130} textAnchor="middle" fontSize="9" fill="var(--success)" fontWeight="600" fontFamily="sans-serif">
                    {c.label}
                  </text>
                </g>
              ))}

              {/* bugfix/header commits */}
              {[
                { cx: 250, label: 'fix header CSS' },
              ].map((c) => (
                <g key={c.cx}>
                  <circle cx={c.cx} cy={165} r={7} fill="var(--bg-card)" stroke="var(--warning)" strokeWidth="2.5" />
                  <text x={c.cx} y={185} textAnchor="middle" fontSize="9" fill="var(--warning)" fontWeight="600" fontFamily="sans-serif">
                    {c.label}
                  </text>
                </g>
              ))}

              {/* PR / Merge Annotations */}
              <text x="320" y="85" fontSize="9" fill="var(--warning)" fontWeight="700" fontFamily="sans-serif">PR → Merge</text>
              <text x="390" y="85" fontSize="9" fill="var(--success)" fontWeight="700" fontFamily="sans-serif">PR → Merge</text>
            </svg>
          </div>

          {/* Branch Types Grid */}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
            {[
              { name: 'main', color: 'var(--accent)', desc: 'Stable production code' },
              { name: 'feature/login', color: 'var(--success)', desc: 'New feature under dev' },
              { name: 'bugfix/header', color: 'var(--warning)', desc: 'Bug fix in isolation' },
              { name: 'hotfix/payment', color: 'var(--error)', desc: 'Urgent prod patch' },
            ].map((b) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid var(--border)`,
                  borderRadius: 10,
                  padding: '8px 12px',
                  borderLeft: `3px solid ${b.color}`,
                }}
              >
                <code style={{ fontSize: 11, color: b.color, fontFamily: 'monospace', fontWeight: 800 }}>{b.name}</code>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.3 }}>{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Branches Cards */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            Why Branches Exist
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🛡️', title: 'Protect main', desc: 'The main branch always stays stable. Features are developed safely in isolation.' },
              { icon: '👥', title: 'Parallel Teamwork', desc: 'Multiple developers work simultaneously without stepping on each other.' },
              { icon: '🔒', title: 'Safe Experimentation', desc: 'Try ideas on a branch. If it fails, delete the branch — main remains untouched.' },
              { icon: '🔍', title: 'Focused Code Review', desc: 'Pull Requests review one feature at a time, not a pile of mixed code.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '10px 12px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              marginTop: 12,
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-glow)',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 12,
              color: 'var(--text-primary)',
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: 'var(--accent)' }}>Key Insight:</strong> A branch is NOT a heavy duplicate copy of your project. It is a lightweight 41-byte pointer in Git history — creating a branch is instantaneous!
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
