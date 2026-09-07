import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const rules = [
  { num: 1, text: 'Code on a laptop is not production.', icon: '💻' },
  { num: 2, text: 'Git is the history of your code.', icon: '📚' },
  { num: 3, text: 'GitHub is shared source control and collaboration.', icon: '🐙' },
  { num: 4, text: 'A server is another computer running your software.', icon: '🖥️' },
  { num: 5, text: 'Environments protect production.', icon: '🛡️' },
  { num: 6, text: 'CI/CD automates build, test, and deployment.', icon: '⚙️' },
  { num: 7, text: 'Docker makes runtime environments more predictable.', icon: '📦' },
  { num: 8, text: 'The browser is only one layer.', icon: '🌐' },
  { num: 9, text: 'Logs are evidence.', icon: '📋' },
  { num: 10, text: 'Find the failing layer before changing the code.', icon: '🔍', highlight: true },
];

export default function FinalRulesSlide({ slide }: Props) {
  const [revealed, setRevealed] = useState(0);

  const showAll = () => setRevealed(rules.length);
  const showNext = () => setRevealed((v) => Math.min(v + 1, rules.length));

  return (
    <SlideWrapper slide={slide}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 42px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: -1 }}>{slide.title}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {revealed < rules.length && (
            <>
              <button onClick={showNext} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 12 }}>
                Next rule
              </button>
              <button onClick={showAll} style={{ background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                Show all
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, marginBottom: 24 }}>
        {rules.map((rule, i) => (
          <motion.div
            key={rule.num}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={i < revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.1, y: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{
              background: rule.highlight && i < revealed ? 'linear-gradient(135deg, rgba(88,166,255,0.15), rgba(121,192,255,0.08))' : 'var(--bg-card)',
              border: `1px solid ${rule.highlight && i < revealed ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              boxShadow: rule.highlight && i < revealed ? '0 0 20px rgba(88,166,255,0.1)' : 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <span style={{ fontSize: 22 }}>{rule.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: rule.highlight ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'monospace' }}>#{rule.num}</span>
            </div>
            <p style={{ fontSize: 13, color: rule.highlight && i < revealed ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: rule.highlight ? 700 : 400, lineHeight: 1.5, margin: 0 }}>
              {rule.text}
            </p>
          </motion.div>
        ))}
      </div>

      {revealed >= rules.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '20px 0' }}
        >
          <div
            style={{
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #e6edf3, #58a6ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.4,
            }}
          >
            From idea → code → customer → feedback → next version.
          </div>
        </motion.div>
      )}
    </SlideWrapper>
  );
}
