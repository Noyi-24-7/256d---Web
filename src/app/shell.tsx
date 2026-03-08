'use client'

import Image from 'next/image'
import { useQueryState } from 'nuqs'
import LeftPanelContent from '@/panels/home'
import RightHome from '@/panels/right-home'
import TypeUpi from '@/panels/type-upi'

/**
 * Shell — main application layout.
 *
 * Flutter architecture (shell_widget.dart):
 * ─ Scaffold(backgroundColor: primaryBackground)
 *   └─ SafeArea > Stack
 *      ├─ [0] Row (expands full height)
 *      │    ├─ Left col:  SingleChildScrollView (720px, scrollable)
 *      │    └─ Right col: SingleChildScrollView (696px, sticky)
 *      └─ [1] Align(topLeft) > NavBar (720px, fixed overlay)
 *
 * Panel routing (mirrors Flutter FFAppState.pageState):
 *   panel=home     → Left: LeftPanelContent  | Right: RightHome
 *   panel=type_upi → Left: LeftPanelContent  | Right: TypeUpi
 *   panel=scan_qr  → Left: hidden (mobile)   | Right: ScanQr  ← add panels/scan-qr.tsx
 *
 * To add a new panel screen:
 *   1. Create src/panels/<name>.tsx
 *   2. Import it here and add one `if (panel === '<name>') return <Name />` line in RightPanel
 */
const Shell = () => {
  const [panel] = useQueryState('panel', { defaultValue: 'home' })
  const isHome = panel === 'home'

  return (
    <>
      {/*
       * Full-viewport fixed wrapper — the "Scaffold".
       * overflow:hidden prevents body-level scrolling.
       * secondaryBackground (#F7F8FB) is the gap colour visible between panels.
       */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#F7F8FB',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden',
        }}
      >
        {/* 1440px max-width container — the Flutter "Row" of the two panels */}
        <div
          style={{
            width: '100%',
            maxWidth: 1440,
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
          }}
        >
          {/*
           * LEFT PANEL — 720px desktop / full-width mobile.
           * The ONLY scrollable element (mirrors SingleChildScrollView).
           * Hidden on mobile when a sub-panel (type_upi) is active.
           */}
          <div
            className={isHome ? 'panel-left panel-left--home' : 'panel-left panel-left--sub'}
            style={{ overflowY: 'auto', height: '100%', backgroundColor: '#FFFFFF' }}
          >
            <LeftPanelContent />
          </div>

          {/* 24px GAP — desktop only. Transparent — outer #F7F8FB shows through. */}
          <div className='panel-gap' />

          {/*
           * RIGHT PANEL — 696px desktop / full-width mobile.
           * Inline routing: add a new panel by adding one import + one `if` here.
           */}
          <div
            className={isHome ? 'panel-right panel-right--home' : 'panel-right panel-right--sub'}
            style={{ overflowY: 'auto', height: '100%', backgroundColor: '#FFFFFF' }}
          >
            {panel === 'home' && <RightHome />}
            {panel === 'type_upi' && <TypeUpi />}
          </div>

          {/*
           * NAVBAR OVERLAY — Stack layer [1].
           * Flutter source: shell_widget.dart lines 1766–1863
           * Inlined here: single-use, no props — no reason for a separate file.
           *
           * Width: 720px desktop | full-width mobile.
           * Padding: fromSTEB(24, 20, 24, 20).
           * Row — spaceBetween: [Logo (48×48 circle)] | [Avatar (48×48, r:8) + "Login with Nostr"]
           */}
          <div className='navbar-overlay'>
            <div
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.0157)',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* LEFT: 256d Logo — 48×48 circle */}
              <div style={{ width: 48, height: 48, borderRadius: '1000px', overflow: 'hidden', flexShrink: 0 }}>
                <Image
                  src='/images/Logo.png'
                  alt='256d Logo'
                  width={48}
                  height={48}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  priority
                />
              </div>

              {/* RIGHT: Avatar + "Login with Nostr" — gap:12 */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <Image
                    src='/images/Empty_Avatar.png'
                    alt='User avatar'
                    width={48}
                    height={48}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-delight), ui-sans-serif, system-ui, sans-serif',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#000000',
                    letterSpacing: 0,
                    lineHeight: 1.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Login with Nostr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped responsive styles for the Shell layout */}
      <style>{`
        /* ─── MOBILE (<1440px) ─── */
        .panel-left { width: 100%; flex-shrink: 0; }
        .panel-left--sub  { display: none; }
        .panel-left--home { display: block; }

        .panel-gap { display: none; }

        .panel-right { width: 100%; flex-shrink: 0; }
        .panel-right--home { display: none; }
        .panel-right--sub  { display: block; }

        .navbar-overlay {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1440px;
          z-index: 50;
          pointer-events: none;
        }
        .navbar-overlay > * { pointer-events: auto; }

        /* ─── DESKTOP (≥1440px) ─── */
        @media (min-width: 1440px) {
          .panel-left         { width: 720px; }
          .panel-left--sub    { display: block !important; }
          .panel-left--home   { display: block; }

          .panel-gap {
            display: block;
            width: 24px;
            flex-shrink: 0;
            background: transparent;
          }

          .panel-right        { width: 696px; }
          .panel-right--home  { display: block !important; }
          .panel-right--sub   { display: block; }

          .navbar-overlay {
            max-width: 720px;
            left: 50%;
            transform: translateX(-50%) translateX(-360px);
          }
        }
      `}</style>
    </>
  )
}

export default Shell
