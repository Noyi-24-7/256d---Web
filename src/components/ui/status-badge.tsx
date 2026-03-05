import React from 'react';
import { cn } from '@/lib/utils';
import { Hourglass, CircleCheck, CircleX } from 'lucide-react';

interface StatusBadgeProps {
    status: 'pending' | 'success' | 'failed';
    className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    return (
        <div
            className={cn(
                'inline-flex items-center gap-1',
                status === 'pending' && 'text-[#F38744]',
                status === 'success' && 'text-[#249689]',
                status === 'failed' && 'text-[#FF5963]',
                className
            )}
        >
            {status === 'pending' && <Hourglass className="w-4 h-4" />}
            {status === 'success' && <CircleCheck className="w-4 h-4" />}
            {status === 'failed' && <CircleX className="w-4 h-4" />}
            <span className="text-xs 2xl:text-sm leading-[1.5] font-normal">
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        </div>
    );
};
