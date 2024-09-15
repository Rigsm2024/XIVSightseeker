fetch("http://localhost:8080/WeatherReports")
    .then(r => r.json())
    .then(json => {
        const data = json.map(elem => ({
            key: elem.AreaKey,
            str: elem.Forecasts.map(f => f.WeatherKey).join(", ")
        }));

        console.log(data)
    });
