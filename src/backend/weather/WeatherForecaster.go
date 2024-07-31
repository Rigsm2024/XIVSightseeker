package weather

import(
	"time"
	"backend/repository"
)

const (
	forecastPeriodsNumber = 9
)

type WeatherReport struct {
	AreaKey    string
	Forecasts  []ForecastPeriod
}

type ForecastPeriod struct {
	WeatherKey string
	StartTime  int
}

type IWeatherForecaster interface {
	GetWeatherReports() []WeatherReport
}


// =======
type WeatherForecaster struct {
	repos repository.IRepository
	algo IWeatherAlgorithm
	conv IWeatherDataConverter
}

// Get weather reports contains all areas.
func (wf *WeatherForecaster) GetWeatherReports() []WeatherReport {
	flattenChances, err := wf.repos.LoadWeatherChances()
	if err != nil {
		return []WeatherReport{}
	}

	// make blank container for return value
	weatherReports := wf.conv.ConvertToWeatherReports(flattenChances, forecastPeriodsNumber)
	chanceMap := wf.conv.ConvertToWeatherChanceMap(flattenChances)

	// forecast weathers for all periods
	periodicSeconds := wf.createPeriodicUnixSeconds(forecastPeriodsNumber)
	for period := 0; period < len(periodicSeconds); period++ {
		// calculate "weather chance" at this unix seconds
		weatherChance := wf.algo.GetWeatherChanceAt(periodicSeconds[period])

		// loop for all areas
		for _, report := range weatherReports {
			forecastedWeather := wf.algo.GetWeather(weatherChance, chanceMap[report.AreaKey])

			report.Forecasts[period] = ForecastPeriod {
				WeatherKey: forecastedWeather,
				StartTime: periodicSeconds[period],	// TBD: what data should be contained
			}
		}
	}

	return weatherReports
}


// ========

// Make unix seconds array for weather forecast
// TBD: should be chuncked to [00, 08, 16], or not.
func (wf *WeatherForecaster) createPeriodicUnixSeconds(number int) []int {
	// 8 Eorzean hour time span
    const periodsTimeSpan = 175 * 8

	// base time
	currentUnixSeconds := int(time.Now().Unix())

	periodicSeconds := make([]int, forecastPeriodsNumber)
	for period := 0; period < number; period++ {
		seconds := currentUnixSeconds + period * periodsTimeSpan
		periodicSeconds[period] = seconds
	}

	return periodicSeconds
}

// =========
func NewWeatherForecaster(repos repository.IRepository) *WeatherForecaster {
	return &WeatherForecaster {
		repos: repos,
		algo: &WeatherAlgorithm{},
		conv: &WeatherDataConverter{},
	}
}