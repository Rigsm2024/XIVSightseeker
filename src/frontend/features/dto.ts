export interface SightseeingLog {
    ItemNo: number;
    AreaKey: string;
    AreaName: string;
    CoordinateX: number;
    CoordinateY: number;
    StartHour: number;
    EndHour: number;
    EmoteName: string;
    Weather1Key: string;
    Weather1Name: string;
    Weather2Key?: string;
    Weather2Name?: string;
    Description: string;
}


export interface WeatherReport {
    AreaKey: string;
    Forecasts: ForecastPeriod[];
}

export interface ForecastPeriod {
    WeatherKey: string;
    When: number;
}
