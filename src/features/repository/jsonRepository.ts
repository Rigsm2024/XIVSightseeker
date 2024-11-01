import { AreasJson, EmotesJson, SightseeingLogsJson, SightseeingLogTextsJson, WeatherChancesJson, WeathersJson } from "../interface/jsonClass"
import { SightseeingLog, WeatherChance } from "../interface/dataClass";
import { IRepository } from "../interface/interface"
import path from 'path';
import fs from 'fs';

class JsonRepository implements IRepository {

    private completesLoading = false;
    private areas: AreasJson = {};
    private emotes: EmotesJson = {};
    private logs: SightseeingLogsJson = [];
    private texts: SightseeingLogTextsJson = [];
    private chances: WeatherChancesJson = {};
    private weathers: WeathersJson = {};
    private static instance: JsonRepository;

    private constructor() {}
  
    // Make this class a singleton to use cache of static json data.
    static getInstance(): JsonRepository {
        if (!JsonRepository.instance) {
            JsonRepository.instance = new JsonRepository();
            
            // Load jsons. This may take a long, so run it async.
            JsonRepository.instance.loadJsons();
        }
        return JsonRepository.instance
    }

    private async loadJsons() {
        console.log("[JsonRepository] Json loading started.");
        console.time("[JsonRepository] Json loading completed. time");
        this.areas = this.loadFile("areas.json");
        this.emotes = this.loadFile("emotes.json");
        this.logs = this.loadFile("sightseeingLogs.json");
        this.texts = this.loadFile("sightseeingLogTexts.json");
        this.chances = this.loadFile("weatherChances.json");
        this.weathers = this.loadFile("weathers.json");
        this.completesLoading = true;
        console.timeEnd("[JsonRepository] Json loading completed. time");
    }

    // Load sightseeing logs data
    LoadSightseeingLogs(): SightseeingLog[] {
        if (!this.completesLoading) {
            return [];
        }

        return this.logs.map(log => {
            const area = this.areas[log.area_key].jp;
            const emote = this.emotes[log.emote_key].jp;
            const weather1 = this.weathers[log.weather1_key].jp;
            const weather2 = log.weather2_key != null ? this.weathers[log.weather2_key].jp : undefined;
            const textJson = this.texts.find(f => f.item_no == log.item_no);
            const text = textJson ? textJson.description.jp : "";
            const hint = textJson ? textJson.hint.jp : "";

            return {
                ItemNo: log.item_no,
                AreaKey: log.area_key,
                AreaName: area,
                CoordinateX: log.coordinate_x,
                CoordinateY: log.coordinate_y,
                StartHour: log.in_game_start_hour,
                EndHour: log.in_game_end_hour,
                EmoteKey: log.emote_key,
                EmoteName: emote,
                Weather1Key: log.weather1_key,
                Weather1Name: weather1,
                Weather2Key: log.weather2_key,
                Weather2Name: weather2,
                Description: text,
                Hint: hint,
            }
        })
    }

    // Load weather chances
    LoadWeatherChances(): Map<string, WeatherChance[]> {
        const weatherChanceMap = new Map<string, WeatherChance[]>();
        if (!this.completesLoading) {
            return weatherChanceMap;
        }

        for (const area in this.chances) {
            const chances = this.chances[area].map(entry => ({
                WeatherKey: entry.weather_key,
                Chance: entry.chance
            }));
            weatherChanceMap.set(area, chances);
        }
    
        return weatherChanceMap;
    }
    
    private loadFile(fileName: string) {
        const filePath = path.join(process.cwd(), 'public', 'data', fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    }
}

export default JsonRepository.getInstance();