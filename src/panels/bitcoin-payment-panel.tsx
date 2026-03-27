'use client'

import { useState, useEffect } from 'react'
import { useQueryState } from 'nuqs'
import { QRCodeSVG } from 'qrcode.react'

/** Shared font family — mirrors Flutter's default TextStyle fontFamily. */
const FF = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * BitcoinPaymentPanel — "Pay with Bitcoin" right panel.
 *
 * Flutter source: shell_widget.dart lines 3643–4512
 * Triggered when: pageState === 'pay_bitcoin'
 *
 * RESPONSIVE SPEC:
 * ─────────────────────────────────────────────────────────────────────────
 * PROPERTY                MOBILE (<1440px)      DESKTOP (≥1440px)
 * ─────────────────────────────────────────────────────────────────────────
 * Container width         100% (viewport)       696px
 * Top padding             112px                 56px
 * Side padding            24px                  24px
 * Inner card offset       0px                   56px (left/right)
 * Card detail block pad   20px                  24px
 * Title font              16px                  18px
 * Subtitle font           14px                  16px
 * Label font              14px / lh:1.5         18px / lh:1.5
 * Inline value font       14px                  18px
 * Sats sub-label font     12px / lh:1.40        16px / lh:1.24
 * Timer font              14px / lh:1.5         18px / lh:1.5
 * Notice text font        12px / lh:1.5         14px / lh:1.5
 * Confirm btn width       100%                  343px
 * Invoice countdown       600s (10 min)         600s (10 min)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Integration hooks:
 *   - Replace STUB_BOLT11 with the real `pr` field from fetchLNInvoice().
 *   - Replace handleConfirm with a real backend polling call.
 */

/** Stub BOLT11 invoice — replace with real value from fetchLNInvoice(). */
const STUB_BOLT11 = 'lnbc1500090n1pn2abcdsp5abcdef1234567890uvwxyz'

/**
 * useCountdown — counts down from `initialSeconds` to zero.
 * Returns a formatted MM:SS string.
 */
const useCountdown = (initialSeconds: number): string => {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    if (remaining <= 0) return
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [remaining])

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

/** Truncates the BOLT11 string for display (first 6 chars + '…' + last 10 chars). */
const truncateBolt11 = (invoice: string): string =>
  invoice.length > 18 ? `${invoice.slice(0, 6)}…${invoice.slice(-10)}` : invoice

