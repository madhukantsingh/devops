import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

type UITab = 'commits' | 'branches' | 'prs' | 'actions';

const commitsData = [
  { hash: 'f9e8d7c', msg: 'Add two-factor authentication', author: 'Alice', time: '2 hours ago', checks: 'passing' },
  { hash: 'b6a5e4d', msg: 'Fix payment timeout on mobile', author: 'Bob', time: '1 day ago', checks: 'passing' },
  { hash: '3c2b1a0', msg: 'Update dashboard permissions', author: 'Charlie', time: '3 days ago', checks: 'passing' },
  { hash: 'a1b2c3d', msg: 'Initial project setup', author: 'Alice', time: '2 weeks ago', checks: 'passing' },
];

const branchesData = [
  { name: 'main', status: 'default', updated: '2 hours ago', commits: 24 },
  { name: 'feature/login-2fa', status: 'active', updated: '3 hours ago', commits: 7, author: 'Alice' },
  { name: 'bugfix/payment-timeout', status: 'merged', updated: '1 day ago', commits: 3, author: 'Bob' },
  { name: 'feature/dashboard-v2', status: 'active', updated: '5 days ago', commits: 12, author: 'Charlie' },
];

const prsData = [
  { number: 42, title: 'Add login validation', author: 'Alice', status: 'open', checks: 'passing', reviewers: 1, comments: 3 },
  { number: 41, title: 'Fix payment timeout on mobile', author: 'Bob', status: 'merged', checks: 'passing', reviewers: 2, comments: 6 },
  { number: 40, title: 'Update dashboard permissions', author: 'Charlie', status: 'open', checks: 'failing', reviewers: 0, comments: 1 },
];

const actionsData = [
  { run: '#156', branch: 'feature/login-2fa', trigger: 'push', status: 'success', duration: '1m 48s', time: '2 hours ago' },
  { run: '#155', branch: 'main', trigger: 'merge', status: 'success', duration: '2m 12s', time: '2 hours ago' },
  { run: '#154', branch: 'bugfix/payment-timeout', trigger: 'push', status: 'success', duration: '1m 55s', time: '1 day ago' },
  { run: '#153', branch: 'feature/dashboard-v2', trigger: 'push', status: 'failure', duration: '45s', time: '5 days ago' },
];

const statusColor = { open: '#3fb950', merged: '#bc8cff', closed: '#8b949e' };
const checkColor = { passing: '#3fb950', failing: '#f85149' };
const runColor = { success: '#3fb950', failure: '#f85149', pending: '#d29922' };

export default function GitHubUISlide({ slide }: Props) {
  const [tab, setTab] = useState<UITab>('commits');

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
        This is what the team sees on GitHub. Explore each tab to understand what information is available.
      </p>

      {/* Simulated GitHub repo UI */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        {/* Repo header */}
        <div style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 16 }}>🌐</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>company / project</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: '5 branches', color: '#3fb950' },
              { label: '2 open PRs', color: '#58a6ff' },
              { label: 'Actions ✓', color: '#3fb950' },
            ].map((badge) => (
              <span key={badge.label} style={{ fontSize: 11, background: `${badge.color}15`, color: badge.color, border: `1px solid ${badge.color}40`, borderRadius: 20, padding: '2px 10px', fontWeight: 700 }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', padding: '0 16px' }}>
          {([
            { id: 'commits', label: '📜 Commits' },
            { id: 'branches', label: '🌿 Branches' },
            { id: 'prs', label: '📋 Pull Requests' },
            { id: 'actions', label: '⚡ Actions' },
          ] as { id: UITab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '10px 12px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: tab === t.id ? 700 : 400,
                marginBottom: -1,
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: 'var(--bg-card)', minHeight: 200 }}>
          <AnimatePresence mode="wait">
            {tab === 'commits' && (
              <motion.div key="commits" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {commitsData.map((c, i) => (
                  <div key={c.hash} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <code style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'monospace', background: 'var(--accent-dim)', borderRadius: 5, padding: '2px 6px' }}>{c.hash}</code>
                    <span style={{ fontSize: 12, color: 'var(--text-primary)', flex: 1 }}>{c.msg}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.author} · {c.time}</span>
                    <span style={{ fontSize: 10, color: '#3fb950', fontWeight: 700 }}>✓ {c.checks}</span>
                  </div>
                ))}
              </motion.div>
            )}
            {tab === 'branches' && (
              <motion.div key="branches" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {branchesData.map((b) => (
                  <div key={b.name} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <code style={{ fontSize: 12, color: b.name === 'main' ? '#58a6ff' : '#3fb950', fontFamily: 'monospace', fontWeight: 700 }}>{b.name}</code>
                    {b.status === 'default' && <span style={{ fontSize: 9, background: 'rgba(88,166,255,0.15)', color: '#58a6ff', borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>DEFAULT</span>}
                    {b.status === 'merged' && <span style={{ fontSize: 9, background: 'rgba(188,140,255,0.15)', color: '#bc8cff', borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>MERGED</span>}
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>{b.commits} commits · {b.updated}</span>
                    {b.author && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>by {b.author}</span>}
                  </div>
                ))}
              </motion.div>
            )}
            {tab === 'prs' && (
              <motion.div key="prs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {prsData.map((pr) => (
                  <div key={pr.number} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: statusColor[pr.status as keyof typeof statusColor] ?? '#8b949e', background: `${statusColor[pr.status as keyof typeof statusColor] ?? '#8b949e'}15`, borderRadius: 12, padding: '2px 8px' }}>
                      {pr.status.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-primary)', flex: 1 }}>#{pr.number} {pr.title}</span>
                    <span style={{ fontSize: 10, color: checkColor[pr.checks as keyof typeof checkColor], fontWeight: 700 }}>{pr.checks === 'passing' ? '✓' : '✗'} {pr.checks}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pr.author} · {pr.comments} comments</span>
                  </div>
                ))}
              </motion.div>
            )}
            {tab === 'actions' && (
              <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {actionsData.map((run) => (
                  <div key={run.run} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 16 }}>{run.status === 'success' ? '✅' : '❌'}</span>
                    <code style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{run.run}</code>
                    <code style={{ fontSize: 11, color: '#3fb950', background: 'rgba(63,185,80,0.1)', borderRadius: 4, padding: '1px 6px', fontFamily: 'monospace' }}>{run.branch}</code>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', flex: 1 }}>Triggered by {run.trigger}</span>
                    <span style={{ fontSize: 11, color: runColor[run.status as keyof typeof runColor], fontWeight: 700 }}>{run.status}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{run.duration} · {run.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
        ⓘ Interactive simulation — not connected to a real GitHub API
      </div>
    </SlideWrapper>
  );
}
