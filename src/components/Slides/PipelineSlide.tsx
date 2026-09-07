import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { Play, AlertTriangle, CheckCircle, XCircle, Clock, Terminal } from 'lucide-react';

interface Props { slide: SlideData; }

const stages = [
  {
    id: 'checkout',
    label: 'CHECKOUT',
    icon: '📥',
    what: 'Downloads the latest code from GitHub',
    why: 'Ensures the pipeline works on the correct version',
    failLook: 'Git authentication errors or network issues',
  },
  {
    id: 'install',
    label: 'INSTALL',
    icon: '📦',
    what: 'Installs project dependencies',
    why: 'Application needs its libraries to build and run',
    failLook: 'Missing package, version conflict, or registry issue',
  },
  {
    id: 'build',
    label: 'BUILD',
    icon: '🔨',
    what: 'Compiles code and creates deployment bundle',
    why: 'Transforms source code into production-ready files',
    failLook: 'Syntax error, type error, or missing import',
  },
  {
    id: 'test',
    label: 'TEST',
    icon: '🧪',
    what: 'Runs the automated test suite',
    why: 'Verifies the code behaves correctly before deployment',
    failLook: 'Failing assertion, broken feature, or regression',
  },
  {
    id: 'security',
    label: 'SECURITY',
    icon: '🔒',
    what: 'Checks for known vulnerabilities and code quality issues',
    why: 'Prevents shipping known security flaws',
    failLook: 'Critical vulnerability in a dependency',
  },
  {
    id: 'package',
    label: 'PACKAGE',
    icon: '📦',
    what: 'Creates a Docker image or deployment artifact',
    why: 'Produces a self-contained, versioned deployable unit',
    failLook: 'Dockerfile error or image registry issue',
  },
  {
    id: 'deploy',
    label: 'DEPLOY',
    icon: '🚀',
    what: 'Pushes the validated artifact to the server',
    why: 'Makes the new version available to users',
    failLook: 'Server unreachable, permissions issue, or out of disk space',
  },
  {
    id: 'verify',
    label: 'VERIFY',
    icon: '✅',
    what: 'Runs health checks and smoke tests post-deployment',
    why: 'Confirms the deployment was successful end-to-end',
    failLook: 'Application not responding or health endpoint returning errors',
  },
];

type StageStatus = 'idle' | 'running' | 'success' | 'failed' | 'paused';

