import { ProgressBar } from '@/components/ui/progress-bar'
import { ChevronRight } from 'lucide-react'

export function TierCard() {
    return (
        <div className="rounded-2xl bg-bg-secondary p-4 flex flex-col gap-4">
            <div className="flex flex-row items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm 2xl:text-base font-semibold leading-[1.5] 2xl:leading-[1.24] text-text-primary">
                        Tier 0 — Not logged in
                    </span>
                    <span className="text-sm text-text-secondary leading-[1.5]">
                        Log in with your Nostr account to increase your limits and make larger transfers.
                    </span>
                </div>
                <ChevronRight className="w-[18px] h-[18px] text-text-secondary shrink-0 mt-0.5" />
            </div>
            <ProgressBar value={0.5} />
        </div>
    )
}
