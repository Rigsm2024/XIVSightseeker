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
    isLongTerm?: boolean,
}

export function GetSortedSightseengLogs(source: GuidedSightseeingLog[], props: LogFilterProps) {
    const step1 = MutateVisivility(source, props);
    const step2 = MutateCompleted(step1, props);
    
    const sorter = GetSortFunction(props);
    return step2.sort(sorter);
}

function MutateVisivility(source: GuidedSightseeingLog[], filters: LogFilterProps) {
    // Clear visivility once
    source.forEach(glog => glog.Visivility = false);

    source
        // Are items in the tab range
        .filter(f => f.Data.ItemNo >= (filters.startIndex ?? 0) && f.Data.ItemNo <= (filters.endIndex ?? 0))

        // Are items not completed yet
        .filter(f => {
            if (filters.showsComp) {
                return true;
            }
            
            return !filters.completed?.includes(f.Data.ItemNo);
        })

        // Make them visible
        .forEach(x => x.Visivility = true);

    return source;
}

function MutateCompleted(source: GuidedSightseeingLog[], filters: LogFilterProps) {
    // Clear IsCompleted once
    source.forEach(glog => glog.IsCompleted = false);

    if (filters.completed?.length == 0) {
        return source;
    }
    
    source
        .filter(f => filters.completed?.includes(f.Data.ItemNo))
        .forEach(glog => glog.IsCompleted = true);

    return source;
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
        // if there is no items, return 1 sec to wait.
        return 1;
    }

    const isInitial = source.some(f => f.Phase == EAchievementPhase.None);
    if (isInitial) {
        // if there is init item, return 0 sec to update.
        return 0;
    }
    
    const currentUnixSeconds = Math.floor(Date.now() / 1000);
    const sorted = source
        .filter(f => f.Phase != EAchievementPhase.NotAchievableForAWhile)
        .sort((a, b) => a.PhaseTransitionTime - b.PhaseTransitionTime);
    if (sorted.length == 0) {
        // id there is no achivable item, return -1.
        return -1;
    }
    
    return sorted[0].PhaseTransitionTime - currentUnixSeconds;
}