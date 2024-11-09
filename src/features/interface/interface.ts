import { GuidedSightseeingLog, SightseeingLog, WeatherReport, WeatherChance } from "./dataClass"

export interface ISightseeingGuide {
    GetGuidedSightseeingLogs(logs: SightseeingLog[], reports: WeatherReport[]): GuidedSightseeingLog[];
}

export interface IWeatherForecaster {
    GetWeatherReports(periods: number): WeatherReport[];
}

export interface IRepository {
    LoadSightseeingLogs(): SightseeingLog[];
	LoadWeatherChances(): Map<string, WeatherChance[]>;
}