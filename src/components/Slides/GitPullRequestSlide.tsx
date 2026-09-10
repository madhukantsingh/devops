import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Check, X, AlertCircle } from 'lucide-react';

interface Props { slide: SlideData; }

type Tab = 'overview' | 'review';

const checks = [
  { name: 'Build', status: 'pass' },
  { name: 'Tests', status: 'pass' },
  { name: 'Lint', status: 'pass' },
  { name: 'Security', status: 'pass' },
];

const reviewComments = [
  {
    author: 'Sarah (Reviewer)',
    avatar: '👩‍💻',
    time: '2 hours ago',
    file: 'src/auth/login.ts',
    line: 'L42',
    comment: 'Can we validate this input before calling the API? If the email is empty, we\'ll get a confusing 500 error instead of a clear message.',
    status: 'open',
  },
  {
    author: 'Mark (Dev)',
    avatar: '👨‍💻',
    time: '1 hour ago',
    file: 'src/auth/login.ts',
    line: 'L42',
    comment: 'Good catch! I\'ve added validation in the new commit (abc1234). The API is now only called after the email is confirmed non-empty.',
    status: 'resolved',
  },
];

export default function GitPullRequestSlide({ slide }: Props) {
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        A proposal to merge changes from one branch into another — and a collaboration point for the team.
      </p>

      {/* Simulated GitHub PR UI */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'var(--bg-card)',
      }}>
        {/* PR Header */}
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{
              background: 'rgba(63,185,80,0.15)',
              color: '#3fb950',
              border: '1px solid rgba(63,185,80,0.35)',
              borderRadius: 20,
              padding: '3px 12px',
              fontSize: 12,
              fontWeight: 700,
            }}>
              ● Open
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
              Add login validation
            </span>
            <code style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>#42</code>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span>👩‍💻 <strong style={{ color: 'var(--text-secondary)' }}>Alice</strong> wants to merge</span>
            <span>
              <code style={{ background: 'rgba(248,81,73,0.1)', color: '#f85149', borderRadius: 4, padding: '1px 6px', fontFamily: 'monospace' }}>feature/login</code>
              {' → '}
              <code style={{ background: 'rgba(63,185,80,0.1)', color: '#3fb950', borderRadius: 4, padding: '1px 6px', fontFamily: 'monospace' }}>main</code>
            </span>
            <span>8 files changed</span>
            <span>3 commits</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 18px' }}>
          {([
            { id: 'overview', label: '📋 Overview' },
            { id: 'review', label: '💬 Review' },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '10px 14px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: tab === t.id ? 700 : 400,
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === 'overview' ? (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ padding: '16px 18px', display: 'flex', gap: 20, flexWrap: 'wrap' }}
            >
              {/* Description */}
              <div style={{ flex: 2, minWidth: 200 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Description</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
                  Adds input validation to the login form. Previously, submitting with an empty email caused a confusing server error instead of a helpful message.
                  <br /><br />
                  <strong>Changes:</strong><br />
                  • Added client-side validation before API call<br />
                  • Added server-side validation as fallback<br />
                  • Updated error messages to be user-facing
                </div>

                {/* Checks */}
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Checks</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {checks.map((check) => (
                    <div key={check.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={14} style={{ color: '#3fb950' }} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{check.name}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#3fb950', fontWeight: 700 }}>Passed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side info */}
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Reviewers', value: '👩‍💻 Sarah (approved)' },
                    { label: 'Assignee', value: '👩‍💻 Alice' },
                    { label: 'Labels', value: '🏷️ feature, auth' },
                    { label: 'Milestone', value: '🚀 v2.1.0' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 14,
                  background: 'rgba(63,185,80,0.1)',
                  border: '1px solid rgba(63,185,80,0.3)',
                  borderRadius: 10,
                  padding: '10px 12px',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#3fb950', marginBottom: 4 }}>✓ Ready to merge</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>All checks passed. Approved by 1 reviewer.</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ padding: '16px 18px' }}
            >
              {reviewComments.map((comment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    gap: 10,
                    marginBottom: 14,
                    opacity: comment.status === 'resolved' ? 0.7 : 1,
                  }}
                >
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{comment.avatar}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{comment.author}</span>
                      <code style={{ fontSize: 10, color: 'var(--accent)', background: 'var(--accent-dim)', borderRadius: 4, padding: '1px 6px' }}>{comment.file} {comment.line}</code>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>{comment.time}</span>
                      {comment.status === 'resolved' && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#3fb950', background: 'rgba(63,185,80,0.1)', borderRadius: 4, padding: '1px 6px' }}>RESOLVED</span>
                      )}
                    </div>
                    <div style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>
                      {comment.comment}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div style={{
                marginTop: 4,
                padding: '10px 14px',
                background: 'rgba(88,166,255,0.08)',
                border: '1px solid rgba(88,166,255,0.25)',
                borderRadius: 10,
                fontSize: 12,
                color: 'var(--text-secondary)',
              }}>
                <strong style={{ color: '#58a6ff' }}>Key point:</strong> A PR can receive multiple additional commits as the developer addresses feedback — before the final merge.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        marginTop: 10,
        padding: '8px 0 0',
        fontSize: 11,
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        textAlign: 'center',
      }}>
        ⓘ Interactive simulation — not connected to a real GitHub API
      </div>
    </SlideWrapper>
  );
}
