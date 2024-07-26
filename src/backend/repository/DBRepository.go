package repository

import (
    "database/sql"
    _ "github.com/lib/pq"
    "log"
    "os"
)

// Repository type DB, and it has functions of Repository.
type DBRepository struct {
	db *sql.DB
}

// Get sightseeing logs from db
func (r *DBRepository) LoadSightseeingLogs() ([]SightseeingLog, error) {
    query := `
        SELECT 
            sl.item_no, 
            a.area_name_jp, 
            sl.coordinate_x, 
            sl.coordinate_y,
            sl.in_game_start_time, 
            sl.in_game_end_time, 
            e.emote_name_jp,
            w1.weather_name_jp, 
            w2.weather_name_jp, 
            d.description_jp
        FROM 
            sightseeing_logs sl
        JOIN 
            areas a ON sl.area_id = a.area_id
        JOIN 
            emotes e ON sl.emote_id = e.emote_id
        JOIN 
            weathers w1 ON sl.weather1_id = w1.weather_id
        LEFT JOIN 
            weathers w2 ON sl.weather2_id = w2.weather_id
        JOIN 
            sightseeing_log_descriptions d ON sl.description_id = d.description_id
        ;
        `
    rows, err := r.db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var logs []SightseeingLog
    for rows.Next() {
        var log SightseeingLog
        var weather2Name sql.NullString
        err := rows.Scan(
            &log.ItemNo, 
            &log.AreaName, 
            &log.CoordinateX, 
            &log.CoordinateY,
            &log.StartTime, 
            &log.EndTime, 
            &log.EmoteName, 
            &log.Weather1Name,
            &weather2Name, 
            &log.Description)
        if err != nil {
            return nil, err
        }
        if weather2Name.Valid {
            log.Weather2Name = &weather2Name.String
        } else {
            log.Weather2Name = nil
        }
        logs = append(logs, log)
    }
    if err = rows.Err(); err != nil {
        return nil, err
    }
    return logs, nil
}

// Get weather chances from db
func (r *DBRepository) LoadWeatherChances() ([]WeatherChance, error) {
    query := `
        SELECT 
            a.area_key, 
            w.weather_key, 
            wc.chance, 
            wc.chance_index
        FROM 
            weather_chances wc
        JOIN 
            areas a ON wc.area_id = a.area_id
        JOIN 
            weathers w ON wc.weather_id = w.weather_id
        ;
        `
    rows, err := r.db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var weatherChances []WeatherChance
    for rows.Next() {
        var wc WeatherChance
        err := rows.Scan(
            &wc.AreaKey, 
            &wc.WeatherKey, 
            &wc.Chance, 
            &wc.ChanceIndex)
        if err != nil {
            return nil, err
        }
        weatherChances = append(weatherChances, wc)
    }
    if err = rows.Err(); err != nil {
        return nil, err
    }
    return weatherChances, nil
}


// Create DBRepository instance
func NewDBRepository() *DBRepository {
    // Make connection with db
    //dsn := "host=" + os.Getenv("DB_HOST") + " user=" + os.Getenv("DB_USER") + " password=" + os.Getenv("DB_PASSWORD") + " dbname=" + os.Getenv("DB_NAME") + " port=" + os.Getenv("DB_PORT") + " sslmode=disable"
    connStr := "host=" + os.Getenv("DB_HOST") + " user=" + os.Getenv("DB_USER") + " password=" + os.Getenv("DB_PASSWORD") + " dbname=" + os.Getenv("DB_NAME") + " port=" + os.Getenv("DB_PORT") + " sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }
    //defer db.Close()

    return &DBRepository {
		db: db,
	}
}