export async function GetCoordinatesFromZipcode(zipcode) 
{
    var locationResults = [];
    
    await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zipcode}&count=1&language=en&format=json`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Invalid response, server error!");
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.results !== undefined && responseData.results.length > 0) {
                responseData.results.foreach((result) => {
                    if (result.country_id === "6252001") { // Only accept locations in the USA
                        const locationResult = {
                            latitude: result.latitude,
                            longitude: result.longitude,
                            elevation: result.elevation,
                            readableName: `${result.admin3}, ${result.admin1}`
                        };
        
                        locationResults.add(locationResult);
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
        
    console.log(coordinateResults);
    return locationResult;
}