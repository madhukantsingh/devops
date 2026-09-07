import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props { slide: SlideData; }

const steps = [
  { id: 'user', label: 'USER', icon: '👤', desc: 'Enters email and password, clicks Login' },
  { id: 'browser', label: 'Browser', icon: '🌐', desc: 'Collects form data and sends a POST request' },
  { id: 'request', label: 'POST /login', icon: '📤', desc: 'HTTP request sent to the server with credentials', code: 'POST /api/login\nContent-Type: application/json\n\n{ "email": "user@example.com",\n  "password": "••••••••" }' },
  { id: 'backend', label: 'Backend', icon: '⚙️', desc: 'Receives the request, validates format' },
  { id: 'validate', label: 'Validate Request', icon: '🔍', desc: 'Checks email format, password not empty, rate limits' },
  { id: 'database', label: 'Database', icon: '🗄️', desc: 'Looks up user by email, verifies hashed password' },
  { id: 'response', label: 'Response', icon: '📥', desc: 'Backend sends result back to browser', code: '200 OK\n\n{ "token": "eyJhbGci...",\n  "user": { "name": "Alice" } }' },
  { id: 'frontend', label: 'Frontend', icon: '🖼️', desc: 'Receives response, saves token, redirects' },
  { id: 'dashboard', label: 'Dashboard', icon: '✨', desc: 'User sees the authenticated dashboard' },
];

export default function LoginFlowSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [failure, setFailure] = useState(false);
  const activeStep = steps.find((s) => s.id === active);

  return (
    <SlideWrapper slide={slide}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(18px, 3vw, 34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{slide.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Click each step to see what happens.</p>
        </div>
        <button
          onClick={() => setFailure((v) => !v)}
          style={{
            background: failure ? 'var(--error-dim)' : 'var(--bg-card)',
            border: `1px solid ${failure ? 'var(--error)' : 'var(--border)'}`,
            color: failure ? 'var(--error)' : 'var(--text-secondary)',
            borderRadius: 8,
            padding: '7px 14px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {failure ? <XCircle size={13} /> : <CheckCircle size={13} />}
          {failure ? 'Show: 500 Error' : 'Toggle Failure'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', flexShrink: 0 }}>
          {steps.map((step, i) => {
            const isActive = active === step.id;
            const isFailed = failure && (step.id === 'response' || step.id === 'frontend' || step.id === 'dashboard');
            const color = isFailed ? '#f85149' : '#58a6ff';
            return (
              <React.Fragment key={step.id}>
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActive(isActive ? null : step.id)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: isActive ? `${color}18` : 'var(--bg-card)',
                    border: `1px solid ${isActive ? color : isFailed ? '#f8514940' : 'var(--border)'}`,
                    borderRadius: 8,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: 200,
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    opacity: isFailed ? 0.6 : 1,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{isFailed && (step.id === 'response') ? '❌' : step.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? color : isFailed ? '#f85149' : 'var(--text-secondary)' }}>
                    {step.id === 'response' && failure ? '500 Error' : step.label}
                  </span>
                </motion.button>
                {i < steps.length - 1 && (
                  <div style={{ width: 2, height: 8, background: isFailed && step.id === 'response' ? 'var(--error)' : 'var(--border)' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <AnimatePresence mode="wait">
            {activeStep ? (
              <motion.div
                key={activeStep.id + (failure ? '-fail' : '')}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{activeStep.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{activeStep.label}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: activeStep.code ? 12 : 0 }}>
                  {activeStep.id === 'response' && failure
                    ? '500 Internal Server Error — the server encountered an unexpected condition. Check the backend application logs.'
                    : activeStep.desc}
                </p>
                {activeStep.code && (
                  <pre style={{ fontFamily: 'monospace', fontSize: 11, color: activeStep.id === 'response' && failure ? 'var(--error)' : 'var(--success)', background: 'var(--bg-primary)', padding: 12, borderRadius: 8, lineHeight: 1.6, overflow: 'auto' }}>
                    {activeStep.id === 'response' && failure
                      ? 'HTTP/1.1 500 Internal Server Error\n\n{ "error": "Internal Server Error" }'
                      : activeStep.code}
                  </pre>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', padding: 30 }}>
                ← Click a step to see what happens
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
