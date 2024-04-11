export async function GetCoordinatesFromZipcode(zipcode) 
{
    var coordinateResult = null;

    var postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
    if (!postalCodeRegex.test(zipcode)) {
        throw new Error("Invalid zipcode, incorrect format!");
    }
    
    await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zipcode}&count=1&language=en&format=json`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Invalid zipcode, server error code!");
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.results === undefined) {
                throw new Error("Invalid zipcode, empty response!");
            }

            const latitude = responseData.results[0].latitude;
            const longitude = responseData.results[0].longitude;
            const elevation = responseData.results[0].elevation;

            coordinateResult = {
                latitude,
                longitude,
                elevation
            };
            console.log(coordinateResult);
        })
        .catch(e => {
            var exmsg = "";
            if (e.message) exmsg += e.message;
            if (e.stack) exmsg += ' | stack: ' + e.stack;
            console.log(exmsg);
        });

    return coordinateResult;
}