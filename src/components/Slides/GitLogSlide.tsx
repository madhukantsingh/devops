import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { GitCommit, Search, Terminal, Filter, Calendar, User, Tag } from 'lucide-react';

interface Props { slide: SlideData; }

interface CommitItem {
  hash: string;
  author: string;
  date: string;
  message: string;
  branch: string;
  tags?: string[];
}

const sampleCommits: CommitItem[] = [
  { hash: 'a8f3b91', author: 'Alex Rivera', date: '10 minutes ago', message: 'feat: add payment gateway checkout endpoint', branch: 'feature/checkout', tags: ['HEAD -> feature/checkout'] },
  { hash: 'c7d2e45', author: 'Sarah Chen', date: '2 hours ago', message: 'fix: handle token expiration gracefully in API', branch: 'main', tags: ['origin/main', 'main'] },
  { hash: 'e9b1a03', author: 'Alex Rivera', date: 'Yesterday', message: 'refactor: extract user validation middleware', branch: 'main' },
  { hash: '4f8d2e1', author: 'Mike Johnson', date: '2 days ago', message: 'docs: update deployment environment instructions', branch: 'main', tags: ['v1.2.0'] },
  { hash: '1b9c3a7', author: 'Sarah Chen', date: '3 days ago', message: 'feat: initialize database migration scripts', branch: 'main' },
];

export default function GitLogSlide({ slide }: Props) {
  const [viewMode, setViewMode] = useState<'standard' | 'oneline' | 'graph'>('standard');
  const [filterAuthor, setFilterAuthor] = useState('');

  const filteredCommits = sampleCommits.filter((c) =>
    filterAuthor ? c.author.toLowerCase().includes(filterAuthor.toLowerCase()) : true
  );

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>git log</code> provides a complete timeline of your repository's commit history.
      </p>

      {/* Control Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 4 }}>
          {[
            { id: 'standard', label: 'Full Log ($ git log)' },
            { id: 'oneline', label: 'Compact ($ git log --oneline)' },
            { id: 'graph', label: 'Branch Graph ($ git log --graph)' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              style={{
                background: viewMode === mode.id ? 'var(--accent-dim)' : 'transparent',
                color: viewMode === mode.id ? 'var(--accent)' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 7,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Filter Input */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 8, padding: '6px 12px' }}>
          <Filter size={13} style={{ color: 'var(--text-muted)', marginRight: 6 }} />
          <input
            type="text"
            placeholder="Filter by author..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--input-text)', fontSize: 12, fontWeight: 600, outline: 'none', width: 140 }}
          />
        </div>
      </div>

      {/* Main Terminal Window */}
      <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', minHeight: 280 }}>
        <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Terminal size={13} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>
            {viewMode === 'standard' && 'git log -n 5'}
            {viewMode === 'oneline' && 'git log --oneline'}
            {viewMode === 'graph' && 'git log --graph --all --oneline --decorate'}
          </span>
        </div>

        <div style={{ padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6 }}>
          {filteredCommits.map((commit, idx) => (
            <motion.div
              key={commit.hash}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06 }}
              style={{ marginBottom: viewMode === 'standard' ? 16 : 8 }}
            >
              {viewMode === 'standard' && (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8, borderLeft: '3px solid var(--accent)' }}>
                  <div style={{ color: '#d29922', fontWeight: 700 }}>
                    commit {commit.hash} {commit.tags && <span style={{ color: '#79c0ff', fontSize: 11 }}>({commit.tags.join(', ')})</span>}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11, display: 'flex', gap: 16, marginTop: 4 }}>
                    <span><User size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Author: {commit.author}</span>
                    <span><Calendar size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Date: {commit.date}</span>
                  </div>
                  <div style={{ color: 'var(--code-text)', marginTop: 6, paddingLeft: 12, fontWeight: 500 }}>
                    {commit.message}
                  </div>
                </div>
              )}

              {viewMode === 'oneline' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#d29922', fontWeight: 700 }}>{commit.hash}</span>
                  {commit.tags && (
                    <span style={{ background: 'rgba(56,139,253,0.15)', color: '#79c0ff', padding: '1px 6px', borderRadius: 4, fontSize: 10 }}>
                      ({commit.tags.join(', ')})
                    </span>
                  )}
                  <span style={{ color: 'var(--code-text)' }}>{commit.message}</span>
                </div>
              )}

              {viewMode === 'graph' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: idx % 2 === 0 ? '#3fb950' : '#a371f7', fontWeight: 800 }}>
                    {idx === 0 ? '* (' : idx % 2 === 0 ? '| *' : '* |'}
                  </span>
                  <span style={{ color: '#d29922' }}>{commit.hash}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>[{commit.author.split(' ')[0]}]</span>
                  <span style={{ color: 'var(--code-text)' }}>{commit.message}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)' }}>
        <span>💡 <strong>Useful flags:</strong> <code style={{ color: 'var(--accent)' }}>git log -n 5</code> (limit count), <code style={{ color: 'var(--accent)' }}>git log --author="Name"</code>, <code style={{ color: 'var(--accent)' }}>git log -p</code> (show diffs).</span>
      </div>
    </SlideWrapper>
  );
}
