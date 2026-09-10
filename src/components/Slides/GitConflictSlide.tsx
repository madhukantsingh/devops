import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

type Stage = 'intro' | 'conflict' | 'markers' | 'resolve' | 'done';

export default function GitConflictSlide({ slide }: Props) {
  const [stage, setStage] = useState<Stage>('intro');

  const stages: Stage[] = ['intro', 'conflict', 'markers', 'resolve', 'done'];
  const stageIdx = stages.indexOf(stage);
  const canNext = stageIdx < stages.length - 1;
  const canPrev = stageIdx > 0;

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(18px,3.2vw,34px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        A merge conflict happens when Git cannot safely decide which version of a change should win.
        Walk through the scenario step by step.
      </p>

      {/* Stage progress */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
        {[
          { id: 'intro', label: 'Scenario' },
          { id: 'conflict', label: 'Both edit' },
          { id: 'markers', label: 'Conflict!' },
          { id: 'resolve', label: 'Resolve' },
          { id: 'done', label: 'Done' },
        ].map((s, i) => {
          const isPast = stages.indexOf(s.id as Stage) < stageIdx;
          const isCurrent = s.id === stage;
          return (
            <button
              key={s.id}
              onClick={() => setStage(s.id as Stage)}
              style={{
                background: isCurrent ? '#f85149' : isPast ? 'rgba(248,81,73,0.2)' : 'var(--bg-card)',
                border: `1px solid ${isCurrent ? '#f85149' : isPast ? '#f8514950' : 'var(--border)'}`,
                borderRadius: 8,
                padding: '5px 12px',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: isCurrent ? 800 : 500,
                color: isCurrent ? '#fff' : isPast ? '#f85149' : 'var(--text-muted)',
                transition: 'all 0.18s',
              }}
            >
              {i + 1}. {s.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div style={{ background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 12, padding: '16px' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>👩‍💻</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#58a6ff', marginBottom: 6 }}>Developer A (Alice)</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Working on <code style={{ color: '#58a6ff' }}>feature/design</code><br />
                  She is updating the button color in <code>style.css</code>
                </div>
              </div>
              <div style={{ background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.3)', borderRadius: 12, padding: '16px' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>👨‍💻</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#3fb950', marginBottom: 6 }}>Developer B (Bob)</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Working on <code style={{ color: '#3fb950' }}>feature/branding</code><br />
                  He is also updating the button color in <code>style.css</code>
                </div>
              </div>
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '12px 16px',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              Both developers are editing the <strong>same line</strong> in the same file, on different branches. When one of them tries to merge, Git will detect a conflict.
            </div>
          </motion.div>
        )}

        {stage === 'conflict' && (
          <motion.div key="conflict" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div style={{ background: 'var(--code-bg)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: '#58a6ff' }}>
                  👩‍💻 Alice — feature/design
                </div>
                <div style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, lineHeight: 2 }}>
                  <div style={{ color: 'var(--text-muted)' }}>.btn-primary {'{'}</div>
                  <div style={{ color: '#58a6ff', background: 'rgba(88,166,255,0.1)', paddingLeft: 8 }}>
                    &nbsp;&nbsp;background: <strong>blue</strong>;
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
                </div>
              </div>
              <div style={{ background: 'var(--code-bg)', border: '1px solid rgba(63,185,80,0.3)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: '#3fb950' }}>
                  👨‍💻 Bob — feature/branding
                </div>
                <div style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, lineHeight: 2 }}>
                  <div style={{ color: 'var(--text-muted)' }}>.btn-primary {'{'}</div>
                  <div style={{ color: '#3fb950', background: 'rgba(63,185,80,0.1)', paddingLeft: 8 }}>
                    &nbsp;&nbsp;background: <strong>green</strong>;
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(248,81,73,0.1)',
              border: '1px solid rgba(248,81,73,0.3)',
              borderRadius: 10,
              padding: '12px 14px',
            }}>
              <span style={{ fontSize: 24 }}>⚔️</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f85149', marginBottom: 2 }}>Both changed the same line</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Git sees two different values for <code style={{ color: '#f85149' }}>background</code> in the same file. It cannot automatically pick one — it needs a human decision.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'markers' && (
          <motion.div key="markers" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
              When you try to merge and Git finds a conflict, it marks the file like this:
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid rgba(248,81,73,0.4)', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: '#f85149' }}>
                ⚠ CONFLICT in style.css
              </div>
              <div style={{ padding: '14px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 2.2 }}>
                <div style={{ color: 'var(--text-muted)' }}>.btn-primary {'{'}</div>
                <div style={{ color: '#58a6ff', background: 'rgba(88,166,255,0.12)', paddingLeft: 8 }}>
                  {'<<<<<<< HEAD (your version — Alice)'}
                </div>
                <div style={{ color: '#58a6ff', background: 'rgba(88,166,255,0.08)', paddingLeft: 16 }}>
                  &nbsp;&nbsp;background: blue;
                </div>
                <div style={{ color: '#f85149', background: 'rgba(248,81,73,0.06)', paddingLeft: 8 }}>
                  {'======= (divider)'}
                </div>
                <div style={{ color: '#3fb950', background: 'rgba(63,185,80,0.08)', paddingLeft: 16 }}>
                  &nbsp;&nbsp;background: green;
                </div>
                <div style={{ color: '#3fb950', background: 'rgba(63,185,80,0.12)', paddingLeft: 8 }}>
                  {'>>>>>>> feature/branding (Bob\'s version)'}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { marker: '<<<<<<< HEAD', color: '#58a6ff', desc: 'Your version (current branch)' },
                { marker: '=======', color: '#f85149', desc: 'Divider between the two versions' },
                { marker: '>>>>>>> feature/branding', color: '#3fb950', desc: 'The incoming version (theirs)' },
              ].map((m) => (
                <div key={m.marker} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12 }}>
                  <code style={{ background: `${m.color}15`, color: m.color, borderRadius: 6, padding: '3px 8px', fontFamily: 'monospace', flexShrink: 0 }}>{m.marker}</code>
                  <span style={{ color: 'var(--text-secondary)' }}>{m.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'resolve' && (
          <motion.div key="resolve" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
              Resolving the conflict: open the file, choose the correct version, remove all markers, save.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Resolution steps</div>
                {[
                  'Open the conflicted file in your editor',
                  'Choose: keep blue, keep green, or combine',
                  'Delete all conflict markers (<<<, ===, >>>)',
                  'Save the file',
                  'git add style.css',
                  'git commit',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6, fontSize: 12 }}>
                    <span style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'var(--accent-dim)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}>{i + 1}</span>
                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4, paddingTop: 2 }}>{step}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>After resolution</div>
                <div style={{ background: 'var(--code-bg)', border: '1px solid rgba(63,185,80,0.35)', borderRadius: 10, padding: '12px 14px', fontFamily: 'monospace', fontSize: 12, lineHeight: 2 }}>
                  <div style={{ color: 'var(--text-muted)' }}>.btn-primary {'{'}</div>
                  <div style={{ color: '#3fb950', paddingLeft: 16 }}>&nbsp;&nbsp;background: blue; {'/* or green */'}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
                </div>
                <div style={{
                  marginTop: 10,
                  background: 'rgba(63,185,80,0.08)',
                  border: '1px solid rgba(63,185,80,0.25)',
                  borderRadius: 9,
                  padding: '10px 12px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  Most code editors (VS Code) show visual conflict markers and let you click "Accept Current" / "Accept Incoming" without editing the raw markers.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: 'rgba(63,185,80,0.1)',
                border: '1px solid rgba(63,185,80,0.35)',
                borderRadius: 14,
                padding: '18px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#3fb950', marginBottom: 6 }}>Conflict resolved!</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  The merge continues and a resolution commit is created.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#3fb950', marginBottom: 4 }}>✓ Conflicts are normal</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    They happen when teams work in parallel. Git is telling you: "Two people touched the same thing — please decide."
                  </div>
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#58a6ff', marginBottom: 4 }}>✓ Resolve intentionally</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Don't just blindly accept one version. Understand both changes, run tests, and commit the correct resolution.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          onClick={() => setStage(stages[stageIdx - 1])}
          disabled={!canPrev}
          style={{
            background: canPrev ? 'var(--bg-card)' : 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: canPrev ? 'pointer' : 'not-allowed',
            color: canPrev ? 'var(--text-primary)' : 'var(--text-muted)',
            fontSize: 13,
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => canNext && setStage(stages[stageIdx + 1])}
          disabled={!canNext}
          style={{
            background: canNext ? '#f85149' : 'var(--border)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 20px',
            cursor: canNext ? 'pointer' : 'not-allowed',
            color: canNext ? '#fff' : 'var(--text-muted)',
            fontSize: 13,
            fontWeight: 700,
            flex: 1,
          }}
        >
          {canNext ? 'Next →' : '✓ Complete'}
        </button>
      </div>
    </SlideWrapper>
  );
}
