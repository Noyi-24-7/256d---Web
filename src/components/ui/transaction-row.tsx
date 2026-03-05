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
        <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-2xl cursor-pointer transition-colors w-full">
            <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 flex items-center justify-center border-[2.67px] border-bg-primary">
                    <Image
                        src="/images/Sent.png"
                        alt="Sent"
                        width={36}
                        height={36}
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col gap-1.5 justify-center">
                    <span className="text-sm 2xl:text-base font-medium leading-[1.5] text-text-primary truncate max-w-[150px] lg:max-w-xs">
                        {upiId}
                    </span>
                    <span className="text-xs 2xl:text-sm leading-[1.5] text-text-secondary">
                        {timestamp}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0 justify-center">
                <span className="text-sm 2xl:text-base font-medium leading-[1.5] text-text-primary">
                    {amount}
                </span>
                <StatusBadge status={status} />
            </div>
        </div>
    );
};
