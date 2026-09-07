import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const envs = [
  {
    id: 'local',
    label: 'LOCAL',
    icon: '💻',
    color: '#58a6ff',
    desc: 'Developer builds and tests the feature on their own machine.',
    who: 'Developer',
    goal: 'Build and iterate quickly',
    risk: 'Only affects the developer',
  },
  {
    id: 'test',
    label: 'TEST',
    icon: '🧪',
    color: '#ffa657',
    desc: 'Automated and manual tests run in an isolated environment.',
    who: 'QA / CI Pipeline',
    goal: 'Verify correctness and catch regressions',
    risk: 'No real users affected',
  },
  {
    id: 'staging',
    label: 'STAGING',
    icon: '🎭',
    color: '#bc8cff',
    desc: 'A realistic copy of production - final verification before go-live.',
    who: 'QA, Product, Stakeholders',
    goal: 'Final sign-off in a production-like environment',
    risk: 'No real users, but realistic data',
  },
  {
    id: 'production',
    label: 'PRODUCTION',
    icon: '🌍',
    color: '#3fb950',
    desc: 'Real customers using the live application.',
    who: 'Real users',
    goal: 'Serve customers reliably',
    risk: 'Any issue is customer-facing',
  },
];

export default function EnvironmentsSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeEnv = envs.find((e) => e.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>Click each environment to see its purpose</p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        {envs.map((env, i) => {
          const isActive = active === env.id;
          return (
            <React.Fragment key={env.id}>
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(isActive ? null : env.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: isActive ? `${env.color}22` : 'var(--bg-card)',
                  border: `2px solid ${isActive ? env.color : 'var(--border)'}`,
                  borderRadius: 14,
                  padding: '20px 24px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  minWidth: 120,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>{env.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: isActive ? env.color : 'var(--text-primary)', letterSpacing: 1 }}>{env.label}</div>
              </motion.button>

              {i < envs.length - 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: 24, height: 2, background: 'var(--border)' }} />
                  <span style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 0.5, fontWeight: 600 }}>→</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeEnv ? (
          <motion.div
            key={activeEnv.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: `${activeEnv.color}10`,
              border: `1px solid ${activeEnv.color}40`,
              borderRadius: 14,
              padding: '20px 24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{activeEnv.icon}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: activeEnv.color }}>{activeEnv.label}</span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.5 }}>{activeEnv.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { label: 'Used by', value: activeEnv.who },
                { label: 'Goal', value: activeEnv.goal },
                { label: 'Risk level', value: activeEnv.risk },
              ].map((item) => (
                <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>
            Select an environment to learn more
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
