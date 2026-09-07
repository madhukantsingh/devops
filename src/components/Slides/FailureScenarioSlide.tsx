import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Props { slide: SlideData; }

const choices = [
  { id: 'frontend', label: 'Change the frontend code', correct: false, why: 'The error 500 always originates from the server — changing frontend code is a guess, not debugging. You would waste time and potentially introduce new bugs.' },
  { id: 'restart', label: 'Restart everything randomly', correct: false, why: 'Random restarts without evidence are unprofessional and mask the real problem. Even if it works temporarily, the issue will return.' },
  { id: 'inspect', label: 'Inspect the request and backend logs', correct: true, why: 'The Network tab shows a 500 response. 500 = server-side error. The next step is always: read the backend logs to find the actual error message.' },
];

const revealed = {
  network: 'POST /api/login\nStatus: 500 Internal Server Error\nResponse: { "error": "Internal Server Error" }',
  log: 'ERROR [2026-09-07 19:08:05] Unhandled exception in LoginController\nError: Connection to database failed\n  → connect ECONNREFUSED 127.0.0.1:5432\n  → PostgreSQL is not running',
};

export default function FailureScenarioSlide({ slide }: Props) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const choiceData = choices.find((c) => c.id === chosen);

  return (
    <SlideWrapper slide={slide}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <AlertTriangle size={18} style={{ color: 'var(--error)' }} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--error)', textTransform: 'uppercase' }}>Simulated Incident</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>— not a real live system</span>
      </div>

      <h2 style={{ fontSize: 'clamp(18px, 3vw, 30px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>{slide.title}</h2>

      {/* Scenario */}
      <div style={{ background: 'var(--error-dim)', border: '1px solid var(--error)', borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--error)', marginBottom: 8 }}>📞 Customer report:</div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          "The login page opens fine, but when I click Login it shows an error."
        </p>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {['Browser', '→', 'POST /api/login', '→', '500 Internal Server Error'].map((s, i) => (
            <span key={i} style={{ fontSize: 12, color: i % 2 === 0 ? 'var(--accent)' : 'var(--text-muted)', background: i % 2 === 0 ? 'var(--bg-card)' : 'transparent', borderRadius: 6, padding: i % 2 === 0 ? '3px 10px' : '0', fontFamily: i >= 2 ? 'monospace' : 'inherit' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Choices */}
      {!chosen && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>What should you do next?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {choices.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setChosen(c.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left', fontSize: 14, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace', flexShrink: 0 }}>{i + 1}.</span>
                {c.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {chosen && choiceData && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Chosen result */}
            <div style={{
              background: choiceData.correct ? 'var(--success-dim)' : 'var(--error-dim)',
              border: `1px solid ${choiceData.correct ? 'var(--success)' : 'var(--error)'}`,
              borderRadius: 10,
              padding: '14px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {choiceData.correct ? <CheckCircle size={16} style={{ color: 'var(--success)' }} /> : <XCircle size={16} style={{ color: 'var(--error)' }} />}
                <span style={{ fontSize: 14, fontWeight: 700, color: choiceData.correct ? 'var(--success)' : 'var(--error)' }}>
                  {choiceData.correct ? 'Correct!' : 'Not the best approach'}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{choiceData.why}</p>
            </div>

            {/* Reveal investigation */}
            {choiceData.correct && !showReveal && (
              <button onClick={() => setShowReveal(true)} style={{ background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                → Inspect the evidence
              </button>
            )}

            {showReveal && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <button onClick={() => setShowNetwork((v) => !v)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12, marginBottom: 6 }}>
                    🌐 {showNetwork ? 'Hide' : 'Show'} Network Tab
                  </button>
                  {showNetwork && (
                    <pre style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--error)', background: 'var(--bg-primary)', padding: 12, borderRadius: 8, lineHeight: 1.6 }}>
                      {revealed.network}
                    </pre>
                  )}
                </div>
                <div>
                  <button onClick={() => setShowLog((v) => !v)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12, marginBottom: 6 }}>
                    📋 {showLog ? 'Hide' : 'Show'} Backend Log
                  </button>
                  {showLog && (
                    <>
                      <pre style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--error)', background: 'var(--bg-primary)', padding: 12, borderRadius: 8, lineHeight: 1.6 }}>
                        {revealed.log}
                      </pre>
                      <div style={{ marginTop: 10, background: 'var(--success-dim)', border: '1px solid var(--success)', borderRadius: 10, padding: '12px 16px' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)', marginBottom: 6 }}>✓ Root cause identified</div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>The database is not running. The frontend was <strong>not</strong> the problem. Changing frontend code would have solved nothing.</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {!choiceData.correct && (
              <button onClick={() => setChosen(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 12 }}>
                Try again
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </SlideWrapper>
  );
}
