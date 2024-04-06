// UI logic for rendering data from OpenMeteo API requests
import { homeLayout } from "./home-cards.js";

function RenderHome() {
    const homeContainer = document.getElementById("homeContainer");

    homeLayout.forEach((cardData) => {
        const currentCard = RenderCard(cardData);
        console.log(homeContainer);
        homeContainer.appendChild(currentCard);
    });
}

function RenderCard(cardData) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("weatherCard");
    cardContainer.addEventListener("click", (event) => {
        window.location = cardData.link; // tack parameters onto the end of this string from location picker ?location=place
    });

    const image = document.createElement("img");
    image.setAttribute("src", cardData.image);
    cardContainer.appendChild(image);

    const title = document.createElement("h3");
    title.innerText = cardData.title;
    cardContainer.appendChild(title);

    return cardContainer;
}

RenderHome();