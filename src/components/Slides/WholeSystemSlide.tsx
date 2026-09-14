import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';
import { ArrowRight, Layers, Bug, CheckCircle, Server, HardDrive, Terminal, Shield } from 'lucide-react';

interface Props { slide: SlideData; }

const phases = [
  {
    title: '1. Idea & Development',
    color: '#bc8cff',
    bg: 'rgba(188,140,255,0.08)',
    border: 'rgba(188,140,255,0.25)',
    steps: ['Business Goal', 'Requirements', 'UX Design', 'Local Code'],
  },
  {
    title: '2. Versioning & Automation',
    color: '#58a6ff',
    bg: 'rgba(88,166,255,0.08)',
    border: 'rgba(88,166,255,0.25)',
    steps: ['Git Commit', 'GitHub PR', 'CI/CD Pipeline', 'Docker Build'],
  },
  {
    title: '3. Cloud & Infrastructure',
    color: '#ffa657',
    bg: 'rgba(255,166,87,0.08)',
    border: 'rgba(255,166,87,0.25)',
    steps: ['Cloud Server (VPS)', 'Nginx Reverse Proxy', 'Docker Container', 'App Runtime'],
  },
  {
    title: '4. Delivery & Data',
    color: '#3fb950',
    bg: 'rgba(63,185,80,0.08)',
    border: 'rgba(63,185,80,0.25)',
    steps: ['Frontend UI', 'Backend API', 'Database Storage', 'End Customer'],
  },
];

const debugLadder = [
  { step: '1', label: 'Browser UI', color: 'var(--accent)' },
  { step: '2', label: 'Network Requests', color: '#79c0ff' },
  { step: '3', label: 'Server IP', color: '#ffa657' },
  { step: '4', label: 'Reverse Proxy', color: '#f78166' },
  { step: '5', label: 'Docker Container', color: '#56d364' },
  { step: '6', label: 'App Backend', color: 'var(--success)' },
  { step: '7', label: 'Database', color: 'var(--warning)' },
  { step: '8', label: 'Logs', color: 'var(--purple)' },
];

export default function WholeSystemSlide({ slide }: Props) {
  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 36px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 4 }}>
        {slide.title}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
        The end-to-end journey from business idea to customer — and the systematic ladder to debug when something breaks.
      </p>

      {/* Main End-to-End System Flow Grid */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Layers size={14} /> End-to-End System Architecture
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${phase.border}`,
                borderRadius: 12,
                padding: 14,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: phase.color, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${phase.border}` }}>
                  {phase.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {phase.steps.map((s, i) => (
                    <div
                      key={s}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'var(--bg-card-hover)',
                        border: '1px solid var(--border)',
                        borderRadius: 6,
                        padding: '6px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span style={{ fontSize: 9, color: phase.color, fontWeight: 800 }}>0{i + 1}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Debugging Ladder Section */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--error)', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Bug size={14} /> Debugging Ladder: Where To Look Outside-In
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8, marginBottom: 12 }}>
          {debugLadder.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              style={{
                background: `${d.color}15`,
                border: `1px solid ${d.color}40`,
                borderRadius: 8,
                padding: '8px 10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: d.color }}>Step {d.step}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{d.label}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
            💡 The Debug Rule: Never change code blindly. Trace from Browser → Network → Proxy → Server → App → DB.
          </span>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent)', background: 'var(--bg-card)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
            Isolate Layer First
          </span>
        </div>
      </div>
    </SlideWrapper>
  );
}
