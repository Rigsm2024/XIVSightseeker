import { useState, useCallback } from 'react';
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import { LogFilterProps } from "../../features/guide/logSorter"


// Ths sight has to manage the state to use Source data: GuidedSightseeingLogs and filter: LogFilterProps.
export const UseLogsState = (source: GuidedSightseeingLog[], filterProps: LogFilterProps) => {
    const [logs, setLogs] = useState(source)
    const [filters, setFilters] = useState(filterProps)

    // custom hooks
    const updateSource = useCallback((source: GuidedSightseeingLog[]) => setLogs(source), [])
    const updateFilters = useCallback((newFilters: LogFilterProps) => {
        // to update difference only
        const updated = {
            startIndex: newFilters.startIndex ?? filters.startIndex,
            endIndex: newFilters.endIndex ?? filters.endIndex,
        }
        setFilters(updated)
    }, [])

    return {logs, filters, updateSource, updateFilters}
}