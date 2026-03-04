import React from 'react';
import { FFButton } from '@/components/ui/ff-button';
import { ActionCard } from '@/components/ui/action-card';
import { TransactionRow } from '@/components/ui/transaction-row';
import { StatusBadge } from '@/components/ui/status-badge';
import { ProgressBar } from '@/components/ui/progress-bar';

export default function DevComponentsPage() {
    return (
        <div className="p-8 pb-32 max-w-4xl mx-auto space-y-16">
            <div>
                <h1 className="text-3xl font-bold mb-2">Atomic Components Library</h1>
                <p className="text-text-secondary">Batch 2 Verification Page - /dev/components</p>
            </div>

            <section className="space-y-6 border-t border-cool-gray-100 pt-8">
                <h2 className="text-xl font-semibold">1. FFButton</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    <FFButton text="Primary Button" variant="primary" />
                    <FFButton text="Primary Disabled" variant="primary" disabled />

                    <FFButton text="Secondary Button" variant="secondary" />
                    <FFButton text="Secondary Disabled" variant="secondary" disabled />

                    <FFButton text="Ghost Button" variant="ghost" />
                    <FFButton text="Ghost Disabled" variant="ghost" disabled />
                </div>
            </section>

            <section className="space-y-6 border-t border-cool-gray-100 pt-8">
                <h2 className="text-xl font-semibold">2. ActionCard</h2>
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                    <ActionCard
                        label="Type in UPI ID"
                        iconSrc="/images/Type_in_UPI_Icon.png"
                        variant="light"
                    />
                    <ActionCard
                        label="Scan UPI QR"
                        iconSrc="/images/Scan_UPI_QR_Icon.png"
                        variant="dark"
                    />
                </div>
            </section>

            <section className="space-y-6 border-t border-cool-gray-100 pt-8">
                <h2 className="text-xl font-semibold">3. StatusBadge</h2>
                <div className="flex gap-4">
                    <StatusBadge status="pending" />
                    <StatusBadge status="success" />
                    <StatusBadge status="failed" />
                </div>
            </section>

            <section className="space-y-6 border-t border-cool-gray-100 pt-8">
                <h2 className="text-xl font-semibold">4. TransactionRow</h2>
                <div className="bg-bg-primary p-4 rounded-3xl max-w-md shadow-sm border border-cool-gray-100">
                    <div className="flex flex-col">
                        <TransactionRow
                            upiId="satoshi@nakamoto"
                            timestamp="Today, 10:42 AM"
                            amount="₹2,000"
                            status="pending"
                        />
                        <TransactionRow
                            upiId="hal.finney@bitcoin"
                            timestamp="Yesterday, 2:15 PM"
                            amount="₹500"
                            status="success"
                        />
                        <TransactionRow
                            upiId="invalid@upi"
                            timestamp="Mar 2, 2026"
                            amount="₹10"
                            status="failed"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6 border-t border-cool-gray-100 pt-8">
                <h2 className="text-xl font-semibold">5. ProgressBar</h2>
                <div className="max-w-sm p-6 bg-bg-secondary rounded-2xl">
                    <p className="text-sm font-semibold mb-3">You can still make 20 transactions</p>
                    <ProgressBar value={0.65} />
                </div>
            </section>
        </div>
    );
}
