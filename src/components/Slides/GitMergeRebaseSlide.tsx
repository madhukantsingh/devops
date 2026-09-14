import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { GitMerge, Zap, Info, CheckCircle2, GitCommit, ArrowRight, RefreshCw, GitBranch, Sparkles } from 'lucide-react';

interface Props { slide: SlideData; }

interface StepDetails {
  title: string;
  badge: string;
  description: string;
  detail: string;
}

const STEP_INFO: Record<'merge' | 'rebase', StepDetails[]> = {
  merge: [
    {
      title: "Step 1: Diverged Branches",
      badge: "Initial State",
      description: "main (C1 → C2 → C3) and feature (F1 → F2) have diverged.",
      detail: "Both branches share common ancestor commit C2, but have independent work."
    },
    {
      title: "Step 2: 3-Way Inspection & Base Finding",
      badge: "Step 2 in Progress",
      description: "Git identifies base ancestor C2 and calculates diffs against C3 & F2.",
      detail: "Git compares base C2 with both tips (C3 on main, F2 on feature) to prepare a unified merge commit."
    },
    {
      title: "Step 3: New Merge Commit Created",
      badge: "Merge Complete",
      description: "Git creates 3-way merge commit M on main with 2 parents (C3 & F2).",
      detail: "Complete true history is preserved with both branch paths intact."
    }
  ],
  rebase: [
    {
      title: "Step 1: Diverged Branches",
      badge: "Initial State",
      description: "feature (F1 → F2) branched off C2 while main advanced to C3.",
      detail: "Two parallel histories exist, branching off common ancestor C2."
    },
    {
      title: "Step 2: Detach Commits & Shift Base to C3",
      badge: "Step 2 in Progress",
      description: "Git temporarily detaches F1 & F2 and moves feature base pointer to C3.",
      detail: "Commits F1 and F2 are queued to be re-applied on top of tip commit C3."
    },
    {
      title: "Step 3: Reapply Commits into Linear History",
      badge: "Rebase Complete",
      description: "F1' and F2' are rewritten on top of C3 in a single straight line.",
      detail: "Divergence is eliminated, creating a clean, sequential commit history."
    }
  ]
};

