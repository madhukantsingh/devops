import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { User, GitCommit, Clock, FileText, RotateCcw, GitBranch, GitMerge, BookOpen } from 'lucide-react';

interface Props { slide: SlideData; }

// ── Data ─────────────────────────────────────────────────────────────────
const versions = [
  {
    id: 'v1', label: 'Initial commit', hash: 'a1b2c3d',
    author: 'Alice', avatar: '👩‍💻', date: '5 days ago',
    message: 'Set up project: login page and registration',
    branch: 'main',
    changes: [
      { type: 'add', file: 'LoginPage.tsx', diff: ['+import React from "react";', '+export function LoginPage() {', '+  return <form>...</form>;', '+}'] },
      { type: 'add', file: 'RegisterPage.tsx', diff: ['+export function RegisterPage() {', '+  return <form>...</form>;', '+}'] },
      { type: 'add', file: 'auth.service.ts', diff: ['+export async function login(email, pw) {', '+  return api.post("/login", { email, pw });', '+}'] },
    ],
  },
  {
    id: 'v2', label: 'Bug fix', hash: 'e4f5g6h',
    author: 'Bob', avatar: '👨‍💻', date: '4 days ago',
    message: 'Fix: login validation missing empty-field check',
    branch: 'fix/login-validation',
    changes: [
      { type: 'modify', file: 'LoginPage.tsx', diff: [' function validate(email, pw) {', '-  // TODO: add validation', '+  if (!email) return "Email required";', '+  if (!pw)    return "Password required";', ' }'] },
      { type: 'modify', file: 'auth.service.ts', diff: [' export async function login(email, pw) {', '+  if (!email || !pw) throw new Error("Missing fields");', '   return api.post("/login", { email, pw });', ' }'] },
    ],
  },
  {
    id: 'v3', label: 'New feature', hash: 'i7j8k9l',
    author: 'Alice', avatar: '👩‍💻', date: '2 days ago',
    message: 'Feature: add "Remember me" option to login',
    branch: 'feature/remember-me',
    changes: [
      { type: 'modify', file: 'LoginPage.tsx', diff: [' <form>', '+  <label>', '+    <input type="checkbox" name="rememberMe" />', '+    Remember me', '+  </label>', '   <button>Login</button>', ' </form>'] },
      { type: 'modify', file: 'auth.service.ts', diff: [' async function login(email, pw, rememberMe) {', '+  if (rememberMe) localStorage.setItem("session", token);', '   return api.post("/login", {email, pw});', ' }'] },
    ],
  },
  {
    id: 'v4', label: 'Security patch', hash: 'm1n2o3p',
    author: 'Charlie', avatar: '🧑‍💻', date: '6 hours ago',
    message: 'Security: hash passwords before storing',
    branch: 'main',
    changes: [
      { type: 'modify', file: 'auth.service.ts', diff: ['+import bcrypt from "bcrypt";', ' async function register(email, pw) {', '-  await db.users.create({ email, password: pw });', '+  const hash = await bcrypt.hash(pw, 10);', '+  await db.users.create({ email, password: hash });', ' }'] },
      { type: 'add', file: 'crypto.utils.ts', diff: ['+export function hashPassword(pw: string) {', '+  return bcrypt.hash(pw, 10);', '+}'] },
    ],
  },
];

const diffColor = (line: string) => {
  if (line.startsWith('+')) return 'var(--success)';
  if (line.startsWith('-')) return 'var(--error)';
  return 'var(--text-muted)';
};

const diffBg = (line: string) => {
  if (line.startsWith('+')) return 'rgba(63,185,80,0.08)';
  if (line.startsWith('-')) return 'rgba(248,81,73,0.08)';
  return 'transparent';
};

const typeColors: Record<string, string> = {
  add: 'var(--success)',
  modify: 'var(--accent)',
  delete: 'var(--error)',
};

