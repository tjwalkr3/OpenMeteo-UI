export function storeData(favoriteLocations) {
    const favoriteLocationsJSON = JSON.stringify(favoriteLocations);
    localStorage.setItem("favoriteLocations", favoriteLocationsJSON);
}

export function getData() {
    const favoriteLocationsJSON = localStorage.getItem("favoriteLocations");
    return JSON.parse(favoriteLocationsJSON);
}

export function clearData() {
    localStorage.clear();
}