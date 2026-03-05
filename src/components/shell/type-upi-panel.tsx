'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'

/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * TypeUpiPanel — exact 1:1 replica of the Flutter TypeUPI container.
 *
 * Flutter source: shell_widget.dart lines 1134–1745
 *
 * RESPONSIVE SPEC:
 * ─────────────────────────────────────────────────────────────────
 * PROPERTY                MOBILE (<1440px)      DESKTOP (≥1440px)
 * ─────────────────────────────────────────────────────────────────
 * Container width         100% (viewport)       696px
 * Top padding             112px                 56px
 * Side padding            24px                  24px
 * Title font size         18px / lh:1.40        24px / lh:1.24
 * Instruction font size   16px                  18px
 * Input width             100% (full-width)     537px max
 * Continue button width   100% (full-width)     343px fixed
 * Continue button height  45px                  45px
 * ─────────────────────────────────────────────────────────────────
 *
 * LAYOUT (Column — divide:160 between header row and content):
 * [0] Header Row (spaceBetween):
 *     - Back arrow  — InkWell > arrow_back, 24px, primaryText
 *     - Title text  — responsive (see above)
 *     - 24×24 spacer — secondaryBackground, invisible, centres the title
 * [1] Content Row > Expanded > Column (divide:120 between form and Continue):
 *     Inner Column (divide:24):
 *       [A] Instruction text — 297px container, centered, secondaryText
 *       [B] Input + Paste sub-column (divide:12):
 *           - TextFormField: coolGray200 border, transparent on focus, radius:8
 *           - Paste button:  height:48, 0 20px padding, coolGray50 bg, coolGray100 border, radius:1000
 *       [C] Scan QR Instead button: height:48, 0 20px padding, no bg, radius:1000, secondaryText
 *     [D] Continue button: full-width mobile / 343px desktop, height:45, radius:1000
 *         Enabled: black bg. Disabled: coolGray100 bg.
 */