// ── Branch concepts ───────────────────────────────────────────────────────
const concepts = [
  {
    id: 'staging',
    icon: '📂',
    title: 'Working Directory → Staging Area → Repository',
    color: '#58a6ff',
    body: `Git has three zones:

1. Working Directory - your files on disk, as you edit them
2. Staging Area (Index) - a "pre-commit" holding area you populate with git add
3. Local Repository - permanent commits stored in .git/

The flow is:
  edit file  →  git add file  →  git commit -m "message"
               (staged)           (saved to history)

This two-step commit lets you group related changes together, even if you edited many files.`,
    code: 'git add LoginPage.tsx auth.service.ts\ngit commit -m "Fix: login validation"',
  },
  {
    id: 'branches',
    icon: '🌿',
    title: 'What Is a Branch?',
    color: '#3fb950',
    body: `A branch is an independent line of development. Think of it as a parallel copy of the project where you can experiment safely.

Why branches?
  • Work on features without breaking the main codebase
  • Multiple developers work simultaneously without conflicts
  • Bugs can be fixed in isolation, then merged

Common branches:
  main / master  → stable production code
  feature/xxx    → new features under development
  fix/xxx        → bug fixes
  hotfix/xxx     → urgent production patches

When finished, branches are merged back into main via a Pull Request.`,
    code: 'git checkout -b feature/remember-me\n# ... make changes ...\ngit push origin feature/remember-me\n# Then open a Pull Request on GitHub',
  },
  {
    id: 'remote',
    icon: '🌐',
    title: 'Local vs Remote (GitHub)',
    color: '#bc8cff',
    body: `Every developer has a full copy of the repository on their machine (local). GitHub hosts the shared, authoritative copy (remote).

Local actions (happen on your laptop):
  git commit     → save changes to local history
  git branch     → create a local branch
  git log        → view local history

Remote actions (sync with GitHub):
  git push       → upload your local commits to GitHub
  git pull       → download other people's commits to your machine
  git fetch      → download without merging

This means: even if GitHub is down, developers can still commit locally.`,
    code: 'git push origin feature/remember-me\n# Pushes your branch to GitHub\n\ngit pull origin main\n# Gets latest changes from main',
  },
  {
    id: 'conflicts',
    icon: '⚔️',
    title: 'Merge Conflicts',
    color: '#ffa657',
    body: `A merge conflict happens when two people edit the same line of the same file in different ways. Git doesn't know which version to keep.

When this happens:
  Git marks the conflict in the file:
  <<<<<<< HEAD (your version)
  if (!email) return "Email required";
  =======
  if (!email || !email.includes("@")) return "Bad email";
  >>>>>>> feature/validation

You resolve it by:
  1. Opening the file
  2. Choosing the correct version (or combining both)
  3. Removing the conflict markers
  4. Running git add + git commit

Conflicts are normal - not a mistake. They happen when teams work in parallel.`,
    code: '# After resolving conflict markers in the file:\ngit add LoginPage.tsx\ngit commit -m "Merge: resolve email validation conflict"',
  },
];

// ── Tab: branches visual ──────────────────────────────────────────────────
const branchDiagram = [
  { step: 1, branch: 'main', label: 'main: Initial setup', x: 0, y: 0, color: '#58a6ff' },
  { step: 2, branch: 'fix/login-validation', label: 'Branch: fix/login-validation', x: 1, y: 1, color: '#ffa657' },
  { step: 3, branch: 'fix/login-validation', label: 'Commit: add validation', x: 2, y: 1, color: '#ffa657' },
  { step: 4, branch: 'feature/remember-me', label: 'Branch: feature/remember-me', x: 1, y: 2, color: '#3fb950' },
  { step: 5, branch: 'feature/remember-me', label: 'Commit: remember me UI', x: 2, y: 2, color: '#3fb950' },
  { step: 6, branch: 'main', label: 'Merge fix ← PR approved', x: 3, y: 0, color: '#58a6ff' },
  { step: 7, branch: 'main', label: 'Merge feature ← PR approved', x: 4, y: 0, color: '#58a6ff' },
  { step: 8, branch: 'main', label: 'Security patch commit', x: 5, y: 0, color: '#bc8cff' },
];

type Tab = 'history' | 'branches' | 'concepts';

