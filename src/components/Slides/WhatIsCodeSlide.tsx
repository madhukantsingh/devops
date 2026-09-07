import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const layers = [
  { name: 'Frontend', icon: '🖼️', color: '#79c0ff', desc: 'What users see — buttons, forms, pages', examples: ['Button', 'Form', 'Login page', 'Dashboard', 'Payment screen'] },
  { name: 'Backend', icon: '⚙️', color: '#58a6ff', desc: 'The logic that processes requests', examples: ['API endpoints', 'Business rules', 'Authentication', 'Data processing'] },
  { name: 'Database', icon: '🗄️', color: '#bc8cff', desc: 'Where data is stored and retrieved', examples: ['User accounts', 'Orders', 'Products', 'Transactions'] },
];

export default function WhatIsCodeSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Code is the set of instructions that makes the product behave. Every feature is built from code.
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Stack diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', flexShrink: 0 }}>
          {layers.map((layer, i) => (
            <React.Fragment key={layer.name}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: `${layer.color}18`,
                  border: `2px solid ${layer.color}50`,
                  borderRadius: 14,
                  padding: '20px 32px',
                  width: 220,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>{layer.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: layer.color, marginBottom: 4 }}>{layer.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{layer.desc}</div>
              </motion.div>
              {i < layers.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  style={{ width: 2, height: 20, background: `linear-gradient(to bottom, ${layer.color}60, ${layers[i+1].color}60)`, transformOrigin: 'top' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Examples per layer */}
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${layer.color}30`,
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: layer.color, marginBottom: 8, letterSpacing: 0.5 }}>{layer.name} examples</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {layer.examples.map((ex) => (
                  <span
                    key={ex}
                    style={{
                      fontSize: 12,
                      background: `${layer.color}15`,
                      color: layer.color,
                      border: `1px solid ${layer.color}30`,
                      borderRadius: 6,
                      padding: '3px 10px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
