import { TransactionRow } from '@/components/ui/transaction-row'

export function PendingPayments() {
    const transactions: Array<{
        id: string;
        upiId: string;
        timestamp: string;
        amount: string;
        status: 'pending' | 'success' | 'failed';
    }> = [
            {
                id: '1',
                upiId: 'satoshi@nakamoto',
                timestamp: 'Today, 10:42 AM',
                amount: '₹2,000',
                status: 'pending'
            },
            {
                id: '2',
                upiId: 'hal.finney@bitcoin',
                timestamp: 'Yesterday, 2:15 PM',
                amount: '₹500',
                status: 'success'
            },
            {
                id: '3',
                upiId: 'invalid@upi',
                timestamp: 'Mar 2, 2026',
                amount: '₹10',
                status: 'failed'
            }
        ]

    return (
        <div className="flex flex-col w-full">
            <h2 className="text-lg 2xl:text-2xl font-semibold leading-[1.24] text-text-primary mb-4">
                Pending payments
            </h2>
            <div className="flex flex-col gap-0">
                {transactions.map((tx) => (
                    <TransactionRow
                        key={tx.id}
                        upiId={tx.upiId}
                        timestamp={tx.timestamp}
                        amount={tx.amount}
                        status={tx.status}
                    />
                ))}
            </div>
        </div>
    )
}
