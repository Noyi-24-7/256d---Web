import Image from 'next/image'

export function RightPanelEmpty() {
    return (
        <div className="w-full h-full flex flex-col items-center pt-[240px] px-[180px] bg-bg-primary">
            <div className="flex flex-col items-center gap-2 max-w-[336px]">
                <div className="rounded-lg overflow-hidden">
                    <Image
                        src="/images/Scan_Icon.png"
                        alt="Scan Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
                <p className="text-base font-medium text-text-primary text-center leading-[1.5]">
                    Scan the QR code at the receptionist desk to make UPI payments.
                </p>
            </div>
        </div>
    )
}
