'use client'

import { useEffect, useRef } from 'react'
import { useQueryState } from 'nuqs'

/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * ScanQr — live QR code scanner panel.
 *
 * Flutter source: shell_widget.dart (scan_qr panel state)
 *
 * LAYOUT ARCHITECTURE:
 * ─────────────────────────────────────────────────────────────────
 * The panel is a full-size container hosting a live camera stream as
 * background. Over it sits a single UI chrome layer:
 *   [1] sqr-window div — transparent; its 9999px box-shadow creates
 *       the 56% dark surround, leaving the window a true camera cutout
 *   [2] Corner bracket SVGs + animated scan line inside the window
 *   [3] Header, CTA button, bottom instructions — all outside the window
 * ─────────────────────────────────────────────────────────────────
 *
 * RESPONSIVE SPEC:
 * ─────────────────────────────────────────────────────────────────
 * PROPERTY                MOBILE (<1440px)      DESKTOP (≥1440px)
 * ─────────────────────────────────────────────────────────────────
 * Container               100vw full-screen     696px panel-width
 * Header font size        18px                  24px
 * CTA button text         14px                  16px
 * CTA button icon         24px                  24px
 * Primary instruction     16px                  18px
 * Secondary instruction   14px                  16px
 * ─────────────────────────────────────────────────────────────────
 */
