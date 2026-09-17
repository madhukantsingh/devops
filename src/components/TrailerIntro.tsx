import React, { useRef, useState, useEffect } from 'react';

interface TrailerIntroProps {
  onDone: () => void;
}

export default function TrailerIntro({ onDone }: TrailerIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'idle' | 'playing' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCtrl, setShowCtrl] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide bottom controls while playing
  const bumpControls = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowCtrl(true);
    if (state === 'playing') {
      timerRef.current = setTimeout(() => setShowCtrl(false), 3000);
    }
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => { if (v.duration) setProgress(v.currentTime / v.duration); };
    const onMeta = () => setDuration(v.duration);
    const onEnd  = () => onDone();
    const onErr  = () => setState('error');
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('ended', onEnd);
    v.addEventListener('error', onErr);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('ended', onEnd);
      v.removeEventListener('error', onErr);
    };
  }, [onDone]);

  const play = async () => {
    const v = videoRef.current;
    if (!v) return;
    try { await v.play(); setState('playing'); timerRef.current = setTimeout(() => setShowCtrl(false), 3000); }
    catch { setState('error'); }
  };
  const pause = () => { videoRef.current?.pause(); setState('idle'); setShowCtrl(true); if (timerRef.current) clearTimeout(timerRef.current); };
  const skip  = () => { videoRef.current?.pause(); onDone(); };

  const scrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    v.currentTime = ratio * duration;
    setProgress(ratio);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  const elapsed = duration ? progress * duration : 0;
  const ctrlOn = showCtrl || state !== 'playing';

  return (
    <div style={S.root} onMouseMove={bumpControls}>

      {/* ── VIDEO — natural aspect ratio, never cropped ── */}
      <div
        style={S.videoWrap}
        onClick={state === 'playing' ? pause : undefined}
      >
        <video
          ref={videoRef}
          src="/trailer.mp4"
          preload="metadata"
          playsInline
          style={S.video}
        />

        {/* Big play button overlay — only when idle */}
        {state === 'idle' && (
          <div style={S.playOverlay} onClick={e => { e.stopPropagation(); play(); }}>
            <button style={S.playBtn} id="trailer-play-btn">
              <span style={S.pulse1} /><span style={S.pulse2} />
              <svg width="38" height="38" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 5 }}>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <p style={S.playHint}>Click to watch the trailer</p>
          </div>
        )}
      </div>

      {/* ── CONTROLS BAR — sits BELOW the video, never overlaps ── */}
      <div style={{ ...S.ctrlBar, opacity: ctrlOn ? 1 : 0 }}>

        {/* Progress track */}
        <div style={S.track} onClick={scrub}>
          <div style={{ ...S.fill, width: `${progress * 100}%` }} />
          <div style={{ ...S.dot, left: `${progress * 100}%` }} />
        </div>

        {/* Buttons row */}
        <div style={S.row}>
          {/* Play/Pause */}
          <button style={S.iconBtn} onClick={state === 'playing' ? pause : play}>
            {state === 'playing'
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>}
          </button>

          {/* Title + badge */}
          <span style={S.titleText}>🎬 From Code to Customer</span>
          <span style={S.badge}>TRAILER</span>

          <div style={{ flex: 1 }} />

          {/* Timestamp */}
          <span style={S.time}>{fmt(elapsed)} / {duration ? fmt(duration) : '--:--'}</span>

          {/* Skip */}
          <button style={S.skipBtn} onClick={skip}>
            Skip to presentation &rsaquo;
          </button>
        </div>
      </div>

      {/* Error state */}
      {state === 'error' && (
        <div style={S.errBox}>
          <p style={{ color: '#f87171', margin: '0 0 12px', fontSize: 14 }}>⚠️ Could not load video</p>
          <button style={S.errBtn} onClick={skip}>Skip to presentation →</button>
        </div>
      )}

      <style>{`
        @keyframes pa { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(1.9);opacity:0} }
        @keyframes pb { 0%{transform:scale(1);opacity:.3}  100%{transform:scale(2.5);opacity:0} }
        #trailer-play-btn:hover { transform:scale(1.1)!important; box-shadow:0 0 70px rgba(99,102,241,.85)!important; }
      `}</style>
    </div>
  );
}

