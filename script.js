$(document).ready(function () {
    const apiKey = "34696306f4b684857ef5a4c3659b3c23"; // Replace with your OpenWeatherMap API key
    const weatherInfo = $("#weatherInfo");
    const searchHistoryEl = $("#searchHistory");
    const favoritesSection = $("#favoritesSection");

    let isCelsius = true; // Start with Celsius
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Load search history and favorites from localStorage
    updateSearchHistory();
    displayFavorites();

    // Debounced function to fetch weather data
    const fetchWeather = _.debounce(async (city, units = "metric") => {
        if (!city) return;

        try {
            // Fetch current weather
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
            const data = response.data;

            // Fetch 5-day forecast
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`);
            const forecastData = forecastResponse.data.list.filter((item, index) => index % 8 === 0); // Take one forecast per day

            // Display current weather info
            weatherInfo.html(`
                <h2>${data.name}</h2>
                <p>🌡 Temperature: ${data.main.temp}°${isCelsius ? 'C' : 'F'}</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `);

            // Display 5-day forecast horizontally
            let forecastHtml = `<h3>5-day Forecast:</h3><div class="forecast-container">`;
            forecastData.forEach((forecast) => {
                forecastHtml += `
                    <div class="forecast-item">
                        <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
                        <p>🌡 Temp: ${forecast.main.temp}°${isCelsius ? 'C' : 'F'}</p>
                        <p>💨 Wind: ${forecast.wind.speed} m/s</p>
                        <p>💧 Humidity: ${forecast.main.humidity}%</p>
                    </div>
                `;
            });
            forecastHtml += `</div>`;
            weatherInfo.append(forecastHtml);


            // Store the city in search history
            if (!searchHistory.includes(city)) {
                searchHistory.push(city);
                if (searchHistory.length > 5) searchHistory.shift(); // Keep only last 5
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                updateSearchHistory();
            }

        } catch (error) {
            weatherInfo.html("<p style='color:red;'>City not found. Try again.</p>");
        }
    }, 500);

    // Event Listener for Search Button
    $("#searchBtn").click(() => {
        const city = $("#cityInput").val().trim();
        fetchWeather(city, isCelsius ? "metric" : "imperial");
    });

    // Click on a history item to re-fetch weather
    searchHistoryEl.on("click", "li", function () {
        fetchWeather($(this).text(), isCelsius ? "metric" : "imperial");
    });

    // Event Listener for Toggle Units Button
    $("#toggleUnitsBtn").click(() => {
        isCelsius = !isCelsius;
        const units = isCelsius ? "metric" : "imperial";
        $("#toggleUnitsBtn").text(isCelsius ? "Switch to °F" : "Switch to °C");

        // Refetch the weather info with the selected units
        const city = $("#cityInput").val().trim();
        fetchWeather(city, units);
    });

    // Add a city to the favorites list
    searchHistoryEl.on("click", ".favoriteBtn", function() {
        const city = $(this).parent().text().trim();
        addToFavorites(city);
    });

    // Function to add a city to the favorites
    function addToFavorites(city) {
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            displayFavorites();
        }
    }

    // Display favorites list
    function displayFavorites() {
        let favoritesHtml = "<h3>Favorites:</h3><ul>";
        favorites.forEach(city => {
            favoritesHtml += `
                <li>
                    ${city} <button class="favoriteBtn">★</button>
                </li>
            `;
        });
        favoritesHtml += "</ul>";
        favoritesSection.html(favoritesHtml);
    }

    // Update search history UI
    function updateSearchHistory() {
        searchHistoryEl.html("");
        searchHistory.forEach(city => {
            searchHistoryEl.append(`
                <li>
                    ${city} <button class="favoriteBtn">★</button>
                </li>
            `);
        });
    }

});
