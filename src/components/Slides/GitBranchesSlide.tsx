import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

export default function GitBranchesSlide({ slide }: Props) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        A branch is an independent line of development within the same repository.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* SVG Branch Diagram */}
        <div style={{ flex: 2, minWidth: 300 }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: 20,
            overflowX: 'auto',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
              Branch diagram
            </div>
            <svg width="540" height="150" viewBox="0 0 540 150" style={{ display: 'block', maxWidth: '100%' }}>
              {/* main line */}
              <line x1="30" y1="40" x2="510" y2="40" stroke="#58a6ff" strokeWidth="2.5" strokeOpacity="0.5" />
              {/* feature/login branch */}
              <path d="M 150 40 Q 165 40 175 70 L 295 70 Q 310 70 325 40" stroke="#3fb950" strokeWidth="2" fill="none" strokeOpacity="0.6" />
              {/* bugfix branch */}
              <path d="M 150 40 Q 165 40 175 105 L 245 105 Q 260 105 275 40" stroke="#ffa657" strokeWidth="2" fill="none" strokeOpacity="0.6" />

              {/* Labels */}
              <text x="8" y="34" fontSize="11" fill="#58a6ff" fontWeight="bold" fontFamily="monospace">main</text>
              <text x="174" y="68" fontSize="10" fill="#3fb950" fontWeight="bold" fontFamily="monospace">feature/login</text>
              <text x="174" y="103" fontSize="10" fill="#ffa657" fontWeight="bold" fontFamily="monospace">bugfix/header</text>

              {/* Commits on main */}
              {[30, 150, 325, 420, 510].map((cx, i) => (
                <g key={cx}>
                  <circle cx={cx} cy={40} r={i === 3 ? 12 : 10} fill={['#58a6ff', '#58a6ff', '#58a6ff', '#3fb950', '#58a6ff'][i]} fillOpacity="0.25" stroke={['#58a6ff', '#58a6ff', '#58a6ff', '#3fb950', '#58a6ff'][i]} strokeWidth="2" />
                  <text x={cx} y={44} textAnchor="middle" fontSize="9" fill={['#58a6ff', '#58a6ff', '#58a6ff', '#3fb950', '#58a6ff'][i]} fontFamily="monospace">●</text>
                  <text x={cx} y={28} textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontFamily="sans-serif">
                    {['init', 'branch', 'merge fix', 'merge feat', 'deploy'][i]}
                  </text>
                </g>
              ))}

              {/* feature/login commits */}
              {[210, 280].map((cx, i) => (
                <g key={cx}>
                  <circle cx={cx} cy={70} r={9} fill="#3fb950" fillOpacity="0.2" stroke="#3fb950" strokeWidth="2" />
                  <text x={cx} y={88} textAnchor="middle" fontSize="8" fill="#3fb950" fontFamily="sans-serif">
                    {['feat', 'test'][i]}
                  </text>
                </g>
              ))}

              {/* bugfix commits */}
              {[200, 245].map((cx, i) => (
                <g key={cx}>
                  <circle cx={cx} cy={105} r={9} fill="#ffa657" fillOpacity="0.2" stroke="#ffa657" strokeWidth="2" />
                  <text x={cx} y={122} textAnchor="middle" fontSize="8" fill="#ffa657" fontFamily="sans-serif">
                    {['fix', 'test'][i]}
                  </text>
                </g>
              ))}

              {/* PR/Merge arrows */}
              <text x="290" y="55" fontSize="8" fill="#3fb950" fontFamily="sans-serif" opacity="0.8">PR → Merge</text>
              <text x="240" y="55" fontSize="8" fill="#ffa657" fontFamily="sans-serif" opacity="0.8">PR → Merge</text>
            </svg>
          </div>

          {/* Branch name examples */}
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { name: 'main', color: '#58a6ff', desc: 'Stable production code' },
              { name: 'feature/login', color: '#3fb950', desc: 'New feature under development' },
              { name: 'bugfix/header', color: '#ffa657', desc: 'Bug fix in isolation' },
              { name: 'hotfix/payment', color: '#f85149', desc: 'Urgent production patch' },
            ].map((b) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: `${b.color}12`,
                  border: `1px solid ${b.color}35`,
                  borderRadius: 8,
                  padding: '6px 10px',
                }}
              >
                <code style={{ fontSize: 11, color: b.color, fontFamily: 'monospace', fontWeight: 700 }}>{b.name}</code>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why branches */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            Why branches exist
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🛡️', title: 'Protect main', desc: 'The main branch always stays stable. Features are developed in isolation.' },
              { icon: '👥', title: 'Parallel work', desc: 'Multiple developers work simultaneously without blocking each other.' },
              { icon: '🔒', title: 'Safe experimentation', desc: 'Try ideas on a branch. If it doesn\'t work, delete the branch — main is untouched.' },
              { icon: '🔍', title: 'Focused review', desc: 'Pull Requests review one feature at a time, not a pile of mixed changes.' },
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
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{
            marginTop: 12,
            background: 'rgba(88,166,255,0.08)',
            border: '1px solid rgba(88,166,255,0.25)',
            borderRadius: 10,
            padding: '10px 12px',
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: '#58a6ff' }}>Important:</strong> A branch is NOT a complete copy of the project. It's a lightweight pointer in Git history — creating a branch is nearly instant.
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
