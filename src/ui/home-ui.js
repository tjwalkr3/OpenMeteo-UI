// UI logic for rendering data from OpenMeteo API requests
const homeLayout = [
    {
        title: "Daily Forecast",
        image: "./images/one-day.png",
        link: "./forecasts/dailyForecast.html"
    },
    {
        title: "Weekly Forecast",
        image: "./images/one-week.png",
        link: "./forecasts/weeklyForecast.html"
    },
    {
        title: "Next Two Weeks",
        image: "./images/two-weeks.png",
        link: "./forecasts/twoWeekForecast.html"
    }
];

function renderHome() {
    const homeContainer = document.getElementById("homeContainer");

    homeLayout.forEach((cardData) => {
        const currentCard = renderCard(cardData);
        homeContainer.appendChild(currentCard);
    });
}

function renderCard(cardData) {
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

renderHome();