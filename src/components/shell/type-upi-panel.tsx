'use client'

import { useState } from 'react'
import { useQueryState } from 'nuqs'
import { ArrowLeft, ClipboardPaste, QrCode } from 'lucide-react'
import { FFButton } from '@/components/ui/ff-button'

export function TypeUpiPanel() {
    const [, setPanel] = useQueryState('panel')
    const [upiId, setUpiId] = useState('')

    const handleBack = () => {
        setPanel('home')
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setUpiId(text)
        } catch (err) {
            console.error('Failed to read clipboard text: ', err)
        }
    }

    const handleScanInstead = () => {
        setPanel('scan_qr')
    }

    const handleContinue = () => {
        // To be implemented in future batch
        console.log('Continuing with UPI ID:', upiId)
    }

    return (
        <div className="w-full flex flex-col pt-28 2xl:pt-14 px-6 2xl:px-0">
            {/* Header */}
            <div className="flex flex-row items-center justify-between mb-8">
                <button
                    onClick={handleBack}
                    className="p-2 -ml-2 rounded-full hover:bg-cool-gray-50 transition-colors"
                    tabIndex={0}
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-6 h-6 text-text-primary" />
                </button>
                <h2 className="text-lg 2xl:text-2xl font-semibold text-text-primary leading-[1.4] 2xl:leading-[1.24]">
                    Type in UPI ID
                </h2>
                {/* Invisible spacer for center alignment */}
                <div className="w-6 h-6" />
            </div>

            <div className="flex flex-col items-center w-full">
                {/* Main Content Area */}
                <div className="flex flex-col w-full 2xl:w-[537px] gap-6">
                    <p className="text-base 2xl:text-lg text-text-secondary leading-[1.5] text-center max-w-[297px] self-center">
                        Make sure you enter the right UPI ID for the merchant.
                    </p>

                    <div className="flex flex-col gap-3 w-full">
                        <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID"
                            className="w-full h-12 px-4 rounded-lg border border-cool-gray-200 bg-bg-primary text-text-primary focus:outline-none focus:ring-0 focus:border-cool-gray-400 transition-colors"
                        />

                        <FFButton
                            text="Paste"
                            variant="secondary"
                            icon={<ClipboardPaste className="w-6 h-6" />}
                            onClick={handlePaste}
                        />
                    </div>

                    <FFButton
                        text="Scan QR Instead"
                        variant="ghost"
                        icon={<QrCode className="w-6 h-6" />}
                        onClick={handleScanInstead}
                    />

                    <div className="mt-8">
                        <FFButton
                            text="Continue"
                            variant="primary"
                            disabled={!upiId.trim()}
                            onClick={handleContinue}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
