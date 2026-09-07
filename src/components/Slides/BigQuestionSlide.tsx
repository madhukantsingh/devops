import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { ChevronDown } from 'lucide-react';

interface Props { slide: SlideData; }

const steps = [
  { label: 'Business Idea', color: '#bc8cff', desc: 'Someone identifies an opportunity or problem to solve.' },
  { label: 'Requirement', color: '#58a6ff', desc: 'Product defines what exactly needs to be built.' },
  { label: 'Design', color: '#79c0ff', desc: 'UX/Design creates the experience and visual specification.' },
  { label: 'Development', color: '#56d364', desc: 'Developers write the code that powers the product.' },
  { label: 'Testing', color: '#ffa657', desc: 'QA verifies the software behaves correctly.' },
  { label: 'Deployment', color: '#f78166', desc: 'DevOps moves the validated code to the production server.' },
  { label: 'Production', color: '#d29922', desc: 'The application is live and accessible on the internet.' },
  { label: 'Customer', color: '#3fb950', desc: 'Real users interact with the finished product.' },
];

export default function BigQuestionSlide({ slide }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32, letterSpacing: -0.5, lineHeight: 1.2 }}>
        {slide.title}
      </h2>

      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', flexShrink: 0 }}>
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: `${step.color}18`,
                  border: `1px solid ${step.color}44`,
                  borderRadius: 10,
                  padding: '10px 24px',
                  minWidth: 180,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 15,
                  color: step.color,
                  cursor: 'default',
                }}
              >
                {step.label}
              </motion.div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, height: 16, background: `linear-gradient(to bottom, ${step.color}44, ${steps[i + 1].color}44)` }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step descriptions */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: step.color, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
          {expanded ? 'Hide detail' : 'Why does this matter?'}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, marginTop: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Every software project follows some version of this journey, even if the tools differ. Understanding these steps helps every team member — not just developers — know where a project is, why something is delayed, and where to look when something goes wrong. The journey is the foundation of everything we'll cover today.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  );
}
