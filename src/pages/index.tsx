import Head from 'next/head';
import { useEffect } from 'react';
import { GuidedSightseeingLog } from "../features/interface/dataClass"
import { GetSortedSightseengLogs, GetLatestRemainingSeconds } from "../features/guide/logSorter"
import SightHeader from "../components/base/header"
import SightTab from "../components/base/tab"
import { useLogsState } from "../components/ui/LogsState"
import SightseeingLogs from "../components/page/sightseeingLogs"

interface SightseekerProps {
  guidedLogs: GuidedSightseeingLog[];
}

export async function getServerSideProps() {
  return fetchDatas(true)
}

async function fetchDatas(isServerSide: boolean) {
  const url = isServerSide ? process.env.SSR_API_URL : process.env.NEXT_PUBLIC_SPA_API_URL
  console.log("Try to fetch. url: " + url)

  // Get guided sightseeing logs data from server
  const resGuides = await fetch(url + 'api/guides', {
    method: 'GET',
    mode: 'cors',
  })
  const guides = await resGuides.json();

  return { props: { guidedLogs: guides } }
}

function SetRefreshEvent(logs: GuidedSightseeingLog[], updateSource: (source: GuidedSightseeingLog[]) => void) {
  useEffect(() => {
    let interval = GetLatestRemainingSeconds(logs) * 1000
    console.log("Set refreshing timer. interval: " + interval)

    const worker = new Worker(new URL('../public/timerWorker.js', import.meta.url));
    worker.postMessage(interval)
    worker.onmessage = _ => {
      // Update sightseeing logs data when some item's phase is changed.
      fetchDatas(false)
        .then(newDatas => {
          updateSource(newDatas.props.guidedLogs)
        })
        .catch(err => console.log(err))
    }

    return () => worker.terminate();
  }, [logs, updateSource])
}

export default function index({ guidedLogs }: SightseekerProps) {
  // TODO: prepare it with users history
  const initialTab = 0
  const initialFilter = { startIndex: 1, endIndex: 20 }

  // get custom hooks for values updated by multiple modules
  const { logs, filters, updateSource, updateFilters } = useLogsState(guidedLogs, initialFilter)
  const sorted = GetSortedSightseengLogs(logs, filters)

  // set timeout for refreshing when some achievable conditions are changed
  SetRefreshEvent(sorted, updateSource)

  return (
    <>
      <Head>
        <title>XIVSightseeker</title>
        <meta name="description" content="FFXIV 新生の探検手帳特化型攻略サイト。時間と天候を加味して今どの項目が達成可能なのかを提示します。" />
      </Head>
      <main>
        <div className='container m-auto px-2 inset-x-0 '>
          <SightHeader />
          <SightTab initialIndex={initialTab} updateFilters={updateFilters} />
          <SightseeingLogs logs={sorted} />
        </div>
      </main>
    </>

  )
}