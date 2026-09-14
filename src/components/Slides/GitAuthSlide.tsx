import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Key, Shield, Globe, Terminal, Lock, Server, Check, Copy } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitAuthSlide({ slide }: Props) {
  const [activeTab, setActiveTab] = useState<'https' | 'ssh' | 'token'>('ssh');

  const authDetails = {
    https: {
      name: 'HTTPS Clone Protocol',
      url: 'https://github.com/company/project.git',
      icon: <Globe size={20} style={{ color: 'var(--accent)' }} />,
      color: 'var(--accent)',
      howItWorks: 'Uses standard HTTP/HTTPS port 443. Requests user authentication (Personal Access Token or Credential Helper) on write operations.',
      bestFor: 'Quick public clones, read-only access, or strict corporate firewalls that block SSH port 22.',
      setup: 'No SSH keys required! Simple git clone command.',
      cmd: 'git clone https://github.com/company/project.git',
    },
    ssh: {
      name: 'SSH Key Authentication (Recommended for Devs)',
      url: 'git@github.com:company/project.git',
      icon: <Key size={20} style={{ color: 'var(--success)' }} />,
      color: 'var(--success)',
      howItWorks: 'Uses SSH key pairs (Public key uploaded to GitHub, Private key saved on your machine ~/.ssh/id_ed25519). Authenticates automatically without typing passwords.',
      bestFor: 'Daily developer workflows, background automation, and secure team servers.',
      setup: '1. Generate key: ssh-keygen -t ed25519\n2. Add ~/.ssh/id_ed25519.pub to GitHub settings.',
      cmd: 'git clone git@github.com:company/project.git',
    },
    token: {
      name: 'Personal Access Tokens (PAT)',
      url: 'https://<TOKEN>@github.com/company/project.git',
      icon: <Lock size={20} style={{ color: 'var(--warning)' }} />,
      color: 'var(--warning)',
      howItWorks: 'Replaced traditional account passwords on GitHub/GitLab. Fine-grained permissions (e.g. read:repo, write:packages) with optional expiration dates.',
      bestFor: 'CI/CD build servers, automated deploy bots, API integrations, and secure HTTPS authentication.',
      setup: 'GitHub Settings → Developer Settings → Personal Access Tokens → Generate New Token.',
      cmd: 'git clone https://ghp_x89aF27k...9z@github.com/company/project.git',
    },
  };

  const active = authDetails[activeTab];

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Connecting to GitHub requires authenticating your computer. Compare <strong>HTTPS</strong>, <strong>SSH Keys</strong>, and <strong>Tokens</strong>.
      </p>

      {/* 3 Protocol Selector Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { id: 'https', label: '1. HTTPS Clone', color: 'var(--accent)' },
          { id: 'ssh', label: '2. SSH Key Clone (Recommended)', color: 'var(--success)' },
          { id: 'token', label: '3. Personal Access Token (PAT)', color: 'var(--warning)' },
        ].map((tab) => {
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: 10,
                border: isSel ? `2px solid ${tab.color}` : '1px solid var(--border)',
                background: isSel ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              <span style={{ color: tab.color }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Card */}
      <div style={{ background: 'var(--code-bg)', border: `1px solid ${active.color}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 800, color: active.color }}>
            {active.icon} {active.name}
          </div>
          <code style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '3px 8px', borderRadius: 6, fontFamily: 'monospace' }}>
            {active.url}
          </code>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: active.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              How It Works
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {active.howItWorks}
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: active.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              Where & When To Use
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {active.bestFor}
            </p>
          </div>
        </div>

        <div style={{ background: 'var(--code-bg)', borderRadius: 8, padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--code-text)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}># Command syntax:</div>
          <div style={{ color: active.color }}>$ {active.cmd}</div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, fontSize: 11 }}>
        <div style={{ background: 'var(--bg-card)', padding: 10, borderRadius: 8, border: '1px solid var(--border)' }}>
          <strong style={{ color: 'var(--accent)' }}>HTTPS:</strong> Easiest to start, works everywhere, needs token/credential manager.
        </div>
        <div style={{ background: 'var(--bg-card)', padding: 10, borderRadius: 8, border: '1px solid var(--border)' }}>
          <strong style={{ color: 'var(--success)' }}>SSH:</strong> Most convenient for developers. Passwordless, encrypted key pairs.
        </div>
        <div style={{ background: 'var(--bg-card)', padding: 10, borderRadius: 8, border: '1px solid var(--border)' }}>
          <strong style={{ color: 'var(--warning)' }}>TOKEN:</strong> Security credential used in place of account passwords for scripts & APIs.
        </div>
      </div>
    </SlideWrapper>
  );
}
