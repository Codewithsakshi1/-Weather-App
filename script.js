
const API_KEY = "const API_KEY = "YOUR_WEATHERAPI_KEY";";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weatherResult");

// Search weather when button is clicked
searchBtn.addEventListener("click", getWeather);

// Search weather when Enter is pressed
cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    // Check empty input
    if (city === "") {
        message.textContent = "Please enter a city name!";
        weatherResult.classList.add("hidden");
        return;
    }

    try {

        // Show loading message
        searchBtn.disabled = true;
        searchBtn.textContent = "Loading...";
        message.textContent = "Getting weather information...";

        // API URL
        const url = new URL(
            "https://api.weatherapi.com/v1/current.json"
        );

        url.search = new URLSearchParams({
            key: API_KEY,
            q: city
        }).toString();

        // Fetch weather data
        const response = await fetch(url);

        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Unable to get weather data."
            );
        }

        // Display weather information
        document.getElementById("cityName").textContent =
            data.location.name;

        document.getElementById("countryName").textContent =
            data.location.country;

        document.getElementById("localTime").textContent =
            "Local Time: " + data.location.localtime;

        document.getElementById("temperature").textContent =
            Math.round(data.current.temp_c);

        document.getElementById("weatherCondition").textContent =
            data.current.condition.text;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("feelsLike").textContent =
            data.current.feelslike_c + "°C";

        document.getElementById("humidity").textContent =
            data.current.humidity + "%";

        document.getElementById("windSpeed").textContent =
            data.current.wind_kph + " km/h";

        document.getElementById("uvIndex").textContent =
            data.current.uv;

        document.getElementById("lastUpdated").textContent =
            "Last Updated: " + data.current.last_updated;

        // Show weather card
        weatherResult.classList.remove("hidden");

        message.textContent = "";

    } catch (error) {

        message.textContent = error.message;
        weatherResult.classList.add("hidden");

        console.error("Weather API Error:", error);

    } finally {

        searchBtn.disabled = false;
        searchBtn.textContent = "Search";

    }
}
