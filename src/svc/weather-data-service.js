export async function getDailyWeatherData(latitude, longitude, metricName, timePeriod) {
    var weatherResults;
    
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${metricName}&timezone=auto&forecast_days=${timePeriod}&temperature_unit=fahrenheit`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Invalid response, server error!");
            }
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            if (responseData.hourly.time !== undefined && responseData.hourly[metricName] !== undefined) {
                const times = [];
                responseData.hourly.time.forEach((timeString) => {
                    times.push(changeTimeFormat(timeString));
                });

                weatherResults = {
                    times,
                    data: responseData.hourly[metricName]
                }
            }
        })
        .catch(e => {
            var exmsg = "";
            if (e.message) exmsg += e.message;
            if (e.stack) exmsg += ' | stack: ' + e.stack;
            console.log(exmsg);
        });
        
    console.log(weatherResults);
    return weatherResults;
}

export async function getWeekWeatherData(latitude, longitude, metricName, timePeriod) {
    var weatherResults;
    
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${metricName}&timezone=auto&forecast_days=${timePeriod}&temperature_unit=fahrenheit`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Invalid response, server error!");
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.daily.time !== undefined && responseData.daily[metricName] !== undefined) {
                weatherResults = {
                    times: responseData.daily.time,
                    data: responseData.daily[metricName]
                }
            }
        })
        .catch(e => {
            var exmsg = "";
            if (e.message) exmsg += e.message;
            if (e.stack) exmsg += ' | stack: ' + e.stack;
            console.log(exmsg);
        });
        
    return weatherResults;
}

function changeTimeFormat(ISOString) {
    let date = new Date(ISOString);
    let AmPmString = date.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return AmPmString;
}
