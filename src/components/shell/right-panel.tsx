'use client'

import { useQueryState } from 'nuqs'
import { RightPanelEmpty } from '@/components/shell/right-panel-empty'
import { TypeUpiPanel } from '@/components/shell/type-upi-panel'

export function RightPanel() {
    const [panel] = useQueryState('panel', { defaultValue: 'home' })

    if (panel === 'home') {
        return (
            <div className="hidden 2xl:block w-full h-full">
                <RightPanelEmpty />
            </div>
        )
    }

    if (panel === 'type_upi') {
        return (
            <div className="w-full h-full bg-bg-primary 2xl:bg-transparent">
                <TypeUpiPanel />
            </div>
        )
    }

    // Future panels (e.g., scan_qr) would go here

    return null
}
