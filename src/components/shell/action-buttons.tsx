'use client'

import Image from 'next/image'
import { useQueryState } from 'nuqs'

/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * ActionButtons — exact replica of the Flutter action buttons section.
 *
 * Flutter source (shell_widget.dart lines 498–743):
 * - Row: 2 action cards, divided by SizedBox(width:16) — matched with gap:16
 * - 'Type in UPI ID' card:  secondaryBackground (#F7F8FB), borderRadius:24, padding:fromSTEB(20,16,20,16)
 *   Column: [Image(48×48) | gap:8 | titleSmall text (14px, w600, lh:1.5)]
 * - 'Scan UPI QR' card:     primary (#000000) bg, same dimensions, text color: info (#FFF)
 * - 'Learn how it works' row: centered, horizontal, gap:6
 *   [bodyMedium text (14px, w500, primaryText) | fa-circle-question (20px, bitcoin orange #F7931A)]
 * - Sections divided by 20px (gap:20)
 */
export const ActionButtons = () => {
    const [, setPanel] = useQueryState('panel')

    const handleTypeUpi = () => setPanel('type_upi')
    const handleScanQr = () => setPanel('scan_qr')

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {/* Action cards row — gap:16 */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, width: '100%' }}>

                {/* Type in UPI ID — secondaryBackground light variant */}
                <button
                    onClick={handleTypeUpi}
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
                        <Image
                            src='/images/Type_in_UPI_Icon.png'
                            alt='Type in UPI'
                            width={48}
                            height={48}
                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                    </div>
                    <span style={{ fontFamily: FF_FONT, fontSize: 14, fontWeight: 600, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                        Type in UPI ID
                    </span>
                </button>

                {/* Scan UPI QR — primary (black) dark variant */}
                <button
                    onClick={handleScanQr}
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
                        <Image
                            src='/images/Scan_UPI_QR_Icon.png'
                            alt='Scan UPI QR'
                            width={48}
                            height={48}
                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                    </div>
                    <span style={{ fontFamily: FF_FONT, fontSize: 14, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.5, letterSpacing: 0 }}>
                        Scan UPI QR
                    </span>
                </button>
            </div>

            {/* 'Learn how it works' — centered, gap:6 */}
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
                    <span style={{ fontFamily: FF_FONT, fontSize: 14, fontWeight: 500, color: '#000000', lineHeight: 1.5, letterSpacing: 0 }}>
                        Learn how it works
                    </span>
                    {/* Font Awesome: fa-circle-question — bitcoin orange */}
                    <i className='fa-solid fa-circle-question' style={{ fontSize: 20, color: '#F7931A' }} />
                </button>
            </div>
        </div>
    )
}
