const apiKey = '10d11ea1ceda4498aaf122124252406';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `Error: ${data.message}`;
      return;
    }

    const { name, main, weather, sys } = data;
    const temp = main.temp;
    const description = weather[0].description;

    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <p>${description}</p>
      <p>🌡️ ${temp} °C</p>
    `;

    updateBackground(sys.sunrise, sys.sunset);

  } catch (error) {
    resultDiv.innerHTML = 'Failed to fetch weather data.';
    console.error(error);
  }
}

function updateBackground(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  const isDay = now > sunrise && now < sunset;
  document.body.className = isDay ? 'day' : 'night';
}
