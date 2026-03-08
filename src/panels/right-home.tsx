import Image from 'next/image'

/** Shared font family — mirrors Flutter's default TextStyle fontFamily. */
const FF = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * RightHome — idle state of the right panel (Flutter "home" panel state).
 *
 * Flutter source: shell_widget.dart lines 1069–1132
 * Container: primaryBackground (#FFF), padding: fromSTEB(180, 240, 180, 0)
 * Column(gap:8): Scan_Icon.png (40×40, border-radius:8) + instruction text
 */
const RightHome = () => (
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
                    fontFamily: FF,
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

export default RightHome
