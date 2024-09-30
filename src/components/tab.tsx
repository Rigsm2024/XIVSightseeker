import { useState } from 'react'
import { playfair } from "../pages/fonts"
import { LogFilterProps } from "../features/logSorter"

interface tabProps {
    initialIndex: number
    updateFilters: (filters: LogFilterProps) => void
}

export default function SightTab({initialIndex, updateFilters}: tabProps) {
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const updateTab = (index: number) => {
        setTabIndex(index)

        const startIndex = (index == 0) ? 1 : 21
        const endIndex = (index == 0) ? 20 : 80

        updateFilters({startIndex, endIndex})
    }
    
    const baseClasses = 'basis-1/2 text-gray-600 py-2 block hover:text-blue-500 focus:outline-none'
    const chosenClasses = 'text-blue-500 border-b-2 font-medium border-blue-500'
    return (
        <div>
            <nav className="w-full px-4 flex flex-row">
                <button onClick={() => updateTab(0)} className={`${playfair.className} ${baseClasses} ${tabIndex == 0 ? chosenClasses : ''}`}>
                    1-20
                </button>
                <button onClick={() => updateTab(1)} className={`${playfair.className} ${baseClasses} ${tabIndex == 1 ? chosenClasses : ''}`}>
                    21-80
                </button>
            </nav>
        </div>
    )
}