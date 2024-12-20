import Head from 'next/head';
import { SightseeingLog } from "../features/interface/dataClass"
import SightHeader from "../components/base/header"
import SightTab from "../components/base/tab"
import SightFooter from "../components/base/footer"
import SightseeingLogs from "../components/page/sightseeingLogs"
import { UseLogsState, DefaultFilterValue } from "../components/ui/logsState"
import { EAchievementPhase } from '@/features/interface/enum';
import { useEffect } from 'react';
import { ReadFilterFromLocalStrage } from '@/components/ui/localStrageAdapter';
import { LogFilterProps } from '@/features/shared/logSorter';

interface SightseekerProps {
  initalLogs: SightseeingLog[];
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

  return { props: { initalLogs: slogs } }
}

// Temporary values until the weather report completed.
const CreateInitialValues = (slogs: SightseeingLog[]) => {
  const initialGuidedSlogs = slogs.map(log => ({
    Data: log,
    PhaseTransitionTime: 0,
    Phase: EAchievementPhase.None,
    Visivility: true,
    IsCompleted: false,
  }));

  return { glogs: initialGuidedSlogs, filters: DefaultFilterValue };
}

export default function Index({ initalLogs }: SightseekerProps) {
  const initialValues = CreateInitialValues(initalLogs);

  // get custom hooks for values updated by multiple modules
  const { logs, filters, updateFilters } = UseLogsState(initialValues.glogs, initialValues.filters);

  // Read Local Strage
  useEffect(() => {
    const filtersInLocalStrage = ReadFilterFromLocalStrage();
    if (filtersInLocalStrage !== null) {
      updateFilters(filtersInLocalStrage);
    }
  }, []);

  return (
    <>
      <Head>
        <title>XIVSightseeker</title>
        <meta name="description" content="FFXIV 新生の探検手帳特化型攻略サイト。時間と天候を加味して今どの項目が達成可能なのかを提示します。" />
        <meta name="keywords" content="FFXIV, 探検手帳, 新生" />
      </Head>
      <main>
        <div className='container relative m-auto px-2 inset-x-0'>
          <SightHeader filters={filters} updateFilters={updateFilters} />
          <SightTab filters={filters} updateFilters={updateFilters} />
          <SightseeingLogs logs={logs} filters={filters} updateFilters={updateFilters} />
          <SightFooter />
        </div>
      </main>
    </>
  )
}