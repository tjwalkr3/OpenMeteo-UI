export async function searchLocation(locationString, numOfResults) 
{
    var locationResults = [];
    
    await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationString}&count=${numOfResults}&language=en&format=json`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Invalid response, server error!");
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.results !== undefined && responseData.results.length > 0) {
                responseData.results.forEach((result) => {
                    if (result.country_code === "US") { // Only accept locations in the USA
                        const locationResult = {
                            id: result.id,
                            latitude: result.latitude,
                            longitude: result.longitude,
                            elevation: result.elevation,
                            readableName: `${result.name}, ${result.admin1}`
                        };
                        if (!locationResults.some((location) => location.readableName === locationResult.readableName)) { // filter for duplicate locations
                            locationResults.push(locationResult);
                        }
                    }
                });
            }
        })
        .catch(e => {
            var exmsg = "";
            if (e.message) exmsg += e.message;
            if (e.stack) exmsg += ' | stack: ' + e.stack;
            console.log(exmsg);
        });
        
    console.log(locationResults);
    return locationResults;
}