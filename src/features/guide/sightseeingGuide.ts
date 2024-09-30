import { SightseeingLog, WeatherReport } from "../interface/dto"
import { ConvertToEorzeanTime, EorzeanTime } from "../util/eorzeanTime"

// When the log gonna be achievable
enum EAchievementPhase {
    None = 0,
    CurrentlyAchievable = 1,
    SoonAchievable = 2,
    NotAchievableForAWhile = 3
}

export interface GuidedSightseeingLog {
    ItemNo: number;
    AreaName: string;
    CoordinateX: number;
    CoordinateY: number;
    StartHour: number;
    EndHour: number;
    EmoteId: number;
    EmoteName: string;
    Weather1Key: string;
    Weather1Name: string;
    Weather2Key?: string;
    Weather2Name?: string;
    Description: string;
    Phase: EAchievementPhase;
    PhaseTransitionTime: number;
}

// Returns sightseeing logs with phase and remaining time
export function GetGuidedSightseeingLogs(logs: SightseeingLog[], reports: WeatherReport[]): GuidedSightseeingLog[] {
    const currentUnixSeconds = Math.floor(Date.now() / 1000);
    const currentEorzeanTime = ConvertToEorzeanTime(currentUnixSeconds)
    const forecastCount = reports[0].Forecasts.length

    console.log('Forecast weathers at ET' + currentEorzeanTime.hours % 24)

    const guideds = logs.map(log => {
        // Check when are they achievable
        const weatherAchievables = GetAchievableTimesByWeather(log, reports)
        const timeAchievables = GetAchievableTimesByLog(log, currentEorzeanTime, forecastCount)
        const achievables = GetLogicalAnd(weatherAchievables, timeAchievables)

        // Calculate phase and remaining time
        const isAchievable = achievables.length > 0
        const isCurrentlyAchievable = isAchievable && achievables[0].start <= currentUnixSeconds
        
        let phase = EAchievementPhase.NotAchievableForAWhile
        let phaseTransitionTime = 0
        if (isAchievable) {
            if (isCurrentlyAchievable) {
                phase = EAchievementPhase.CurrentlyAchievable
                phaseTransitionTime = achievables[0].end
            }
            else {
                phase = EAchievementPhase.SoonAchievable
                phaseTransitionTime = achievables[0].start
            }
        }

        return {
            ItemNo: log.ItemNo,
            AreaName: log.AreaName,
            CoordinateX: log.CoordinateX,
            CoordinateY: log.CoordinateY,
            StartHour: log.StartHour,
            EndHour: log.EndHour,
            EmoteId: log.EmoteId,
            EmoteName: log.EmoteName,
            Weather1Key: log.Weather1Key,
            Weather1Name: log.Weather1Name,
            Weather2Key: log.Weather2Key,
            Weather2Name: log.Weather2Name,
            Description: log.Description,
            Phase: phase,
            PhaseTransitionTime: phaseTransitionTime
        }
    })

    return guideds;
}

interface AchievableTime {
    start: number;
    end: number;
}

const OneEorzeanHourSeconds = 175
const OneEorzeanDaySeconds = OneEorzeanHourSeconds * 24

// Returns the times when their weather conditions match
function GetAchievableTimesByWeather(log: SightseeingLog, reports: WeatherReport[]): AchievableTime[] {
    var report = reports.filter(f => f.AreaKey == log.AreaKey)
    if (report.length != 1) {
        return []
    }
  
    return report[0].Forecasts
        .filter(f => f.WeatherKey == log.Weather1Key || f.WeatherKey == log.Weather2Key)
        .map(forecast => ({
            start: forecast.When,
            end: forecast.When + OneEorzeanHourSeconds * 8
        }))
}

// Returns the times within sightseeing logs requirement
function GetAchievableTimesByLog(log: SightseeingLog, startTime: EorzeanTime, days: number): AchievableTime[] {
    // Start day should be get back one day for crossing midnight pattern
    const startEorzeanDaysUnixSeconds = (startTime.days - 1) * OneEorzeanDaySeconds
    const crossesMidnight = log.StartHour > log.EndHour

    return Array.from({ length: days })
        .map((_, index) => {
            const baseTime = startEorzeanDaysUnixSeconds + index * OneEorzeanDaySeconds
            const startTime = baseTime + log.StartHour * OneEorzeanHourSeconds
            let endTime = baseTime + log.EndHour * OneEorzeanHourSeconds
            if (crossesMidnight)
            {
                // In the case of like 18-05, endTime have to be added Eorzean 24 hours
                endTime += OneEorzeanDaySeconds
            }

            return {
                start: startTime,
                end: endTime
            }
        })
        // filters passed time box
        .filter(f => f.end > startTime.source)
}

function GetLogicalAnd(arg1: AchievableTime[], arg2: AchievableTime[]): AchievableTime[] {
    const result: AchievableTime[] = [];

    // Conpairs each times
    for (const time1 of arg1) {
        for (const time2 of arg2) {
            const overlapStart = Math.max(time1.start, time2.start);
            const overlapEnd = Math.min(time1.end, time2.end);

            // Adds overlaped only
            if (overlapStart < overlapEnd) {
                result.push({ start: overlapStart, end: overlapEnd });
            }
        }
    }

    return result;
}