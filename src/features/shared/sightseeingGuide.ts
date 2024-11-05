import { SightseeingLog, WeatherReport } from "../interface/dataClass"
import { EAchievementPhase } from "../interface/enum";
import { ConvertToEorzeanTime, EorzeanTime } from "../util/eorzeanTime"
import { GuidedSightseeingLog } from "../interface/dataClass"
import { ISightseeingGuide } from "../interface/interface";

class SightseeingGuide implements ISightseeingGuide {

    constructor(){}

    // Returns sightseeing logs with phase and remaining time
    GetGuidedSightseeingLogs(logs: SightseeingLog[], reports: WeatherReport[]): GuidedSightseeingLog[] {
        // TODO: reduce calculation time.
        
        const currentUnixSeconds = Math.floor(Date.now() / 1000);
        const currentEorzeanTime = ConvertToEorzeanTime(currentUnixSeconds)
        const forecastCount = reports[0].Forecasts.length
    
        const guideds = logs.map(log => {
            // Check when are they achievable
            const weatherAchievables = this.getAchievableTimesByWeather(log, reports)
            const timeAchievables = this.getAchievableTimesByLog(log, currentEorzeanTime, forecastCount)
            const achievables = this.getLogicalAnd(weatherAchievables, timeAchievables)
    
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
                Data: log,
                Phase: phase,
                PhaseTransitionTime: phaseTransitionTime,
                Visivility: true,
            }
        })
    
        return guideds;
    }


    // ===========

    private OneEorzeanHourSeconds = 175
    private OneEorzeanDaySeconds = this.OneEorzeanHourSeconds * 24
    

    // Returns the times when their weather conditions match
    private getAchievableTimesByWeather(log: SightseeingLog, reports: WeatherReport[]): AchievableTime[] {
        var report = reports.filter(f => f.AreaKey == log.AreaKey)
        if (report.length != 1) {
            return []
        }
    
        return report[0].Forecasts
            .filter(f => f.WeatherKey == log.Weather1Key || f.WeatherKey == log.Weather2Key)
            .map(forecast => ({
                start: forecast.When,
                end: forecast.When + this.OneEorzeanHourSeconds * 8
            }))
    }

    // Returns the times within sightseeing logs requirement
    private getAchievableTimesByLog(log: SightseeingLog, startTime: EorzeanTime, days: number): AchievableTime[] {
        // Start day should be get back one day for crossing midnight pattern
        const startEorzeanDaysUnixSeconds = (startTime.days - 1) * this.OneEorzeanDaySeconds
        const crossesMidnight = log.StartHour > log.EndHour

        return Array.from({ length: days })
            .map((_, index) => {
                const baseTime = startEorzeanDaysUnixSeconds + index * this.OneEorzeanDaySeconds
                const startTime = baseTime + log.StartHour * this.OneEorzeanHourSeconds
                let endTime = baseTime + log.EndHour * this.OneEorzeanHourSeconds
                if (crossesMidnight)
                {
                    // In the case of like 18-05, endTime have to be added Eorzean 24 hours
                    endTime += this.OneEorzeanDaySeconds
                }

                return {
                    start: startTime,
                    end: endTime
                }
            })
            // filters passed time box
            .filter(f => f.end > startTime.source)
    }

    private getLogicalAnd(arg1: AchievableTime[], arg2: AchievableTime[]): AchievableTime[] {
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
}

interface AchievableTime {
    start: number;
    end: number;
}

export default SightseeingGuide;

