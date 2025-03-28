# Weather Dashboard

A simple and interactive weather dashboard that allows users to search for weather information based on city names. The dashboard displays the current weather, a 5-day forecast, and offers features like switching between Celsius and Fahrenheit, saving favorite cities, and viewing recent search history.

## Features

- **Search Weather by City**: Enter a city name to get the current weather details.
- **5-Day Weather Forecast**: View a forecast for the next 5 days, showing temperature, wind speed, and humidity.
- **Toggle Units**: Switch between Celsius and Fahrenheit for temperature units.
- **Favorites**: Save frequently searched cities for easy access.
- **Search History**: View the most recent cities you've searched for.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   
2. Open the project folder in your preferred code editor.

3. Open index.html in a browser to start using the weather dashboard.

Usage

Search: Enter a city name in the input box and click the Search button.

Toggle Temperature Units: Click the Switch to °F or Switch to °C button to change the temperature units between Celsius and Fahrenheit.

Favorites: Click the ★ button next to a city in the search history to add it to your favorites list.

Recent Searches: Click on any city in your search history to re-fetch the weather details.

Technologies Used

HTML: For the page structure and content.

CSS: For styling and layout.

JavaScript: For functionality, including:

jQuery: Simplifies DOM manipulation and AJAX requests.

Axios: Used to make HTTP requests to the OpenWeatherMap API.

Lodash: Provides utility functions such as debouncing for handling search input.

[OpenWeatherMap API](https://openweathermap.org/api): Provides the weather data.

How It Works
The user inputs a city name in the search box and clicks the Search button.

The app makes an API call to OpenWeatherMap using Axios to fetch current weather data for the given city.

It also fetches a 5-day forecast by calling the API's forecast endpoint.

The data is then displayed, showing the current temperature, wind speed, humidity, and a 5-day forecast.

The user can toggle between Celsius and Fahrenheit units, which re-fetches the weather data in the selected unit.

Cities are saved in the local storage, allowing users to see recent searches and favorite cities.

API Key
You need an OpenWeatherMap API key to fetch weather data. Sign up for an API key at OpenWeatherMap.

Replace "YOUR_OPENWEATHERMAP_API_KEY" in script.js with your own API key.
(You can get your API key from OpenWeatherApp by Signing up)

File Structure
bash
Copy
Edit
/weather-dashboard
│── index.html       # UI Layout
│── style.css        # Basic Styling
│── script.js        # JavaScript Logic (jQuery, Axios, Lodash)
