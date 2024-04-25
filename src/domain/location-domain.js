import { storeData } from "../svc/local-storage-service.js"

// Domain for processing OpenMeteo API Requests
var locations = [];
var favorites = [];

export function getLocations() {
    return locations;
}

export function setFavorites(newFavorites) {
    favorites = newFavorites;
}

export function getFavorites() {
    return favorites;
}

export function addLocation(newLocation) {
    if (!locations.find((location) => location.id === newLocation.id) && !favorites.find((location) => location.id === newLocation.id)) {
        locations.push(newLocation);
    } else {
        console.log("location already selected");
    }
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
    storeData(favorites);
}

// use for delete button
export function removeLocation(id) {
    locations = locations.filter((location) => location.id !== id);
    favorites = favorites.filter((location) => location.id !== id);
    storeData(favorites);
}

