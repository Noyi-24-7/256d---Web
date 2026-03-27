'use client'

import { useQueryState } from 'nuqs'

/** Shared font family — mirrors Flutter's default TextStyle fontFamily. */
const FF = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * ConfirmTxPanel — "Confirm Transaction" right panel.
 *
 * Flutter source: shell_widget.dart lines 2789–3641
 * Triggered when: pageState === 'confirm_transaction'
 *
 * RESPONSIVE SPEC:
 * ─────────────────────────────────────────────────────────────────────────
 * PROPERTY                MOBILE (<1440px)      DESKTOP (≥1440px)
 * ─────────────────────────────────────────────────────────────────────────
 * Container width         100% (viewport)       696px
 * Top padding             112px                 56px
 * Side padding            24px                  24px
 * Inner card padding      0px h-offset          56px h-offset
 * Card inner padding      20px                  24px
 * Card border-radius      16px (detail block)   16px
 * Panel border-radius     24px                  24px
 * Title font              16px                  18px
 * Subtitle font           14px                  16px
 * Label font (To:)        14px                  18px
 * Value font              16px                  18px
 * Bank logo size          32×32                 48×48
 * Confirm btn width       100%                  343px
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Integration hook: replace handleConfirm with a real call to
 *   fetchLNInvoice(callback, ccy, inrAmount) from lib/payments.ts.
 */

/** A summary row shared across Amount, Fees, and Total in Sats. */
interface SummaryRowProps {
  label: string
  value: string
  /** Whether to add 10.5px top/bottom padding for divider effect */
  spaced?: boolean
}

const SummaryRow = ({ label, value, spaced = false }: SummaryRowProps) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spaced ? 10.5 : 0,
    paddingBottom: spaced ? 10.5 : 0,
  }}>
    <span
      className='ctx-label'
      style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0, flex: 1 }}
    >
      {label}
    </span>
    <span
      className='ctx-value'
      style={{ fontFamily: FF, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}
    >
      {value}
    </span>
  </div>
)

const ConfirmTxPanel = () => {
  const [, setPanel] = useQueryState('panel')

  /** Stub: wire to fetchLNInvoice from lib/payments.ts, then navigate to pay_bitcoin */
  const handleConfirm = () => setPanel('pay_bitcoin')

  return (
    <div
      className='ctx-wrapper'
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

      {/* Outer gap between header and card */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 24 }}>
        <div className='ctx-card-offset' style={{ flex: 1 }}>

          {/* ── PANEL CARD ── border, br:24, padding-bottom:32 */}
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

            {/* Card header — centered title + subtitle, gap:4 */}
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span
                className='ctx-title'
                style={{ fontFamily: FF, fontWeight: 600, color: '#000000', letterSpacing: 0, textAlign: 'center' }}
              >
                Confirm Transaction
              </span>
              <span
                className='ctx-subtitle'
                style={{ fontFamily: FF, fontWeight: 400, color: '#626D7C', letterSpacing: 0, textAlign: 'center' }}
              >
                Ensure funds are sent to the right UPI address
              </span>
            </div>

            {/* Horizontal divider */}
            <div style={{ width: '100%', height: 1, backgroundColor: '#E2E5EB' }} />

            {/* ── DETAIL BLOCK + BUTTONS column, gap:24 */}
            <div className='ctx-inner' style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Detail block — secondaryBackground, br:16, inner padding 20/24 */}
              <div className='ctx-detail-block' style={{
                width: '100%',
                backgroundColor: '#F7F8FB',
                borderRadius: 16,
                boxSizing: 'border-box',
              }}>
                <div className='ctx-detail-inner' style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  {/* To: row */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span
                      className='ctx-label'
                      style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0, flex: 1 }}
                    >
                      To:
                    </span>

                    {/* Merchant info — bank logo + UPI ID + bank name */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <div className='ctx-bank-logo' style={{ borderRadius: 8, overflow: 'hidden', flexShrink: 0, backgroundColor: '#E2E5EB' }}>
                        <img
                          src='https://picsum.photos/seed/443/600'
                          alt='Bank logo'
                          style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span
                          className='ctx-merchant-upi'
                          style={{ fontFamily: FF, fontWeight: 500, color: '#000000', letterSpacing: 0, lineHeight: 1.5 }}
                        >
                          anipy@axis
                        </span>
                        <span
                          className='ctx-merchant-bank'
                          style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0 }}
                        >
                          Axis Bank - 2309
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount row — spaced */}
                  <SummaryRow label='Amount:' value='₹150' spaced />

                  {/* Fees row — spaced */}
                  <SummaryRow label='Fees:' value='₹0.09' spaced />

                  {/* Total in Sats row — spaced */}
                  <SummaryRow label='Total in Sats:' value='₹150.09' spaced />

                </div>
              </div>

              {/* ── ACTION BUTTONS — gap:12 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Primary: Confirm — triggers lightning invoice creation */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={handleConfirm}
                    aria-label='Confirm transaction of ₹150.09'
                    tabIndex={0}
                    className='ctx-btn'
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

                {/* Secondary: Back Home — outline */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => setPanel('home')}
                    aria-label='Go back home'
                    tabIndex={0}
                    className='ctx-btn'
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
        .ctx-wrapper       { padding-top: 56px; }
        .ctx-title         { font-size: 18px; }
        .ctx-subtitle      { font-size: 16px; }
        .ctx-label         { font-size: 18px; }
        .ctx-value         { font-size: 18px; }
        .ctx-card-offset   { padding-left: 56px; padding-right: 56px; }
        .ctx-inner         { padding-left: 24px; padding-right: 24px; }
        .ctx-detail-block  { padding: 24px; }
        .ctx-detail-inner  { padding: 0; }
        .ctx-bank-logo     { width: 48px; height: 48px; }
        .ctx-merchant-upi  { font-size: 16px; }
        .ctx-merchant-bank { font-size: 16px; line-height: 1.24; }
        .ctx-btn           { width: 343px; }

        @media (max-width: 1439px) {
          .ctx-wrapper       { padding-top: 112px !important; }
          .ctx-title         { font-size: 16px !important; }
          .ctx-subtitle      { font-size: 14px !important; }
          .ctx-label         { font-size: 14px !important; }
          .ctx-value         { font-size: 16px !important; }
          .ctx-card-offset   { padding-left: 0 !important; padding-right: 0 !important; }
          .ctx-inner         { padding-left: 16px !important; padding-right: 16px !important; }
          .ctx-detail-block  { padding: 20px !important; }
          .ctx-bank-logo     { width: 32px !important; height: 32px !important; }
          .ctx-merchant-upi  { font-size: 14px !important; }
          .ctx-merchant-bank { font-size: 14px !important; line-height: 1.40 !important; }
          .ctx-btn           { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

export default ConfirmTxPanel
