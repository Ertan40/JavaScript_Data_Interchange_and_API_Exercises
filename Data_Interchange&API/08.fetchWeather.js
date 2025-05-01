async function fetchWebPage() {
  const cityName = "London";
  const API_KEY = "your_api_key";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(URL, { timeout: 10000 });
    if (!response.ok) {
      console.log(`HTTP error. Status code: ${response.status}`);
      return;
    }
    const data = await response.json();
    const processedData = processData(data);
    console.log(processedData);
  } catch (error) {
    console.error(`An error occured due to ${error}`);
  }
}
function processData(data) {
  const { coord, weather, main, sys, name } = data;
  return {
    lon: coord.lon,
    lat: coord.lat,
    main: weather[0].main,
    description: weather[0].description,
    temp: main.temp,
    feels_like: main.feels_like,
    temp_min: main.temp_min,
    temp_max: main.temp_max,
    humidity: main.humidity,
    country: sys.country,
    city: name,
  };
}

fetchWebPage();
