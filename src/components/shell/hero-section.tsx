export function HeroSection() {
    return (
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-lg 2xl:text-2xl font-semibold leading-[1.5] text-text-primary text-center">
                Instant Payments from Bitcoin to UPI
            </h1>
            <div className="flex flex-col items-center gap-1">
                <span className="text-base text-text-secondary">Your transaction limit is:</span>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[32px] 2xl:text-[40px] font-semibold leading-[1.24] text-text-primary">
                        ₹200.00
                    </span>
                    <div className="rounded-full bg-bg-secondary px-3 py-0.5 flex flex-row items-center gap-1">
                        <span className="text-sm 2xl:text-base text-text-secondary leading-[1.5]">You can still make </span>
                        <span className="text-sm 2xl:text-base font-medium text-text-primary leading-[1.5]">20</span>
                        <span className="text-sm 2xl:text-base text-text-secondary leading-[1.5]"> transactions</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
