INSERT INTO areas (area_id, area_key, area_name_jp, area_name_en, area_image_url)
VALUES
    (1, 'limsaLominsa', 'リムサ・ロミンサ', 'Limsa Lominsa', ''),
    (2, 'middleLaNoscea', '中央ラノシア', 'Middle La Noscea', ''),
    (3, 'lowerLaNoscea', '低地ラノシア', 'Lower La Noscea', ''),
    (4, 'easternLaNoscea', '東ラノシア', 'Eastern La Noscea', ''),
    (5, 'westernLaNoscea', '西ラノシア', 'Western La Noscea', ''),
    (6, 'upperLaNoscea', '高地ラノシア', 'Upper La Noscea', ''),
    (7, 'outerLaNoscea', '外地ラノシア', 'Outer La Noscea', ''),
    (8, 'wolvesDenPier', 'ウルヴズジェイル', 'Wolves'' Den Pier', ''),
    (9, 'mist', 'ミスト・ヴィレッジ', 'Mist', ''),
    (10, 'gridania', 'グリダニア', 'Gridania', ''),
    (11, 'centralShroud', '黒衣森：中央森林', 'Central Shroud', ''),
    (12, 'eastShroud', '黒衣森：東部森林', 'East Shroud', ''),
    (13, 'southShroud', '黒衣森：南部森林', 'South Shroud', ''),
    (14, 'northShroud', '黒衣森：北部森林', 'North Shroud', ''),
    (15, 'theLavenderBeds', 'ラベンダーベッド', 'The Lavender Beds', ''),
    (16, 'uldah', 'ウルダハ', 'Ul''dah', ''),
    (17, 'westernThanalan', '西ザナラーン', 'Western Thanalan', ''),
    (18, 'centralThanalan', '中央ザナラーン', 'Central Thanalan', ''),
    (19, 'easternThanalan', '東ザナラーン', 'Eastern Thanalan', ''),
    (20, 'southernThanalan', '南ザナラーン', 'Southern Thanalan', ''),
    (21, 'northernThanalan', '北ザナラーン', 'Northern Thanalan', ''),
    (22, 'theGoblet', 'ゴブレットビューと', 'The Goblet', ''),
    (23, 'morDhona', 'モードゥナ', 'Mor Dhona', ''),
    (24, 'coerthasCentralHighlands', 'クルザス中央高地', 'Coerthas Central Highlands', '')
;

-- Insert data into weather table
INSERT INTO weathers (weather_id, weather_key, weather_name_jp, weather_name_en)
VALUES
    (1, 'clearSkies', '快晴', 'Clear Skies'),
    (2, 'fairSkies', '晴れ', 'Fair Skies'),
    (3, 'heatWaves', '灼熱波', 'Heat Waves'),
    (4, 'clouds', '曇り', 'Clouds'),
    (5, 'rain', '雨', 'Rain'),
    (6, 'showers', '暴雨', 'Showers'),
    (7, 'thunder', '雷', 'Thunder'),
    (8, 'thunderstorms', '雷雨', 'Thunderstorms'),
    (9, 'fog', '霧', 'Fog'),
    (10, 'snow', '雪', 'Snow'),
    (11, 'blizzard', '吹雪', 'Blizzard'),
    (12, 'wind', '風', 'Wind'),
    (13, 'gales', '暴風', 'Gales'),
    (14, 'dustStorms', '砂塵', 'Dust Storms'),
    (15, 'gloom', '妖霧', 'Gloom')
;

