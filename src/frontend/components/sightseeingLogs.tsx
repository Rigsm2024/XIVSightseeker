import Image from "next/image"
import alarmIcon from '../public/icon/clock-hour-4.svg'
import TimerText from "./timer"
import { GuidedSightseeingLog } from "../features/sightseeingGuide"
import { playfair } from "../pages/fonts"

interface SightseeingArray {
    logs: GuidedSightseeingLog[]
}

function SightseeingLogItem(log: GuidedSightseeingLog) {

    // TODO: add all maps
    const mapUrl = log.ItemNo < 23 ? `/map/${log.ItemNo.toString().padStart(3, '0')}.jpeg` : '/map/placeholder.jpeg'
    const mapImage = <Image src={mapUrl} width={320} height={180} alt='map' priority={false} className='left-0 right-0 m-auto' />
    const weather1Icon = <Image src={`/img/${log.Weather1Key}.png`} width={20} height={20} alt={log.Weather1Key} titile={log.Weather1Name} />
    const weather2Icon = log.Weather2Key != null ? <Image src={`/img/${log.Weather2Key}.png`} width={20} height={20} alt={log.Weather2Key} titile={log.Weather2Name} /> : null
    const emoteIcon = <Image src={`/img/emote${log.EmoteId}.png`} width={40} height={40} alt={log.EmoteName} />

    return (
        <div className='basis-full max-w-sm md:basis-1/2 relative box-border p-1 pr-2 my-1'>
            <div className='sightseeing-log-container flex flex-col flex-wrap'>
                <div className='flex flex-row items-center gap-2 m-0.5 text-gray-300'>
                    <div className={`text-xl mb-0.5 ml-1 ${playfair.className}`}>{log.ItemNo.toString().padStart(3, '0')}</div>
                    <div>{log.AreaName}</div>
                    <div className='text-xs'>ET{log.StartHour}-{log.EndHour}</div>
                </div>
                <div className='card-divider-h'></div>
                <div className='flex flex-row'>
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-row items-center'>
                            <Image src={alarmIcon} width={24} height={24} alt='alarm icon' className='invert m-2 ml-1' />
                            <TimerText initialTime={log.PhaseTransitionTime} phase={log.Phase} />
                        </div>
                        <div className='relative'>
                            <div className='w-full rounded overflow-hidden'>
                                {mapImage}
                            </div>
                            <div className='absolute top-0 right-0 m-1 flex flex-row gap-1'>
                                {weather1Icon}
                                {weather2Icon}
                            </div>
                            <div className={`absolute bottom-0 right-0 px-1 bg-gray-800 bg-opacity-75 rounded shadow-md text-white ${playfair.className}`}>X:{log.CoordinateX} Y:{log.CoordinateY}</div>
                        </div>
                    </div>
                    <div className='card-divider-v m-1'></div>
                    <div className='flex flex-col items-center justify-center basis-16'>
                        {emoteIcon}
                        <div className='text-xs m-1 w-12 text-center text-white'>{log.EmoteName}</div>
                    </div>
                </div>
            </div>
            <div className='metalic-border'></div>
        </div>
    )
}

export default function SightseeingLogs({ logs }: SightseeingArray) {
    const achievables = logs.filter(f => f.Phase == 1)
    const almostAchievables = logs.filter(f => f.Phase == 2)
    const notAchievables = logs.filter(f => f.Phase == 3)

    const baseClasses = 'w-full flex flex-row flex-wrap justify-center md:justify-between md:px-10 border-b prefer-border-color p-2 mr-1 my-2'
    return (
        <div>
            <div className={`${baseClasses}`}>
                {achievables.map(log => (
                    <SightseeingLogItem key={log.ItemNo} {...log}/>
                ))}
            </div>
            <div className={`${baseClasses}`}>
                {almostAchievables.map(log => (
                    <SightseeingLogItem key={log.ItemNo} {...log}/>
                ))}
            </div>
            <div className={`${baseClasses} opacity-70`}>
                {notAchievables.map(log => (
                    <SightseeingLogItem key={log.ItemNo} {...log}/>
                ))}
            </div>
            <div className='w-full flex items-center justify-center'>
                <span className='text-xs mt-2 mb-4 opacity-50'>© SQUARE ENIX</span>
            </div>
        </div>
    )
}