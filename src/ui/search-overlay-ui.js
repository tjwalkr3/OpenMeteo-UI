import { SearchLocation } from "../svc/location-query.js"; 

function setupOpenButton() {
    const openButton = document.getElementById("openOverlay");

    openButton.addEventListener("click", (event) => {
        const searchOverlay = document.getElementById("locationSearchOverlay");
        searchOverlay.style.display = "block";
    });
}

function setupCloseButton() {
    const closeButton = document.getElementById("closeOverlay");

    closeButton.addEventListener("click", (event) => {
        const searchOverlay = document.getElementById("locationSearchOverlay");
        searchOverlay.style.display = "none";
        document.getElementById("searchResults").replaceChildren();
        document.getElementById("location").value = "";
    });
}

function setupLocationForm() {
    const locationForm = document.getElementById("locationForm");
    locationForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const locationField = document.getElementById("location");
        const possibleLocations = (await SearchLocation(locationField.value, 100));
        RenderLocations(possibleLocations);
    });
}

// print error result if the list is empty
function RenderLocations(possibleLocations) {
    const searchResultList = document.getElementById("searchResults");
    searchResultList.replaceChildren();

    if (searchResultList.length === 0) {
        const errorItem = document.createElement("div");
        errorItem.innerText = "No Locations found!";
        errorItem.classList.add(errorText);
        searchResultList.appendChild(errorItem);
    } else {
        possibleLocations.forEach((location) => {
            const locationItem = document.createElement("div");
            locationItem.innerText = location.readableName;
            locationItem.setAttribute("data-id", location.id);
            locationItem.classList.add("searchItem");
            searchResultList.appendChild(locationItem);
        });
    }
}

setupOpenButton();
setupCloseButton();
setupLocationForm();