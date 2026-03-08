'use client'

/**
 * shared-components.tsx
 *
 * All reusable atomic UI primitives in one place.
 * Exports: FFButton, ActionCard, ProgressBar, StatusBadge, TransactionRow
 */

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Loader2, Hourglass, CircleCheck, CircleX } from 'lucide-react'

// ─── FFButton ────────────────────────────────────────────────────────────────

interface FFButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    variant?: 'primary' | 'secondary' | 'ghost'
    icon?: React.ReactNode
    isLoading?: boolean
}

/**
 * FFButton — branded pill button matching Flutter's ElevatedButton style.
 * Three variants: primary (black fill), secondary (light fill), ghost (no fill).
 */
export const FFButton = ({
    text,
    variant = 'primary',
    icon,
    isLoading = false,
    className,
    disabled,
    ...props
}: FFButtonProps) => {
    const isPrimary = variant === 'primary'
    const isSecondary = variant === 'secondary'
    const isGhost = variant === 'ghost'
    const isDisabled = disabled || isLoading

    return (
        <button
            className={cn(
                'flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2',
                isPrimary && 'bg-primary text-white hover:bg-cool-gray-900',
                isPrimary && isDisabled && 'bg-cool-gray-100 text-info cursor-not-allowed',
                isSecondary && 'bg-cool-gray-50 text-text-primary border border-cool-gray-100 hover:bg-cool-gray-100',
                isSecondary && isDisabled && 'opacity-50 cursor-not-allowed',
                isGhost && 'bg-transparent text-text-secondary hover:bg-cool-gray-50',
                isGhost && isDisabled && 'opacity-50 cursor-not-allowed',
                'h-12 px-5 text-sm font-medium leading-[1.5] w-full',
                className,
            )}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
            ) : icon ? (
                <span className='mr-2'>{icon}</span>
            ) : null}
            {text}
        </button>
    )
}

// ─── ActionCard ──────────────────────────────────────────────────────────────

interface ActionCardProps {
    label: string
    iconSrc: string
    variant?: 'light' | 'dark'
    onClick?: () => void
    className?: string
}

/**
 * ActionCard — square tappable card with an icon and label.
 * light variant: secondaryBackground (#F7F8FB) with primaryText.
 * dark variant:  primary (#000) background with white text.
 */
export const ActionCard = ({
    label,
    iconSrc,
    variant = 'light',
    onClick,
    className,
}: ActionCardProps) => {
    const isLight = variant === 'light'

    return (
        <button
            onClick={onClick}
            className={cn(
                'flex flex-col items-center justify-center w-full px-[20px] py-[16px] rounded-[24px] transition-transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2',
                isLight ? 'bg-bg-secondary text-text-primary' : 'bg-primary text-white',
                className,
            )}
            tabIndex={0}
            aria-label={label}
        >
            <div className='mb-2'>
                <Image src={iconSrc} alt='' width={48} height={48} className='object-contain' />
            </div>
            <span className='text-sm font-medium'>{label}</span>
        </button>
    )
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
    /** Value between 0 and 1 */
    value: number
    className?: string
}

/**
 * ProgressBar — thin linear indicator with a 700ms mount animation.
 * Maps to Flutter's LinearProgressIndicator (height:4, black fill, #E3E6EB track).
 */
export const ProgressBar = ({ value, className }: ProgressBarProps) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(Math.min(Math.max(value, 0), 1))
        }, 100)
        return () => clearTimeout(timer)
    }, [value])

    return (
        <div
            className={cn('h-1 w-full overflow-hidden rounded-full bg-accent-4', className)}
            role='progressbar'
            aria-valuenow={progress * 100}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className='h-full bg-primary transition-all duration-700 ease-in-out'
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    )
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

interface StatusBadgeProps {
    status: 'pending' | 'success' | 'failed'
    className?: string
}

/**
 * StatusBadge — inline icon + label chip for transaction status.
 * pending → orange (#F38744), success → teal (#249689), failed → red (#FF5963).
 */
export const StatusBadge = ({ status, className }: StatusBadgeProps) => (
    <div
        className={cn(
            'inline-flex items-center gap-1',
            status === 'pending' && 'text-[#F38744]',
            status === 'success' && 'text-[#249689]',
            status === 'failed' && 'text-[#FF5963]',
            className,
        )}
    >
        {status === 'pending' && <Hourglass className='w-4 h-4' />}
        {status === 'success' && <CircleCheck className='w-4 h-4' />}
        {status === 'failed' && <CircleX className='w-4 h-4' />}
        <span className='text-xs 2xl:text-sm leading-[1.5] font-normal'>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    </div>
)

// ─── TransactionRow ──────────────────────────────────────────────────────────

interface TransactionRowProps {
    upiId: string
    timestamp: string
    amount: string
    status: 'pending' | 'success' | 'failed'
}

/**
 * TransactionRow — single transaction card used in pending/history lists.
 * Matches Flutter's transaction row: icon ring | UPI ID + time | amount + status badge.
 */
export const TransactionRow = ({ upiId, timestamp, amount, status }: TransactionRowProps) => (
    <div className='flex items-center justify-between p-4 bg-bg-secondary rounded-2xl cursor-pointer transition-colors w-full'>
        <div className='flex items-center gap-3'>
            <div className='w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 flex items-center justify-center border-[2.67px] border-bg-primary'>
                <Image src='/images/Sent.png' alt='Sent' width={36} height={36} className='object-contain' />
            </div>
            <div className='flex flex-col gap-1.5 justify-center'>
                <span className='text-sm 2xl:text-base font-medium leading-[1.5] text-text-primary truncate max-w-[150px] lg:max-w-xs'>
                    {upiId}
                </span>
                <span className='text-xs 2xl:text-sm leading-[1.5] text-text-secondary'>{timestamp}</span>
            </div>
        </div>
        <div className='flex flex-col items-end gap-1.5 shrink-0 justify-center'>
            <span className='text-sm 2xl:text-base font-medium leading-[1.5] text-text-primary'>{amount}</span>
            <StatusBadge status={status} />
        </div>
    </div>
)
