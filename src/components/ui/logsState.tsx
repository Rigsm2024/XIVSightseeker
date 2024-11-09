import { useState, useCallback, useEffect } from 'react';
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import { LogFilterProps } from "../../features/shared/logSorter"
import { WriteFilterToLocalStrage } from './localStrageAdapter';
import { LogsUpdaterUtils } from './logsUpdater';

// Ths sight has to manage the state to use Source data: GuidedSightseeingLogs and filter: LogFilterProps.
export const UseLogsState = (source: GuidedSightseeingLog[], filterProps: LogFilterProps) => {
    const [logs, setLogs] = useState(source);
    const [filters, setFilters] = useState(filterProps);

    // custom hooks
    const updateSource = useCallback((source: GuidedSightseeingLog[]) => setLogs(source), []);
    const logsUpdater = SetLogsUpdater(logs, filters, updateSource);

    const updateFilters = useCallback((newFilters: LogFilterProps) => {
        // update difference only
        const updated = {
            tab: newFilters.tab ?? filters.tab,
            startIndex: newFilters.startIndex ?? filters.startIndex,
            endIndex: newFilters.endIndex ?? filters.endIndex,
            completed: newFilters.completed ?? filters.completed,
            sortOrder: newFilters.sortOrder ?? filters.sortOrder,
            showsComp: newFilters.showsComp ?? filters.showsComp,
            isLongTerm: newFilters.isLongTerm ?? filters.isLongTerm,
        };
        setFilters(updated);
        WriteFilterToLocalStrage(updated);

        if (filters.isLongTerm == false && newFilters.isLongTerm === true) {
            logsUpdater.UpdateGLogsForceWith(updated);
        }
    }, [filters]);

    return { logs, filters, updateFilters }
}

const SetLogsUpdater = (glogs: GuidedSightseeingLog[], filters: LogFilterProps, updateSource: (source: GuidedSightseeingLog[]) => void): LogsUpdaterUtils => {
    const logsUpdater = new LogsUpdaterUtils(glogs, filters, updateSource);
    
    // start updater interval
    useEffect(() => {
        const intervalTag = setInterval(() => {
            const updateNeed = logsUpdater.DetectUpdateNeed();
            if (updateNeed) {
                logsUpdater.UpdateGlogs();
            }
        }, 1000);

        return () => clearInterval(intervalTag);
    }, [logsUpdater]);

    return logsUpdater;
}

export const DefaultFilterValue: LogFilterProps = {
    tab: 0,
    startIndex: 1,
    endIndex: 9,
    completed: [],
    sortOrder: 0,
    showsComp: true,
    isLongTerm: false,
}