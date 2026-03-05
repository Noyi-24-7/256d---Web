'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function NavBar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // The left panel scrolls internally, not the window
            const el = document.getElementById('left-panel-scroll')
            if (el) {
                setScrolled(el.scrollTop > 10)
            }
        }

        const el = document.getElementById('left-panel-scroll')
        if (el) {
            el.addEventListener('scroll', handleScroll)
            return () => el.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={`fixed top-0 left-0 z-50 w-full 2xl:w-[720px] px-6 py-5 bg-bg-primary transition-shadow duration-200 flex flex-row items-center justify-between ${scrolled ? 'shadow-[0_4px_8px_rgba(0,0,0,0.016)]' : ''
                }`}
        >
            <div className="flex flex-row items-center">
                <Image src="/images/Logo.png" alt="256d Logo" width={48} height={48} className="rounded-full" />
            </div>
            <div className="flex flex-row items-center gap-3">
                <span className="text-base font-medium text-text-primary">Login with Nostr</span>
                <Image src="/images/Empty_Avatar.png" alt="Guest Avatar" width={48} height={48} className="rounded-lg" />
            </div>
        </div>
    )
}
