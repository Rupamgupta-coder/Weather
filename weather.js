const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
 async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  }
  function updateUI(data) {
    const weather = data.weather[0];
    const weatherId = weather.id;
    const mainWeather = weather.main;
    switch (true) {
      case weatherId >= 200 && weatherId < 300: // Thunderstorm
          document.body.classList.add('thunderstorm');
          break;
      case weatherId >= 300 && weatherId < 400: // Drizzle
          document.body.classList.add('rainy');
          break;
      case weatherId >= 500 && weatherId < 600: // Rain
          document.body.classList.add('rainy');
          break;
      case weatherId >= 600 && weatherId < 700: // Snow
          document.body.classList.add('snowy');
          break;
      case weatherId >= 800 && weatherId < 900: // Clear/Cloudy
          if (mainWeather === 'Clear') {
              document.body.classList.add('sunny');
          } else {
              document.body.classList.add('cloudy');
          }
          break;
      default:
          document.body.classList.add('cloudy');
  }
}
  
   
