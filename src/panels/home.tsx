'use client'

/**
 * panels/home.tsx — the entire left panel, self-contained.
 *
 * Contains (in order, matching Flutter shell_widget.dart left column):
 *   HeroSection          — headline + transaction limit badge
 *   TierCard             — tier info + progress indicator
 *   ActionButtons        — Type UPI / Scan QR cards + "Learn how it works"
 *   PendingPayments      — transaction list with placeholder data
 *   TransactionHistoryBtn— locked history row
 *   LeftPanelContent     — assembles everything with responsive padding (default export)
 *
 * To add data: replace the TRANSACTIONS constant and the static values in
 * HeroSection / TierCard once the payments.ts stubs are wired to the backend.
 */

import Image from 'next/image'
import { useQueryState } from 'nuqs'

/** Shared font family — mirrors Flutter's default TextStyle fontFamily. */
const FF = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

// ─── HeroSection ─────────────────────────────────────────────────────────────
// Flutter source: shell_widget.dart lines 153–362

const HeroSection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1
            style={{
                fontFamily: FF,
                fontSize: 'clamp(18px, 1.5vw, 24px)',
                fontWeight: 600,
                color: '#000000',
                lineHeight: 1.5,
                letterSpacing: 0,
                textAlign: 'center',
                margin: 0,
            }}
        >
            Instant Payments from Bitcoin to UPI
        </h1>

        <div style={{ height: 8 }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span
                style={{
                    fontFamily: FF,
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#626D7C',
                    lineHeight: 1.5,
                    letterSpacing: 0,
                    textAlign: 'center',
                }}
            >
                Your transaction limit is:
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                {/* ₹200.00 — displaySmall, responsive via clamp */}
                <span
                    style={{
                        fontFamily: FF,
                        fontSize: 'clamp(32px, 3vw, 40px)',
                        fontWeight: 600,
                        color: '#000000',
                        lineHeight: 1.24,
                        letterSpacing: 0,
                    }}
                >
                    ₹200.00
                </span>

                {/* TODO: restore pill badge once transaction limit logic is wired from payments.ts
                <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F8FB', borderRadius: 1000, padding: '2px 12px' }}>
                    <span style={{ fontFamily: FF, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 400, color: '#626D7C', lineHeight: 1.5 }}>You can still make&nbsp;</span>
                    <span style={{ fontFamily: FF, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 500, color: '#626D7C', lineHeight: 1.5 }}>{remainingTxCount}&nbsp;</span>
                    <span style={{ fontFamily: FF, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 400, color: '#626D7C', lineHeight: 1.5 }}>transactions</span>
                </div>
                */}
            </div>
        </div>
    </div>
)

// ─── TierCard ─────────────────────────────────────────────────────────────────
// Flutter source: shell_widget.dart lines 365–496

const TierCard = () => (
    <div
        style={{
            backgroundColor: '#F7F8FB',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
        }}
    >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: FF, fontSize: 16, fontWeight: 600, color: '#000000', lineHeight: 1.24, letterSpacing: 0 }}>
                    Tier 0 — Not logged in
                </span>
                <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 400, color: '#626D7C', lineHeight: 1.5, letterSpacing: 0 }}>
                    Log in with your Nostr account to increase your limits and make larger transfers.
                </span>
            </div>
            <span className='material-symbols-rounded' style={{ fontSize: 18, color: '#626D7C', flexShrink: 0, marginTop: 2 }}>
                chevron_right
            </span>
        </div>

        {/* Progress bar: height:4, 50% fill, black on #E3E6EB track */}
        <div style={{ width: '100%', height: 4, backgroundColor: '#E3E6EB', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: '#000000', borderRadius: 2 }} />
        </div>
    </div>
)

// ─── ActionButtons ────────────────────────────────────────────────────────────
// Flutter source: shell_widget.dart lines 498–743

