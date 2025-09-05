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
        setFilters(prevFilters => {
            // update difference only
            const updated = {
                tab: newFilters.tab ?? prevFilters.tab,
                startIndex: newFilters.startIndex ?? prevFilters.startIndex,
                endIndex: newFilters.endIndex ?? prevFilters.endIndex,
                completed: newFilters.completed ?? prevFilters.completed,
                sortOrder: newFilters.sortOrder ?? prevFilters.sortOrder,
                showsComp: newFilters.showsComp ?? prevFilters.showsComp,
                isLongTerm: newFilters.isLongTerm ?? prevFilters.isLongTerm,
            };
            WriteFilterToLocalStrage(updated);

            if (prevFilters.isLongTerm == false && newFilters.isLongTerm === true) {
                logsUpdater.UpdateGLogsForceWith(updated);
            }
            
            return updated;
        });
    }, [logsUpdater]);

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