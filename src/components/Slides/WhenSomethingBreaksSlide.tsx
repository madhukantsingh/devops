import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const layers = [
  {
    id: 'browser',
    label: '1. Browser',
    icon: '🌐',
    color: '#58a6ff',
    check: 'Open DevTools → Console and Network tabs',
    symptom: 'Page not loading, blank screen, JavaScript errors',
    log: 'Console: "Uncaught TypeError: Cannot read property…"',
    next: 'Check Network tab for failed requests',
  },
  {
    id: 'network',
    label: '2. Network',
    icon: '📡',
    color: '#79c0ff',
    check: 'Network tab → check request/response status codes',
    symptom: 'API calls failing, CORS errors, timeout',
    log: 'Network tab: GET /api/users → 404 Not Found',
    next: 'Check the URL/route. If 5xx, move to server layer.',
  },
  {
    id: 'dns',
    label: '3. DNS',
    icon: '📖',
    color: '#bc8cff',
    check: 'nslookup domain.com or ping domain.com',
    symptom: 'Website completely unreachable — "DNS_PROBE_FAILED"',
    log: '"Server IP address could not be found"',
    next: 'Check DNS records in domain registrar dashboard',
  },
  {
    id: 'server',
    label: '4. Server',
    icon: '🖥️',
    color: '#ffa657',
    check: 'SSH to server and check if it\'s reachable',
    symptom: 'Connection refused, timeout, no response',
    log: '"ssh: connect to host port 22: Connection refused"',
    next: 'Check cloud console — is the server running?',
  },
  {
    id: 'proxy',
    label: '5. Reverse Proxy',
    icon: '🔀',
    color: '#f78166',
    check: 'Check Nginx/Apache error logs',
    symptom: '502 Bad Gateway, 504 Timeout',
    log: 'nginx: "upstream connect() failed"',
    next: 'Check if the backend process is running',
  },
  {
    id: 'container',
    label: '6. Container',
    icon: '📦',
    color: '#56d364',
    check: 'docker ps — is the container running? docker logs <name>',
    symptom: 'Application completely not responding',
    log: 'docker ps: container shows "Exited (1)"',
    next: 'Check container logs for startup errors',
  },
  {
    id: 'app',
    label: '7. Application',
    icon: '⚙️',
    color: '#3fb950',
    check: 'Check application logs — stdout, error files, logging service',
    symptom: '500 Internal Server Error',
    log: 'ERROR: Cannot connect to database: ECONNREFUSED',
    next: 'Read the stack trace — identify the failing line',
  },
  {
    id: 'database',
    label: '8. Database',
    icon: '🗄️',
    color: '#d29922',
    check: 'Check database logs and connection health',
    symptom: 'App errors mentioning "connection refused" or "timeout"',
    log: 'FATAL: max_connections exceeded',
    next: 'Restart DB or fix connection pool configuration',
  },
  {
    id: 'data',
    label: '9. Data / Logic',
    icon: '📊',
    color: '#e3b341',
    check: 'Inspect the data itself — bad records, wrong values',
    symptom: 'Application works but gives wrong results',
    log: 'Expected: "active" → Found: null',
    next: 'Write a targeted query to inspect the problematic data',
  },
];

export default function WhenSomethingBreaksSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeLayer = layers.find((l) => l.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px, 3vw, 32px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>Click a layer to see what to check, the typical symptom, and next action.</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Ladder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0, minWidth: 210 }}>
          {layers.map((layer, i) => {
            const isActive = active === layer.id;
            return (
              <motion.button
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActive(isActive ? null : layer.id)}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: isActive ? `${layer.color}18` : 'var(--bg-card)',
                  border: `1px solid ${isActive ? layer.color : 'var(--border)'}`,
                  borderRadius: 8,
                  padding: '9px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 16 }}>{layer.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? layer.color : 'var(--text-secondary)' }}>{layer.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <AnimatePresence mode="wait">
            {activeLayer ? (
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div style={{ background: `${activeLayer.color}12`, border: `1px solid ${activeLayer.color}40`, borderRadius: 12, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{activeLayer.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: activeLayer.color }}>{activeLayer.label}</span>
                  </div>

                  {[
                    { title: 'What to check', value: activeLayer.check, color: 'var(--accent)' },
                    { title: 'Typical symptom', value: activeLayer.symptom, color: 'var(--warning)' },
                    { title: 'Next step', value: activeLayer.next, color: 'var(--success)' },
                  ].map((item) => (
                    <div key={item.title} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.value}</div>
                    </div>
                  ))}

                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--error)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Example log</div>
                    <code style={{ fontSize: 11, color: 'var(--error)', fontFamily: 'monospace', background: 'var(--bg-primary)', display: 'block', padding: 8, borderRadius: 6 }}>
                      {activeLayer.log}
                    </code>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Debugging Rule</div>
                  <div style={{ fontSize: 36, textAlign: 'center', margin: '12px 0' }}>🔍</div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.6 }}>
                    Always debug from the <strong style={{ color: 'var(--accent)' }}>outside in</strong>.<br />
                    Start with Browser → work toward Database.
                  </p>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
                  ← Click a layer to see what to check
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
