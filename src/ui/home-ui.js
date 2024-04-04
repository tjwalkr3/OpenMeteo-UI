// UI logic for rendering data from OpenMeteo API requests
import { homeLayout } from "./home-cards.js";

function RenderHome() {
    const homeContainer = document.getElementById("homeContainer");

    homeLayout.forEach((cardData) => {
        const currentCard = RenderCard(cardData);
        homeContainer.appendChild(currentCard);
    });
}

function RenderCard(cardData) {
    const card = document.createElement("a");
    card.setAttribute("href", cardData.link);

    const cardContainer = document.createElement("div");
    cardElement.classList.add("weatherCard");
    card.appendChild(cardContainer);

    const image = document.createElement("img");
    image.setAttribute("src", cardData.image);
    cardContainer.appendChild(image);

    const title = document.createElement("h3");
    title.innerText = cardData.title;
    cardContainer.appendChild(title);

    return card;
}

RenderHome();