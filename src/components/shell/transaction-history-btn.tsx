import { Lock } from 'lucide-react'

export function TransactionHistoryBtn() {
    return (
        <button className="w-full rounded-2xl border border-cool-gray-100 p-4 flex flex-row items-center justify-between bg-bg-primary hover:bg-cool-gray-50 transition-colors">
            <div className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center">
                    <Lock className="w-5 h-5 text-text-secondary" />
                </div>
                <span className="text-base font-semibold text-text-primary">Transaction History</span>
            </div>
            <span className="text-sm font-medium text-text-secondary">Coming soon</span>
        </button>
    )
}
