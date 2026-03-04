'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
    value: number; // 0 to 1
    className?: string;
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Subtle mount animation
        const timer = setTimeout(() => {
            setProgress(Math.min(Math.max(value, 0), 1));
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div
            className={cn(
                'h-1 w-full overflow-hidden rounded-full bg-accent-4',
                className
            )}
            role="progressbar"
            aria-valuenow={progress * 100}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full bg-primary transition-all duration-700 ease-in-out"
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    );
};
