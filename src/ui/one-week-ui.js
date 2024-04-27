import { getWeekWeatherData } from "../svc/weather-data-service.js";

async function renderDailyForecast() {
    const imageContainer = document.getElementById("imageContainer");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const latitude = urlParams.get("latitude");
    const longitude = urlParams.get("longitude");
    const name = urlParams.get("name");

    const temperatureMaxData = await getWeekWeatherData(latitude, longitude, "temperature_2m_max", 7);
    const tempMaxImageElement = getQuickChartImage(temperatureMaxData.times, temperatureMaxData.data, "Max Temperature (°F)", `One Week Max Temperature in ${name}`, 700, 300);
    imageContainer.appendChild(tempMaxImageElement);

    const temperatureMinData = await getWeekWeatherData(latitude, longitude, "temperature_2m_min", 7);
    const temperatureMinImageElement = getQuickChartImage(temperatureMinData.times, temperatureMinData.data, "One Temperature (°F)", `One Week Min Temperature in ${name}`, 700, 300);
    imageContainer.appendChild(temperatureMinImageElement);

    const windData = await getWeekWeatherData(latitude, longitude, "wind_speed_10m_max", 7);
    const windImageElement = getQuickChartImage(windData.times, windData.data, "Max Wind Speed (mph)", `One Week Max Wind Speed in ${name}`, 700, 300);
    imageContainer.appendChild(windImageElement);
}

function getQuickChartImage(timeValues, dataValues, metricName, chartTitle, width, height) {
    const chartData = {
        type: 'bar',
        data: {
            labels: timeValues,
            datasets: [{
                label: metricName,
                data: dataValues
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
    weatherHeader.innerText = `One Week Forecast\n${name} on ${date.toLocaleDateString('en-US', options)}`;
}

renderHeader();
renderDailyForecast();