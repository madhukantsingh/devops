import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  slides, getSlidesForAudience, audienceProfiles,
  timeBudgets, SlideData, AudienceType, TimeBudget,
} from '../data/slides';
import { Play, Clock, Sun, Moon, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Theme } from '../App';

interface HomeScreenProps {
  onStart: (filteredSlides: SlideData[]) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const sectionColors: Record<string, string> = {
  'The Big Picture': '#58a6ff',
  'Git & Source Control': '#bc8cff',
  'Servers & Cloud': '#ffa657',
  'CI/CD': '#3fb950',
  'Docker & Runtime': '#79c0ff',
  'What Happens in the Browser': '#d29922',
  'Debugging': '#f85149',
  'Real Failure Walkthrough': '#ff7b72',
  'Final Mental Model': '#56d364',
};

export default function HomeScreen({ onStart, theme, onToggleTheme }: HomeScreenProps) {
  const isDark = theme === 'dark';
  const [selectedAudience, setSelectedAudience] = useState<AudienceType | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<TimeBudget | null>(null);
  const [step, setStep] = useState<'audience' | 'time' | 'preview'>('audience');

  const activeProfile = audienceProfiles.find((p) => p.id === selectedAudience);

  const filteredSlides = useMemo(() => {
    if (!selectedAudience || !selectedBudget) return [];
    return getSlidesForAudience(selectedAudience, selectedBudget);
  }, [selectedAudience, selectedBudget]);

  const skippedSlides = useMemo(() => {
    if (!selectedAudience || !selectedBudget) return [];
    return slides.filter((s) => !filteredSlides.find((f) => f.id === s.id));
  }, [filteredSlides, selectedAudience, selectedBudget]);

  const totalMins = filteredSlides.reduce((a, s) => a + s.duration, 0);

  // Group included slides by section
  const includedBySec = useMemo(() => {
    const map: Record<string, SlideData[]> = {};
    filteredSlides.forEach((s) => {
      if (!map[s.section]) map[s.section] = [];
      map[s.section].push(s);
    });
    return map;
  }, [filteredSlides]);

  const allSections = Array.from(new Set(slides.map((s) => s.section)));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,32px) 60px',
      overflowY: 'auto',
      transition: 'background 0.25s, color 0.25s',
    }} className="scrollable">

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        style={{
          position: 'fixed', top: 16, right: 16, zIndex: 100,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '7px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500,
        }}
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
        {isDark ? 'Light' : 'Dark'}
      </button>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', maxWidth: 680, width: '100%', marginBottom: 40 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)',
          borderRadius: 999, padding: '4px 14px', fontSize: 11,
          fontWeight: 700, letterSpacing: 1.5, color: 'var(--accent)',
          marginBottom: 18, textTransform: 'uppercase',
        }}>
          ⚡ Audience Setup
        </div>
        <h1 style={{
          fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900,
          background: 'linear-gradient(135deg, #e6edf3 0%, #58a6ff 50%, #79c0ff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', lineHeight: 1.1, marginBottom: 12, letterSpacing: -1,
        }}>
          From Code to Customer
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 4 }}>
          Who is in the room today? Pick your audience and time budget —
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          We'll build a custom slide path in seconds.
        </p>
      </motion.div>

      {/* Step Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36 }}>
        {(['audience', 'time', 'preview'] as const).map((s, i) => {
          const labels = ['1. Who\'s in the room?', '2. How much time?', '3. Your slide path'];
          const done = step === 'preview' || (step === 'time' && i === 0) || (step === 'audience' && i < 0);
          const active = step === s;
          const reachable = (s === 'audience') ||
            (s === 'time' && selectedAudience) ||
            (s === 'preview' && selectedAudience && selectedBudget);
          return (
            <React.Fragment key={s}>
              <button
                onClick={() => reachable && setStep(s)}
                style={{
                  background: active ? 'var(--accent)' : done ? 'var(--accent-dim)' : 'var(--bg-card)',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8, padding: '6px 16px',
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  color: active ? '#fff' : done ? 'var(--accent)' : 'var(--text-muted)',
                  cursor: reachable ? 'pointer' : 'default',
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
              >
                {labels[i]}
              </button>
              {i < 2 && (
                <ChevronRight size={14} style={{ color: 'var(--border)', flexShrink: 0, margin: '0 2px' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1: Audience ── */}
      <AnimatePresence mode="wait">
        {step === 'audience' && (
          <motion.div key="audience" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} style={{ width: '100%', maxWidth: 700 }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20 }}>
              Select who you're presenting to — we'll filter out slides that are too technical or irrelevant.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 14 }}>
              {audienceProfiles.map((p, i) => {
                const isSelected = selectedAudience === p.id;
                return (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => {
                      setSelectedAudience(p.id);
                      setSelectedBudget(null);
                      setTimeout(() => setStep('time'), 220);
                    }}
                    style={{
                      background: isSelected ? `${p.color}14` : 'var(--bg-card)',
                      border: `2px solid ${isSelected ? p.color : 'var(--border)'}`,
                      borderRadius: 14, padding: '18px 20px',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 28 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: isSelected ? p.color : 'var(--text-primary)' }}>
                          {p.label}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.description}</div>
                      </div>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: `${p.color}18`, borderRadius: 6,
                      padding: '3px 10px', fontSize: 11, color: p.color, fontWeight: 600,
                    }}>
                      🎯 {p.focus}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Time ── */}
        {step === 'time' && activeProfile && (
          <motion.div key="time" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} style={{ width: '100%', maxWidth: 700 }}>
            <div style={{
              background: `${activeProfile.color}10`,
              border: `1px solid ${activeProfile.color}40`,
              borderRadius: 12, padding: '12px 18px', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>{activeProfile.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: activeProfile.color }}>
                  {activeProfile.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{activeProfile.description}</div>
              </div>
              <button onClick={() => setStep('audience')} style={{
                marginLeft: 'auto', background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: 11,
              }}>Change</button>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20 }}>
              How much time do you have today?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {timeBudgets.map((budget, i) => {
                const preview = getSlidesForAudience(activeProfile.id, budget);
                const mins = preview.reduce((a, s) => a + s.duration, 0);
                const isSelected = selectedBudget === budget;
                return (
                  <motion.button
                    key={budget}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => {
                      setSelectedBudget(budget);
                      setTimeout(() => setStep('preview'), 220);
                    }}
                    style={{
                      background: isSelected ? `${activeProfile.color}14` : 'var(--bg-card)',
                      border: `2px solid ${isSelected ? activeProfile.color : 'var(--border)'}`,
                      borderRadius: 12, padding: '20px 14px',
                      cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      fontSize: 26, fontWeight: 900,
                      color: isSelected ? activeProfile.color : 'var(--text-primary)',
                    }}>
                      {budget}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 1 }}>
                      MIN
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-secondary)' }}>
                      ~{preview.length} slides
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                      ≈{mins} min content
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Preview ── */}
        {step === 'preview' && activeProfile && selectedBudget && (
          <motion.div key="preview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} style={{ width: '100%', maxWidth: 780 }}>

            {/* Summary bar */}
            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap',
              marginBottom: 20, alignItems: 'center',
            }}>
              <div style={{
                background: `${activeProfile.color}12`,
                border: `1px solid ${activeProfile.color}40`,
                borderRadius: 10, padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 200,
              }}>
                <span style={{ fontSize: 22 }}>{activeProfile.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: activeProfile.color }}>{activeProfile.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{activeProfile.focus}</div>
                </div>
                <button onClick={() => setStep('audience')} style={{
                  marginLeft: 'auto', background: 'transparent', border: '1px solid var(--border)',
                  borderRadius: 6, padding: '3px 8px', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 10,
                }}>Edit</button>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '10px 16px', textAlign: 'center', minWidth: 90,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{filteredSlides.length}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>SLIDES</div>
                </div>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '10px 16px', textAlign: 'center', minWidth: 90,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)' }}>{totalMins}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>MIN EST.</div>
                </div>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '10px 16px', textAlign: 'center', minWidth: 90,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-muted)' }}>{skippedSlides.length}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>SKIPPED</div>
                </div>
                <button onClick={() => setStep('time')} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Clock size={13} /> {selectedBudget}min
                </button>
              </div>
            </div>

            {/* Section-by-section breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {allSections.map((section) => {
                const included = filteredSlides.filter((s) => s.section === section);
                const skipped = skippedSlides.filter((s) => s.section === section);
                const color = sectionColors[section] || 'var(--accent)';
                if (included.length === 0 && skipped.length === 0) return null;
                return (
                  <div key={section} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 10, padding: '12px 14px',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                    }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0,
                      }} />
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{section}</div>
                      <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
                        {included.length} in · {skipped.length} skip
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {included.map((s) => (
                        <div key={s.id} title={`${s.title} (${s.duration}m)`} style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          background: `${color}14`, border: `1px solid ${color}30`,
                          borderRadius: 6, padding: '3px 8px',
                          fontSize: 10, color, fontWeight: 600,
                          maxWidth: 180, overflow: 'hidden',
                        }}>
                          <CheckCircle size={10} style={{ flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {s.title.replace('🚨 ', '')}
                          </span>
                          <span style={{ opacity: 0.7, flexShrink: 0 }}>{s.duration}m</span>
                        </div>
                      ))}
                      {skipped.map((s) => (
                        <div key={s.id} title={`SKIPPED: ${s.title}`} style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                          borderRadius: 6, padding: '3px 8px',
                          fontSize: 10, color: 'var(--text-muted)',
                          maxWidth: 160, overflow: 'hidden',
                        }}>
                          <XCircle size={10} style={{ flexShrink: 0, opacity: 0.5 }} />
                          <span style={{
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            textDecoration: 'line-through', opacity: 0.5,
                          }}>
                            {s.title.replace('🚨 ', '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Start button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onStart(filteredSlides)}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${activeProfile.color}, #79c0ff)`,
                color: '#0d1117', border: 'none', borderRadius: 14,
                padding: '18px 32px', fontSize: 18, fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 12, letterSpacing: 0.5,
                boxShadow: `0 0 32px ${activeProfile.color}40`,
              }}
            >
              <Play size={20} fill="currentColor" />
              Start Presentation — {filteredSlides.length} slides · ~{totalMins} min
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
