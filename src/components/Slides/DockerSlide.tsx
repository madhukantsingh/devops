import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

export default function DockerSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28 }}>
        Docker packages your application with everything it needs to run — making it portable and predictable.
      </p>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Analogy */}
        <div style={{ minWidth: 240, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>The Analogy</div>
          {[
            { icon: '📄', label: 'IMAGE', sub: 'Blueprint / Package', desc: 'A static snapshot of the application + its entire runtime environment. Like a recipe.', color: '#58a6ff' },
            { icon: '🏃', label: 'CONTAINER', sub: 'Running Instance', desc: 'A live, isolated process created from the image. Like a meal made from the recipe.', color: '#3fb950' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              style={{ background: `${item.color}12`, border: `1px solid ${item.color}40`, borderRadius: 12, padding: '14px 16px', marginBottom: 10 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: item.color, letterSpacing: 1, fontFamily: 'monospace' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Server diagram */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>Server with Docker</div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: 1 }}>SERVER</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>Linux OS</div>

            <div style={{ background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#58a6ff', marginBottom: 10 }}>Docker Runtime</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Frontend', color: '#79c0ff', icon: '🖼️' },
                  { label: 'Backend', color: '#58a6ff', icon: '⚙️' },
                ].map((c) => (
                  <div key={c.label} style={{ background: `${c.color}15`, border: `1px solid ${c.color}40`, borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.label}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Container</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ background: 'rgba(188,140,255,0.15)', border: '1px solid rgba(188,140,255,0.4)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>🗄️</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#bc8cff' }}>Database</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Container</div>
                </div>
              </div>
            </div>

            {[
              { label: '✓ Isolated from each other', color: 'var(--success)' },
              { label: '✓ Same image = same result everywhere', color: 'var(--success)' },
              { label: '✓ Easy to start, stop, restart', color: 'var(--success)' },
            ].map((item) => (
              <div key={item.label} style={{ fontSize: 11, color: item.color, marginBottom: 3 }}>{item.label}</div>
            ))}
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
