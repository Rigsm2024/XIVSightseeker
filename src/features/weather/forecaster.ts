import { WeatherReport } from "../interface/dataClass";
import { IWeatherForecaster } from "../interface/interface";
import { WeatherAlgorithm } from "./algorithm"
import jsonRepository from "../repository/jsonRepository"
import { ConvertToEorzeanTime } from "../util/eorzeanTime";

export class WeatherForecaster implements IWeatherForecaster {

    // the count of forecast periods. This means 3 days of EorzeanTime.
    private forecastPeriodsNumber = 9;
    private algo = new WeatherAlgorithm();

    GetWeatherReports(): WeatherReport[] {
        const weatherChances = jsonRepository.LoadWeatherChances();
        const areaKeys = Array.from(weatherChances.keys());
        const weatherReports: WeatherReport[] = areaKeys.map(key => ({ AreaKey: key,  Forecasts: []}));
        const periodicSeconds = this.generateForecastUnixTimestamps(this.forecastPeriodsNumber);

        // Forecast weather for all periods
        for (let period = 0; period < periodicSeconds.length; period++) {

            // Calculate "weather chance" at this unix seconds
            const chanceNumber = this.algo.GetWeatherChanceAt(periodicSeconds[period]);

            // Loop for all areas
            for (const areaKey of areaKeys) {
                const chancesAt = weatherChances.get(areaKey) ?? [];
                
                const forecastedWeather = this.algo.DetermineWeatherByChance(chanceNumber, chancesAt);
                const eTime = ConvertToEorzeanTime(periodicSeconds[period]);
                
                const target = weatherReports.find(f => f.AreaKey == areaKey);
                target?.Forecasts.push({
                    WeatherKey: forecastedWeather,
                    When: eTime.chunkedUnixSeconds,
                });
            }
        }

        return weatherReports;
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
