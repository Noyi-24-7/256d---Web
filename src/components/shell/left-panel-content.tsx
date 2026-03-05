import { HeroSection } from '@/components/shell/hero-section'
import { TierCard } from '@/components/shell/tier-card'
import { ActionButtons } from '@/components/shell/action-buttons'
import { PendingPayments } from '@/components/shell/pending-payments'
import { TransactionHistoryBtn } from '@/components/shell/transaction-history-btn'

/**
 * LeftPanelContent — the scrollable content column of the left panel.
 *
 * Flutter source (shell_widget.dart lines 96–1058):
 * - Padding: fromSTEB(88, 112, 88, 0) on desktop (≥991px)
 *   • 88px left/right — matches desktop content inset
 *   • 112px top — clears the fixed NavBar overlay (~80px)
 *   • Smaller screens: padding reduces to 24px → 20px → 16px
 * - Children divided by SizedBox(height:24) — matched with gap:24
 * - List ends with SizedBox(height:40) — matched with a spacer div
 */
export const LeftPanelContent = () => (
    <div
        style={{
            width: '100%',
            minHeight: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
        }}
    >
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

            {/* Divider — Flutter: Divider(height:1, thickness:1, color:alternate #E0E3E7) */}
            <div style={{ width: '100%', height: 1, backgroundColor: '#E0E3E7' }} />

            <PendingPayments />
            <TransactionHistoryBtn />

            {/* SizedBox(height:40) end spacer */}
            <div style={{ height: 40 }} />
        </div>

        {/* Responsive side padding — mirrors Flutter's kBreakpoint values */}
        <style>{`
      @media (max-width: 991px) {
        .left-panel-inner { padding-left: 24px !important; padding-right: 24px !important; }
      }
      @media (max-width: 767px) {
        .left-panel-inner { padding-left: 20px !important; padding-right: 20px !important; }
      }
      @media (max-width: 479px) {
        .left-panel-inner { padding-left: 16px !important; padding-right: 16px !important; }
      }
    `}</style>
    </div>
)
