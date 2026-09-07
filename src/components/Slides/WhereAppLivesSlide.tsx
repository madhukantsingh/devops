import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const laptop = ['VS Code', 'Local files', 'Local tools', 'Development environment'];
const server = ['Runs 24/7', 'Connected to internet', 'Hosts application', 'Used by customers'];

export default function WhereAppLivesSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(22px, 4vw, 44px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: -1 }}>{slide.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>A server is another computer - usually running 24/7 in a data centre.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32, maxWidth: 700 }}>
        {/* Laptop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 16, padding: 24 }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>💻</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#58a6ff', marginBottom: 12 }}>Developer Laptop</div>
          {laptop.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#58a6ff', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Server */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.3)', borderRadius: 16, padding: 24 }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🖥️</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#3fb950', marginBottom: 12 }}>Production Server</div>
          {server.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3fb950', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          background: 'rgba(248,81,73,0.08)',
          border: '1px solid rgba(248,81,73,0.3)',
          borderRadius: 12,
          padding: '14px 20px',
          maxWidth: 700,
        }}
      >
        <span style={{ fontSize: 18, marginRight: 10 }}>⚠️</span>
        <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>
          "It works on my machine" is not a solution - code must travel from the laptop to the server in a controlled, repeatable way.
        </span>
      </motion.div>
    </SlideWrapper>
  );
}
