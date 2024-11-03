import { GuidedSightseeingLog } from "../interface/dataClass"
import { EAchievementPhase } from "../interface/enum";

export enum ESortOrder {
    Achievable = 0,
    ItemNo = 1,
}

export interface LogFilterProps {
    tab?: number,
    startIndex?: number,
    endIndex?: number,
    completed?: number[],
    sortOrder?: ESortOrder,
    showsComp?: boolean,
}

export function GetSortedSightseengLogs(source: GuidedSightseeingLog[], props: LogFilterProps) {
    const visivilityUpdated = SetVisivility(source, props);
    const sorter = GetSortFunction(props);
    
    return visivilityUpdated.sort(sorter);
}

function SetVisivility(source: GuidedSightseeingLog[], filters: LogFilterProps) {
    // Make base value that visivility is cleared
    const target = source.map(glog => ({
        Data: glog.Data,
        Phase: glog.Phase,
        PhaseTransitionTime: glog.PhaseTransitionTime,
        Visivility: false
    }));

    const visibles = target
        // Are items in the tab range
        .filter(f => f.Data.ItemNo >= (filters.startIndex ?? 0) && f.Data.ItemNo <= (filters.endIndex ?? 0))

        // Are items not completed yet
        .filter(f => !filters.completed?.includes(f.Data.ItemNo));
        
    visibles.forEach(x => x.Visivility = true);

    // returns full glogs
    return target;
}

function GetSortFunction(filters: LogFilterProps) {
    if (filters.sortOrder === ESortOrder.Achievable) {
        return (a: GuidedSightseeingLog, b: GuidedSightseeingLog) => {
            if (a.Phase != b.Phase) {
                return a.Phase - b.Phase
            }
            
            if (a.PhaseTransitionTime != b.PhaseTransitionTime) {
                return a.PhaseTransitionTime - b.PhaseTransitionTime
            }
    
            return a.Data.ItemNo - b.Data.ItemNo
        }
    }
    
    return (a: GuidedSightseeingLog, b: GuidedSightseeingLog) => a.Data.ItemNo - b.Data.ItemNo;
}

export function GetLatestRemainingSeconds(source: GuidedSightseeingLog[]) {
    if (source.length == 0) {
        // if there are no items, return 1 sec to wait.
        //console.warn("GetLatestRemainingSeconds was called with empty arg.");
        return 5;
    }

    const isInitial = source.some(f => f.Phase == EAchievementPhase.None);
    if (isInitial) {
        return 0;
    }
    
    const currentUnixSeconds = Math.floor(Date.now() / 1000);
    const sorted = source
        .filter(f => f.Phase != EAchievementPhase.NotAchievableForAWhile)
        .sort((a, b) => a.PhaseTransitionTime - b.PhaseTransitionTime);
    
    return sorted[0].PhaseTransitionTime - currentUnixSeconds;
}