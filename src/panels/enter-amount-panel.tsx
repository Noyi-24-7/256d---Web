'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'

/** Shared font family — mirrors Flutter's default TextStyle fontFamily. */
const FF = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * EnterAmountPanel — "Enter Amount, Add Comment and Confirm Merchant" right panel.
 *
 * Flutter source: shell_widget.dart lines 1758–2449
 * Triggered when: pageState === 'enter_amount'
 *
 * RESPONSIVE SPEC:
 * ─────────────────────────────────────────────────────────────────────────
 * PROPERTY                MOBILE (<1440px)      DESKTOP (≥1440px)
 * ─────────────────────────────────────────────────────────────────────────
 * Container width         100% (viewport)       696px
 * Top padding             112px                 56px
 * Side padding            24px                  24px
 * Inner content padding   0px                   56px (left/right)
 * Bank name font          16px / lh:1.5         20px / lh:1.5
 * UPI ID sub-text font    12px / lh:1.40        14px / lh:1.24
 * Limit badge font        12px                  14px
 * Continue btn width      100% (full-width)     343px fixed
 * Continue btn height     45px                  45px
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Integration hook: replace handleContinue with real amount validation via
 *   isAmountValid(amount) from lib/payments.ts, then invoke fetchLnAddress.
 */
const EnterAmountPanel = () => {
  const [, setPanel] = useQueryState('panel')
  const [amount, setAmount] = useState('')
  const [addComment, setAddComment] = useState(false)
  const [comment, setComment] = useState('')

  const isEnabled = amount.trim().length > 0

  /** Stub: wire to isAmountValid() + fetchLnAddress() from lib/payments.ts */
  const handleContinue = () => setPanel('confirm_tx')

  return (
    <div
      className='ea-wrapper'
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
        padding: '56px 24px 0 24px',
      }}
    >

      {/* ── HEADER ROW — back arrow + merchant info ── */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>

        {/* Back arrow — goes to home (dismisses the whole payment flow) */}
        <button
          onClick={() => setPanel('home')}
          aria-label='Go back'
          tabIndex={0}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <span className='material-symbols-rounded' style={{ fontSize: 24, color: '#000000' }}>arrow_back</span>
        </button>

        {/* Merchant info — bank logo + name + UPI ID */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {/* Bank logo placeholder — replace src with real bank image from merchant data */}
          <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0, backgroundColor: '#F7F8FB' }}>
            <img
              src='https://picsum.photos/seed/443/600'
              alt='Bank logo'
              width={48}
              height={48}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>

          {/* Bank name + UPI ID column — gap:2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              className='ea-bank-name'
              style={{ fontFamily: FF, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}
            >
              Axis Bank - 2309
            </span>
            <span
              className='ea-upi-id'
              style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0 }}
            >
              UPI ID: anipy@axis
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA — responsive inner padding on desktop ── */}
      <div className='ea-content-margin' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        <div className='ea-inner' style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Top input section — gap:24 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Transaction limit pill */}
            <div style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              backgroundColor: '#F7F8FB',
              borderRadius: 16,
              padding: '8px 12px',
              flexDirection: 'row',
              gap: 0,
            }}>
              <span
                className='ea-limit-text'
                style={{ fontFamily: FF, fontWeight: 500, color: '#626D7C', letterSpacing: 0, lineHeight: 1.5 }}
              >
                Transaction Limit:{' '}
              </span>
              <span
                className='ea-limit-text'
                style={{ fontFamily: FF, fontWeight: 500, color: '#000000', letterSpacing: 0, lineHeight: 1.5 }}
              >
                ₹200.00
              </span>
            </div>

            {/* Amount input group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                I want to pay
              </span>

              {/* Amount field + currency suffix row */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <input
                  type='number'
                  inputMode='decimal'
                  value={amount}
                  placeholder='0'
                  onChange={(e) => setAmount(e.target.value)}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#000000' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#C4C9D1' }}
                  aria-label='Payment amount in rupees'
                  style={{
                    flex: 1,
                    fontFamily: FF,
                    fontSize: 16,
                    fontWeight: 500,
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

                {/* Currency pill (Country_container) — INR with flag */}
                <div style={{
                  height: 48,
                  display: 'inline-flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #C4C9D1',
                  borderRadius: 8,
                  padding: '0 16px',
                  flexShrink: 0,
                  cursor: 'default',
                  boxSizing: 'border-box'
                }}>
                  <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: '#626D7C', lineHeight: 1.5, letterSpacing: 0 }}>
                    INR
                  </span>
                  <img src="/images/india.png" width={16} height={16} style={{ borderRadius: 4, objectFit: 'contain' }} alt="Flag of India" />
                </div>
              </div>
            </div>

            {/* Add comment checkbox row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <button
                onClick={() => setAddComment((v) => !v)}
                aria-label='Toggle add comment'
                tabIndex={0}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                {/* Custom checkbox */}
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: 3,
                  border: `2px solid ${addComment ? '#000000' : '#C4C9D1'}`,
                  backgroundColor: addComment ? '#000000' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}>
                  {addComment && (
                    <span className='material-symbols-rounded' style={{ fontSize: 13, color: '#FFFFFF', fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: FF, fontSize: 16, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                  I want to add a comment
                </span>
              </button>

              {/* Comment textarea — revealed when addComment is true */}
              {addComment && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                    Add a comment
                  </span>
                  <textarea
                    value={comment}
                    placeholder='"For the groceries"'
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#000000' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#C4C9D1' }}
                    rows={4}
                    aria-label='Payment comment'
                    style={{
                      width: '100%',
                      fontFamily: FF,
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
                      resize: 'none',
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── CONTINUE BUTTON ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleContinue}
              disabled={!isEnabled}
              aria-label='Continue to confirm transaction'
              className='ea-continue'
              tabIndex={0}
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
                transition: 'background-color 0.15s ease',
              }}
            >
              <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: isEnabled ? '#FFFFFF' : '#626D7C', lineHeight: 1.5, letterSpacing: 0 }}>
                Continue
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        .ea-wrapper    { padding-top: 56px; }
        .ea-bank-name  { font-size: 20px; line-height: 1.5; }
        .ea-upi-id     { font-size: 14px; line-height: 1.24; }
        .ea-limit-text { font-size: 14px; }
        .ea-inner      { padding-left: 56px; padding-right: 56px; }
        .ea-continue   { width: 343px; }

        @media (max-width: 1439px) {
          .ea-wrapper {
            padding-top: 112px !important;
          }
          .ea-inner { padding: 0 !important; }
          .ea-bank-name { font-size: 16px !important; }
          .ea-upi-id { font-size: 12px !important; line-height: 1.4 !important; }
          .ea-limit-text { font-size: 12px !important; }
          .ea-btn { width: 100% !important; }
          .ea-content-margin { margin-top: 24px !important; }
        }
        
        .ea-content-margin {
          margin-top: 146px;
        }
      `}</style>
    </div>
  )
}

export default EnterAmountPanel
