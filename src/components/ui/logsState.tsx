import { useState, useCallback } from 'react';
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import { LogFilterProps } from "../../features/shared/logSorter"
import { WriteFilterToLocalStrage } from './localStrageAdapter';


// Ths sight has to manage the state to use Source data: GuidedSightseeingLogs and filter: LogFilterProps.
export const UseLogsState = (source: GuidedSightseeingLog[], filterProps: LogFilterProps) => {
    const [logs, setLogs] = useState(source);
    const [filters, setFilters] = useState(filterProps);

    // custom hooks
    const updateSource = useCallback((source: GuidedSightseeingLog[]) => setLogs(source), []);
    const updateFilters = useCallback((newFilters: LogFilterProps) => {
        // update difference only
        const updated = {
            tab: newFilters.tab ?? filters.tab,
            startIndex: newFilters.startIndex ?? filters.startIndex,
            endIndex: newFilters.endIndex ?? filters.endIndex,
            completed: newFilters.completed ?? filters.completed,
            sortOrder: newFilters.sortOrder ?? filters.sortOrder,
            showsComp: newFilters.showsComp ?? filters.showsComp,
        };
        setFilters(updated);
        WriteFilterToLocalStrage(updated);
    }, [filters]);

    return { logs, filters, updateSource, updateFilters }
}