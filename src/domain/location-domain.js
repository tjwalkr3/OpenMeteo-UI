// Domain for processing OpenMeteo API Requests
var locations = [];
var favorites = [];

export function getLocations() {
    return locations;
}

export function getFavorites() {
    return favorites;
}

export function addLocation(location) {
    locations.push(location);
}

export function addToFavorites(locationId) {
    if (typeof locationId !== "number") {
        locationId = Number(locationId);
    }
    const foundLocation = locations.find((location) => location.id === locationId);
    if (foundLocation) {
        favorites.push(foundLocation);
        locations = locations.filter((location) => location.id !== locationId);
    }
}

// use for delete button
export function removeLocation(id, isLocation) {
    if (isLocation) {
        locations = locations.filter((location) => location.id !== id);
    } else {
        favorites = favorites.filter((location) => location.id !== id);
    }
}

