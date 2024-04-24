import { searchLocation } from "../svc/location-query.js";
import { getLocations, addLocation } from "../domain/location-domain.js";
import { renderLocations } from "./location-box-ui.js";

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
        const possibleLocations = (await searchLocation(locationField.value, 100));
        renderLocationResults(possibleLocations);
    });
}

// print error result if the list is empty
function renderLocationResults(possibleLocations) {
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
            locationItem.addEventListener("click", (event) => {
                // add the location to the list to be rendered
                addLocation(location);
                const locations = getLocations();
                renderLocations(locations);

                // close the search overlay
                const searchOverlay = document.getElementById("locationSearchOverlay");
                searchOverlay.style.display = "none";
                document.getElementById("searchResults").replaceChildren();
                document.getElementById("location").value = "";
            });

            locationItem.innerText = location.readableName;
            locationItem.setAttribute("data-id", location.id);
            locationItem.classList.add("searchItem");
            searchResultList.appendChild(locationItem);
        });
    }
}

setupCloseButton();
setupLocationForm();