const ActionButtons = () => {
    const [, setPanel] = useQueryState('panel')

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {/* Two action cards — gap:16 */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, width: '100%' }}>

                {/* Type in UPI ID — secondaryBackground (#F7F8FB) */}
                <button
                    onClick={() => setPanel('type_upi')}
                    aria-label='Type in UPI ID'
                    style={{
                        flex: 1,
                        backgroundColor: '#F7F8FB',
                        borderRadius: 24,
                        padding: '16px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <div style={{ width: 48, height: 48, borderRadius: 1000, overflow: 'hidden', flexShrink: 0 }}>
                        <Image src='/images/Type_in_UPI_Icon.png' alt='Type in UPI' width={48} height={48} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                    </div>
                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 600, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                        Type in UPI ID
                    </span>
                </button>

                {/* Scan UPI QR — primary (#000) */}
                <button
                    onClick={() => setPanel('scan_qr')}
                    aria-label='Scan UPI QR'
                    style={{
                        flex: 1,
                        backgroundColor: '#000000',
                        borderRadius: 24,
                        padding: '16px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <div style={{ width: 48, height: 48, borderRadius: 1000, overflow: 'hidden', flexShrink: 0 }}>
                        <Image src='/images/Scan_UPI_QR_Icon.png' alt='Scan UPI QR' width={48} height={48} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                    </div>
                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.5, letterSpacing: 0 }}>
                        Scan UPI QR
                    </span>
                </button>
            </div>

            {/* "Learn how it works" — centered, gap:6 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    aria-label='Learn how it works'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 16px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                        Learn how it works
                    </span>
                    <i className='fa-solid fa-circle-question' style={{ fontSize: 20, color: '#F7931A' }} />
                </button>
            </div>
        </div>
    )
}

// ─── PendingPayments ──────────────────────────────────────────────────────────
// Flutter source: shell_widget.dart lines 752–991

/** Transaction data shape — replace with API response type from payments.ts when ready. */
interface Transaction {
    id: string
    upiId: string
    timestamp: string
    amount: string
    status: 'pending'
}

/** Static placeholder data — swap with real API call once backend is integrated. */
const TRANSACTIONS: Transaction[] = [
    { id: '1', upiId: 'john.doe@256din', timestamp: 'Today, 1:13 PM', amount: '₹48', status: 'pending' },
]

const PendingPayments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <span style={{ fontFamily: FF, fontSize: 16, fontWeight: 600, color: '#000000', lineHeight: 1.24, letterSpacing: 0, marginBottom: 16 }}>
            Pending payments
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TRANSACTIONS.map((tx) => (
                <div key={tx.id} style={{ backgroundColor: '#F7F8FB', borderRadius: 16, padding: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {/* Status icon: 35.8×35.8, 2.67px white border ring */}
                        <div style={{ width: 35.8, height: 35.8, borderRadius: '50%', border: '2.67px solid #FFFFFF', overflow: 'hidden', flexShrink: 0 }}>
                            <Image src='/images/Sent.png' alt='Transaction status' width={36} height={36} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                        </div>

                        {/* Left: UPI ID + timestamp — gap:6 */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <span style={{ fontFamily: FF, fontSize: 16, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>{tx.upiId}</span>
                            <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 400, color: '#626D7C', lineHeight: 1.5, letterSpacing: 0 }}>{tx.timestamp}</span>
                        </div>

                        {/* Right: amount + pending badge — gap:6 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                            <span style={{ fontFamily: FF, fontSize: 16, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>{tx.amount}</span>
                            {tx.status === 'pending' && (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <i className='fa-solid fa-hourglass-start' style={{ fontSize: 16, color: '#F38744' }} />
                                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 400, color: '#F38744', lineHeight: 1.5, letterSpacing: 0 }}>Pending</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

// ─── TransactionHistoryBtn ────────────────────────────────────────────────────
// Flutter source: shell_widget.dart lines 992–1053

const TransactionHistoryBtn = () => (
    <button
        aria-label='Transaction History'
        style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E2E5EB',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
        }}
    >
        <span style={{ fontFamily: FF, fontSize: 16, fontWeight: 600, color: '#000000', lineHeight: 1.24, letterSpacing: 0 }}>
            Transaction History
        </span>
        <span className='material-symbols-rounded' style={{ fontSize: 22, color: '#A3ABB8', fontVariationSettings: "'FILL' 0" }}>
            lock
        </span>
    </button>
)

// ─── LeftPanelContent (default export) ───────────────────────────────────────
// Flutter source: shell_widget.dart lines 96–1058

/**
 * LeftPanelContent — default export. Assembles all left-panel sections.
 *
 * Responsive padding mirrors Flutter's kBreakpoint values:
 *   ≥991px → 88px   |   <991px → 24px   |   <767px → 20px   |   <479px → 16px
 */
const LeftPanelContent = () => (
    <div style={{ width: '100%', minHeight: '100vh', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FFFFFF' }}>
        <div
            style={{
                width: '100%',
                paddingTop: 112,
                paddingLeft: 88,
                paddingRight: 88,
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                boxSizing: 'border-box',
            }}
            className='left-panel-inner'
        >
            <HeroSection />
            <TierCard />
            <ActionButtons />

            {/* Divider — Flutter: Divider(height:1, thickness:1, color:#E0E3E7) */}
            <div style={{ width: '100%', height: 1, backgroundColor: '#E0E3E7' }} />

            <PendingPayments />
            <TransactionHistoryBtn />

            {/* SizedBox(height:40) end spacer */}
            <div style={{ height: 40 }} />
        </div>

        {/* Responsive side padding — mirrors Flutter kBreakpoint values */}
        <style>{`
      @media (max-width: 991px) { .left-panel-inner { padding-left: 24px !important; padding-right: 24px !important; } }
      @media (max-width: 767px) { .left-panel-inner { padding-left: 20px !important; padding-right: 20px !important; } }
      @media (max-width: 479px) { .left-panel-inner { padding-left: 16px !important; padding-right: 16px !important; } }
    `}</style>
    </div>
)

export default LeftPanelContent
