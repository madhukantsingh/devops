import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const steps = [
  { label: 'CODE', color: '#58a6ff', icon: '📝', desc: 'Developer pushes a change' },
  { label: 'BUILD', color: '#79c0ff', icon: '🔨', desc: 'Compile and bundle the application' },
  { label: 'TEST', color: '#ffa657', icon: '🧪', desc: 'Run automated test suite' },
  { label: 'PACKAGE', color: '#bc8cff', icon: '📦', desc: 'Create deployment artifact or Docker image' },
  { label: 'DEPLOY', color: '#56d364', icon: '🚀', desc: 'Push to target environment' },
  { label: 'VERIFY', color: '#3fb950', icon: '✅', desc: 'Health checks and smoke tests' },
];

export default function CICDSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        CI/CD automates the journey from code change to deployed software - removing human error from repetitive steps.
      </p>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Pipeline visual */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}44`,
                  borderRadius: 12,
                  padding: '12px 20px',
                  width: 280,
                }}
              >
                <span style={{ fontSize: 22 }}>{step.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: step.color, letterSpacing: 1 }}>{step.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{step.desc}</div>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, height: 10, background: `linear-gradient(to bottom, ${step.color}40, ${steps[i + 1].color}40)` }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CI vs CD */}
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              label: 'CI - Continuous Integration',
              color: '#58a6ff',
              question: '"Does this new code integrate successfully with the project?"',
              points: ['Automatically triggered on every push', 'Runs build + tests', 'Fails fast - prevents broken code from proceeding'],
            },
            {
              label: 'CD - Continuous Delivery/Deployment',
              color: '#3fb950',
              question: '"Can this validated code move safely toward production?"',
              points: ['Automates deployment after successful CI', 'Consistent, repeatable releases', 'Reduces risk of manual deployment errors'],
            },
          ].map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 + 0.4 }}
              style={{ background: `${section.color}10`, border: `1px solid ${section.color}30`, borderRadius: 12, padding: '16px 18px' }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: section.color, marginBottom: 6 }}>{section.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10 }}>{section.question}</div>
              {section.points.map((p) => (
                <div key={p} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: section.color, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
