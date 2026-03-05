import Image from 'next/image'

/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * RightPanelEmpty — exact 1:1 replica of the Flutter Dashboard_Right_Container (home state).
 *
 * Flutter source (shell_widget.dart lines 1069–1132):
 * - Container: primaryBackground (#FFF), 696px wide, min-height: viewport
 * - Padding: fromSTEB(180, 240, 180, 0)
 * - Column (divide:8):
 *   - Image(Scan_Icon.png, 40×40, contain, borderRadius:8)
 *   - Text: labelLarge w500, 16px, secondaryText (#626D7C), lh:1.5, centered
 */
export const RightPanelEmpty = () => (
    <div
        style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#FFFFFF',
            padding: '240px 180px 0',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        {/* Column: icon + text — gap:8 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden' }}>
                <Image
                    src='/images/Scan_Icon.png'
                    alt='Scan Icon'
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
            </div>
            <p
                style={{
                    fontFamily: FF_FONT,
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#626D7C',
                    lineHeight: 1.5,
                    letterSpacing: 0,
                    textAlign: 'center',
                    margin: 0,
                }}
            >
                Scan the QR code at the receptionist desk to make UPI payments.
            </p>
        </div>
    </div>
)
