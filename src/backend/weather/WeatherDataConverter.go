package weather

import(
	"backend/repository"
)

type IWeatherDataConverter interface {
	ConvertToWeatherReports(chances []repository.WeatherChance, periodsNumber int) []WeatherReport
	ConvertToWeatherChanceMap(chances []repository.WeatherChance) map[string][]repository.WeatherChance
}


// =======
type WeatherDataConverter struct {}

// Make WeatherReports array by using WeatherChances.
func (w *WeatherDataConverter) ConvertToWeatherReports(chances []repository.WeatherChance, periodsNumber int) []WeatherReport {
	var reports []WeatherReport

	areaKeys := make(map[string]bool)
	for _, chance := range chances {
		// skip keys duplication
		if _, exists := areaKeys[chance.AreaKey]; exists {
			continue
		}

		areaKeys[chance.AreaKey] = true

		reports = append(reports, WeatherReport {
			AreaKey: chance.AreaKey,
			Forecasts: make([]ForecastPeriod, periodsNumber),
		})
	}

	return reports
}

// Conver to Map[AreaKey][]WeatherChance
func (w *WeatherDataConverter) ConvertToWeatherChanceMap(chances []repository.WeatherChance) map[string][]repository.WeatherChance {
	chanceMap := make(map[string][]repository.WeatherChance)

	for _, chance := range chances {
		// Add key if not exist
		if _, exists := chanceMap[chance.AreaKey]; !exists {
			var chanceArray []repository.WeatherChance
			chanceMap[chance.AreaKey] = chanceArray
		}

		chanceMap[chance.AreaKey] = append(chanceMap[chance.AreaKey], chance)
	}

	return chanceMap
}