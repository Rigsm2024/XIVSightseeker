export interface SightseeingLog {
    ItemNo: number;
    AreaName: string;
    CoordinateX: number;
    CoordinateY: number;
    StartTime: string;
    EndTime: string;
    EmoteName: string;
    Weather1Name: string;
    Weather2Name?: string;
    Description: string;
}


export interface WeatherReport {
    AreaKey: string;
    Forecasts: ForecastPeriod[];
}

export interface ForecastPeriod {
    WeatherKey: string;
    StartTime: number;
}
