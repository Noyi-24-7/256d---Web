import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface FFButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: 'primary' | 'secondary' | 'ghost';
    icon?: React.ReactNode;
    isLoading?: boolean;
}

export const FFButton = ({
    text,
    variant = 'primary',
    icon,
    isLoading = false,
    className,
    disabled,
    ...props
}: FFButtonProps) => {
    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary';
    const isGhost = variant === 'ghost';
    const isDisabled = disabled || isLoading;

    return (
        <button
            className={cn(
                'flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2',
                // Primary
                isPrimary && 'bg-primary text-white hover:bg-cool-gray-900',
                isPrimary && isDisabled && 'bg-cool-gray-100 text-info cursor-not-allowed',
                // Secondary
                isSecondary && 'bg-cool-gray-50 text-text-primary border border-cool-gray-100 hover:bg-cool-gray-100',
                isSecondary && isDisabled && 'opacity-50 cursor-not-allowed',
                // Ghost
                isGhost && 'bg-transparent text-text-secondary hover:bg-cool-gray-50',
                isGhost && isDisabled && 'opacity-50 cursor-not-allowed',
                // Sizing — className overrides these defaults
                'h-12 px-5 text-sm font-medium leading-[1.5] w-full',
                className
            )}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : icon ? (
                <span className="mr-2">{icon}</span>
            ) : null}
            {text}
        </button>
    );
};
