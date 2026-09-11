async function getWeather() {

    let city = document.getElementById("city").value;

    // Get latitude and longitude
    let geoURL =
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    let response = await fetch(geoURL);
    let data = await response.json();

    let lat = data.results[0].latitude;
    let lon = data.results[0].longitude;

    // Get today's + next 5 days weather
    let weatherURL =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m` +
    `&daily=temperature_2m_max,relative_humidity_2m_mean,wind_speed_10m_max` +
    `&forecast_days=6&timezone=auto`;

    let res = await fetch(weatherURL);
    let weather = await res.json();

    // Today's weather
    document.getElementById("location").innerHTML = city;

    document.getElementById("temp").innerHTML =
        "Temperature: " + weather.current.temperature_2m + " °C";

    document.getElementById("humidity").innerHTML =
        "Humidity: " + weather.current.relative_humidity_2m + " %";

    document.getElementById("wind").innerHTML =
        "Wind: " + weather.current.wind_speed_10m + " km/h";


    // Next 5 days
    let forecast = document.getElementById("forecast");

    forecast.innerHTML = "";

    for (let i = 1; i <= 5; i++) {

        forecast.innerHTML += `
            <div class="card">

                <b>${weather.daily.time[i]}</b>

                <p>
                    Temperature:
                    ${weather.daily.temperature_2m_max[i]} °C
                </p>

                <p>
                    Humidity:
                    ${weather.daily.relative_humidity_2m_mean[i]} %
                </p>

                <p>
                    Wind:
                    ${weather.daily.wind_speed_10m_max[i]} km/h
                </p>

            </div>
        `;
    }
}