// common
export type LocaleData = {
    jp: string;
    en: string;
};

export type AreasJson = Record<string, LocaleData>;

export type EmotesJson = Record<string, LocaleData>;

type LogEntry = {
    item_no: number;
    area_key: string;
    coordinate_x: number;
    coordinate_y: number;
    in_game_start_hour: number;
    in_game_end_hour: number;
    emote_key: string;
    weather1_key: string;
    weather2_key: string;
};

export type SightseeingLogsJson = LogEntry[];

type TextEntry = {
    item_no: number;
    description: LocaleData;
    hint: LocaleData;
};

export type SightseeingLogTextsJson = TextEntry[];

type ChanceEntry = {
    weather_key: string;
    chance: number;
};

export type WeatherChancesJson = Record<string, ChanceEntry[]>;

export type WeathersJson = Record<string, LocaleData>;