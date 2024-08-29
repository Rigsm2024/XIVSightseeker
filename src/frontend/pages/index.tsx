
import { SightseeingLog, WeatherReport } from "../features/dto"
import { GetGuidedSightseeingLogs } from "../features/sightseeingGuide"
import SightHeader from "../components/header"
import SightseeingLogs from "../components/sightseeingLogs"

interface SightseekerProps {
  logs: SightseeingLog[];
  reports: WeatherReport[];
}

export async function getServerSideProps() {
  // Get sightseeing logs data from server
  const resLogs = await fetch('http://backend:8080/SightseeingLogs', {
    method: 'GET',
    mode: 'cors',
  })
  const logs = await resLogs.json()

  // Get weather reports data from server
  const resReports = await fetch('http://backend:8080/WeatherReports', {
    method: 'GET',
    mode: 'cors',
  })
  const reports = await resReports.json()
  
  return { props: { logs, reports } }
}


export default function index({ logs, reports }: SightseekerProps) {
  const guided = GetGuidedSightseeingLogs(logs, reports)
  const sorted = guided
    .sort((a, b) => {
      if (a.Phase != b.Phase) {
        return a.Phase - b.Phase
      }
      
      if (a.RemainingSeconds != b.RemainingSeconds) {
        return a.RemainingSeconds - b.RemainingSeconds
      }

      return a.ItemNo - b.ItemNo
    })
    
  // console.log(sorted.map(x => ({
  //   no: x.ItemNo,
  //   area: x.AreaName,
  //   phase: x.Phase,
  //   res: x.RemainingSeconds,
  //   des: x.Weather1Name + ": " + x.StartHour + "-" + x.EndHour
  // })))

  return (
    <div className='container m-auto inset-x-0'>
      <SightHeader />
      <SightseeingLogs logs={sorted}/>
    </div>
  )
}