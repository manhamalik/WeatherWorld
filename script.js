const apiKey = '54825d8752794e399d5ce5b3ee20f06b'; // openweathermap API key

const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const weatherInfoContainer = document.querySelector('.weather-info');

// Hide the weather-info container by default
weatherInfoContainer.style.display = 'none';

searchButton.addEventListener('click', () => {
    const location = locationInput.value;

    if (location) {
        // Make an AJAX request to the weather API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=54825d8752794e399d5ce5b3ee20f06b`)
            .then((response) => response.json())
            .then((data) => {
                // Handle and display weather data here
                console.log(data);
                const temperatureInKelvin = data.main.temp;
                const temperatureInCelsius = (temperatureInKelvin - 273.15).toFixed(2); // Convert and round to 2 decimal places
                const description = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize the first letter of each word

                // Extract city and country
                const cityName = data.name;
                const countryName = data.sys.country;

                // Create a new element to display weather data and location
                const weatherData = document.createElement('div');
                weatherData.innerHTML = `<h2>Weather Information</h2><p>Location: ${cityName}, ${countryName}</p><p>Temperature: ${temperatureInCelsius}°C</p><p>Condition: ${description}</p>`;

                // Append the weather data to the container
                weatherInfoContainer.innerHTML = ''; // Clear previous content
                weatherInfoContainer.appendChild(weatherData);

                // Show the weather-info container
                weatherInfoContainer.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                // Create a new element for the error message
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Failed to retrieve weather data. Please try again later.';
                // Replace the existing content with the error message
                weatherInfoContainer.innerHTML = `<h2>Weather Information</h2>`;
                weatherInfoContainer.appendChild(errorMessage);

                // Show the weather-info container
                weatherInfoContainer.style.display = 'block';
            });
    } else {
        // Create a new element for the "Please enter a location" message
        const locationMessage = document.createElement('p');
        locationMessage.textContent = 'Please enter a location.';
        // Replace the existing content with the message
        weatherInfoContainer.innerHTML = `<h2>Weather Information</h2>`;
        weatherInfoContainer.appendChild(locationMessage);

        // Show the weather-info container
        weatherInfoContainer.style.display = 'block';
    }
});
