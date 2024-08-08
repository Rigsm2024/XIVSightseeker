import { SightseeingLog, WeatherReport } from "./dto"
import { ConvertToEorzeanTime, EorzeanTime } from "./eorzeanTime"

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
    EmoteName: string;
    Weather1Name: string;
    Weather2Name?: string;
    Description: string;
    Phase: EAchievementPhase;
    RemainingSeconds: number;
}

// Returns sightseeing logs with phase and remaining time
export function GetGuidedSightseeingLogs(logs: SightseeingLog[], reports: WeatherReport[]): GuidedSightseeingLog[] {
    const currentUnixSeconds = Math.floor(Date.now() / 1000);
    const currentEorzeanTime = ConvertToEorzeanTime(currentUnixSeconds)
    const forecastCount = reports[0].Forecasts.length

    const guideds = logs.map(log => {
        // Check when are they achievable
        const weatherAchievables = GetAchievableTimesByWeather(log, reports)
        const timeAchievables = GetAchievableTimesByLog(log, currentEorzeanTime, forecastCount)
        const achievables = GetLogicalAnd(weatherAchievables, timeAchievables)
        
        // Calculate phase and remaining time
        const isAchievable = achievables.length > 0
        const isCurrentlyAchievable = isAchievable && achievables[0].start <= currentUnixSeconds
        
        let phase = EAchievementPhase.NotAchievableForAWhile
        let remainingSeconds = 0
        if (isAchievable) {
            if (isCurrentlyAchievable) {
                phase = EAchievementPhase.CurrentlyAchievable
                remainingSeconds = achievables[0].end - currentUnixSeconds
            }
            else {
                phase = EAchievementPhase.SoonAchievable
                remainingSeconds = achievables[0].start - currentUnixSeconds
            }
        }

        return {
            ItemNo: log.ItemNo,
            AreaName: log.AreaName,
            CoordinateX: log.CoordinateX,
            CoordinateY: log.CoordinateY,
            StartHour: log.StartHour,
            EndHour: log.EndHour,
            EmoteName: log.EmoteName,
            Weather1Name: log.Weather1Name,
            Weather2Name: log.Weather2Name,
            Description: log.Description,
            Phase: phase,
            RemainingSeconds: remainingSeconds
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
    const startEorzeanDaysUnixSeconds = startTime.days * OneEorzeanDaySeconds
    const crossesMidnight = log.StartHour > log.EndHour

    return Array.from({ length: days })
        .map((_, index) => {
            const baseTime = startEorzeanDaysUnixSeconds + index * OneEorzeanDaySeconds
            const startTime = baseTime + log.StartHour * OneEorzeanHourSeconds
            let endTime = baseTime + log.EndHour * OneEorzeanHourSeconds
            if (crossesMidnight)
            {
                // In the case of like 18-05, end time have to be added 24 eorzean hour
                endTime += OneEorzeanDaySeconds
            }

            return {
                start: startTime,
                end: endTime
            }
        })
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