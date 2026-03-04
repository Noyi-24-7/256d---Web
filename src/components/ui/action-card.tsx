import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ActionCardProps {
    label: string;
    iconSrc: string;
    variant?: 'light' | 'dark';
    onClick?: () => void;
    className?: string;
}

export const ActionCard = ({
    label,
    iconSrc,
    variant = 'light',
    onClick,
    className,
}: ActionCardProps) => {
    const isLight = variant === 'light';

    return (
        <button
            onClick={onClick}
            className={cn(
                'flex flex-col items-center justify-center w-full h-[140px] rounded-3xl transition-transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2',
                isLight ? 'bg-bg-secondary text-text-primary' : 'bg-primary text-white',
                className
            )}
            tabIndex={0}
            aria-label={label}
        >
            <div className="mb-3">
                <Image
                    src={iconSrc}
                    alt=""
                    width={48}
                    height={48}
                    className="object-contain"
                />
            </div>
            <span className="text-sm font-semibold">{label}</span>
        </button>
    );
};
