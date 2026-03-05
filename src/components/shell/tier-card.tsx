/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * TierCard — exact 1:1 replica of the Flutter tier info container.
 *
 * Flutter source (shell_widget.dart lines 365–496):
 * - Container: secondaryBackground (#F7F8FB), borderRadius:16, padding: EdgeInsets.all(16)
 * - Column items divided by SizedBox(height:16) — matched with gap:16
 * - Row [Flexible(Column[title+subtitle, gap:4]) | gap:8 | Icon(chevron_right, 18px, secondaryText)]
 * - LinearProgressIndicator: height:4, 50% fill, primary (black) fill, accent4 (#E3E6EB) bg
 *
 * Typography:
 * - Title:    bodyLarge w600, 16px desktop / 14px mobile, lh:1.24 desktop / 1.5 mobile
 * - Subtitle: labelMedium, 14px, secondaryText, lh:1.5
 */
export const TierCard = () => (
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
        {/* Row: text column | chevron icon — gap:8 */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            {/* Text column — gap:4 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                    style={{
                        fontFamily: FF_FONT,
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#000000',
                        lineHeight: 1.24,
                        letterSpacing: 0,
                    }}
                >
                    Tier 0 — Not logged in
                </span>
                <span
                    style={{
                        fontFamily: FF_FONT,
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#626D7C',
                        lineHeight: 1.5,
                        letterSpacing: 0,
                    }}
                >
                    Log in with your Nostr account to increase your limits and make larger transfers.
                </span>
            </div>

            {/* chevron_right — Material Symbol, 18px, secondaryText */}
            <span
                className='material-symbols-rounded'
                style={{ fontSize: 18, color: '#626D7C', flexShrink: 0, marginTop: 2 }}
            >
                chevron_right
            </span>
        </div>

        {/* Progress bar: height:4, 50% fill, black fill, #E3E6EB track */}
        <div
            style={{
                width: '100%',
                height: 4,
                backgroundColor: '#E3E6EB',
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <div style={{ width: '50%', height: '100%', backgroundColor: '#000000', borderRadius: 2 }} />
        </div>
    </div>
)
