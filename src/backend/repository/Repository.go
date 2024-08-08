package repository

// Data for sightseeing logs
type SightseeingLog struct {
	ItemNo         uint
	AreaKey        string
	AreaName       string
	CoordinateX    float64
	CoordinateY    float64
	StartHour      uint
	EndHour        uint
	EmoteName      string
	Weather1Key    string
	Weather1Name   string
	Weather2Key    *string // Nullable
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
