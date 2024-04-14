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
    });
}

function setupLocationForm() {
    const locationForm = document.getElementById("locationForm");
    locationForm.addEventListener("submit", (event) => {
        event.preventDefault();

    });
}

setupOpenButton();
setupCloseButton();
setupLocationForm();