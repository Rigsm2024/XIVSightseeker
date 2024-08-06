
import { SightseeingLog, WeatherReport } from "../features/dto"

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
  //console.log(logs)
  //console.log(reports)
  return (
    <div>
      <h1>XIVSightseeker</h1>
      <div>
        <div>hellow world</div>
      </div>
    </div>
  )
}