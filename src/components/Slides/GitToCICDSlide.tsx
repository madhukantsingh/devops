import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const flowSteps = [
  { icon: '👩‍💻', label: 'Developer', color: '#58a6ff' },
  { icon: '✏️', label: 'Writes code', color: '#58a6ff' },
  { icon: '💾', label: 'Commits', color: '#bc8cff' },
  { icon: '⬆️', label: 'Pushes', color: '#bc8cff' },
  { icon: '🌐', label: 'GitHub', color: '#3fb950' },
  { icon: '⚡', label: 'Workflow triggers', color: '#ffa657' },
  { icon: '🔧', label: 'CI/CD pipeline', color: '#ffa657' },
  { icon: '🚀', label: 'Build → Test → Deploy', color: '#f85149' },
];

export default function GitToCICDSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
        Git records and transports changes. CI/CD reacts to those changes and automates what happens next.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Flow */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            The bridge
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {flowSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}30`,
                    borderRadius: 10,
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{step.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: step.color }}>{step.label}</span>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <div style={{ width: 2, height: 8, background: 'var(--border)', marginLeft: 24 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            Understanding the connection
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                icon: '🔑',
                title: 'Git does NOT deploy by itself',
                desc: 'Committing and pushing code does not automatically put it on a server. Git only records and transports changes.',
                color: '#f85149',
              },
              {
                icon: '⚡',
                title: 'CI/CD reacts to Git events',
                desc: 'A push to GitHub can trigger a CI/CD workflow (if configured). The workflow is what actually builds, tests, and deploys.',
                color: '#ffa657',
              },
              {
                icon: '🔗',
                title: 'The connection point is GitHub',
                desc: 'GitHub receives the push, detects the configured trigger (e.g., push to main), and starts the pipeline.',
                color: '#3fb950',
              },
              {
                icon: '🏗️',
                title: 'Pipeline does the work',
                desc: 'Build the app → Run tests → Security scan → Create Docker image → Deploy to server.',
                color: '#58a6ff',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}25`,
                  borderRadius: 10,
                  padding: '11px 13px',
                  display: 'flex',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 12,
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-glow)',
              borderRadius: 10,
              padding: '12px 14px',
              fontSize: 13,
              color: 'var(--accent)',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            "A commit is the trigger. CI/CD is the response."
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
