import Head from 'next/head';
import { GuidedSightseeingLog } from "../features/interface/dataClass"
import SightHeader from "../components/base/header"
import SightTab from "../components/base/tab"
import SightFooter from "../components/base/footer"
import SightseeingLogs from "../components/page/sightseeingLogs"
import { UseLogsState, DefaultFilterValue } from "../components/ui/logsState"
import { useEffect } from 'react';
import { ReadFilterFromLocalStrage } from '@/components/ui/localStrageAdapter';

interface SightseekerProps {
  initialGuidedLogs: GuidedSightseeingLog[];
}

// Load guided sightseeing logs data from api
export async function getServerSideProps() {
  const url = 'http://localhost:3000/api/guides?periods=9';

  // Get guided sightseeing logs data from server with time/weather calculations
  const resLogs = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  const guidedLogs: GuidedSightseeingLog[] = await resLogs.json();

  return { props: { initialGuidedLogs: guidedLogs } }
}

// Create initial values from server-calculated guided logs
const CreateInitialValues = (guidedLogs: GuidedSightseeingLog[]) => {
  return { glogs: guidedLogs, filters: DefaultFilterValue };
}

export default function Index({ initialGuidedLogs }: SightseekerProps) {
  const initialValues = CreateInitialValues(initialGuidedLogs);

  // get custom hooks for values updated by multiple modules
  const { logs, filters, updateFilters } = UseLogsState(initialValues.glogs, initialValues.filters);

  // Read Local Storage
  useEffect(() => {
    const filtersInLocalStrage = ReadFilterFromLocalStrage();
    if (filtersInLocalStrage !== null) {
      // updateFilters will trigger re-fetch if isLongTerm changed from false to true
      updateFilters(filtersInLocalStrage);
    }
  }, []);

  return (
    <>
      <Head>
        <title>XIVSightseeker</title>
        <meta name="description" content="FFXIV 新生の探検手帳特化型攻略サイト。時間と天候を加味して今どの項目が達成可能なのかを提示します。" />
        <meta name="keywords" content="FFXIV, FF14, 探検手帳, 新生, ファイナルファンタジー14, 攻略, 天候, エオルゼア時間" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://xivsightseeker.com" />
        
        {/* OGP tags */}
        <meta property="og:title" content="XIVSightseeker - FFXIV新生探検手帳攻略サイト" />
        <meta property="og:description" content="FFXIV 新生の探検手帳特化型攻略サイト。時間と天候を加味して今どの項目が達成可能なのかを提示します。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xivsightseeker.com" />
        <meta property="og:site_name" content="XIVSightseeker" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="XIVSightseeker - FFXIV新生探検手帳攻略サイト" />
        <meta name="twitter:description" content="FFXIV 新生の探検手帳特化型攻略サイト。時間と天候を加味して今どの項目が達成可能なのかを提示します。" />
      </Head>
      <main>
        <div className='w-full relative px-2 sm:px-[1.25%]'>
          <SightHeader filters={filters} updateFilters={updateFilters} />
          <SightTab filters={filters} updateFilters={updateFilters} />
          <SightseeingLogs logs={logs} filters={filters} updateFilters={updateFilters} />
          <SightFooter />
        </div>
      </main>
    </>
  )
}