/* ─── Styles ───────────────────────────────────────────────────────────── */
const S: Record<string, React.CSSProperties> = {
  /* Outer shell: full screen, column layout — video on top, controls pinned at bottom */
  root: {
    position: 'fixed', inset: 0,
    background: '#000',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, overflow: 'hidden',
  },

  /* Video wrapper: takes all available space above the controls bar */
  videoWrap: {
    position: 'relative',
    flex: 1,
    width: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'default',
    overflow: 'hidden',
  },

  /* Video: contain = never cropped, full native aspect ratio */
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',   /* ← KEY: shows exact video frame, no crop */
    display: 'block',
  },

  /* Semi-transparent overlay for the play button */
  playOverlay: {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 16, cursor: 'pointer',
    background: 'rgba(0,0,0,0.35)',
  },

  /* Glowing play button */
  playBtn: {
    width: 96, height: 96, borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(99,102,241,.88), rgba(168,85,247,.88))',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255,255,255,.2)',
    color: '#fff', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 0 50px rgba(99,102,241,.65), 0 0 90px rgba(168,85,247,.3)',
    transition: 'all .25s cubic-bezier(.34,1.56,.64,1)',
  },
  pulse1: { position:'absolute', inset:-8, borderRadius:'50%', border:'2px solid rgba(99,102,241,.55)', animation:'pa 2s ease-out infinite', pointerEvents:'none' },
  pulse2: { position:'absolute', inset:-8, borderRadius:'50%', border:'1.5px solid rgba(168,85,247,.3)', animation:'pb 2s ease-out infinite .65s', pointerEvents:'none' },
  playHint: { color:'rgba(255,255,255,.6)', fontSize:13, fontFamily:"'Inter',system-ui,sans-serif", margin:0, letterSpacing:'.01em' },

  /* Controls bar — fixed height at bottom, never overlaps video */
  ctrlBar: {
    width: '100%',
    flexShrink: 0,
    background: 'linear-gradient(to top, #0a0a14 80%, rgba(10,10,20,0.6))',
    padding: '10px 20px 14px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    transition: 'opacity .35s',
    boxSizing: 'border-box',
  },

  /* Clickable progress track */
  track: {
    width: '100%', height: 4,
    background: 'rgba(255,255,255,.18)',
    borderRadius: 2, marginBottom: 10,
    cursor: 'pointer', position: 'relative',
  },
  fill: { height:'100%', background:'linear-gradient(90deg,#6366f1,#a855f7)', borderRadius:2, pointerEvents:'none' },
  dot:  { position:'absolute', top:'50%', width:11, height:11, borderRadius:'50%', background:'#fff', transform:'translate(-50%,-50%)', boxShadow:'0 0 5px rgba(99,102,241,.9)', pointerEvents:'none' },

  row: { display:'flex', alignItems:'center', gap:10 },

  iconBtn: { background:'none', border:'none', color:'#fff', cursor:'pointer', padding:4, display:'flex', alignItems:'center', flexShrink:0 },

  titleText: { color:'rgba(255,255,255,.75)', fontSize:13, fontWeight:600, fontFamily:"'Inter',system-ui,sans-serif", whiteSpace:'nowrap', letterSpacing:'-0.01em' },

  badge: { background:'rgba(168,85,247,.22)', border:'1px solid rgba(168,85,247,.4)', color:'rgba(200,160,255,.9)', fontSize:9, fontWeight:700, letterSpacing:'.13em', padding:'2px 7px', borderRadius:4, fontFamily:"'Inter',system-ui,sans-serif", whiteSpace:'nowrap' },

  time: { color:'rgba(255,255,255,.45)', fontSize:12, fontFamily:'monospace', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap', flexShrink:0 },

  skipBtn: { background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.14)', borderRadius:7, color:'rgba(255,255,255,.55)', fontSize:12, fontWeight:500, padding:'5px 14px', cursor:'pointer', fontFamily:"'Inter',system-ui,sans-serif", whiteSpace:'nowrap', flexShrink:0, transition:'all .2s' },

  errBox: { position:'absolute', inset:0, zIndex:20, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,.7)' },
  errBtn: { background:'#6366f1', border:'none', borderRadius:8, color:'#fff', fontSize:14, fontWeight:600, padding:'10px 24px', cursor:'pointer', fontFamily:"'Inter',system-ui,sans-serif" },
};
