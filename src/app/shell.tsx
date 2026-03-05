'use client'

import { NavBar } from '@/components/layout/nav-bar'
import { RightPanel } from '@/components/shell/right-panel'
import { LeftPanelContent } from '@/components/shell/left-panel-content'
import { useQueryState } from 'nuqs'

/**
 * Shell — exact 1:1 replica of the Flutter ShellWidget layout.
 *
 * Flutter architecture (shell_widget.dart):
 * ─ Scaffold(backgroundColor: primaryBackground)
 *   └─ SafeArea > Stack
 *      ├─ [0] Row (expands full height)
 *      │    ├─ Left col:  SingleChildScrollView (720px, scrollable)
 *      │    └─ Right col: SingleChildScrollView (696px, sticky)
 *      └─ [1] Align(topLeft) > NavBar (720px, fixed overlay)
 *
 * Web equivalent:
 * - Outer fixed wrapper: secondaryBackground (#F7F8FB) fills the 24px gap + viewport sides
 * - 1440px container: 100vh, overflow:hidden, flex row (the "Scaffold viewport")
 * - Left panel:  overflow-y:auto, height:100% — only this element scrolls
 * - Right panel: overflow-y:auto, height:100% — sticky, never scrolls off
 * - NavBar:      position:fixed, width:720px — stays over left panel at all times
 *
 * Panel visibility rules (Flutter lines 1070–1092):
 *   ≥1440px + home     → Left(720px) + 24px gap + Right(696px, RightPanelEmpty)
 *   ≥1440px + type_upi → Left(720px) + 24px gap + Right(696px, TypeUpiPanel)
 *   <1440px + home     → Left only (full width), Right hidden
 *   <1440px + type_upi → Left hidden, Right only (full width)
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

          {/*
           * 24px GAP — desktop only.
           * Transparent so the #F7F8FB outer wrapper shows through as the separator.
           */}
          <div className='panel-gap' />

          {/*
           * RIGHT PANEL — 696px desktop / full-width mobile.
           * Does not scroll (sticky equivalent: height:100%, no overflow).
           * Desktop home: RightPanelEmpty. Desktop type_upi: TypeUpiPanel.
           * Mobile: HIDDEN on home, VISIBLE (full-width) on sub-panels.
           */}
          <div
            className={isHome ? 'panel-right panel-right--home' : 'panel-right panel-right--sub'}
            style={{ overflowY: 'auto', height: '100%', backgroundColor: '#FFFFFF' }}
          >
            <RightPanel />
          </div>

          {/*
           * NAVBAR OVERLAY — Stack layer [1].
           * position:fixed keeps it anchored at the viewport top.
           * On desktop the translateX math left-aligns it with the 1440px container.
           */}
          <div className='navbar-overlay'>
            <NavBar />
          </div>
        </div>
      </div>

      {/* Scoped responsive styles for the Shell layout */}
      <style>{`
        /* ─── MOBILE (< 1440px) ─── */
        .panel-left {
          width: 100%;
          flex-shrink: 0;
        }
        .panel-left--sub  { display: none; }
        .panel-left--home { display: block; }

        .panel-gap { display: none; }

        .panel-right {
          width: 100%;
          flex-shrink: 0;
        }
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

        /* ─── DESKTOP (≥ 1440px) ─── */
        @media (min-width: 1440px) {
          .panel-left         { width: 720px; }
          .panel-left--sub    { display: block !important; }
          .panel-left--home   { display: block; }

          .panel-gap {
            display: block;
            width: 24px;
            flex-shrink: 0;
            background: transparent; /* lets #F7F8FB outer bg show through */
          }

          .panel-right        { width: 696px; }
          .panel-right--home  { display: block !important; }
          .panel-right--sub   { display: block; }

          /* NavBar: left-aligned with the 1440px centered container */
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
