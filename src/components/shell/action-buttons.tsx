'use client'

import { ActionCard } from '@/components/ui/action-card'
import { useQueryState } from 'nuqs'
import { CircleHelp } from 'lucide-react'

export function ActionButtons() {
    const [, setPanel] = useQueryState('panel')

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-row gap-4 w-full">
                <div className="flex-1">
                    <ActionCard
                        iconSrc="/images/Type_in_UPI_Icon.png"
                        label="Type in UPI ID"
                        variant="light"
                        onClick={() => setPanel('type_upi')}
                    />
                </div>
                <div className="flex-1">
                    <ActionCard
                        iconSrc="/images/Scan_UPI_QR_Icon.png"
                        label="Scan UPI QR"
                        variant="dark"
                        onClick={() => setPanel('scan_qr')}
                    />
                </div>
            </div>
            <div className="self-center">
                <button className="flex flex-row items-center gap-1.5 px-4 py-2 hover:bg-cool-gray-50 rounded-lg transition-colors group">
                    <span className="text-sm font-medium text-text-primary">Learn how it works</span>
                    <CircleHelp className="w-5 h-5 text-bitcoin group-hover:scale-105 transition-transform" />
                </button>
            </div>
        </div>
    )
}
