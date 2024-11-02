import { GuidedSightseeingLog, SightseeingLog } from "../../features/interface/dataClass"
import SightseeingLogItem from "../ui/sightseeingLogItem"
import { useEffect } from 'react';
import { GetLatestRemainingSeconds, GetSortedSightseengLogs, LogFilterProps } from "../../features/guide/logSorter"
import sightseeingGuide from "../../features/guide/sightseeingGuide"

interface SightseeingLogsProps {
    logs: GuidedSightseeingLog[],
    filters: LogFilterProps,
    updateLogs: (source: GuidedSightseeingLog[]) => void,
}

// Fetch Weather Reports. Always called from client.
async function fetchWeatherReports() {
    const url = "/api/reports";
    console.log("Try to fetch. url: " + url);

    const resReports = await fetch(url + '', {
        method: 'GET',
        mode: 'cors',
    })
    return await resReports.json();
}

// Set timeout for refreshing when some achievable conditions are changed
function SetRefreshEvent(logs: GuidedSightseeingLog[], updateSource: (source: GuidedSightseeingLog[]) => void) {
    useEffect(() => {
        let interval = GetLatestRemainingSeconds(logs) * 1000
        console.log("Set refreshing timer. interval: " + interval)

        const worker = new Worker(new URL('../../public/timerWorker.js', import.meta.url));
        worker.postMessage(interval)
        worker.onmessage = _ => {
            // Update sightseeing logs data when some item's phase is changed.
            fetchWeatherReports()
                .then(reports => {
                    const slogs = logs.map(f => f.Data);
                    const guidedLogs = sightseeingGuide.GetGuidedSightseeingLogs(slogs, reports);
                    updateSource(guidedLogs);
                })
                .catch(err => console.log(err))
        }

        return () => worker.terminate();
    }, [logs, updateSource])
}

const SightseeingLogs = ({ logs, filters, updateLogs }: SightseeingLogsProps) => {

    // Apply filter to guided sightseeing logs
    const sortedLogs = GetSortedSightseengLogs(logs, filters)

    // Phase transition event
    SetRefreshEvent(sortedLogs, updateLogs);

    return (
        <div className='w-full flex flex-row flex-wrap justify-center md:justify-between xl:justify-start lg:px-14 border-b prefer-border-color p-2 mr-1 my-2'>
            {sortedLogs.map(glog => (
                <SightseeingLogItem key={glog.Data.ItemNo} glog={glog} />
            ))}
        </div>
    )
}

export default SightseeingLogs;