const BitcoinPaymentPanel = () => {
  const [, setPanel] = useQueryState('panel')
  const timer = useCountdown(600)

  /** Copy full invoice to clipboard */
  const handleCopyInvoice = () => {
    navigator.clipboard.writeText(STUB_BOLT11).catch(console.error)
  }

  /** Stub: wire to real backend polling to verify tx confirmation */
  const handleConfirm = () => {
    console.log('Confirm payment pressed — wire to backend polling.')
  }

  return (
    <div
      className='bp-wrapper'
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
        padding: '56px 24px 0 24px',
      }}
    >

      {/* ── HEADER ROW — back arrow ── */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <button
          onClick={() => setPanel('home')}
          aria-label='Go back home'
          tabIndex={0}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <span className='material-symbols-rounded' style={{ fontSize: 24, color: '#000000' }}>arrow_back</span>
        </button>
      </div>

      {/* Vertical gap after back arrow */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 24 }}>
        <div className='bp-card-offset' style={{ flex: 1 }}>

          {/* ── PANEL CARD — border, br:24 ── */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E5EB',
            borderRadius: 24,
            overflow: 'hidden',
            paddingTop: 24,
            paddingBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}>

            {/* Card header — centered title + subtitle */}
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span
                className='bp-title'
                style={{ fontFamily: FF, fontWeight: 600, color: '#000000', letterSpacing: 0, textAlign: 'center' }}
              >
                Pay with Bitcoin
              </span>
              <span
                className='bp-subtitle'
                style={{ fontFamily: FF, fontWeight: 400, color: '#626D7C', letterSpacing: 0, textAlign: 'center' }}
              >
                Scan wallet address to pay or copy wallet address below
              </span>
            </div>

            {/* Horizontal divider */}
            <div style={{ width: '100%', height: 1, backgroundColor: '#E2E5EB' }} />

            {/* ── CARD BODY — gap:24 ── */}
            <div className='bp-inner' style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* QR + details block — secondaryBackground */}
              <div className='bp-detail-block'>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>

                  {/* QR code container — white bg, thin border */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '0.57px solid #E2E5EB',
                    borderRadius: 12,
                    padding: 12,
                    display: 'inline-flex',
                    alignSelf: 'center',
                  }}>
                    <QRCodeSVG
                      value={STUB_BOLT11}
                      size={160}
                      fgColor='#000000'
                      bgColor='#FFFFFF'
                      level='M'
                    />
                  </div>

                  {/* Full-width divider inside block */}
                  <div style={{ width: '100%', height: 1, backgroundColor: '#E2E5EB' }} />

                  {/* Wallet Address row — label left, truncated invoice + copy icon right */}
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span
                      className='bp-row-label'
                      style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0, flex: 1 }}
                    >
                      Wallet Address:
                    </span>
                    <button
                      onClick={handleCopyInvoice}
                      aria-label='Copy lightning invoice to clipboard'
                      tabIndex={0}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span
                        className='bp-row-value'
                        style={{ fontFamily: FF, fontWeight: 400, color: '#000000', letterSpacing: 0, lineHeight: 1.5 }}
                      >
                        {truncateBolt11(STUB_BOLT11)}
                      </span>
                      <span className='material-symbols-rounded' style={{ fontSize: 16, color: '#000000' }}>
                        content_copy
                      </span>
                    </button>
                  </div>

                  {/* Amount to send row — label left, INR + sats stack right */}
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span
                      className='bp-row-label'
                      style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0, flex: 1 }}
                    >
                      Amount to send:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                      <span
                        className='bp-row-value'
                        style={{ fontFamily: FF, fontWeight: 400, color: '#000000', letterSpacing: 0, lineHeight: 1.5 }}
                      >
                        ₹150.09
                      </span>
                      <span
                        className='bp-sats-value'
                        style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0 }}
                      >
                        1,220.13 sats
                      </span>
                    </div>
                  </div>

                  {/* Expires in row — label left, countdown timer right */}
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10.5,
                    paddingBottom: 10.5,
                  }}>
                    <span
                      className='bp-row-label'
                      style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0, flex: 1 }}
                    >
                      Expires in:
                    </span>
                    <span
                      className='bp-timer'
                      style={{ fontFamily: FF, fontWeight: 400, color: '#000000', letterSpacing: 0, lineHeight: 1.5 }}
                    >
                      {timer}
                    </span>
                  </div>

                </div>
              </div>

              {/* ── NOTICE + ACTION BUTTONS — gap:12 ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Info notice row — icon + text, centered */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <span className='material-symbols-rounded' style={{ fontSize: 16, color: '#000000' }}>
                    info
                  </span>
                  <span
                    className='bp-notice'
                    style={{ fontFamily: FF, fontWeight: 500, color: '#000000', letterSpacing: 0, lineHeight: 1.5 }}
                  >
                    Only confirm if you have made payment
                  </span>
                </div>

                {/* Primary: Confirm */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={handleConfirm}
                    aria-label='Confirm payment of ₹150.09'
                    tabIndex={0}
                    className='bp-btn'
                    style={{
                      height: 45,
                      padding: '0 16px',
                      backgroundColor: '#000000',
                      border: 'none',
                      borderRadius: 1000,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5, letterSpacing: 0 }}>
                      Confirm (₹150.09)
                    </span>
                  </button>
                </div>

                {/* Secondary: Back Home */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => setPanel('home')}
                    aria-label='Go back home'
                    tabIndex={0}
                    className='bp-btn'
                    style={{
                      height: 45,
                      padding: '0 16px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E5EB',
                      borderRadius: 1000,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                      Back Home
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        .bp-wrapper      { padding-top: 56px; }
        .bp-title        { font-size: 18px; }
        .bp-subtitle     { font-size: 16px; }
        .bp-card-offset  { padding-left: 56px; padding-right: 56px; }
        .bp-inner        { padding-left: 24px; padding-right: 24px; }
        .bp-detail-block { width: 100%; background-color: #F7F8FB; border-radius: 16px; padding: 24px; box-sizing: border-box; }
        .bp-row-label    { font-size: 18px; line-height: 1.5; }
        .bp-row-value    { font-size: 18px; }
        .bp-sats-value   { font-size: 16px; line-height: 1.24; }
        .bp-timer        { font-size: 18px; }
        .bp-notice       { font-size: 14px; }
        .bp-btn          { width: 343px; }

        @media (max-width: 1439px) {
          .bp-wrapper      { padding-top: 112px !important; }
          .bp-title        { font-size: 16px !important; }
          .bp-subtitle     { font-size: 14px !important; }
          .bp-card-offset  { padding-left: 0 !important; padding-right: 0 !important; }
          .bp-inner        { padding-left: 16px !important; padding-right: 16px !important; }
          .bp-detail-block { padding: 20px !important; }
          .bp-row-label    { font-size: 14px !important; }
          .bp-row-value    { font-size: 14px !important; }
          .bp-sats-value   { font-size: 12px !important; line-height: 1.40 !important; }
          .bp-timer        { font-size: 14px !important; }
          .bp-notice       { font-size: 12px !important; }
          .bp-btn          { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

export default BitcoinPaymentPanel
