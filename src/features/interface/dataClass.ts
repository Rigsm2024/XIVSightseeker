import { EAchievementPhase } from "./enum"


export interface GuidedSightseeingLog {
    Data: SightseeingLog;
    Phase: EAchievementPhase;
    PhaseTransitionTime: number;
    Visivility: boolean;
}

export interface SightseeingLog {
    ItemNo: number;
    AreaKey: string;
    AreaName: string;
    CoordinateX: number;
    CoordinateY: number;
    StartHour: number;
    EndHour: number;
    EmoteKey: string;
    EmoteName: string;
    Weather1Key: string;
    Weather1Name: string;
    Weather2Key?: string;
    Weather2Name?: string;
    Description: string;
    Hint: string;
}

export interface WeatherReport {
    AreaKey: string;
    Forecasts: ForecastPeriod[];
}

export interface ForecastPeriod {
    WeatherKey: string;
    When: number;
}

export interface WeatherChance {
	WeatherKey: string;
	Chance: number;
}