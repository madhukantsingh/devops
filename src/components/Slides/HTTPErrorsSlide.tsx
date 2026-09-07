import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const errors = [
  { code: 400, name: 'Bad Request', color: '#ffa657', icon: '📝', firstCheck: 'Request payload / parameters', desc: 'The request was malformed — missing required fields, wrong data format, or invalid parameters.', example: 'Missing "email" field in POST /login body' },
  { code: 401, name: 'Unauthorized', color: '#f85149', icon: '🔑', firstCheck: 'Login / token / session', desc: 'Authentication is required but the user is not authenticated. Token may be missing, expired, or invalid.', example: 'JWT token expired — user needs to log in again' },
  { code: 403, name: 'Forbidden', color: '#f85149', icon: '🚫', firstCheck: 'Permissions / roles', desc: 'Authenticated but not allowed. The user is logged in but does not have permission for this resource.', example: 'Regular user trying to access admin dashboard' },
  { code: 404, name: 'Not Found', color: '#d29922', icon: '🔍', firstCheck: 'URL / route / resource', desc: 'The requested URL or resource does not exist. Could be a wrong URL, deleted resource, or missing route.', example: 'GET /api/v2/users — API v2 does not exist' },
  { code: 429, name: 'Too Many Requests', color: '#d29922', icon: '⏱️', firstCheck: 'Rate limiting', desc: 'Too many requests in a short time window. The server is throttling to protect against abuse.', example: 'Login attempts exceeded: 100 requests in 60 seconds' },
  { code: 500, name: 'Server Error', color: '#f85149', icon: '💥', firstCheck: 'Backend application logs', desc: 'The server encountered an unexpected condition. This is always a server-side bug or configuration issue.', example: 'Unhandled exception in payment processing logic' },
  { code: 502, name: 'Bad Gateway', color: '#f85149', icon: '🔀', firstCheck: 'Reverse proxy ↔ backend connection', desc: 'The proxy received an invalid response from the upstream server. Backend may be down or crashed.', example: 'Nginx can\'t reach the Node.js backend on port 3000' },
  { code: 503, name: 'Service Unavailable', color: '#f85149', icon: '🔴', firstCheck: 'Application / server health', desc: 'The server is not available — overloaded, in maintenance, or crashed.', example: 'Server out of memory — container restarting' },
  { code: 504, name: 'Gateway Timeout', color: '#f85149', icon: '⏰', firstCheck: 'Slow / unavailable backend', desc: 'The proxy did not receive a response in time from the upstream server.', example: 'Database query taking > 30 seconds to respond' },
];

const groups = [
  { label: '4xx — Client errors', desc: 'Something is wrong with the request', range: [400, 403, 404, 429] },
  { label: '5xx — Server errors', desc: 'Something went wrong on the server', range: [500, 502, 503, 504] },
];

export default function HTTPErrorsSlide({ slide }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const activeError = errors.find((e) => e.code === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px, 3vw, 34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>Click any error code to see what it means and where to look first.</p>
      <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--accent)', marginBottom: 20 }}>
        "HTTP status tells you the neighborhood. Logs tell you the house."
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Error grid */}
        <div style={{ minWidth: 320 }}>
          {groups.map((group) => (
            <div key={group.label} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                {group.label} — <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{group.desc}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                {errors.filter((e) => group.range.includes(e.code)).map((err, i) => {
                  const isActive = active === err.code;
                  return (
                    <motion.button
                      key={err.code}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setActive(isActive ? null : err.code)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: isActive ? `${err.color}20` : 'var(--bg-card)',
                        border: `1px solid ${isActive ? err.color : 'var(--border)'}`,
                        borderRadius: 10,
                        padding: '12px 10px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: 24, marginBottom: 4 }}>{err.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: isActive ? err.color : 'var(--text-primary)', fontFamily: 'monospace' }}>{err.code}</div>
                      <div style={{ fontSize: 10, color: isActive ? err.color : 'var(--text-muted)', fontWeight: 600 }}>{err.name}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <AnimatePresence mode="wait">
            {activeError ? (
              <motion.div
                key={activeError.code}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: `${activeError.color}10`, border: `1px solid ${activeError.color}40`, borderRadius: 14, padding: '18px 20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 32 }}>{activeError.icon}</span>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: activeError.color, fontFamily: 'monospace', lineHeight: 1 }}>{activeError.code}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>{activeError.name}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{activeError.desc}</p>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: activeError.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>First place to check</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', background: 'var(--bg-card)', padding: '8px 12px', borderRadius: 8 }}>
                    {activeError.firstCheck}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Example scenario</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{activeError.example}</div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 30 }}>
                ← Click an error code to learn more
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
