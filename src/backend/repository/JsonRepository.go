package repository

import (
    "log"
	"io/ioutil"
    "encoding/json"
)

// Repository type Json, and it has functions of IRepository.
type JsonRepository struct {
	areas AreaJson
	emotes EmoteJson
	textMap map[uint]SightseeingLogTextJson
	sLogs []SightseeingLogJson
	weathers WeatherJson
	weatherChances WeatherChanceJson
}

// Get sightseeing logs from json
func (r *JsonRepository) LoadSightseeingLogs() ([]SightseeingLog, error) {
	var result []SightseeingLog
	for _, slog := range r.sLogs {
		item := SightseeingLog {
			ItemNo: slog.ItemNo,
			AreaKey: slog.AreaKey,
			AreaName: r.areas[slog.AreaKey].JP,
			CoordinateX: slog.CoordinateX,
			CoordinateY: slog.CoordinateY,
			StartHour: slog.StartHour,
			EndHour: slog.EndHour,
			EmoteId: slog.EmoteID,
			EmoteName: r.emotes[slog.EmoteID].JP,
			Weather1Key: slog.Weather1Key,
			Weather1Name: r.weathers[slog.Weather1Key].JP,
			Weather2Key: slog.Weather2Key,
			Description: r.textMap[slog.ItemNo].Description.JP,
		}

		if slog.Weather2Key != nil {
			str := r.weathers[*slog.Weather2Key].JP
            item.Weather2Name = &str
        }

		result = append(result, item)
	}
    return result, nil
}

// Get weather chances from json
func (r *JsonRepository) LoadWeatherChances() ([]WeatherChance, error) {
	var result []WeatherChance
    for area, chances := range r.weatherChances {
        for i, chance := range chances {
            result = append(result, WeatherChance {
                AreaKey:     area,
                WeatherKey:  chance.WeatherKey,
                Chance:      chance.Chance,
                ChanceIndex: i + 1,
            })
        }
    }

    return result, nil
}

// Read json file and convert it to type T struct
func GetJson[T any](fileName string) T {
	var result T
	
	data, err := ioutil.ReadFile("data/" + fileName)
    if err != nil {
        log.Fatalf("Error reading JSON file: %v", err)
    }

	err = json.Unmarshal(data, &result)
	if err != nil {
        log.Fatalf("Error deseliallize JSON file: %v", err)
	}

	return result
}

// Create JsonRepository instance
func NewJsonRepository() *JsonRepository {
    // Read json and keep static datas
	areas := GetJson[AreaJson]("areas.json")
	emotes := GetJson[EmoteJson]("emotes.json")
	texts := GetJson[[]SightseeingLogTextJson]("sightseeingLogTexts.json")
	sLogs := GetJson[[]SightseeingLogJson]("sightseeingLogs.json")
	weathers := GetJson[WeatherJson]("weathers.json")
	weatherChances := GetJson[WeatherChanceJson]("weatherChances.json")
	
	textMap := make(map[uint]SightseeingLogTextJson)
	for _, item := range texts {
		textMap[item.ItemNo] = item
	}

    return &JsonRepository {
		areas: areas,
		emotes: emotes,
		textMap: textMap,
		sLogs: sLogs,
		weathers: weathers,
		weatherChances: weatherChances,
	}
}



// ==============
//  for json parse
type LocalizedText struct {
    JP string `json:"jp"`
    EN string `json:"en"`
}

type AreaJson map[string]LocalizedText

type EmoteJson map[uint]LocalizedText

type SightseeingLogTextJson struct {
    ItemNo       uint           `json:"item_no"`
    Description  *LocalizedText `json:"description"`
    Hint         *LocalizedText `json:"hint"`
}

type SightseeingLogJson struct {
    ItemNo        uint     `json:"item_no"`
    AreaKey       string   `json:"area_key"`
    CoordinateX   float64  `json:"coordinate_x"`
    CoordinateY   float64  `json:"coordinate_y"`
	StartHour     uint     `json:"in_game_start_hour"`
    EndHour       uint     `json:"in_game_end_hour"`
    EmoteID       uint     `json:"emote_id"`
    Weather1Key   string   `json:"weather1_key"`
    Weather2Key   *string  `json:"weather2_key"`
}

type WeatherJson map[string]LocalizedText

type WeatherChanceJsonData struct {
    WeatherKey string `json:"weather_key"`
    Chance     int    `json:"chance"`
}

type WeatherChanceJson map[string][]WeatherChanceJsonData