const ScanQr = () => {
    const [, setPanel] = useQueryState('panel')
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)

    /** Attempt to start the rear-facing camera stream. */
    useEffect(() => {
        let active = true

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' } },
                    audio: false,
                })
                if (!active) {
                    stream.getTracks().forEach((t) => t.stop())
                    return
                }
                streamRef.current = stream
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            } catch {
                /* Camera permission denied or unavailable — viewport stays dark. */
            }
        }

        startCamera()

        return () => {
            active = false
            streamRef.current?.getTracks().forEach((t) => t.stop())
        }
    }, [])

    return (
        <div
            className='sqr-wrapper'
            style={{
                width: '100%',
                height: '100%',
                minHeight: '100vh',
                backgroundColor: '#000000',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* ── LAYER 0: Camera Viewport — mirrored front cameras are un-flipped with scaleX(-1) ── */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scaleX(-1)',
                }}
            />


            {/* ── LAYER 2: UI chrome (header + scan window + CTA + instructions) ── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '56px 24px 48px 24px',
                    boxSizing: 'border-box',
                }}
                className='sqr-chrome'
            >
                {/* ── HEADER ROW — back | title | spacer ── */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    {/* Back arrow — navigates to panel home */}
                    <button
                        onClick={() => setPanel('home')}
                        aria-label='Go back'
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <span
                            className='material-symbols-rounded'
                            style={{ fontSize: 24, color: '#FFFFFF' }}
                        >
                            arrow_back
                        </span>
                    </button>

                    {/* Title — "Scan UPI QR Code" */}
                    <span
                        className='sqr-title'
                        style={{
                            fontFamily: FF_FONT,
                            fontWeight: 600,
                            color: '#FFFFFF',
                            letterSpacing: 0,
                            textAlign: 'center',
                        }}
                    >
                        Scan UPI QR Code
                    </span>

                    {/* Invisible 24×24 spacer — centres the title */}
                    <div style={{ width: 24, height: 24, flexShrink: 0 }} />
                </div>

                {/* Gap between header and scan window */}
                <div style={{ flex: '0 0 32px' }} />

                {/* ── SCANNING WINDOW ──────────────────────────────────────────────────────
                 *  backgroundColor: transparent → camera shows through unobstructed.
                 *  boxShadow: 9999px spread = dark surround at 56%; clipped by wrapper
                 *    overflow:hidden to the panel edges — no separate overlay layer needed.
                 *  overflow: visible → shadow renders outside bounds.
                 *  Inner clip div → constrains scan-line animation to window bounds.
                 * ──────────────────────────────────────────────────────────────────────── */}
                <div
                    className='sqr-window'
                    style={{
                        position: 'relative',
                        borderRadius: 16,
                        backgroundColor: 'transparent',
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.56)',
                        boxSizing: 'border-box',
                        flexShrink: 0,
                        overflow: 'visible',
                    }}
                >
                    {/* Corner bracket strokes — 4 SVG absolute-positioned corners */}

                    {/* Top-left */}
                    <svg width='44' height='44' style={{ position: 'absolute', top: 0, left: 0 }} aria-hidden='true'>
                        <path d='M 40 4 L 16 4 Q 4 4 4 16 L 4 40' fill='none' stroke='#FFFFFF' strokeWidth='4' strokeLinecap='round' />
                    </svg>

                    {/* Top-right */}
                    <svg width='44' height='44' style={{ position: 'absolute', top: 0, right: 0 }} aria-hidden='true'>
                        <path d='M 4 4 L 28 4 Q 40 4 40 16 L 40 40' fill='none' stroke='#FFFFFF' strokeWidth='4' strokeLinecap='round' />
                    </svg>

                    {/* Bottom-left */}
                    <svg width='44' height='44' style={{ position: 'absolute', bottom: 0, left: 0 }} aria-hidden='true'>
                        <path d='M 40 40 L 16 40 Q 4 40 4 28 L 4 4' fill='none' stroke='#FFFFFF' strokeWidth='4' strokeLinecap='round' />
                    </svg>

                    {/* Bottom-right */}
                    <svg width='44' height='44' style={{ position: 'absolute', bottom: 0, right: 0 }} aria-hidden='true'>
                        <path d='M 4 40 L 28 40 Q 40 40 40 28 L 40 4' fill='none' stroke='#FFFFFF' strokeWidth='4' strokeLinecap='round' />
                    </svg>

                    {/* Inner clip — constrains the scan line to within the window bounds */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 16,
                            overflow: 'hidden',
                        }}
                    >
                        {/* Animated horizontal scan line — 4px white, bounces top ↔ bottom */}
                        <div
                            className='sqr-scan-line'
                            aria-hidden='true'
                            style={{
                                position: 'absolute',
                                left: 8,
                                right: 8,
                                height: 4,
                                borderRadius: 2,
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, #FFFFFF 50%, rgba(255,255,255,0.9) 70%, transparent 100%)',
                                boxShadow: '0 0 8px 2px rgba(255,255,255,0.5)',
                            }}
                        />
                    </div>
                </div>

                {/* Gap between scan window and CTA */}
                <div style={{ flex: '0 0 24px' }} />

                {/* ── CTA: "Type in UPI Instead" pill button ── */}
                <button
                    onClick={() => setPanel('type_upi')}
                    aria-label='Type in UPI Instead'
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 48,
                        padding: '12px 20px',
                        gap: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.60)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: 1000,
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        flexShrink: 0,
                    }}
                >
                    <span
                        className='material-symbols-rounded sqr-cta-icon'
                        style={{
                            fontSize: 24,
                            color: 'rgba(255, 255, 255, 0.72)',
                            fontVariationSettings: "'FILL' 0",
                        }}
                    >
                        keyboard
                    </span>
                    <span
                        className='sqr-cta-text'
                        style={{
                            fontFamily: FF_FONT,
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.72)',
                            lineHeight: 1.5,
                            letterSpacing: 0,
                        }}
                    >
                        Type in UPI Instead
                    </span>
                </button>

                {/* Spacer that pushes instructions to bottom */}
                <div style={{ flex: 1 }} />

                {/* ── BOTTOM INSTRUCTIONS ── */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        textAlign: 'center',
                    }}
                >
                    {/* Primary instruction */}
                    <p
                        className='sqr-instruction-primary'
                        style={{
                            fontFamily: FF_FONT,
                            fontWeight: 600,
                            color: '#FFFFFF',
                            lineHeight: 1.4,
                            letterSpacing: 0,
                            margin: 0,
                        }}
                    >
                        Ensure Clarity:
                    </p>

                    {/* Secondary instruction */}
                    <p
                        className='sqr-instruction-secondary'
                        style={{
                            fontFamily: FF_FONT,
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.72)',
                            lineHeight: 1.5,
                            letterSpacing: 0,
                            margin: 0,
                            maxWidth: 280,
                        }}
                    >
                        Make sure the QR code is clear and has no smudges
                    </p>
                </div>
            </div>

            {/* Responsive overrides */}
            <style>{`
        /* ── Scan line animation — bounces from top to bottom and back ── */
        @keyframes sqr-scan {
          0%   { top: 8px; }
          50%  { top: calc(100% - 12px); }
          100% { top: 8px; }
        }
        .sqr-scan-line {
          animation: sqr-scan 2.4s ease-in-out infinite;
        }

        /* ── Default (desktop ≥1440px) ── */
        .sqr-chrome      { padding-top: 56px !important; }
        .sqr-title       { font-size: 24px; line-height: 1.24; }
        .sqr-window      { width: 320px; height: 320px; }
        .sqr-cta-text    { font-size: 16px; }
        .sqr-cta-icon    { font-size: 24px; }
        .sqr-instruction-primary   { font-size: 18px; }
        .sqr-instruction-secondary { font-size: 16px; }

        @media (max-width: 1439px) {
          .sqr-chrome      { padding-top: 96px !important; }
          .sqr-title       { font-size: 18px !important; line-height: 1.40 !important; }
          .sqr-window      { width: 280px !important; height: 280px !important; }
          .sqr-cta-text    { font-size: 14px !important; }
          .sqr-instruction-primary   { font-size: 16px !important; }
          .sqr-instruction-secondary { font-size: 14px !important; }
        }
      `}</style>
        </div>
    )
}

export default ScanQr
