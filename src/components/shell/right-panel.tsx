'use client'

import { useQueryState } from 'nuqs'
import { RightPanelEmpty } from '@/components/shell/right-panel-empty'
import { TypeUpiPanel } from '@/components/shell/type-upi-panel'

/**
 * RightPanel — routes to the correct sub-panel based on the 'panel' URL param.
 *
 * Panel routing (mirrors Flutter FFAppState.pageState):
 * - 'home'     → RightPanelEmpty (QR scan placeholder)
 * - 'type_upi' → TypeUpiPanel    (UPI ID entry form)
 * - other/null → null             (nothing rendered)
 */
export const RightPanel = () => {
    const [panel] = useQueryState('panel', { defaultValue: 'home' })

    if (panel === 'home') return <RightPanelEmpty />
    if (panel === 'type_upi') return <TypeUpiPanel />

    return null
}
