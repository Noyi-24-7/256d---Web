'use client'

import { LeftPanel } from '@/components/shell/left-panel'
import { RightPanel } from '@/components/shell/right-panel'
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
                className={`w-full 2xl:w-[696px] shrink-0 2xl:ml-6 bg-bg-primary 2xl:bg-transparent ${panel === 'home' ? 'hidden 2xl:block' : 'block'
                    }`}
            >
                <RightPanel />
            </div>
        </div>
    )
}
