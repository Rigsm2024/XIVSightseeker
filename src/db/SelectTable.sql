SELECT 
    sl.item_no,
    a.area_name_jp AS area_name,
    sl.coordinate_x,
    sl.coordinate_y,
    sl.in_game_start_time,
    sl.in_game_end_time,
    e.emote_name_jp AS emote_name,
    w1.weather_name_jp AS weather1_name,
    w2.weather_name_jp AS weather2_name,
    d.description_jp AS description
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


