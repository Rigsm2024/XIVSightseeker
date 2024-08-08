package weather

import (
	"math"
	"sort"
	"backend/repository"
)

type EorzeanTime struct {
	hours int
	days int
	chunk int
	chunkedUnixSeconds int
}

type IWeatherAlgorithm interface {
	GetWeatherChanceAt(unixSeconds int) int
	GetWeather(chance int, weatherDatas []repository.WeatherChance) string
	GetEorzeanTimeAt(unixSeconds int) *EorzeanTime
}

// =====
type WeatherAlgorithm struct {}

// Create "Weather chance" value from unix seconds
// Returns 0-99 int value
func (wa *WeatherAlgorithm) GetWeatherChanceAt(unixSeconds int) int {
	eorzeanTime := wa.GetEorzeanTimeAt(unixSeconds)

	// weatherChance calculation algorithm
	seed := eorzeanTime.days * 100 + eorzeanTime.chunk

	step1 := uint32((seed << 11) ^ seed)
    step2 := uint32((step1 >> 8) ^ step1)

	weatherChance := step2 % 100

	return int(weatherChance)
}

// Find weather key from WeatherChance array by using weather chance.
func (wa *WeatherAlgorithm) GetWeather(chance int, weatherDatas []repository.WeatherChance) string {
	// sort by chance index
	sort.Sort(WeatherChancesForSorting(weatherDatas))
	
	// Find the index of the weatherDatas where the cumulative sum of Chances exceeds the arg chance.
	chanceSum := 0
	for i := 0; i < len(weatherDatas); i++ {
		chanceSum += weatherDatas[i].Chance

		if chance < chanceSum {
			return weatherDatas[i].WeatherKey
		}
	}

	return ""
}

// Convert a real unix seconds to an Eorzean time.
func (wa *WeatherAlgorithm) GetEorzeanTimeAt(unixSeconds int) *EorzeanTime {
	floatSeconds := float64(unixSeconds)

	// 1 Eorzean hour = 175 seconds
	eorzeanHours := math.Floor(floatSeconds / 175)
	eorzeanDays := math.Floor(eorzeanHours / 24)

	// chunk: 16:00 -> 00, 00:00 -> 08, 08:00 -> 16
	timeChunk := math.Mod(eorzeanHours, 24) - math.Mod(eorzeanHours, 8)
    timeChunk = math.Mod(timeChunk + 8, 24)

    // Calculate the start time of the current chunk in Eorzean hours
    chunkStartEorzeanHours := math.Floor(eorzeanHours / 8) * 8
    // Convert Eorzean hours back to Unix seconds
    chunkedUnixSeconds := int(chunkStartEorzeanHours * 175)

	return &EorzeanTime {
		hours: int(eorzeanHours),
		days: int(eorzeanDays),
		chunk: int(timeChunk),
		chunkedUnixSeconds: chunkedUnixSeconds,
	}
}


// =====
// for sorting
type WeatherChancesForSorting []repository.WeatherChance

func (w WeatherChancesForSorting) Len() int {
    return len(w)
}

func (w WeatherChancesForSorting) Less(i, j int) bool {
    return w[i].ChanceIndex < w[j].ChanceIndex
}

func (w WeatherChancesForSorting) Swap(i, j int) {
    w[i], w[j] = w[j], w[i]
}