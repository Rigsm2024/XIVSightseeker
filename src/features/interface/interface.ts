import { GuidedSightseeingLog, SightseeingLog, WeatherReport, WeatherChance } from "./dataClass"

export interface ISightseeingGuide {
    GetGuidedSightseeingLogs(logs: SightseeingLog[], reports: WeatherReport[]): GuidedSightseeingLog[];
}

export interface IWeatherForecaster {
    GetWeatherReports(): WeatherReport[];
}

export interface IRepository {
    LoadSightseeingLogs(): SightseeingLog[];
	LoadWeatherChances(): Map<string, WeatherChance[]>;
}