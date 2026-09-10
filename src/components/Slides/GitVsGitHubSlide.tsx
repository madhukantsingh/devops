import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const rows = [
  { git: 'Version control system', github: 'Hosting & collaboration platform' },
  { git: 'Runs on your computer', github: 'Runs as an online service' },
  { git: 'Tracks project history', github: 'Stores remote repositories' },
  { git: 'Creates commits', github: 'Hosts and reviews code (Pull Requests)' },
  { git: 'Creates branches', github: 'Enables team collaboration around branches' },
  { git: 'Can work offline', github: 'Requires a network connection' },
  { git: 'Free, open-source tool', github: 'Commercial platform (with free tier)' },
];

export default function GitVsGitHubSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        One of the most common misconceptions in software development.
      </p>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Comparison table */}
        <div style={{ flex: 2, minWidth: 300 }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            marginBottom: 6,
          }}>
            <div style={{
              background: 'rgba(248,81,73,0.12)',
              border: '1px solid rgba(248,81,73,0.3)',
              borderRadius: '10px 10px 0 0',
              padding: '10px 14px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: 15,
              color: '#f85149',
            }}>
              🔧 Git
            </div>
            <div style={{
              background: 'rgba(88,166,255,0.12)',
              border: '1px solid rgba(88,166,255,0.3)',
              borderRadius: '10px 10px 0 0',
              padding: '10px 14px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: 15,
              color: '#58a6ff',
            }}>
              🌐 GitHub
            </div>
          </div>

          {/* Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {rows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 2,
                }}
              >
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(248,81,73,0.15)',
                  padding: '9px 14px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  borderRadius: i === rows.length - 1 ? '0 0 0 10px' : 0,
                }}>
                  {row.git}
                </div>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(88,166,255,0.15)',
                  padding: '9px 14px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  borderRadius: i === rows.length - 1 ? '0 0 10px 0' : 0,
                }}>
                  {row.github}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual flow diagram */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            How they connect
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {/* Developer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'rgba(248,81,73,0.1)',
                border: '1px solid rgba(248,81,73,0.35)',
                borderRadius: 12,
                padding: '12px 20px',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>💻</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f85149' }}>Developer Computer</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Git installed locally</div>
            </motion.div>

            {/* Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 0' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-glow)',
                  borderRadius: 6,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontFamily: 'monospace',
                }}
              >
                git push
              </motion.div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'rgba(63,185,80,0.1)',
                  border: '1px solid rgba(63,185,80,0.3)',
                  borderRadius: 6,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#3fb950',
                  fontFamily: 'monospace',
                }}
              >
                git pull
              </motion.div>
              <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
            </div>

            {/* GitHub */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                background: 'rgba(88,166,255,0.1)',
                border: '1px solid rgba(88,166,255,0.35)',
                borderRadius: 12,
                padding: '12px 20px',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>🌐</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#58a6ff' }}>GitHub</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Shared remote repository</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 14,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 12,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>Alternatives to GitHub:</strong><br />
            GitLab, Bitbucket, Azure DevOps — all use Git under the hood.
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
