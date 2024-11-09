import { EAchievementPhase } from '@/features/interface/enum';
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import { GetSortedSightseengLogs, LogFilterProps } from "../../features/shared/logSorter"


export class LogsUpdaterUtils {
    private sorted: GuidedSightseeingLog[];
    private filters: LogFilterProps;
    private updateSource: (source: GuidedSightseeingLog[]) => void;

    constructor(glogs: GuidedSightseeingLog[], filters: LogFilterProps, updateSource: (source: GuidedSightseeingLog[]) => void) {
        this.sorted = GetSortedSightseengLogs(glogs, filters);
        this.filters = filters;
        this.updateSource = updateSource;
    }

    UpdateGLogsForceWith(newFilters: LogFilterProps) {
        this.filters = newFilters;
        this.UpdateGlogs();
    }

    DetectUpdateNeed(): boolean {
        // 1. page rendered
        const isInitial = this.sorted.some(f => f.Phase == EAchievementPhase.None);
        if (isInitial) {
            console.log("updateGlogs with pattern 1");
            return true;
        }

        // 2. some items timer became 00:00
        const currentUnixSeconds = Math.floor(Date.now() / 1000);
        const timerEnds = this.sorted
            .filter(f1 => f1.Phase !== EAchievementPhase.NotAchievableForAWhile)
            .filter(f2 => f2.Visivility === true)
            .some(f3 => f3.PhaseTransitionTime - currentUnixSeconds <= 0);
        if (timerEnds) {
            console.log("updateGlogs with pattern 3");
            return true;
        }

        return false;
    }

    UpdateGlogs() {
        // Long term: 24.5h of real. Default term: 3 days in Eorzea.
        const periods = this.filters.isLongTerm ? 63 : 9;

        fetch('/api/guides?periods=' + periods, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
            .then(glogs => this.updateSource(glogs))
            .catch(err => console.log(err))
        ;
    }
}