export default function GitMergeRebaseSlide({ slide }: Props) {
  const [activeStrategy, setActiveStrategy] = useState<'merge' | 'rebase'>('merge');
  const [step, setStep] = useState<number>(0);

  const currentInfo = STEP_INFO[activeStrategy][step];

  return (
    <SlideWrapper slide={slide}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(18px,3.2vw,32px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
            {slide.title}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            Both <strong>Merge</strong> and <strong>Rebase</strong> combine branches, but structure project history completely differently.
          </p>
        </div>
      </div>

      {/* Strategy Selector Toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <button
          onClick={() => { setActiveStrategy('merge'); setStep(0); }}
          style={{
            padding: 12,
            borderRadius: 10,
            border: activeStrategy === 'merge' ? '2px solid var(--accent)' : '1px solid var(--border)',
            background: activeStrategy === 'merge' ? 'var(--accent-dim)' : 'var(--bg-card)',
            color: 'var(--text-primary)',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <GitMerge size={18} /> Git Merge
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'rgba(56,139,253,0.2)', color: 'var(--accent)' }}>
              Non-Destructive
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
            Creates a <strong>3-way merge commit</strong> preserving exact historical branching timeline.
          </p>
        </button>

        <button
          onClick={() => { setActiveStrategy('rebase'); setStep(0); }}
          style={{
            padding: 12,
            borderRadius: 10,
            border: activeStrategy === 'rebase' ? '2px solid #a371f7' : '1px solid var(--border)',
            background: activeStrategy === 'rebase' ? 'rgba(163,113,247,0.12)' : 'var(--bg-card)',
            color: 'var(--text-primary)',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#a371f7', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={18} /> Git Rebase
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'rgba(163,113,247,0.2)', color: '#a371f7' }}>
              Linear History
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
            Replays feature commits one-by-one on top of target branch for clean history.
          </p>
        </button>
      </div>

      {/* Interactive Visual Canvas Container */}
      <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 18px', marginBottom: 12, position: 'relative' }}>
        {/* Header & Step Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-muted)' }}>
              Interactive Visual Workflow ({activeStrategy.toUpperCase()})
            </span>
          </div>

          {/* Step Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {[0, 1, 2].map((sIndex) => (
              <button
                key={sIndex}
                onClick={() => setStep(sIndex)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  border: step === sIndex ? `1.5px solid ${activeStrategy === 'merge' ? 'var(--accent)' : '#a371f7'}` : '1px solid var(--border)',
                  background: step === sIndex ? (activeStrategy === 'merge' ? 'var(--accent-dim)' : 'rgba(163,113,247,0.2)') : 'var(--bg-card)',
                  color: step === sIndex ? (activeStrategy === 'merge' ? 'var(--accent)' : '#a371f7') : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Step {sIndex + 1}
              </button>
            ))}

            <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: step === 0 ? 'not-allowed' : 'pointer',
                  opacity: step === 0 ? 0.4 : 1,
                }}
              >
                Prev
              </button>
              <button
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                disabled={step === 2}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: activeStrategy === 'merge' ? 'var(--accent)' : '#a371f7',
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: step === 2 ? 'not-allowed' : 'pointer',
                  opacity: step === 2 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                Next Step ({step + 1}/3) <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Step Status Banner */}
        <motion.div
          key={`${activeStrategy}-${step}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--bg-card)',
            borderLeft: `4px solid ${activeStrategy === 'merge' ? 'var(--accent)' : '#a371f7'}`,
            borderRadius: '0 8px 8px 0',
            padding: '8px 12px',
            marginBottom: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              {currentInfo.title}
              <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 4, background: step === 1 ? 'var(--warning-dim)' : (step === 2 ? 'var(--success-dim)' : 'var(--accent-dim)'), color: step === 1 ? 'var(--warning)' : (step === 2 ? 'var(--success)' : 'var(--accent)') }}>
                {currentInfo.badge}
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              {currentInfo.description}
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: 220, textAlign: 'right' }}>
            {currentInfo.detail}
          </div>
        </motion.div>

        {/* SVG Commit Graph Visualizing Steps */}
        <div style={{ width: '100%', overflowX: 'auto', padding: '10px 0' }}>
          <svg width="100%" height="150" viewBox="0 0 540 150" style={{ overflow: 'visible' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
              </marker>
            </defs>

            {/* Branch Track Labels */}
            <text x="10" y="45" fill="var(--accent)" fontSize="12" fontWeight="800" fontFamily="sans-serif">main</text>
            {(activeStrategy === 'merge' || (activeStrategy === 'rebase' && step < 2)) && (
              <text x="10" y="115" fill="var(--warning)" fontSize="12" fontWeight="800" fontFamily="sans-serif">feature</text>
            )}

            {/* Main Branch Base Line */}
            <line
              x1="55" y1="40"
              x2={activeStrategy === 'rebase' && step === 2 ? "450" : (activeStrategy === 'merge' && step === 2 ? "370" : "270")}
              y2="40"
              stroke="var(--border)" strokeWidth="3" strokeDasharray={step === 1 ? "4 4" : "none"}
            />

            {/* Main Branch Commits C1, C2, C3 */}
            {/* C1 */}
            <g transform="translate(70, 40)">
              <circle r="16" fill="#1f6feb" stroke="var(--bg-primary)" strokeWidth="2" />
              <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">C1</text>
            </g>

            {/* C2 (Common Ancestor) */}
            <g transform="translate(150, 40)">
              <circle
                r="16"
                fill="#1f6feb"
                stroke={step === 1 && activeStrategy === 'merge' ? 'var(--warning)' : 'var(--bg-primary)'}
                strokeWidth={step === 1 && activeStrategy === 'merge' ? "4" : "2"}
              />
              <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">C2</text>
              {step === 1 && activeStrategy === 'merge' && (
                <text textAnchor="middle" y="-24" fill="var(--warning)" fontSize="9" fontWeight="800">Base Ancestor</text>
              )}
            </g>

            {/* C3 */}
            <g transform="translate(230, 40)">
              <circle
                r="16"
                fill="#1f6feb"
                stroke={step === 1 ? (activeStrategy === 'merge' ? 'var(--accent)' : '#a371f7') : 'var(--bg-primary)'}
                strokeWidth={step === 1 ? "3" : "2"}
              />
              <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">C3</text>
              {step === 1 && (
                <text textAnchor="middle" y="-24" fill="var(--accent)" fontSize="9" fontWeight="800">Tip of Main</text>
              )}
            </g>

            {/* MERGE SPECIFIC RENDER */}
            {activeStrategy === 'merge' && (
              <>
                {/* Feature Branch connector line from C2 */}
                <path d="M 150 40 L 190 110 L 290 110" fill="none" stroke="var(--border)" strokeWidth="3" />

                {/* Feature Commits F1 & F2 */}
                <g transform="translate(200, 110)">
                  <circle r="16" fill="#d29922" stroke="var(--bg-primary)" strokeWidth="2" />
                  <text textAnchor="middle" dy="4" fill="#0d1117" fontSize="11" fontWeight="800">F1</text>
                </g>

                <g transform="translate(280, 110)">
                  <circle
                    r="16"
                    fill="#d29922"
                    stroke={step === 1 ? 'var(--accent)' : 'var(--bg-primary)'}
                    strokeWidth={step === 1 ? "3" : "2"}
                  />
                  <text textAnchor="middle" dy="4" fill="#0d1117" fontSize="11" fontWeight="800">F2</text>
                  {step === 1 && (
                    <text textAnchor="middle" y="28" fill="var(--warning)" fontSize="9" fontWeight="800">Tip of Feature</text>
                  )}
                </g>

                {/* STEP 2 MERGE PREVIEW / INSPECTION LINES */}
                {step === 1 && (
                  <>
                    {/* Dashed line connecting C3 to proposed merge commit area */}
                    <line x1="246" y1="40" x2="350" y2="40" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Dashed line connecting F2 to proposed merge commit area */}
                    <line x1="294" y1="102" x2="350" y2="45" stroke="var(--warning)" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Preview Merge Ghost Node */}
                    <g transform="translate(360, 40)">
                      <circle r="18" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" />
                      <text textAnchor="middle" dy="4" fill="var(--accent)" fontSize="10" fontWeight="800">M?</text>
                      <text textAnchor="middle" y="-24" fill="var(--accent)" fontSize="9" fontWeight="700">Evaluating 3-Way Diff...</text>
                    </g>
                  </>
                )}

                {/* STEP 3 FINAL MERGE COMMIT */}
                {step === 2 && (
                  <g transform="translate(360, 40)">
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      {/* Connector line from F2 to M */}
                      <path d="M -80 70 L 0 0" fill="none" stroke="var(--success)" strokeWidth="3" />
                      <circle r="18" fill="url(#mergeGrad)" stroke="#ffffff" strokeWidth="2.5" />
                      <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="900">M</text>
                      <text textAnchor="middle" y="-25" fill="var(--success)" fontSize="10" fontWeight="800">Merge Commit</text>
                    </motion.g>
                  </g>
                )}

                <defs>
                  <linearGradient id="mergeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#238636" />
                    <stop offset="100%" stopColor="#2ea043" />
                  </linearGradient>
                </defs>
              </>
            )}

            {/* REBASE SPECIFIC RENDER */}
            {activeStrategy === 'rebase' && (
              <>
                {/* Step 1 & Step 2: Show original feature branch starting from C2 */}
                {step < 2 && (
                  <path
                    d="M 150 40 L 190 110 L 290 110"
                    fill="none"
                    stroke={step === 1 ? "var(--border-subtle)" : "var(--border)"}
                    strokeWidth="3"
                    strokeDasharray={step === 1 ? "4 4" : "none"}
                  />
                )}

                {/* Step 1: Normal feature branch commits */}
                {step === 0 && (
                  <>
                    <g transform="translate(200, 110)">
                      <circle r="16" fill="#d29922" stroke="var(--bg-primary)" strokeWidth="2" />
                      <text textAnchor="middle" dy="4" fill="#0d1117" fontSize="11" fontWeight="800">F1</text>
                    </g>
                    <g transform="translate(280, 110)">
                      <circle r="16" fill="#d29922" stroke="var(--bg-primary)" strokeWidth="2" />
                      <text textAnchor="middle" dy="4" fill="#0d1117" fontSize="11" fontWeight="800">F2</text>
                    </g>
                  </>
                )}

                {/* Step 2: Commits detached & shifting to C3 */}
                {step === 1 && (
                  <>
                    {/* Ghost original commits */}
                    <g transform="translate(200, 110)" opacity="0.3">
                      <circle r="16" fill="none" stroke="#d29922" strokeWidth="2" strokeDasharray="3 3" />
                      <text textAnchor="middle" dy="4" fill="var(--text-muted)" fontSize="11" fontWeight="800">F1</text>
                    </g>
                    <g transform="translate(280, 110)" opacity="0.3">
                      <circle r="16" fill="none" stroke="#d29922" strokeWidth="2" strokeDasharray="3 3" />
                      <text textAnchor="middle" dy="4" fill="var(--text-muted)" fontSize="11" fontWeight="800">F2</text>
                    </g>

                    {/* Curved arrow from C3 pointing to replay zone */}
                    <path d="M 246 32 Q 280 5 320 20" fill="none" stroke="#a371f7" strokeWidth="2.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                    <text x="260" y="10" fill="#a371f7" fontSize="9" fontWeight="800">Replaying onto C3...</text>

                    {/* Detached floating commits F1' & F2' ready to land */}
                    <g transform="translate(320, 40)">
                      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        <circle r="16" fill="#a371f7" stroke="#ffffff" strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">F1'</text>
                        <text textAnchor="middle" y="-22" fill="#a371f7" fontSize="9" fontWeight="800">Replaying</text>
                      </motion.g>
                    </g>

                    <g transform="translate(390, 40)">
                      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
                        <circle r="16" fill="#a371f7" stroke="#ffffff" strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">F2'</text>
                      </motion.g>
                    </g>
                  </>
                )}

                {/* Step 3: Fully integrated straight line history C1 -> C2 -> C3 -> F1' -> F2' */}
                {step === 2 && (
                  <>
                    <line x1="246" y1="40" x2="310" y2="40" stroke="#a371f7" strokeWidth="3" />
                    <g transform="translate(320, 40)">
                      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <circle r="16" fill="#a371f7" stroke="var(--bg-primary)" strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">F1'</text>
                      </motion.g>
                    </g>

                    <line x1="336" y1="40" x2="380" y2="40" stroke="#a371f7" strokeWidth="3" />
                    <g transform="translate(390, 40)">
                      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
                        <circle r="16" fill="#a371f7" stroke="#ffffff" strokeWidth="2.5" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="11" fontWeight="800">F2'</text>
                        <text textAnchor="middle" y="-24" fill="#a371f7" fontSize="9" fontWeight="800">Linear feature Tip</text>
                      </motion.g>
                    </g>
                  </>
                )}
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Comparison Rules Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <GitMerge size={15} /> When to use MERGE:
          </div>
          <ul style={{ fontSize: 11, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, lineHeight: 1.5 }}>
            <li>Integrating completed feature branches into <code style={{ color: 'var(--accent)' }}>main</code>.</li>
            <li>Preserving absolute non-destructive historical timeline.</li>
            <li>Shared public branches where history must never be changed.</li>
          </ul>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#a371f7', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={15} /> When to use REBASE:
          </div>
          <ul style={{ fontSize: 11, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, lineHeight: 1.5 }}>
            <li>Updating your local feature branch with latest <code style={{ color: 'var(--accent)' }}>main</code> before PR.</li>
            <li>Keeping commit history clean, elegant, and linear.</li>
            <li><strong style={{ color: 'var(--error)' }}>GOLDEN RULE:</strong> Never rebase commits pushed to shared public branches!</li>
          </ul>
        </div>
      </div>
    </SlideWrapper>
  );
}

