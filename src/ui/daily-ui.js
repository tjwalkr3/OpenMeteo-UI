import { getDailyWeatherData } from "../svc/weather-data-service.js";

async function renderDailyForecast() {
    const imageContainer = document.getElementById("imageContainer");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const latitude = urlParams.get("latitude");
    const longitude = urlParams.get("longitude");
    const name = urlParams.get("name");

    const temperatureData = await getDailyWeatherData(latitude, longitude, "temperature_2m", 1);
    console.log(temperatureData);
    const tempImageElement = getQuickChartImage(temperatureData.times, temperatureData.data, "Temperature (°F)", `Daily Temperature in ${name}`, 700, 300);
    imageContainer.appendChild(tempImageElement);

    const windData = await getDailyWeatherData(latitude, longitude, "wind_speed_10m", 1);
    console.log(windData);
    const windImageElement = getQuickChartImage(windData.times, windData.data, "Wind Speed (mph)", `Daily Wind Speed in${name}`, 700, 300);
    imageContainer.appendChild(windImageElement);

    const humidityData = await getDailyWeatherData(latitude, longitude, "relative_humidity_2m", 1);
    console.log(humidityData);
    const humidityElement = getQuickChartImage(humidityData.times, humidityData.data, "Humidity (%)", `Daily Humidity in ${name}`, 700, 300);
    imageContainer.appendChild(humidityElement);
}

function getQuickChartImage(timeValues, dataValues, metricName, chartTitle, width, height) {
    const chartData = {
        type: 'line',
        data: {
            labels: timeValues,
            datasets: [{
                label: metricName,
                data: dataValues,
                fill: false,
                borderColor: 'blue'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 15
                    },
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 15
                    }
                }]
            },
            title: {
                display: true,
                text: chartTitle,
                fontSize: 23
            },
            layout: {
                padding: 20
            }
        }
    }

    const chartConfigURIComponent = encodeURIComponent(JSON.stringify(chartData));
    const quickChartURL = `https://quickchart.io/chart?bkg=%23eeeeee&w=${width}&h=${height}&v=2.9.4&c=${chartConfigURIComponent}`;

    const chartImage = document.createElement("img");
    chartImage.setAttribute("src", quickChartURL);
    chartImage.setAttribute("alt", chartTitle);

    return chartImage;
}

function renderHeader() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get("name");

    const date = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const weatherHeader = document.getElementById("weatherHeader");
    weatherHeader.innerText = `Daily Forecast\n${name} - ${date.toLocaleDateString('en-US', options)}`;
}

renderHeader();
renderDailyForecast();