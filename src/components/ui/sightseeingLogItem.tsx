import Image from "next/image"
import alarmIcon from '../../public/icon/clock-hour-4.svg'
import CompleteButton from "./completeButton"
import TextDropdown from "../ui/textDropdown"
import TimerText from "../ui/timer"
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import { playfair } from "../../pages/fonts"
import { EAchievementPhase } from "@/features/interface/enum"
import { LogFilterProps } from "@/features/shared/logSorter"

interface SightseeingItemProps {
    glog: GuidedSightseeingLog,
    filters: LogFilterProps,
    updateFilters: (filters: LogFilterProps) => void,
}

// This file is focusing to Sightseeing Logs HTML only.
const SightseeingLogItem = ({ glog, filters, updateFilters }: SightseeingItemProps) => {

    const log = glog.Data
    const mapUrl = `/map/${log.ItemNo.toString().padStart(3, '0')}.jpeg`
    const mapImage = <Image src={mapUrl} width={320} height={180} alt='map' priority={false} className='left-0 right-0 m-auto' />
    const coodinate = `X:${log.CoordinateX} Y:${log.CoordinateY}`;
    const weather1Icon = <Image src={`/img/${log.Weather1Key}.png`} width={20} height={20} alt={log.Weather1Key} title={log.Weather1Name} />
    const weather2Icon = log.Weather2Key != null ? <Image src={`/img/${log.Weather2Key}.png`} width={20} height={20} alt={log.Weather2Key} title={log.Weather2Name} /> : null
    const emoteIcon = <Image src={`/img/${log.EmoteKey}.png`} width={40} height={40} alt={log.EmoteName} />
    const phaseClass = ((phase) => {
        switch(phase) {
            case EAchievementPhase.CurrentlyAchievable:
                return 'currently-achievable';
            case EAchievementPhase.SoonAchievable:
                return 'soon-achievable';
            case EAchievementPhase.NotAchievableForAWhile:
                return 'not-achievables';
            default:
                return 'waiting-for-guided';
        }
    })(glog.Phase);
    const coordinateText = (axis: string, num: number) => {
        const [integerPart, decimalPart] = num.toString().split(".");
        return (
            <>
                <span className='text-xs'>{axis}:</span>
                <span className='text-lg'>{integerPart}</span>
                <span className='text-xs'>.{decimalPart ?? '0'}</span>
            </>
        );
    };

    return (
        <div className={`${phaseClass} basis-full max-w-sm md:basis-1/2 self-start relative box-border p-1 pr-2 my-1`}>
            <div className='sightseeing-log-container flex flex-col flex-wrap'>
                <div className='flex flex-row items-center gap-2 m-0.5 text-gray-300'>
                    <div className={`text-xl mb-0.5 ml-1 ${playfair.className}`}>{log.ItemNo.toString().padStart(3, '0')}</div>
                    <div>{log.AreaName}</div>
                    <div className='text-xs'>ET{log.StartHour}-{log.EndHour}</div>
                    <div className='flex-1 flex justify-end items-center'>
                        <CompleteButton glog={glog} filters={filters} updateFilters={updateFilters} />
                    </div>
                </div>
                <div className='card-divider-h'></div>
                <div className='flex flex-row'>
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-row items-center'>
                            <Image src={alarmIcon} width={24} height={24} alt='alarm icon' className='invert m-2 ml-1' />
                            <TimerText initialTime={glog.PhaseTransitionTime} phase={glog.Phase} />
                        </div>
                        <div className='relative'>
                            <div className='w-full rounded overflow-hidden'>
                                {mapImage}
                            </div>
                            <div className='absolute top-0 right-0 m-1 flex flex-row gap-1'>
                                {weather1Icon}
                                {weather2Icon}
                            </div>
                            <div className={`absolute bottom-0 right-0 px-1 bg-gray-800 bg-opacity-75 rounded shadow-md text-white ${playfair.className}`}>
                                {coordinateText("X", log.CoordinateX)} {coordinateText("Y", log.CoordinateY)}
                            </div>
                        </div>
                    </div>
                    <div className='card-divider-v m-1'></div>
                    <div className='flex flex-col items-center justify-center basis-16'>
                        {emoteIcon}
                        <div className='text-xs m-1 w-12 text-center text-white'>{log.EmoteName}</div>
                    </div>
                </div>
                <TextDropdown {...log}/>
            </div>
            <div className='metalic-border'></div>
        </div>
    )
}

export default SightseeingLogItem;