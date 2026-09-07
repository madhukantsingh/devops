import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const cloudLayers = [
  { label: 'Cloud Provider', sub: 'AWS / Azure / Google Cloud', color: '#bc8cff', icon: '☁️' },
  { label: 'Virtual Server', sub: 'A computer you can rent', color: '#58a6ff', icon: '🖥️' },
  { label: 'CPU + RAM + Storage', sub: 'The hardware resources', color: '#79c0ff', icon: '⚡' },
  { label: 'Operating System', sub: 'Usually Linux', color: '#56d364', icon: '🐧' },
  { label: 'Your Application', sub: 'What we deploy', color: '#3fb950', icon: '🚀' },
];

export default function CloudSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Cloud providers rent us computers on the internet - no physical hardware ownership needed.
      </p>

      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Cloud stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', flexShrink: 0 }}>
          {cloudLayers.map((layer, i) => (
            <React.Fragment key={layer.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  background: `${layer.color}18`,
                  border: `1px solid ${layer.color}44`,
                  borderRadius: 12,
                  padding: '14px 24px',
                  width: 260,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24, flexShrink: 0 }}>{layer.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: layer.color }}>{layer.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{layer.sub}</div>
                </div>
              </motion.div>
              {i < cloudLayers.length - 1 && (
                <div style={{ width: 2, height: 12, background: `linear-gradient(to bottom, ${layer.color}40, ${cloudLayers[i + 1].color}40)` }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>What the cloud gives us</div>
            {[
              'A computer on the internet without owning hardware',
              'Pay only for what you use',
              'Scale up or down as needed',
              'Global availability and redundancy',
              'Managed infrastructure - no data centre needed',
            ].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.5 }} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ background: 'var(--warning-dim)', border: '1px solid rgba(210,153,34,0.3)', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning)', marginBottom: 6 }}>Out of scope today</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>VPC internals, IAM policies, subnets, autoscaling, advanced networking - these are future topics.</div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
