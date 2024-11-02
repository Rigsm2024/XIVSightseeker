import Head from 'next/head';
import { GuidedSightseeingLog, SightseeingLog } from "../features/interface/dataClass"
import SightHeader from "../components/base/header"
import SightTab from "../components/base/tab"
import SightFooter from "../components/base/footer"
import { UseLogsState } from "../components/ui/LogsState"
import SightseeingLogs from "../components/page/sightseeingLogs"
import { EAchievementPhase } from '@/features/interface/enum';

interface SightseekerProps {
  initalLogs: GuidedSightseeingLog[];
}

// Load static sightseeing logs data from api
export async function getServerSideProps() {
  const url = 'http://localhost:3000/api/slogs';
  console.log("Try to fetch. url: " + url);

  // Get guided sightseeing logs data from server
  const resLogs = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  const slogs: SightseeingLog[] = await resLogs.json();

  // Make initail value of guided logs.
  const initialGuidedSlogs = slogs.map(log => {
    return {
      Data: log,
      PhaseTransitionTime: 0,
      Phase: EAchievementPhase.None,
    };
  });

  return { props: { initalLogs: initialGuidedSlogs } }
}

export default function index({ initalLogs }: SightseekerProps) {
  // TODO: prepare it with users history
  const initialTab = 0
  const initialFilter = { startIndex: 1, endIndex: 20 }

  // get custom hooks for values updated by multiple modules
  const { logs, filters, updateSource, updateFilters } = UseLogsState(initalLogs, initialFilter)

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
          <SightseeingLogs logs={logs} filters={filters} updateLogs={updateSource} />
          <SightFooter />
        </div>
      </main>
    </>

  )
}