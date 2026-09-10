import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { AlertTriangle } from 'lucide-react';

interface Props { slide: SlideData; }

const ignoreItems = [
  { name: 'node_modules/', color: '#58a6ff', reason: 'Thousands of dependency files — regenerated via npm install' },
  { name: '.env', color: '#f85149', reason: 'Environment variables and secrets — NEVER commit this', critical: true },
  { name: 'build/', color: '#3fb950', reason: 'Generated output — reproducible from source code' },
  { name: 'dist/', color: '#3fb950', reason: 'Distribution files — built by CI/CD, not committed manually' },
  { name: '*.log', color: '#d29922', reason: 'Log files — temporary, machine-specific' },
  { name: '.DS_Store', color: '#8b949e', reason: 'macOS folder metadata — irrelevant to the project' },
  { name: '*.pem', color: '#f85149', reason: 'Private keys and certificates — extremely sensitive', critical: true },
];

export default function GitIgnoreSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        The <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>.gitignore</code> file lists files and folders that Git should never track.
      </p>

      {/* Critical warning */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        background: 'rgba(248,81,73,0.1)',
        border: '2px solid rgba(248,81,73,0.5)',
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 18,
      }}>
        <AlertTriangle size={20} style={{ color: '#f85149', flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#f85149', marginBottom: 4 }}>
            ⚠️ CRITICAL: Git remembers everything you commit
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            If you commit a secret (API key, password, database URL) and push it to GitHub — even a private repo —
            it is extremely difficult to truly erase. Even if you delete the file later, the commit history retains it.{' '}
            <strong style={{ color: '#f85149' }}>If you accidentally commit a secret, rotate it immediately.</strong>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* .gitignore file visual */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            Example .gitignore
          </div>
          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>
              📄 .gitignore
            </div>
            <div style={{ padding: '12px 14px' }}>
              {[
                { line: '# Dependencies', comment: true },
                { line: 'node_modules/', color: '#58a6ff' },
                { line: '', comment: true },
                { line: '# Environment secrets', comment: true },
                { line: '.env', color: '#f85149' },
                { line: '.env.local', color: '#f85149' },
                { line: '*.pem', color: '#f85149' },
                { line: '', comment: true },
                { line: '# Build output', comment: false },
                { line: 'dist/', color: '#3fb950' },
                { line: 'build/', color: '#3fb950' },
                { line: '', comment: true },
                { line: '# OS files', comment: true },
                { line: '.DS_Store', color: '#8b949e' },
                { line: '*.log', color: '#d29922' },
              ].map((item, i) => (
                <div key={i} style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  lineHeight: 1.9,
                  color: item.comment ? '#8b949e' : (item.color || 'var(--text-secondary)'),
                  fontStyle: item.comment && !item.line.startsWith('#') ? 'normal' : 'normal',
                }}>
                  {item.line || '\u00A0'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What to ignore */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
            What to ignore and why
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ignoreItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: item.critical ? 'rgba(248,81,73,0.06)' : 'var(--bg-card)',
                  border: `1px solid ${item.critical ? 'rgba(248,81,73,0.3)' : 'var(--border)'}`,
                  borderRadius: 9,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <code style={{ fontSize: 11, color: item.color, fontFamily: 'monospace', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                  {item.name}
                </code>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.reason}</span>
                {item.critical && <span style={{ fontSize: 9, fontWeight: 800, color: '#f85149', background: 'rgba(248,81,73,0.1)', borderRadius: 4, padding: '2px 5px', flexShrink: 0, marginLeft: 'auto' }}>NEVER</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
