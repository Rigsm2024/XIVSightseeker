import { useState, useCallback } from 'react';
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import { LogFilterProps } from "../../features/guide/logSorter"

// interface LogsStateProps {
//     logs: GuidedSightseeingLog[]
//     filters: LogFilterProps
//     updateSource: (source: GuidedSightseeingLog[]) => void
//     updateFilters: (filters: LogFilterProps) => void
// }

export const UseLogsState = (source: GuidedSightseeingLog[], filterProps: LogFilterProps) => {
    const [logs, setLogs] = useState(source)
    const [filters, setFilters] = useState(filterProps)

    // custom hooks
    const updateSource = useCallback((source: GuidedSightseeingLog[]) => setLogs(source), [])
    const updateFilters = useCallback((newFilters: LogFilterProps) => {
        const updated = {
            startIndex: newFilters.startIndex ?? filters.startIndex,
            endIndex: newFilters.endIndex ?? filters.endIndex,
        }
        setFilters(updated)
    }, [])

    return {logs, filters, updateSource, updateFilters}
}