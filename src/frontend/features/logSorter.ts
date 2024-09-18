import { GuidedSightseeingLog } from "../features/sightseeingGuide"

export interface LogFilterProps {
    startIndex?: number
    endIndex?: number
}

export function GetSortedSightseengLogs(source: GuidedSightseeingLog[], props: LogFilterProps) {
    return source

        // filter by tab index
        .filter(f => f.ItemNo >= (props.startIndex ?? 0) && f.ItemNo <= (props.endIndex ?? 0))

        // sort
        .sort((a, b) => {
            if (a.Phase != b.Phase) {
                return a.Phase - b.Phase
            }
            
            if (a.PhaseTransitionTime != b.PhaseTransitionTime) {
                return a.PhaseTransitionTime - b.PhaseTransitionTime
            }

            return a.ItemNo - b.ItemNo
        })
}

export function GetLatestRemainingSeconds(source: GuidedSightseeingLog[]) {
    if (source.length == 0) {
        return -1
    }
    
    const currentUnixSeconds = Math.floor(Date.now() / 1000);
    const sorted = source
        .filter(f => f.Phase != 3)
        .sort((a, b) => a.PhaseTransitionTime - b.PhaseTransitionTime)
    
    return sorted[0].PhaseTransitionTime - currentUnixSeconds
}