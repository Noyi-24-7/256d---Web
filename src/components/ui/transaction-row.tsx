import React from 'react';
import Image from 'next/image';
import { StatusBadge } from './status-badge';

interface TransactionRowProps {
    upiId: string;
    timestamp: string;
    amount: string;
    status: 'pending' | 'success' | 'failed';
}

export const TransactionRow = ({
    upiId,
    timestamp,
    amount,
    status,
}: TransactionRowProps) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-cool-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-xl cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-bg-secondary">
                    <Image
                        src="/images/Sent.png"
                        alt="Sent"
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-text-primary truncate max-w-[150px] lg:max-w-xs">
                        {upiId}
                    </span>
                    <span className="text-xs text-text-secondary mt-1">
                        {timestamp}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-base font-semibold text-text-primary">
                    {amount}
                </span>
                <StatusBadge status={status} />
            </div>
        </div>
    );
};
