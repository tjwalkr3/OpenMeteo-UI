// Domain for processing OpenMeteo API Requests
//import { } from "../svc/openmeteo-svc.js";
var locations = [];

export function getLocations() {
    return locations;
}

export function addLocation(location) {
    locations.push(location);
}