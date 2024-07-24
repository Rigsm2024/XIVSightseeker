CREATE TABLE areas (
    area_id SERIAL PRIMARY KEY,
    area_key VARCHAR(50) NOT NULL,
    area_name_jp VARCHAR(100) NOT NULL,
    area_name_en VARCHAR(100) NOT NULL,
    area_image_url VARCHAR(255) NOT NULL
);

CREATE TABLE weather (
    weather_id SERIAL PRIMARY KEY,
    weather_key VARCHAR(50) NOT NULL,
    weather_name_jp VARCHAR(50) NOT NULL,
    weather_name_en VARCHAR(50) NOT NULL
);

CREATE TABLE emotes (
    emote_id SERIAL PRIMARY KEY,
    emote_name_jp VARCHAR(50) NOT NULL,
    emote_name_en VARCHAR(50) NOT NULL,
    emote_icon_url VARCHAR(255) NOT NULL
);

CREATE TABLE sightseeing_log_descriptions (
    description_id SERIAL PRIMARY KEY,
    description_jp TEXT NOT NULL,
    description_en TEXT NOT NULL
);

CREATE TABLE sightseeing_logs (
    item_no SERIAL PRIMARY KEY,
    area_id INTEGER REFERENCES areas(area_id),
    coordinate_x FLOAT NOT NULL,
    coordinate_y FLOAT NOT NULL,
    in_game_start_time TIMESTAMP NOT NULL,
    in_game_end_time TIMESTAMP NOT NULL,
    emote_id INTEGER REFERENCES emotes(emote_id),
    weather1_id INTEGER REFERENCES weather(weather_id),
    weather2_id INTEGER REFERENCES weather(weather_id),
    description_id INTEGER REFERENCES sightseeing_log_descriptions(description_id)
);

CREATE TABLE weather_chances (
    chance_id SERIAL PRIMARY KEY,
    area_id INTEGER REFERENCES areas(area_id),
    weather_id INTEGER REFERENCES weather(weather_id),
    chance INTEGER,
    chanace_index INTEGER
);