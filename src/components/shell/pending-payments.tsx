import Image from 'next/image'

/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/** Transaction data shape. */
interface Transaction {
    id: string
    upiId: string
    timestamp: string
    amount: string
    status: 'pending'
}

/** Static demo transactions — replace with API data when backend is integrated. */
const TRANSACTIONS: Transaction[] = [
    { id: '1', upiId: 'john.doe@256din', timestamp: 'Today, 1:13 PM', amount: '₹48', status: 'pending' },
]

/**
 * PendingPayments — exact 1:1 replica of the Flutter pending payments section.
 *
 * Flutter source (shell_widget.dart lines 752–991):
 * - 'Pending payments' header: bodyLarge w600, 16px desktop, lh:1.24
 * - Transaction rows divided by SizedBox(height:16) — matched with gap:16 via marginBottom
 * - Each row: secondaryBackground (#F7F8FB), borderRadius:16, padding:16
 *   Row: [status icon (35.8×35.8, 2.67px white border) | gap:12 | left col | right col]
 *   - Left col (gap:6):  UPI ID (bodyLarge w500, 16px, lh:1.5) | timestamp (labelMedium, 14px, secondaryText)
 *   - Right col (gap:6): amount (bodyLarge w500, 16px, lh:1.5) | status badge (fa-hourglass-start 16px + label 14px, #F38744)
 */
export const PendingPayments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Section header */}
        <span
            style={{
                fontFamily: FF_FONT,
                fontSize: 16,
                fontWeight: 600,
                color: '#000000',
                lineHeight: 1.24,
                letterSpacing: 0,
                marginBottom: 16,
            }}
        >
            Pending payments
        </span>

        {/* Transaction rows — gap:16 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TRANSACTIONS.map((tx) => (
                <div
                    key={tx.id}
                    style={{
                        backgroundColor: '#F7F8FB',
                        borderRadius: 16,
                        padding: 16,
                    }}
                >
                    {/* Row: icon | gap:12 | left col | right col */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {/* Status icon: 35.8×35.8, 2.67px white border ring */}
                        <div
                            style={{
                                width: 35.8,
                                height: 35.8,
                                borderRadius: '50%',
                                border: '2.67px solid #FFFFFF',
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}
                        >
                            <Image
                                src='/images/Sent.png'
                                alt='Transaction status'
                                width={36}
                                height={36}
                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                            />
                        </div>

                        {/* Left column: UPI ID + timestamp — gap:6 */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <span style={{ fontFamily: FF_FONT, fontSize: 16, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                                {tx.upiId}
                            </span>
                            <span style={{ fontFamily: FF_FONT, fontSize: 14, fontWeight: 400, color: '#626D7C', lineHeight: 1.5, letterSpacing: 0 }}>
                                {tx.timestamp}
                            </span>
                        </div>

                        {/* Right column: amount + status badge — gap:6 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                            <span style={{ fontFamily: FF_FONT, fontSize: 16, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                                {tx.amount}
                            </span>
                            {tx.status === 'pending' && (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    {/* Font Awesome: fa-hourglass-start — pending orange */}
                                    <i className='fa-solid fa-hourglass-start' style={{ fontSize: 16, color: '#F38744' }} />
                                    <span style={{ fontFamily: FF_FONT, fontSize: 14, fontWeight: 400, color: '#F38744', lineHeight: 1.5, letterSpacing: 0 }}>
                                        Pending
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
