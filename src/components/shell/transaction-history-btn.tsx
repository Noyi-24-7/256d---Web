/** Shared font family string used across all components. */
const FF_FONT = 'var(--font-delight), ui-sans-serif, system-ui, sans-serif'

/**
 * TransactionHistoryBtn — exact 1:1 replica of the Flutter transaction history row.
 *
 * Flutter source (shell_widget.dart lines 992–1053):
 * - Container: primaryBackground (#FFF), borderRadius:16, border: coolGray100 (#E2E5EB) 1px
 * - Padding: fromSTEB(16, 20, 16, 20)
 * - Row — MainAxisAlignment.spaceBetween:
 *   - 'Transaction History': bodyLarge w600, 16px, primaryText, lh:1.24
 *   - Icon(lock_outline, 22px, coolGray300 #A3ABB8)
 */
export const TransactionHistoryBtn = () => (
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
            Transaction History
        </span>

        {/* Material Symbol: lock_outline, 22px, coolGray300 */}
        <span
            className='material-symbols-rounded'
            style={{ fontSize: 22, color: '#A3ABB8', fontVariationSettings: "'FILL' 0" }}
        >
            lock
        </span>
    </button>
)
