/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * HeroSection — exact 1:1 replica of the Flutter hero area.
 *
 * Flutter source (shell_widget.dart lines 153–362):
 * - h1: 'Instant Payments from Bitcoin to UPI'
 *   headlineSmall: 18px mobile / 24px desktop, w600, lh:1.5, centered
 * - Gap: 8px
 * - Column (gap:4):
 *   - 'Your transaction limit is:' — labelLarge, 16px, secondaryText, lh:1.5
 *   - Column (gap:4):
 *     - '₹200.00' — displaySmall: 32px mobile / 40px desktop, w600, lh:1.24
 *     - Pill badge (secondaryBackground, borderRadius:1000, px:12, py:2):
 *       'You can still make ' + '20 ' (w500) + 'transactions' — labelLarge, 14–16px, lh:1.5
 */
export const HeroSection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* H1: page heading */}
        <h1
            style={{
                fontFamily: FF_FONT,
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

        {/* Gap: 8px */}
        <div style={{ height: 8 }} />

        {/* Transaction limit column — gap:4 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span
                style={{
                    fontFamily: FF_FONT,
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

            {/* Amount + badge — gap:4 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                {/* ₹200.00 — displaySmall */}
                <span
                    style={{
                        fontFamily: FF_FONT,
                        fontSize: 'clamp(32px, 3vw, 40px)',
                        fontWeight: 600,
                        color: '#000000',
                        lineHeight: 1.24,
                        letterSpacing: 0,
                    }}
                >
                    ₹200.00
                </span>

                {/* Pill badge */}
                <div
                    style={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#F7F8FB',
                        borderRadius: 1000,
                        padding: '2px 12px',
                    }}
                >
                    <span style={{ fontFamily: FF_FONT, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 400, color: '#626D7C', lineHeight: 1.5 }}>
                        You can still make&nbsp;
                    </span>
                    <span style={{ fontFamily: FF_FONT, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 500, color: '#626D7C', lineHeight: 1.5 }}>
                        20&nbsp;
                    </span>
                    <span style={{ fontFamily: FF_FONT, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 400, color: '#626D7C', lineHeight: 1.5 }}>
                        transactions
                    </span>
                </div>
            </div>
        </div>
    </div>
)
