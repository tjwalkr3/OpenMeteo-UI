import {getLocations, getFavorites, addToFavorites, removeLocation} from "../domain/location-domain.js";

// Renders the locations the user selects from the search menu
export function renderLocations(locations) {
    const locationContainer = document.getElementById("locationContainer");
    for (const child of locationContainer.childNodes) {
        if (child.id !== "openOverlay") child.remove();
    }

    locations.forEach((location) => {
        const locationElement = createLocationElement(location);
        locationContainer.appendChild(locationElement);
    });
}

export function renderFavorites(favorites) {
    const favoritesContainer = document.getElementById("favoritesContainer");
    for (const child of favoritesContainer.childNodes) {
        if (child.id !== "backgroundText") child.remove();
    }
    if (favorites.length === 0) {
        document.getElementById("backgroundText").style.display = "default";
    } else {
        document.getElementById("backgroundText").style.display = "none";
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
    locationElement.appendChild(titleElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    locationElement.appendChild(buttonContainer);

    const dailyButtonLink = document.createElement("a");
    dailyButtonLink.setAttribute("href", "./forecasts/dailyForecast.html"); // edit link for template
    const dailyButton = document.createElement("button");
    dailyButton.innerText = "Daily";
    dailyButton.classList.add("forecastButton");
    dailyButtonLink.appendChild(dailyButton);
    buttonContainer.appendChild(dailyButtonLink);

    const weeklyButtonLink = document.createElement("a");
    weeklyButtonLink.setAttribute("href", "./forecasts/weeklyForecast.html"); // edit link for template
    const weeklyButton = document.createElement("button");
    weeklyButton.innerText = "Weekly";
    weeklyButton.classList.add("forecastButton");
    weeklyButtonLink.appendChild(weeklyButton);
    buttonContainer.appendChild(weeklyButtonLink);

    const twoWeekButtonLink = document.createElement("a");
    twoWeekButtonLink.setAttribute("href", "./forecasts/twoWeekForecast.html"); // edit link for template
    const twoWeekButton = document.createElement("button");
    twoWeekButton.innerText = "2 Week";
    twoWeekButton.classList.add("forecastButton");
    twoWeekButtonLink.appendChild(twoWeekButton);
    buttonContainer.appendChild(twoWeekButtonLink);

    // add removal button here

    return locationElement;
}

function setupFavoritesContainer() {
    const favoritesContainer = document.getElementById("favoritesContainer");

    favoritesContainer.addEventListener("dragover", (event) => {
        event.preventDefault();
        //cartElement.classList.add("draggingOverCart"); // allow hover effects to work over children of container
    });

    favoritesContainer.addEventListener("dragenter", (event) => {
        //cartElement.classList.add("draggingOverCart");
    });

    favoritesContainer.addEventListener("dragleave", (event) => {
        //cartElement.classList.remove("draggingOverCart");
    });

    favoritesContainer.addEventListener("drop", (event) => {
        console.log(getLocations());
        console.log(getFavorites());

        const locationId = event.dataTransfer.getData("text/id");
        addToFavorites(locationId);

        const newLocationsList = getLocations();
        renderLocations(newLocationsList);

        const newFavoritesList = getFavorites();
        renderFavorites(newFavoritesList);

        console.log(getLocations());
        console.log(getFavorites());
        console.log(locationId);
    })
}

setupFavoritesContainer();