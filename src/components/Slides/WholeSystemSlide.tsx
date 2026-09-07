import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const systemNodes = [
  { label: 'BUSINESS', color: '#bc8cff', level: 0 },
  { label: 'REQUIREMENT', color: '#79c0ff', level: 1 },
  { label: 'DESIGN', color: '#79c0ff', level: 2 },
  { label: 'DEVELOPER', color: '#58a6ff', level: 3 },
  { label: 'GIT', color: '#3fb950', level: 4 },
  { label: 'GITHUB', color: '#3fb950', level: 5 },
  { label: 'CI / CD', color: '#ffa657', level: 6 },
  { label: 'DOCKER / BUILD', color: '#ffa657', level: 7 },
  { label: 'SERVER', color: '#56d364', level: 8 },
  { label: 'NGINX / PROXY', color: '#56d364', level: 9 },
];

const debugLadder = [
  { label: 'Browser', color: '#58a6ff' },
  { label: 'Network', color: '#79c0ff' },
  { label: 'Server', color: '#ffa657' },
  { label: 'Proxy', color: '#f78166' },
  { label: 'Container', color: '#56d364' },
  { label: 'Application', color: '#3fb950' },
  { label: 'Database', color: '#d29922' },
  { label: 'Logs', color: '#bc8cff' },
];

export default function WholeSystemSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>The complete journey from business to customer - and where to look when it breaks.</p>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Main system flow */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>System Flow</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start' }}>
            {systemNodes.map((node, i) => (
              <React.Fragment key={node.label}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: `${node.color}18`,
                    border: `1px solid ${node.color}44`,
                    borderRadius: 8,
                    padding: '8px 16px',
                    minWidth: 160,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, color: node.color, letterSpacing: 1 }}>{node.label}</div>
                </motion.div>
                {i < systemNodes.length - 1 && (
                  <div style={{ width: 2, height: 6, background: `linear-gradient(to bottom, ${node.color}40, ${systemNodes[i + 1].color}40)`, marginLeft: 20 }} />
                )}
              </React.Fragment>
            ))}

            {/* Split to Frontend/Backend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 6, marginLeft: 20 }}>
              {[
                { label: 'FRONTEND', color: '#58a6ff', icon: '🖼️' },
                { label: 'BACKEND', color: '#3fb950', icon: '⚙️' },
              ].map((branch) => (
                <div key={branch.label} style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
                  <div style={{ width: 2, height: 8, background: `${branch.color}40` }} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{ background: `${branch.color}18`, border: `1px solid ${branch.color}44`, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <span style={{ fontSize: 14 }}>{branch.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: branch.color }}>{branch.label}</span>
                  </motion.div>
                  {branch.label === 'BACKEND' && (
                    <>
                      <div style={{ width: 2, height: 6, background: `${branch.color}40` }} />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        style={{ background: 'rgba(210,153,34,0.18)', border: '1px solid rgba(210,153,34,0.4)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <span style={{ fontSize: 14 }}>🗄️</span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#d29922' }}>DATABASE</span>
                      </motion.div>
                      <div style={{ width: 2, height: 6, background: 'rgba(210,153,34,0.4)' }} />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ background: 'rgba(63,185,80,0.18)', border: '1px solid rgba(63,185,80,0.4)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <span style={{ fontSize: 14 }}>👤</span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#3fb950' }}>CUSTOMER</span>
                      </motion.div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Debug ladder */}
        <div style={{ minWidth: 180 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--error)', textTransform: 'uppercase', marginBottom: 12 }}>If Something Breaks →</div>
          {debugLadder.map((d, i) => (
            <React.Fragment key={d.label}>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.4 }}
                style={{
                  background: `${d.color}15`,
                  border: `1px solid ${d.color}40`,
                  borderRadius: 8,
                  padding: '7px 14px',
                  marginBottom: i < debugLadder.length - 1 ? 0 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace', width: 14, textAlign: 'right' }}>{i + 1}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: d.color }}>{d.label}</span>
              </motion.div>
              {i < debugLadder.length - 1 && (
                <div style={{ width: 2, height: 5, background: `${d.color}30`, marginLeft: 36 }} />
              )}
            </React.Fragment>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ marginTop: 12, background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 10, padding: '10px 12px' }}
          >
            <p style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
              Understand the flow.<br />
              Find the failing layer.<br />
              Then fix the problem.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
