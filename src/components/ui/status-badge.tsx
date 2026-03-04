import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: 'pending' | 'success' | 'failed';
    className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    return (
        <div
            className={cn(
                'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                status === 'pending' && 'bg-pending/10 text-pending',
                status === 'success' && 'bg-success/10 text-success',
                status === 'failed' && 'bg-error/10 text-error',
                className
            )}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
    );
};
