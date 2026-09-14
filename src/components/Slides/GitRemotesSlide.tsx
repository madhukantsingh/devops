import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Server, Laptop, Cloud, GitBranch, Globe, HardDrive, ArrowRight, RefreshCw, Layers } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitRemotesSlide({ slide }: Props) {
  const [selectedRemote, setSelectedRemote] = useState<'origin' | 'upstream' | 'production'>('origin');

  const remoteDetails = {
    origin: {
      name: 'origin (GitHub / Main Team Repo)',
      url: 'https://github.com/mycompany/app.git',
      purpose: 'Primary team collaboration remote. Everyone pushes feature branches and opens PRs here.',
      cmd: 'git remote add origin https://github.com/mycompany/app.git',
      role: 'Team Central Hub',
      color: 'var(--accent)',
    },
    upstream: {
      name: 'upstream (Original Open Source / Parent Repo)',
      url: 'https://github.com/framework/core.git',
      purpose: 'Parent repository when you fork a project. Used to pull latest updates from original author.',
      cmd: 'git remote add upstream https://github.com/framework/core.git',
      role: 'Fork Synchronizer',
      color: 'var(--warning)',
    },
    production: {
      name: 'production (Production Deployment Server / Heroku / VPS)',
      url: 'git@production-server.com:apps/web.git',
      purpose: 'Direct deployment endpoint. Pushing to this remote triggers live build and customer updates.',
      cmd: 'git remote add production git@production-server.com:apps/web.git',
      role: 'Live Deployment Target',
      color: 'var(--success)',
    },
  };

  const active = remoteDetails[selectedRemote];

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Your local machine stores code locally. <strong>Remotes</strong> are remote server locations (like origin, upstream, and production) where repositories are synchronized.
      </p>

      {/* Architecture Diagram */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          {/* Local Developer Machine */}
          <div style={{ flex: 1, minWidth: 160, background: 'var(--bg-card-hover)', border: '1.5px solid var(--accent)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
            <Laptop size={24} style={{ color: 'var(--accent)', marginBottom: 6 }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Local Machine</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Working Dir + .git repo</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--accent)' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>GIT PUSH / PULL</span>
            <ArrowRight size={20} />
          </div>

          {/* Remotes Selector Buttons */}
          <div style={{ flex: 2, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(Object.keys(remoteDetails) as Array<keyof typeof remoteDetails>).map((key) => {
              const r = remoteDetails[key];
              const isSelected = selectedRemote === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRemote(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: isSelected ? `1.5px solid ${r.color}` : '1px solid var(--border)',
                    background: isSelected ? 'var(--bg-primary)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Server size={16} style={{ color: r.color }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{key.toUpperCase()}</span>
                  </div>
                  <span style={{ fontSize: 10, color: r.color, fontWeight: 700, padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
                    {r.role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Remote Details Panel */}
      <motion.div
        key={selectedRemote}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: 'var(--code-bg)', border: `1px solid ${active.color}`, borderRadius: 12, padding: 16 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: active.color, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cloud size={16} /> {active.name}
          </div>
          <code style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 4 }}>
            {active.url}
          </code>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
          {active.purpose}
        </p>

        <div style={{ background: 'var(--code-bg)', borderRadius: 8, padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--code-text)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}># Register or list remotes:</div>
          <div style={{ color: active.color }}>$ {active.cmd}</div>
          <div style={{ color: '#79c0ff', marginTop: 4 }}>$ git remote -v</div>
        </div>
      </motion.div>

      {/* Key distinction box */}
      <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Layers size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span><strong>Key Concept:</strong> Git repos can have <i>multiple</i> remotes simultaneously (e.g. push to <code style={{ color: 'var(--accent)' }}>origin</code> for PR review, and push to <code style={{ color: 'var(--success)' }}>production</code> for live deployments).</span>
      </div>
    </SlideWrapper>
  );
}