export default function PipelineSlide({ slide }: Props) {
  const [statuses, setStatuses] = useState<StageStatus[]>(stages.map(() => 'idle'));
  const [running, setRunning] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [done, setDone] = useState(false);

  const runPipeline = async () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setShowLogs(false);
    const failAt = simulateFailure ? 3 : -1; // fail at TEST
    const newStatuses: StageStatus[] = stages.map(() => 'idle');
    setStatuses([...newStatuses]);

    for (let i = 0; i < stages.length; i++) {
      if (i > 0 && newStatuses[i - 1] === 'failed') {
        newStatuses[i] = 'paused';
        continue;
      }
      newStatuses[i] = 'running';
      setStatuses([...newStatuses]);
      await new Promise((r) => setTimeout(r, 800));

      if (i === failAt) {
        newStatuses[i] = 'failed';
        // Mark remaining as paused
        for (let j = i + 1; j < stages.length; j++) newStatuses[j] = 'paused';
        setStatuses([...newStatuses]);
        break;
      } else {
        newStatuses[i] = 'success';
        setStatuses([...newStatuses]);
      }
    }

    setRunning(false);
    setDone(true);
  };

  const reset = () => {
    setStatuses(stages.map(() => 'idle'));
    setDone(false);
    setShowLogs(false);
    setSelected(null);
  };

  const hasFailed = statuses.some((s) => s === 'failed');

  const statusIcon = (s: StageStatus) => {
    switch (s) {
      case 'success': return <CheckCircle size={14} style={{ color: 'var(--success)' }} />;
      case 'failed': return <XCircle size={14} style={{ color: 'var(--error)' }} />;
      case 'running': return <Clock size={14} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />;
      case 'paused': return <span style={{ fontSize: 14 }}>⏸</span>;
      default: return <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>○</span>;
    }
  };

  const statusColor = (s: StageStatus) => {
    switch (s) {
      case 'success': return 'var(--success)';
      case 'failed': return 'var(--error)';
      case 'running': return 'var(--accent)';
      case 'paused': return 'var(--text-muted)';
      default: return 'var(--border)';
    }
  };

  return (
    <SlideWrapper slide={slide}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 800, color: 'var(--text-primary)' }}>{slide.title}</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Simulate failure toggle */}
          <button
            onClick={() => setSimulateFailure((v) => !v)}
            style={{
              background: simulateFailure ? 'var(--error-dim)' : 'var(--bg-card)',
              border: `1px solid ${simulateFailure ? 'var(--error)' : 'var(--border)'}`,
              color: simulateFailure ? 'var(--error)' : 'var(--text-secondary)',
              borderRadius: 8,
              padding: '7px 14px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <AlertTriangle size={13} />
            {simulateFailure ? 'Failure ON' : 'Simulate Failure'}
          </button>

          {done && (
            <button onClick={reset} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 12 }}>
              Reset
            </button>
          )}

          <button
            onClick={runPipeline}
            disabled={running}
            style={{
              background: running ? 'var(--bg-card)' : 'linear-gradient(135deg, var(--accent), #79c0ff)',
              color: running ? 'var(--text-muted)' : '#0d1117',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              cursor: running ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Play size={14} fill={running ? 'none' : 'currentColor'} />
            {running ? 'Running…' : 'Run Pipeline'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Pipeline stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'stretch', minWidth: 260 }}>
          {stages.map((stage, i) => {
            const status = statuses[i];
            const isSelected = selected === i;
            return (
              <React.Fragment key={stage.id}>
                <motion.button
                  onClick={() => setSelected(isSelected ? null : i)}
                  style={{
                    background: isSelected ? `${statusColor(status)}18` : 'var(--bg-card)',
                    border: `1px solid ${isSelected ? statusColor(status) : status !== 'idle' ? statusColor(status) + '66' : 'var(--border)'}`,
                    borderRadius: 8,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                  animate={status === 'running' ? { borderColor: ['#58a6ff40', '#58a6ff', '#58a6ff40'] } : {}}
                  transition={status === 'running' ? { repeat: Infinity, duration: 1 } : {}}
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{stage.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: status === 'idle' ? 'var(--text-secondary)' : statusColor(status), flex: 1, fontFamily: 'monospace', letterSpacing: 1 }}>
                    {stage.label}
                  </span>
                  <div style={{ flexShrink: 0 }}>{statusIcon(status)}</div>
                </motion.button>
                {i < stages.length - 1 && (
                  <div style={{ width: 2, height: 6, background: 'var(--border)', marginLeft: 26 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detail / result panel */}
        <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Stage detail */}
          <AnimatePresence mode="wait">
            {selected !== null && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {stages[selected].icon} {stages[selected].label}
                </div>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>What it does</span>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{stages[selected].what}</p>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Why it exists</span>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{stages[selected].why}</p>
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--error)', textTransform: 'uppercase', letterSpacing: 1 }}>When it fails, check</span>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{stages[selected].failLook}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result banner */}
          <AnimatePresence>
            {hasFailed && done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'var(--error-dim)', border: '1px solid var(--error)', borderRadius: 10, padding: 14 }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--error)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <XCircle size={14} />
                  Pipeline failed — deployment stopped
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>
                  Deployment was paused because validation failed. This is intentional — bad code was prevented from reaching production.
                </p>
                <button
                  onClick={() => setShowLogs(true)}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Terminal size={11} /> Inspect logs
                </button>
                <AnimatePresence>
                  {showLogs && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', marginTop: 10 }}>
                      <pre style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--error)', background: 'var(--bg-primary)', padding: 10, borderRadius: 6, lineHeight: 1.6 }}>
{`[SIMULATED LOG]
● Running test suite...
  ✓ auth.login (passing)
  ✓ auth.register (passing)
  ✕ auth.resetPassword
    Expected: 200 OK
    Received: 500 Internal Server Error

Test Suites: 1 failed
Tests:       1 failed, 2 passed
FAIL — exiting with code 1`}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success banner */}
          <AnimatePresence>
            {!hasFailed && done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'var(--success-dim)', border: '1px solid var(--success)', borderRadius: 10, padding: 14 }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} />
                  Pipeline succeeded — deployment complete ✓
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!done && !running && statuses.every((s) => s === 'idle') && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: 14, textAlign: 'center' }}>
              Click "Run Pipeline" to simulate a deployment.<br />
              Click any stage to learn what it does.
            </div>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
}
