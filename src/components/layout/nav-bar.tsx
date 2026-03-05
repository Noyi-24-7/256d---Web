'use client'

import Image from 'next/image'

/**
 * NavBar — exact 1:1 replica of the Flutter Stack overlay NavBar.
 *
 * Flutter source (shell_widget.dart lines 1766–1863):
 * - Aligned top-left inside the Stack
 * - Width: 720px on desktop (≥1440px), full-width on mobile
 * - Background: primaryBackground (#FFF)
 * - Shadow: blurRadius:8, color:rgba(0,0,0,0.016), offset:(0,4)
 * - Padding: fromSTEB(24, 20, 24, 20)
 * - Row — MainAxisAlignment.spaceBetween:
 *   - LEFT:  Logo image (48×48, borderRadius circle)
 *   - RIGHT: Row [Empty_Avatar (48×48, borderRadius:8) | gap:12 | 'Login with Nostr' (bodyLarge, 16px, w500)]
 */
export const NavBar = () => (
    <div
        style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.0157)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
    >
        {/* LEFT: 256d Logo — 48×48 circle */}
        <div
            style={{
                width: 48,
                height: 48,
                borderRadius: '1000px',
                overflow: 'hidden',
                flexShrink: 0,
            }}
        >
            <Image
                src='/images/Logo.png'
                alt='256d Logo'
                width={48}
                height={48}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                priority
            />
        </div>

        {/* RIGHT: Avatar + 'Login with Nostr' — gap:12 */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    overflow: 'hidden',
                    flexShrink: 0,
                }}
            >
                <Image
                    src='/images/Empty_Avatar.png'
                    alt='User avatar'
                    width={48}
                    height={48}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
            </div>
            <span
                style={{
                    fontFamily: 'var(--font-delight), ui-sans-serif, system-ui, sans-serif',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#000000',
                    letterSpacing: 0,
                    lineHeight: 1.5,
                    whiteSpace: 'nowrap',
                }}
            >
                Login with Nostr
            </span>
        </div>
    </div>
)
