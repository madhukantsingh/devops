import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const before = [
  { line: 'const API_TIMEOUT = 30;', type: 'ctx' },
  { line: 'const MAX_RETRIES = 3;', type: 'ctx' },
  { line: 'const DB_POOL_SIZE = 5;', type: 'remove' },
  { line: 'const CACHE_TTL = 300;', type: 'ctx' },
];

const after = [
  { line: 'const API_TIMEOUT = 30;', type: 'ctx' },
  { line: 'const MAX_RETRIES = 3;', type: 'ctx' },
  { line: 'const DB_POOL_SIZE = 20;', type: 'add' },
  { line: 'const CACHE_TTL = 300;', type: 'ctx' },
];

const diffLines = [
  { line: ' const API_TIMEOUT = 30;', type: 'ctx' },
  { line: ' const MAX_RETRIES = 3;', type: 'ctx' },
  { line: '-const DB_POOL_SIZE = 5;', type: 'remove' },
  { line: '+const DB_POOL_SIZE = 20;', type: 'add' },
  { line: ' const CACHE_TTL = 300;', type: 'ctx' },
];

export default function GitDiffSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git diff</code> shows exactly what changed — line by line — before you commit.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
        {/* Before */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
            Before (last commit)
          </div>
          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '7px 12px', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>config.ts</div>
            <div style={{ padding: '10px 14px' }}>
              {before.map((item, i) => (
                <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 2, color: item.type === 'remove' ? '#f85149' : 'var(--text-muted)', background: item.type === 'remove' ? 'rgba(248,81,73,0.1)' : 'transparent' }}>
                  {item.line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* After */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
            After (current working file)
          </div>
          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '7px 12px', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>config.ts</div>
            <div style={{ padding: '10px 14px' }}>
              {after.map((item, i) => (
                <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 2, color: item.type === 'add' ? '#3fb950' : 'var(--text-muted)', background: item.type === 'add' ? 'rgba(63,185,80,0.1)' : 'transparent' }}>
                  {item.line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diff output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
          $ git diff (output)
        </div>
        <div style={{ background: 'var(--code-bg)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f85149' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#d29922' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fb950' }} />
            </div>
            <code style={{ fontSize: 10, color: 'var(--text-muted)' }}>diff --git a/config.ts b/config.ts</code>
          </div>
          <div style={{ padding: '12px 16px' }}>
            {diffLines.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13,
                  lineHeight: 2,
                  color: item.type === 'add' ? '#3fb950' : item.type === 'remove' ? '#f85149' : 'var(--text-muted)',
                  background: item.type === 'add' ? 'rgba(63,185,80,0.1)' : item.type === 'remove' ? 'rgba(248,81,73,0.1)' : 'transparent',
                  paddingLeft: 8,
                  whiteSpace: 'pre',
                }}
              >
                {item.line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { prefix: '-', color: '#f85149', label: 'Line was removed' },
          { prefix: '+', color: '#3fb950', label: 'Line was added' },
          { prefix: ' ', color: '#8b949e', label: 'Unchanged context' },
        ].map((item) => (
          <div key={item.prefix} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px' }}>
            <code style={{ fontSize: 14, color: item.color, fontFamily: 'monospace', fontWeight: 800 }}>{item.prefix}</code>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}
