import { WeatherReport } from "../interface/dataClass";
import { IWeatherForecaster } from "../interface/interface";
import { WeatherAlgorithm } from "./algorithm"
import jsonRepository from "../repository/jsonRepository"
import { ConvertToEorzeanTime } from "../util/eorzeanTime";

export class WeatherForecaster implements IWeatherForecaster {

    private algo = new WeatherAlgorithm();

    GetWeatherReports(periods: number): WeatherReport[] {
        
        // Store the necessary computation results in an object in advance
        const periodicSeconds = this.generateForecastUnixTimestamps(periods);
        const timeStructs = periodicSeconds.map(sec => {
            const eTime = ConvertToEorzeanTime(sec);
            const chance = this.algo.GetWeatherChanceAt(eTime);

            return {
                seconds: sec,
                chance: chance,
                eTime: eTime,
            };
        });

        const weatherChances = jsonRepository.LoadWeatherChances();
        const areaKeys = Array.from(weatherChances.keys());

        // Forecast weather for all areas
        const weatherReports: WeatherReport[] = areaKeys.map(areaKey => {
            const chanceData = weatherChances.get(areaKey) ?? [];

            // Forecast weather for all periods
            const forecastedWeathersInThisArea = timeStructs.map(time => {
                const forecastedWeather = this.algo.DetermineWeatherByChance(time.chance, chanceData);

                return ({
                    WeatherKey: forecastedWeather,
                    When: time.eTime.chunkedUnixSeconds,
                });
            });
            
            // Convert to weather report entry
            return ({
                AreaKey: areaKey,  
                Forecasts: forecastedWeathersInThisArea,
            });
        });

        return weatherReports;
    }

    // Forecast for specific area in long term periods.
    GetLongWeathersIn(areaKey: string, chunkNumber: number): WeatherReport[] {
        const periodicSeconds = this.generateForecastUnixTimestamps(chunkNumber);
        const timeStructs = periodicSeconds.map(sec => {
            const eTime = ConvertToEorzeanTime(sec);
            const chance = this.algo.GetWeatherChanceAt(eTime);

            return {
                seconds: sec,
                chance: chance,
                eTime: eTime,
            };
        });

        const weatherChances = jsonRepository.LoadWeatherChances();
        const targetChances = weatherChances.get(areaKey);
        if (targetChances == undefined) {
            return [];
        }

        // Forecast weather for all periods
        const forecastedWeathersInThisArea = timeStructs.map(time => {
            const forecastedWeather = this.algo.DetermineWeatherByChance(time.chance, targetChances);

            return ({
                WeatherKey: forecastedWeather,
                When: time.eTime.chunkedUnixSeconds,
            });
        });
        
        // Convert to weather report entry
        return [{
            AreaKey: areaKey,  
            Forecasts: forecastedWeathersInThisArea,
        }];
    }

    // Generate an array of unix timestamps for weather forecasting
    private generateForecastUnixTimestamps(count: number): number[] {
        // 8 Eorzean hours time span in seconds
        const periodsTimeSpan = 175 * 8;

        // Current Unix time in seconds
        const currentUnixSeconds = Math.floor(Date.now() / 1000);

        // Generate forecast timestamps
        const periodicSeconds: number[] = [];
        for (let period = 0; period < count; period++) {
            const seconds = currentUnixSeconds + period * periodsTimeSpan;
            periodicSeconds.push(seconds);
        }

        return periodicSeconds;
    }
}
