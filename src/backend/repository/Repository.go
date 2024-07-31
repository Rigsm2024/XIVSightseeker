package repository

import (
	"time"
)

// Data for sightseeing logs
type SightseeingLog struct {
	ItemNo         uint
	AreaName       string
	CoordinateX    float64
	CoordinateY    float64
	StartTime      time.Time
	EndTime        time.Time
	EmoteName      string
	Weather1Name   string
	Weather2Name   *string // Nullable
	Description    string
}

// Data for weather chances
type WeatherChance struct {
	AreaKey     string
	WeatherKey  string
	Chance      int
	ChanceIndex int
}

// [Interface] Data provider.
type IRepository interface {
	LoadSightseeingLogs() ([]SightseeingLog, error)
	LoadWeatherChances() ([]WeatherChance, error)
}
