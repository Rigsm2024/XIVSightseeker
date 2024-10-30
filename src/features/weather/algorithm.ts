import { WeatherChance } from "../interface/dataClass";
import { ConvertToEorzeanTime } from "../util/eorzeanTime";

export class WeatherAlgorithm {

    // Create "Weather chance" value from unix seconds
    // Returns 0-99 int value
    GetWeatherChanceAt(unixSeconds: number): number {
        const eorzeanTime = ConvertToEorzeanTime(unixSeconds);

        // WeatherChance calculation algorithm
        const seed = eorzeanTime.days * 100 + eorzeanTime.chunk;

        const step1 = (seed << 11) ^ seed;
        const step2 = (step1 >> 8) ^ step1;

        const weatherChance = step2 % 100;

        return weatherChance;
    }

    // Sort and find weather key from WeatherChance array by using weather chance
    DetermineWeatherByChance(chance: number, weatherDatas: WeatherChance[]): string {
        // Find the index where cumulative sum of chances exceeds the argument chance
        let chanceSum = 0;
        for (let i = 0; i < weatherDatas.length; i++) {
            chanceSum += weatherDatas[i].Chance;

            if (chance < chanceSum) {
                return weatherDatas[i].WeatherKey;
            }
        }

        return "";
    }
}