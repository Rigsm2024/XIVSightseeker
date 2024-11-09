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
        <div className='w-full flex flex-row flex-wrap justify-center md:justify-between xl:justify-start lg:px-14 border-b prefer-border-color p-2 mr-1 my-2'>
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