export default function GitHistorySlide({ slide }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('history');
  const [selected, setSelected] = useState<string | null>('v4');
  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [activeConcept, setActiveConcept] = useState<string | null>(null);

  const activeVersion = versions.find((v) => v.id === selected);
  const activeConcept_ = concepts.find((c) => c.id === activeConcept);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'history', label: 'Commit History', icon: <GitCommit size={13} /> },
    { id: 'branches', label: 'Branching', icon: <GitBranch size={13} /> },
    { id: 'concepts', label: 'Git Concepts', icon: <BookOpen size={13} /> },
  ];

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.5vw,36px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Git is version control - the complete history of every change your team has ever made.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
              padding: '8px 14px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 400,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
              marginBottom: -1,
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: History ────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'history' && (
          <motion.div key="history" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start', flex: 1 }}
          >
            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flexShrink: 0, minWidth: 220 }}>
              {versions.map((v, i) => {
                const isActive = selected === v.id;
                return (
                  <React.Fragment key={v.id}>
                    <motion.button
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => { setSelected(isActive ? null : v.id); setSelectedFile(0); }}
                      style={{
                        background: isActive ? 'var(--accent-dim)' : 'var(--bg-card)',
                        border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 9,
                        padding: '11px 14px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.18s',
                        width: '100%',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                        <GitCommit size={12} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}>{v.label}</span>
                        <code style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace', marginLeft: 'auto' }}>{v.hash}</code>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 3, lineHeight: 1.4 }}>{v.message}</div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <span style={{ fontSize: 12 }}>{v.avatar}</span> {v.author}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Clock size={9} /> {v.date}
                        </span>
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          background: v.branch === 'main' ? 'rgba(88,166,255,0.15)' : 'rgba(63,185,80,0.15)',
                          color: v.branch === 'main' ? 'var(--accent)' : 'var(--success)',
                          borderRadius: 5, padding: '1px 6px',
                          fontFamily: 'monospace',
                        }}>
                          {v.branch}
                        </span>
                      </div>
                    </motion.button>
                    {i < versions.length - 1 && (
                      <div style={{ width: 2, height: 8, background: 'var(--border)', marginLeft: 20 }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Detail panel */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <AnimatePresence mode="wait">
                {activeVersion ? (
                  <motion.div key={activeVersion.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {/* Changed files tabs */}
                    <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
                      {activeVersion.changes.map((c, i) => (
                        <button
                          key={c.file}
                          onClick={() => setSelectedFile(i)}
                          style={{
                            background: selectedFile === i ? 'var(--accent-dim)' : 'var(--bg-card)',
                            border: `1px solid ${selectedFile === i ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: 7,
                            padding: '4px 10px',
                            cursor: 'pointer',
                            fontSize: 11,
                            color: selectedFile === i ? 'var(--accent)' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            fontFamily: 'monospace',
                          }}
                        >
                          <FileText size={10} style={{ color: typeColors[c.type] }} />
                          {c.file}
                          <span style={{ fontSize: 9, fontWeight: 700, color: typeColors[c.type] }}>
                            {c.type === 'add' ? 'NEW' : 'MOD'}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Diff view */}
                    <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileText size={12} style={{ color: typeColors[activeVersion.changes[selectedFile]?.type] }} />
                        <code style={{ fontSize: 12, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                          {activeVersion.changes[selectedFile]?.file}
                        </code>
                      </div>
                      <div style={{ padding: '10px 0' }}>
                        {activeVersion.changes[selectedFile]?.diff.map((line, li) => (
                          <div
                            key={li}
                            style={{
                              padding: '2px 14px',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: 12,
                              color: diffColor(line),
                              background: diffBg(line),
                              lineHeight: 1.7,
                              whiteSpace: 'pre',
                            }}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                      {[
                        { icon: <RotateCcw size={11} />, label: 'Restore this version', desc: 'Roll back to this exact state' },
                        { icon: <GitMerge size={11} />, label: 'View full diff', desc: 'All files changed' },
                      ].map((a) => (
                        <div key={a.label} style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ color: 'var(--accent)' }}>{a.icon}</span>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>{a.label}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{a.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: 'var(--text-muted)', padding: 20 }}>
                    ← Click a commit to see exactly what changed
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── Tab: Branches ────────────────────────────────────── */}
        {activeTab === 'branches' && (
          <motion.div key="branches" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
              Branches let multiple developers work on separate features simultaneously without breaking each other's work.
            </p>

            {/* Visual branch diagram */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16, overflowX: 'auto' }}>
              <svg width="580" height="130" viewBox="0 0 580 130" style={{ display: 'block', maxWidth: '100%' }}>
                {/* main line */}
                <line x1="30" y1="30" x2="550" y2="30" stroke="#58a6ff" strokeWidth="2" strokeOpacity="0.4" />

                {/* fix branch line */}
                <path d="M 130 30 Q 145 30 155 55 L 250 55 Q 265 55 280 30" stroke="#ffa657" strokeWidth="2" fill="none" strokeOpacity="0.5" />
                {/* feature branch line */}
                <path d="M 130 30 Q 145 30 155 80 L 250 80 Q 265 80 390 30" stroke="#3fb950" strokeWidth="2" fill="none" strokeOpacity="0.5" />

                {/* Commit dots */}
                {[
                  { cx: 30, cy: 30, label: 'Initial', color: '#58a6ff', branch: 'main' },
                  { cx: 130, cy: 30, label: 'Branches ↓', color: '#58a6ff', branch: 'main' },
                  { cx: 200, cy: 55, label: 'Fix commit', color: '#ffa657', branch: 'fix/' },
                  { cx: 200, cy: 80, label: 'Feature', color: '#3fb950', branch: 'feat/' },
                  { cx: 280, cy: 30, label: 'Fix merged', color: '#58a6ff', branch: 'main' },
                  { cx: 390, cy: 30, label: 'Feat merged', color: '#56d364', branch: 'main' },
                  { cx: 490, cy: 30, label: 'Security', color: '#bc8cff', branch: 'main' },
                ].map((dot, i) => (
                  <g key={i}>
                    <circle cx={dot.cx} cy={dot.cy} r={10} fill={dot.color} fillOpacity="0.2" stroke={dot.color} strokeWidth="2" />
                    <text x={dot.cx} y={dot.cy + 25} textAnchor="middle" fontSize="9" fill={dot.color} fontFamily="monospace">{dot.label}</text>
                  </g>
                ))}

                {/* Branch labels */}
                <text x="10" y="22" fontSize="10" fill="#58a6ff" fontWeight="bold" fontFamily="sans-serif">main</text>
                <text x="155" y="52" fontSize="10" fill="#ffa657" fontWeight="bold" fontFamily="sans-serif">fix/login</text>
                <text x="155" y="77" fontSize="10" fill="#3fb950" fontWeight="bold" fontFamily="sans-serif">feature/remember-me</text>
              </svg>
            </div>

            {/* Pull Request flow */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { step: '1', label: 'Create branch', desc: 'git checkout -b feature/x', color: '#3fb950' },
                { step: '2', label: 'Commit changes', desc: 'git commit -m "..."', color: '#58a6ff' },
                { step: '3', label: 'Push to GitHub', desc: 'git push origin feature/x', color: '#bc8cff' },
                { step: '4', label: 'Open Pull Request', desc: 'Request a code review', color: '#ffa657' },
                { step: '5', label: 'Code Review', desc: 'Team reviews the diff', color: '#ffa657' },
                { step: '6', label: 'Merge to main', desc: 'Changes go into main branch', color: '#3fb950' },
              ].map((s) => (
                <div key={s.step} style={{ background: `${s.color}12`, border: `1px solid ${s.color}30`, borderRadius: 9, padding: '10px 12px', minWidth: 130, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: s.color, marginBottom: 3 }}>Step {s.step}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{s.label}</div>
                  <code style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{s.desc}</code>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Tab: Concepts ────────────────────────────────────── */}
        {activeTab === 'concepts' && (
          <motion.div key="concepts" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}
          >
            {/* Concept list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200 }}>
              {concepts.map((c) => {
                const isActive = activeConcept === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveConcept(isActive ? null : c.id)}
                    style={{
                      background: isActive ? `${c.color}15` : 'var(--bg-card)',
                      border: `1px solid ${isActive ? c.color : 'var(--border)'}`,
                      borderRadius: 9,
                      padding: '11px 14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? c.color : 'var(--text-primary)', lineHeight: 1.3 }}>{c.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Concept detail */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <AnimatePresence mode="wait">
                {activeConcept_ ? (
                  <motion.div key={activeConcept_.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div style={{ background: `${activeConcept_.color}10`, border: `1px solid ${activeConcept_.color}30`, borderRadius: 12, padding: '16px 18px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 26 }}>{activeConcept_.icon}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: activeConcept_.color }}>{activeConcept_.title}</span>
                      </div>
                      <pre style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                      }}>
                        {activeConcept_.body}
                      </pre>
                    </div>
                    {activeConcept_.code && (
                      <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 9, overflow: 'hidden' }}>
                        <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Example Commands</div>
                        <pre style={{ padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--success)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>
                          {activeConcept_.code}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 30 }}>
                    ← Select a concept to learn more
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideWrapper>
  );
}
