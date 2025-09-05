import { GuidedSightseeingLog, SightseeingLog } from "../../features/interface/dataClass"
import SightseeingLogItem from "../ui/sightseeingLogItem"
import { GetSortedSightseengLogs, LogFilterProps } from "../../features/shared/logSorter"

interface SightseeingLogsProps {
    logs: GuidedSightseeingLog[],
    filters: LogFilterProps,
    updateFilters: (filters: LogFilterProps) => void,
}

const SightseeingLogs = ({ logs, filters, updateFilters }: SightseeingLogsProps) => {

    // Apply filter to guided sightseeing logs
    const sortedLogs = GetSortedSightseengLogs(logs, filters);

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 items-start border-b prefer-border-color py-4 my-2'>
            {sortedLogs
                .filter(f => f.Visivility)
                .map(glog => (
                    <SightseeingLogItem 
                        key={glog.Data.ItemNo}
                        glog={glog}
                        filters={filters}
                        updateFilters={updateFilters}
                    />
                ))
            }
        </div>
    );
}

export default SightseeingLogs;