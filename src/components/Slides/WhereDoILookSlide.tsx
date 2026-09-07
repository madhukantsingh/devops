import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const scenarios = [
  {
    id: 'no-open',
    label: '🔴 Website doesn\'t open',
    firstLook: 'DNS / Network / Server',
    why: 'The request never reached the server - the problem is before the application.',
    evidence: 'Browser shows "ERR_NAME_NOT_RESOLVED" or connection timeout',
    rootCause: 'DNS misconfiguration, server is down, or firewall blocking traffic',
    nextStep: 'ping domain.com → check DNS records → check server status in cloud console',
  },
  {
    id: 'api-fails',
    label: '🟡 Page loads, API fails',
    firstLook: 'Network Tab → Backend Logs',
    why: 'The frontend loaded (good), but backend requests are failing.',
    evidence: 'Browser Network tab shows 500 or 502 on API requests',
    rootCause: 'Backend application error, or proxy misconfiguration',
    nextStep: 'Open DevTools → Network tab → click failing request → check status + response body → read backend logs',
  },
  {
    id: 'error-500',
    label: '💥 500 Error',
    firstLook: 'Application Logs',
    why: '500 means the server crashed processing your request - always check the server-side code.',
    evidence: 'API returns { "error": "Internal Server Error" }',
    rootCause: 'Unhandled exception, null pointer, failed database query',
    nextStep: 'SSH to server → docker logs <container> → read the stack trace → identify the failing line',
  },
  {
    id: 'error-502',
    label: '🔀 502 Error',
    firstLook: 'Reverse Proxy → Backend Connection',
    why: '502 Bad Gateway means Nginx received a bad response from the backend - usually the backend is down.',
    evidence: 'Browser shows "502 Bad Gateway" - Nginx error page',
    rootCause: 'Backend container crashed, wrong port, process not running',
    nextStep: 'docker ps → check container status → docker logs <backend> → restart container if needed',
  },
  {
    id: 'deploy-failed',
    label: '⚙️ Deployment failed',
    firstLook: 'CI/CD Pipeline Logs',
    why: 'The deployment pipeline stopped before completing - find which stage failed.',
    evidence: 'GitHub Actions / CI dashboard shows red X on the pipeline',
    rootCause: 'Test failure, build error, Docker push failure, or server permission issue',
    nextStep: 'Open CI/CD dashboard → click failed run → read stage output → fix the reported error',
  },
  {
    id: 'ui-old',
    label: '👻 UI shows old code',
    firstLook: 'Deployment Status → Browser Cache → Build',
    why: 'Either the deployment hasn\'t run yet, the build didn\'t complete, or the browser is caching the old version.',
    evidence: 'New feature you deployed is not visible - but no error shown',
    rootCause: 'Pipeline not triggered, cache-busting not configured, or CDN not cleared',
    nextStep: 'Check CI/CD - did deployment succeed? Hard refresh (Ctrl+Shift+R) → check build output → clear CDN if needed',
  },
  {
    id: 'db-fail',
    label: '🗄️ Database connection failed',
    firstLook: 'Application Logs → Database',
    why: 'Application can\'t connect to the database - check credentials, connectivity, and DB health.',
    evidence: 'Application logs: "ECONNREFUSED" or "database connection timeout"',
    rootCause: 'DB is down, wrong credentials, connection pool exhausted, firewall rule',
    nextStep: 'docker logs <app> → find DB error → check DB container → verify DB credentials in env config',
  },
];

export default function WhereDoILookSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeScenario = scenarios.find((s) => s.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px, 3vw, 34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
        Select a symptom to see where to look first and why. <em style={{ color: 'var(--text-muted)' }}>(Simulated examples)</em>
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Scenario list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 260 }}>
          {scenarios.map((s, i) => {
            const isActive = active === s.id;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActive(isActive ? null : s.id)}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: isActive ? 'var(--accent-dim)' : 'var(--bg-card)',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8,
                  padding: '10px 14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                {s.label}
              </motion.button>
            );
          })}
        </div>

        {/* Detail */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <AnimatePresence mode="wait">
            {activeScenario ? (
              <motion.div
                key={activeScenario.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {[
                  { title: '🎯 First place to inspect', value: activeScenario.firstLook, highlight: true },
                  { title: '📋 What you might see', value: activeScenario.evidence },
                  { title: '🔍 Why', value: activeScenario.why },
                  { title: '⚡ Possible root cause', value: activeScenario.rootCause },
                  { title: '→ Next step', value: activeScenario.nextStep },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: item.highlight ? 'var(--accent-dim)' : 'var(--bg-card)',
                      border: `1px solid ${item.highlight ? 'var(--accent-glow)' : 'var(--border)'}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: item.highlight ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 13, color: item.highlight ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: item.highlight ? 600 : 400, lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '4px 0' }}>
                  ⚠️ Simulated example - not a real live system
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 30 }}>
                ← Select a symptom to see where to look
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
}
