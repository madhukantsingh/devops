import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Settings, User, Mail, GitBranch, Terminal, Shield, Check, Copy } from 'lucide-react';

interface Props { slide: SlideData; }

export default function GitConfigSlide({ slide }: Props) {
  const [activeTab, setActiveTab] = useState<'global' | 'local' | 'system'>('global');
  const [userName, setUserName] = useState('Alex Rivera');
  const [userEmail, setUserEmail] = useState('alex@company.com');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [copied, setCopied] = useState(false);

  const getConfigCommand = () => {
    if (activeTab === 'global') {
      return `git config --global user.name "${userName}"
git config --global user.email "${userEmail}"
git config --global init.defaultBranch "${defaultBranch}"
git config --global core.editor "code --wait"`;
    }
    if (activeTab === 'local') {
      return `git config --local user.name "${userName} (Work)"
git config --local user.email "alex.r@enterprise.com"`;
    }
    return `git config --system core.autocrlf true`;
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(getConfigCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18 }}>
        Before making commits, Git needs to know who you are and how your workspace should behave.
      </p>

      {/* 3 Scope Selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { id: 'global', name: 'Global Scope', desc: 'Applied to ALL projects on your computer (~/.gitconfig)', color: 'var(--accent)' },
          { id: 'local', name: 'Local Scope', desc: 'Specific to ONE repository only (.git/config)', color: 'var(--success)' },
          { id: 'system', name: 'System Scope', desc: 'Applied to ALL users on this machine (/etc/gitconfig)', color: 'var(--warning)' },
        ].map((scope) => {
          const isActive = activeTab === scope.id;
          return (
            <button
              key={scope.id}
              onClick={() => setActiveTab(scope.id as any)}
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: 10,
                border: isActive ? `1.5px solid ${scope.color}` : '1px solid var(--border)',
                background: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                color: 'var(--text-primary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Settings size={14} style={{ color: scope.color }} />
                <span style={{ fontSize: 13, fontWeight: 700 }}>{scope.name}</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>{scope.desc}</p>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Interactive Identity Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <User size={13} /> Customize Your Identity
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>User Name</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 8, padding: '6px 10px' }}>
                <User size={14} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--input-text)', fontSize: 13, fontWeight: 600, width: '100%', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>User Email</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 8, padding: '6px 10px' }}>
                <Mail size={14} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--input-text)', fontSize: 13, fontWeight: 600, width: '100%', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Default Branch Name</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 8, padding: '6px 10px' }}>
                <GitBranch size={14} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="text"
                  value={defaultBranch}
                  onChange={(e) => setDefaultBranch(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--input-text)', fontSize: 13, fontWeight: 600, width: '100%', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Terminal Output */}
        <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Terminal size={12} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>Terminal Commands</span>
            </div>
            <button
              onClick={handleCopy}
              style={{ background: 'transparent', border: 'none', color: copied ? 'var(--success)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div style={{ padding: 14, flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.8, color: 'var(--code-text)' }}>
            {getConfigCommand().split('\n').map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--accent)', userSelect: 'none' }}>$</span>
                <span>{line}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: 11 }}>
              # View active configuration settings:<br />
              <span style={{ color: '#79c0ff' }}>$ git config --list</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Shield size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>
          <strong style={{ color: 'var(--accent)' }}>Why this matters:</strong> Git attaches your name and email to every single commit you create. Setting this up ensures proper attribution in team repositories and GitHub author profiles!
        </span>
      </div>
    </SlideWrapper>
  );
}
