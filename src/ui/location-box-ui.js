import {getLocations, getFavorites, addToFavorites, setFavorites, removeLocation, addLocation} from "../domain/location-domain.js";
import { getData, clearData } from "../svc/local-storage-service.js"

// Renders the locations the user selects from the search menu
export function renderLocations(locations) {
    const locationContainer = document.getElementById("locationContainer");
    locationContainer.replaceChildren();
    
    // Add the current location to the location list
    const openOverlay = document.createElement("button");
    openOverlay.addEventListener("click", (event) => {
        addGeoLocation();
    });
    openOverlay.innerText = "Add Current Location";
    openOverlay.id = "openOverlay";
    locationContainer.appendChild(openOverlay);

    // Add a new location to the location list
    const addCurrentLocation = document.createElement("button");
    addCurrentLocation.addEventListener("click", (event) => {
        const searchOverlay = document.getElementById("locationSearchOverlay");
        searchOverlay.style.display = "block";
    });
    addCurrentLocation.innerText = "Add Location";
    addCurrentLocation.id = "openOverlay";
    locationContainer.appendChild(addCurrentLocation);

    locations.forEach((location) => {
        const locationElement = createLocationElement(location);
        locationContainer.appendChild(locationElement);
    });
}

function addGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(makeEntryForLocation);
    }
}

function makeEntryForLocation(position) {
    var location =  {
        id: 0,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        elevation: 0,
        readableName: `Current Location: (${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)})`
    };
    addLocation(location);
    renderLocations(getLocations());
}

export function renderFavorites(favorites) {
    const favoritesContainer = document.getElementById("favoritesContainer");
    favoritesContainer.replaceChildren();
    
    if (favorites.length === 0) {
        const openOverlay = document.createElement("p");
        openOverlay.innerText = "Drag Here to Add To Favorites";
        openOverlay.id = "backgroundText";
        favoritesContainer.appendChild(openOverlay);
    }

    favorites.forEach((location) => {
        const locationElement = createLocationElement(location);
        favoritesContainer.appendChild(locationElement);
    });
}


// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m
function createLocationElement(location) {
    const locationElement = document.createElement("div");
    locationElement.classList.add("locationElement");
    locationElement.setAttribute("draggable", "true");

    locationElement.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/id", location.id);
    });

    const titleElement = document.createElement("div");
    titleElement.classList.add("locationTitle");
    titleElement.innerText = location.readableName;
    titleElement.style.display = "inline-block";
    locationElement.appendChild(titleElement);

    // add removal button here
    const removalButton = document.createElement("div");
    removalButton.addEventListener("click", (event) => {
        removeLocation(location.id);
        renderFavorites(getFavorites());
        renderLocations(getLocations());
    });
    removalButton.setAttribute("title", "remove location");
    removalButton.classList.add("removeLocationButton");
    removalButton.innerText = "×";
    titleElement.appendChild(removalButton);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    locationElement.appendChild(buttonContainer);

    const dailyButtonLink = document.createElement("a");
    dailyButtonLink.setAttribute("href", `./forecasts/dailyForecast.html?latitude=${location.latitude}&longitude=${location.longitude}&name=${location.readableName}`);
    const dailyButton = document.createElement("button");
    dailyButton.innerText = "Daily";
    dailyButton.classList.add("forecastButton");
    dailyButtonLink.appendChild(dailyButton);
    buttonContainer.appendChild(dailyButtonLink);

    const weeklyButtonLink = document.createElement("a");
    weeklyButtonLink.setAttribute("href", `./forecasts/weeklyForecast.html?latitude=${location.latitude}&longitude=${location.longitude}&name=${location.readableName}`);
    const weeklyButton = document.createElement("button");
    weeklyButton.innerText = "Weekly";
    weeklyButton.classList.add("forecastButton");
    weeklyButtonLink.appendChild(weeklyButton);
    buttonContainer.appendChild(weeklyButtonLink);

    const twoWeekButtonLink = document.createElement("a");
    twoWeekButtonLink.setAttribute("href", `./forecasts/twoWeekForecast.html?latitude=${location.latitude}&longitude=${location.longitude}&name=${location.readableName}`);
    const twoWeekButton = document.createElement("button");
    twoWeekButton.innerText = "2 Week";
    twoWeekButton.classList.add("forecastButton");
    twoWeekButtonLink.appendChild(twoWeekButton);
    buttonContainer.appendChild(twoWeekButtonLink);

    return locationElement;
}

function setupFavoritesContainer() {
    const favoritesContainer = document.getElementById("favoritesContainer");

    favoritesContainer.addEventListener("dragover", (event) => {
        event.preventDefault();
        favoritesContainer.classList.add("draggingOverFaves"); // allow hover effects to work over children of container
    });

    favoritesContainer.addEventListener("dragenter", (event) => {
        favoritesContainer.classList.add("draggingOverFaves");
    });

    favoritesContainer.addEventListener("dragleave", (event) => {
        favoritesContainer.classList.remove("draggingOverFaves");
    });

    favoritesContainer.addEventListener("drop", (event) => {
        favoritesContainer.classList.remove("draggingOverFaves");
        const locationId = event.dataTransfer.getData("text/id");
        addToFavorites(locationId);

        const newLocationsList = getLocations();
        renderLocations(newLocationsList);

        const newFavoritesList = getFavorites();
        renderFavorites(newFavoritesList);
    })
}

setupFavoritesContainer();

const localStorageFavorites = getData();
if (localStorageFavorites) {
    setFavorites(localStorageFavorites);
}

renderLocations(getLocations());
renderFavorites(getFavorites());