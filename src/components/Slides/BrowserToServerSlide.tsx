import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const steps = [
  { id: 'browser', label: 'Browser', icon: '🌐', color: '#58a6ff', detail: 'You type a URL or click a link. The browser needs to find the server that hosts this website.' },
  { id: 'domain', label: 'Domain', icon: '🔤', color: '#79c0ff', detail: 'The URL (e.g. myapp.com) is a human-readable name. Computers communicate using IP addresses, not names.' },
  { id: 'dns', label: 'DNS', icon: '📖', color: '#bc8cff', detail: 'DNS (Domain Name System) is like a phone book for the internet. It translates "myapp.com" into an IP address like 142.250.185.14.' },
  { id: 'ip', label: 'Server IP', icon: '🎯', color: '#ffa657', detail: 'The IP address points to a specific computer on the internet - the server where the application lives.' },
  { id: 'nginx', label: 'Nginx / Proxy', icon: '🔀', color: '#f78166', detail: 'A reverse proxy (like Nginx) sits in front of the application. It handles SSL, routes requests to the correct service, and manages load balancing.' },
  { id: 'app', label: 'Application', icon: '⚙️', color: '#56d364', detail: 'The application receives the request, processes it (queries the database, runs logic), and prepares a response.' },
  { id: 'response', label: 'Response', icon: '📤', color: '#3fb950', detail: 'The application sends the response back - typically HTML, JSON, or a file - through the same chain in reverse.' },
  { id: 'rendered', label: 'Browser renders', icon: '✨', color: '#58a6ff', detail: 'The browser receives the response, renders the HTML/CSS, executes JavaScript, and displays the page to the user.' },
];

export default function BrowserToServerSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeStep = steps.find((s) => s.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>Click each step to see a simple explanation of what happens.</p>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', flexShrink: 0 }}>
          {steps.map((step, i) => {
            const isActive = active === step.id;
            return (
              <React.Fragment key={step.id}>
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setActive(isActive ? null : step.id)}
                  whileHover={{ scale: 1.03 }}
                  style={{
                    background: isActive ? `${step.color}20` : 'var(--bg-card)',
                    border: `1px solid ${isActive ? step.color : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: '10px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: 220,
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{step.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: isActive ? step.color : 'var(--text-secondary)' }}>{step.label}</span>
                </motion.button>
                {i < steps.length - 1 && (
                  <div style={{ width: 2, height: 8, background: `linear-gradient(to bottom, ${step.color}40, ${steps[i + 1].color}40)` }} />
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
                key={activeStep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: `${activeStep.color}10`, border: `1px solid ${activeStep.color}40`, borderRadius: 12, padding: '20px 22px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{activeStep.icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: activeStep.color }}>{activeStep.label}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{activeStep.detail}</p>

                {activeStep.id === 'dns' && (
                  <div style={{ marginTop: 12, background: 'var(--bg-card)', borderRadius: 8, padding: '10px 12px' }}>
                    <code style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>
                      myapp.com → 142.250.185.14
                    </code>
                  </div>
                )}
                {activeStep.id === 'nginx' && (
                  <div style={{ marginTop: 12, background: 'var(--bg-card)', borderRadius: 8, padding: '10px 12px' }}>
                    <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-secondary)', display: 'block', lineHeight: 1.6 }}>
                      GET /api/users → backend:3000<br />
                      GET /assets/* → static files<br />
                      SSL termination → HTTPS
                    </code>
                  </div>
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
