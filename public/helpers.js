const createVenueHTML = (name, location, iconSource) => {
  const address = location.address ? `<p>${location.address}</p>` : ``;

  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  ${address}
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  const sunriseTime = new Date(currentDay.sys.sunrise * 1000);
  const sunriseHour = sunriseTime.getHours();
  const sunriseMinute = sunriseTime.getMinutes();

  const sunsetTime = new Date(currentDay.sys.sunset * 1000);
  const sunsetHour = sunsetTime.getHours();
  const sunsetMinute = sunsetTime.getMinutes();

  return `<h2>${weekDays[(new Date()).getDay()]}</h2>
  <h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
  <h2>Feels Like: ${kelvinToFahrenheit(currentDay.main.feels_like)}&deg;F</h2>
  <h2>High/Low: ${kelvinToFahrenheit(currentDay.main.temp_max)}&deg;F | ${kelvinToFahrenheit(currentDay.main.temp_min)}&deg;F</h2>
	<h2>Condition: ${currentDay.weather[0].description}</h2>
  <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);