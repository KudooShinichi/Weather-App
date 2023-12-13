const APIkey = "b93909b506f26c3b193af13aca93b045";

const weatherDataEl = document.getElementById("weather-data");
const CityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const CityValue=CityInputEl.value;
  console.log(CityValue);
  getWeatherData(CityValue);

});
async function getWeatherData(CityValue){
    try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CityValue}&appid=${APIkey}&units=metric`
    );
    
    if(!response.ok){
        throw new Error("Network response  was not ok")
        }
        const data=await response.json();
        console.log(data)
        
        const temperature=Math.round(data.main.temp)
        
        const description=data.weather[0].description

        const icon=data.weather[0].icon
        console.log(icon)
        
        const details = [
          `Feels like: ${data.main.feels_like}`,
          `Humidity: ${data.main.humidity}%`,
          `Wind Speed: ${data.wind.speed}km/hr`
        ];
        
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(
          "#temperature"
        ).textContent = `${temperature}°C`;
        weatherDataEl.querySelector(
          "#description"
        ).textContent = `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map(
          (details) =>
            `<div>${details}</div>`
        ).join("")
    }
    catch(error){}
}