-- Insert data into weather_chances table
INSERT INTO weather_chances (area_id, weather_id, chance, chance_index) 
VALUES
    -- Limsa Lominsa
    (1, 4, 20, 1),
    (1, 1, 30, 2),
    (1, 2, 30, 3),
    (1, 9, 10, 4),
    (1, 5, 10, 5),

    -- Middle La Noscea
    (2, 4, 20, 1),
    (2, 1, 30, 2),
    (2, 2, 20, 3),
    (2, 12, 10, 4),
    (2, 9, 10, 5),
    (2, 5, 10, 6),

    -- Lower La Noscea
    (3, 4, 20, 1),
    (3, 1, 30, 2),
    (3, 2, 20, 3),
    (3, 12, 10, 4),
    (3, 9, 10, 5),
    (3, 5, 10, 6),

    -- Eastern La Noscea
    (4, 9, 5, 1),
    (4, 1, 45, 2),
    (4, 2, 30, 3),
    (4, 4, 10, 4),
    (4, 5, 5, 5),
    (4, 6, 5, 6),

    -- Western La Noscea
    (5, 9, 10, 1),
    (5, 1, 30, 2),
    (5, 2, 20, 3),
    (5, 4, 20, 4),
    (5, 12, 10, 5),
    (5, 13, 10, 6),

    -- Upper La Noscea
    (6, 1, 30, 1),
    (6, 2, 20, 2),
    (6, 4, 20, 3),
    (6, 9, 10, 4),
    (6, 7, 10, 5),
    (6, 8, 10, 6),

    -- Outer La Noscea
    (7, 1, 30, 1),
    (7, 2, 20, 2),
    (7, 4, 20, 3),
    (7, 9, 15, 4),
    (7, 5, 15, 5),

    -- Wolves' Den Pier
    (8, 4, 20, 1),
    (8, 1, 30, 2),
    (8, 2, 30, 3),
    (8, 9, 10, 4),
    (8, 8, 10, 5),

    -- Mist
    (9, 4, 20, 1),
    (9, 1, 30, 2),
    (9, 2, 30, 3),
    (9, 9, 10, 4),
    (9, 5, 10, 5),

    -- Gridania
    (10, 5, 20, 1),
    (10, 9, 10, 2),
    (10, 4, 10, 3),
    (10, 2, 15, 4),
    (10, 1, 30, 5),
    (10, 2, 15, 6),

    -- Central Shroud
    (11, 7, 5, 1),
    (11, 5, 15, 2),
    (11, 9, 10, 3),
    (11, 4, 10, 4),
    (11, 2, 15, 5),
    (11, 1, 30, 6),
    (11, 2, 15, 7),

    -- East Shroud
    (12, 7, 5, 1),
    (12, 5, 15, 2),
    (12, 9, 10, 3),
    (12, 4, 10, 4),
    (12, 2, 15, 5),
    (12, 1, 30, 6),
    (12, 2, 15, 7),

    -- South Shroud
    (13, 9, 5, 1),
    (13, 8, 5, 2),
    (13, 7, 15, 3),
    (13, 9, 5, 4),
    (13, 4, 10, 5),
    (13, 2, 30, 6),
    (13, 1, 30, 7),

    -- North Shroud
    (14, 9, 5, 1),
    (14, 6, 5, 2),
    (14, 5, 15, 3),
    (14, 9, 5, 4),
    (14, 4, 10, 5),
    (14, 2, 30, 6),
    (14, 1, 30, 7),

    -- The Lavender Beds
    (15, 4, 5, 1),
    (15, 5, 15, 2),
    (15, 9, 10, 3),
    (15, 4, 10, 4),
    (15, 2, 15, 5),
    (15, 1, 30, 6),
    (15, 2, 15, 7),

    -- Ul'dah
    (16, 1, 40, 1),
    (16, 2, 20, 2),
    (16, 4, 25, 3),
    (16, 9, 10, 4),
    (16, 5, 5, 5),

    -- Western Thanalan
    (17, 1, 40, 1),
    (17, 2, 20, 2),
    (17, 4, 25, 3),
    (17, 9, 10, 4),
    (17, 5, 5, 5),

    -- Central Thanalan
    (18, 15, 15, 1),
    (18, 1, 40, 2),
    (18, 2, 20, 3),
    (18, 4, 10, 4),
    (18, 9, 10, 5),
    (18, 5, 5, 6),

    -- Eastern Thanalan
    (19, 1, 40, 1),
    (19, 2, 20, 2),
    (19, 4, 10, 3),
    (19, 9, 10, 4),
    (19, 5, 5, 5),
    (19, 6, 15, 6),

    -- Southern Thanalan
    (20, 3, 20, 1),
    (20, 1, 40, 2),
    (20, 2, 20, 3),
    (20, 4, 10, 4),
    (20, 9, 10, 5),
    (20, 5, 5, 6),

    -- Northern Thanalan
    (21, 1, 35, 1),
    (21, 2, 20, 2),
    (21, 4, 20, 3),
    (21, 5, 10, 4),
    (21, 9, 10, 5),
    (21, 6, 5, 6)
;

-- Insert data into emotes table
INSERT INTO emotes (emote_id, emote_name_jp, emote_name_en, emote_icon_url)
VALUES
    (1, '見わたす', 'Lookout', ''),
    (2, '祈る', 'Pray', ''),
    (3, '座る', 'Sit', ''),
    (4, '敬礼する', 'Salute', ''),
    (5, 'なぐさめる', 'Comfort', ''),
    (6, '指さす', 'Point', ''),
    (7, '活を入れる', 'Psych', '')
;

-- Insert data into sightseeing_log_descriptions table
INSERT INTO sightseeing_log_descriptions (description_id, description_jp, description_en)
VALUES
    (1, '――ある商人が見た景色。\n眼下を見やれば、そこには赤き帆の軍艦が三隻。海都「リムサ・ロミンサ」の底力を感じた。', 'Description for No.1'),
    (2, '――ある海賊が見た景色。\n酒を飲めば気分は大物。ヤバい奴らの縄張りで、大物気取りで港を一望。翌日、目が覚めたら吊されていた。', 'Description for No.2'),
    (3, '――ある船乗りが見た景色。\n出漁前の俺だけの儀式。朝日届かぬ薄暗い洞穴で、逝った仲間に黙祷する。静かな雨音を、鎮魂歌に代えて。', 'Description for No.3')
;

-- Insert data into sightseeing_logs table
INSERT INTO sightseeing_logs (item_no, area_id, coordinate_x, coordinate_y, in_game_start_hour, in_game_end_hour, emote_id, weather1_id, weather2_id, description_id)
VALUES
    (1, 1, 9.5, 7.8, '08', '12', 1, 1, 2, 1),
    (2, 1, 7.0, 15.1, '18', '05', 1, 1, 2, 2),
    (3, 2, 20.3, 19.1, '05', '08', 2, 5, NULL, 3)
;
