'use client'

import { NavBar } from '@/components/layout/nav-bar'
import { HeroSection } from '@/components/shell/hero-section'
import { TierCard } from '@/components/shell/tier-card'
import { ActionButtons } from '@/components/shell/action-buttons'
import { PendingPayments } from '@/components/shell/pending-payments'
import { TransactionHistoryBtn } from '@/components/shell/transaction-history-btn'

export function LeftPanel() {
    return (
        <div className="flex flex-col w-full h-full relative">
            <NavBar />
            {/* Scrollable Container */}
            <div
                id="left-panel-scroll"
                className="flex-1 overflow-y-auto overflow-x-hidden pt-[112px] px-4 2xl:px-[88px] pb-8 flex flex-col"
            >
                <div className="w-full flex flex-col gap-8 pb-8">
                    <HeroSection />
                    <TierCard />
                    <ActionButtons />

                    <div className="w-full h-[1px] bg-alternate" />

                    <PendingPayments />
                    <TransactionHistoryBtn />
                </div>
            </div>
        </div>
    )
}
