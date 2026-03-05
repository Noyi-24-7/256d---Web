'use client'

import { LeftPanel } from '@/components/shell/left-panel'
import { useQueryState } from 'nuqs'

export default function Shell() {
    const [panel] = useQueryState('panel', { defaultValue: 'home' })

    return (
        <div className="flex flex-row min-h-screen bg-bg-secondary w-full justify-center">
            {/* Left Panel */}
            <div
                className={`w-full 2xl:w-[720px] h-screen shrink-0 border-r border-cool-gray-100 ${panel !== 'home' ? 'hidden 2xl:block' : 'block'
                    }`}
            >
                <LeftPanel />
            </div>

            {/* Right Panel */}
            <div
                className={`w-full 2xl:w-[696px] shrink-0 2xl:ml-6 px-4 pt-28 2xl:px-[88px] 2xl:pt-[56px] bg-bg-primary 2xl:bg-transparent ${panel === 'home' ? 'hidden 2xl:block' : 'block'
                    }`}
            >
                <h1 className="text-2xl font-semibold mb-4 text-text-primary leading-[1.24]">Right Panel</h1>
                <p className="text-text-secondary">Active panel state: {panel}</p>
            </div>
        </div>
    )
}