export const TypeUpiPanel = () => {
    const [, setPanel] = useQueryState('panel')
    const [upiId, setUpiId] = useState('')
    const isEnabled = upiId.trim().length > 0

    const handleBack = () => setPanel('home')
    const handleScanQr = () => setPanel('scan_qr')
    const handleContinue = () => console.log('Continue with UPI ID:', upiId)

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setUpiId(text)
        } catch { /* clipboard permission denied — silently ignore */ }
    }

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                padding: '56px 24px 0 24px',
            }}
            className='tupi-wrapper'
        >
            {/* ── HEADER ROW — spaceBetween: back | title | spacer ── */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                {/* Back arrow — arrow_back, 24px, primaryText */}
                <button
                    onClick={handleBack}
                    aria-label='Go back'
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                    <span className='material-symbols-rounded' style={{ fontSize: 24, color: '#000000' }}>
                        arrow_back
                    </span>
                </button>

                {/*
         * Title — headlineSmall, responsive:
         *   Desktop ≥1440: fontSize:24, lineHeight:1.24
         *   Mobile  <1440: fontSize:18, lineHeight:1.40  (via .tupi-title CSS class)
         */}
                <span
                    className='tupi-title'
                    style={{ fontFamily: FF_FONT, fontWeight: 600, color: '#000000', letterSpacing: 0, textAlign: 'center' }}
                >
                    Type in UPI ID
                </span>

                {/* Invisible 24×24 spacer — mirrors Flutter Container(24×24, secondaryBackground) */}
                <div style={{ width: 24, height: 24, backgroundColor: '#F7F8FB', flexShrink: 0 }} />
            </div>

            {/* divide:160 — gap between header and content (same on mobile + desktop per Flutter line 1742) */}
            <div style={{ height: 160 }} />

            {/* ── CONTENT ROW > Expanded > Column ── */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                    {/* divide:120 between form content and Continue button */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>

                        {/* Inner column — divide:24 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>

                            {/*
               * Instruction text — Flutter Container(w:297).
               * fontSize: 16px mobile → 18px desktop (via .tupi-instruction class).
               */}
                            <div style={{ width: 297, maxWidth: '100%' }}>
                                <p
                                    className='tupi-instruction'
                                    style={{
                                        fontFamily: FF_FONT,
                                        fontWeight: 400,
                                        color: '#626D7C',
                                        lineHeight: 1.5,
                                        letterSpacing: 0,
                                        textAlign: 'center',
                                        margin: 0,
                                    }}
                                >
                                    Make sure you enter the right UPI ID for the merchant.
                                </p>
                            </div>

                            {/*
               * Input + Paste sub-column — divide:12.
               * Width: full-width mobile (<1440px) → max-width 537px desktop (via .tupi-input-group class).
               */}
                            <div className='tupi-input-group' style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>

                                {/*
                                 * TextFormField — border:coolGray200 (#C4C9D1), borderRadius:8.
                                 * Flutter source focusedBorder = Color(0x00000000) (transparent) —
                                 * works on mobile because Material fields have elevation/shadow.
                                 * On web a transparent border on a white field makes it invisible,
                                 * so we substitute with primaryText (#000000) 1px border on focus.
                                 */}
                                <input
                                    type='text'
                                    value={upiId}
                                    placeholder='Enter UPI ID'
                                    onChange={(e) => setUpiId(e.target.value)}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#000000' }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = '#C4C9D1' }}
                                    style={{
                                        width: '100%',
                                        fontFamily: FF_FONT,
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: '#000000',
                                        lineHeight: 1.5,
                                        letterSpacing: 0,
                                        padding: '12px 16px',
                                        border: '1px solid #C4C9D1',
                                        borderRadius: 8,
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />

                                {/* Paste button — auto-width, centered, pill shape */}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={handlePaste}
                                        aria-label='Paste UPI ID'
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            height: 48,
                                            padding: '0 20px',
                                            gap: 8,
                                            backgroundColor: '#F7F8FB',
                                            border: '1px solid #E2E5EB',
                                            borderRadius: 1000,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <span className='material-symbols-rounded' style={{ fontSize: 24, color: '#000000', fontVariationSettings: "'FILL' 0" }}>
                                            content_paste
                                        </span>
                                        <span style={{ fontFamily: FF_FONT, fontSize: 16, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                                            Paste
                                        </span>
                                    </button>
                                </div>

                                {/* Scan QR Instead button — no border, ghost style, secondaryText */}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={handleScanQr}
                                        aria-label='Scan QR Instead'
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            height: 48,
                                            padding: '0 20px',
                                            gap: 8,
                                            backgroundColor: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: 1000,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <span className='material-symbols-rounded' style={{ fontSize: 24, color: '#626D7C', fontVariationSettings: "'FILL' 0" }}>
                                            qr_code_scanner
                                        </span>
                                        <span style={{ fontFamily: FF_FONT, fontSize: 16, fontWeight: 500, color: '#626D7C', lineHeight: 1.5, letterSpacing: 0 }}>
                                            Scan QR Instead
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*
             * Continue button.
             * Width: 100% mobile → 343px desktop (via .tupi-continue class).
             * Enabled: black. Disabled: coolGray100 (#E2E5EB).
             */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                onClick={handleContinue}
                                disabled={!isEnabled}
                                aria-label='Continue'
                                className='tupi-continue'
                                style={{
                                    height: 45,
                                    padding: '0 16px',
                                    backgroundColor: isEnabled ? '#000000' : '#E2E5EB',
                                    border: 'none',
                                    borderRadius: 1000,
                                    cursor: isEnabled ? 'pointer' : 'default',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span style={{ fontFamily: FF_FONT, fontSize: 14, fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5, letterSpacing: 0 }}>
                                    Continue
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*
       * Responsive overrides.
       * Breakpoints mirror Flutter's kBreakpointSmall (479), kBreakpointMedium (767),
       * kBreakpointLarge (991). Desktop split is 1440px.
       */}
            <style>{`
        /* ─── DESKTOP (≥ 1440px) ─── */
        .tupi-title       { font-size: 24px; line-height: 1.24; }
        .tupi-instruction { font-size: 18px; }
        .tupi-input-group { max-width: 537px; }
        .tupi-continue    { width: 343px; }

        /* ─── MOBILE (< 1440px) — smaller fonts, full-width inputs ─── */
        @media (max-width: 1439px) {
          .tupi-wrapper     { padding-top: 112px !important; }
          .tupi-title       { font-size: 18px !important; line-height: 1.40 !important; }
          .tupi-instruction { font-size: 16px !important; }
          .tupi-input-group { max-width: 100% !important; }
          .tupi-continue    { width: 100% !important; }
        }
      `}</style>
        </div>
    )
}
