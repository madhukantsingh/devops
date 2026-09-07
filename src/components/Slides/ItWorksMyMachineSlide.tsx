import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

export default function ItWorksMyMachineSlide({ slide }: Props) {
  const devEnv = [
    { label: 'Node.js', dev: '20.x', server: '18.x', match: false },
    { label: 'Library A', dev: 'v1.2.0', server: 'v1.2.0', match: true },
    { label: 'Library B', dev: 'v2.1.0', server: 'v3.0.0', match: false },
    { label: 'Config', dev: 'Config X', server: 'Config Y', match: false },
  ];

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Same code, different environment, different result.
      </p>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
        {/* Dev machine */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ flex: 1, minWidth: 200, background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 14, padding: 20 }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>💻</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#58a6ff', marginBottom: 16 }}>Developer Machine</div>
          {devEnv.map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(88,166,255,0.1)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.label}</span>
              <span style={{ fontSize: 12, color: '#58a6ff', fontFamily: 'monospace' }}>{row.dev}</span>
            </div>
          ))}
        </motion.div>

        {/* VS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 2, flex: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--error)', padding: '8px 0', letterSpacing: 2 }}>≠</div>
          <div style={{ width: 2, flex: 1, background: 'var(--border)' }} />
        </div>

        {/* Server */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ flex: 1, minWidth: 200, background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 14, padding: 20 }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>🖥️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f85149', marginBottom: 16 }}>Production Server</div>
          {devEnv.map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(248,81,73,0.1)', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: row.match ? '#3fb950' : '#f85149', fontFamily: 'monospace' }}>{row.server}</span>
                {!row.match && <span style={{ fontSize: 12 }}>⚠️</span>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrow to Docker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.3)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}
      >
        <span style={{ fontSize: 32 }}>📦</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#3fb950', marginBottom: 4 }}>The solution: Docker</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Package the application together with its exact runtime environment — Node version, libraries, configuration — so it runs identically everywhere.
          </div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
