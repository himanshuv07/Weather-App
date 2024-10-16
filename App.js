let searchBtn = document.querySelector(".btn");
let l = document.querySelector("#location");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Uncomment to prevent form submission if necessary
    if (l.value != "" && l.value != null) fetchWeatherData(l.value);
});

async function fetchWeatherData(cityName) {
    try {
        let apiKey = "1b823ac89e652903894b1766ad8fa07c"; // Replace with your API key
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        let finalData = await data.json();
        
        let displayData = document.querySelector(".display-data");
        let displayTemp = document.querySelector(".display-temp");
        let displayLocation = document.querySelector(".display-location");
        let displaySpeed = document.querySelector(".display-speed");
        let displayHumidity = document.querySelector(".display-humidity");
        let icon = document.querySelector(".icon");

        if (finalData.cod == "404") {
            let asideDataDisappear = document.querySelectorAll(".inactive");
            asideDataDisappear.forEach(v => {
                v.style.display = "none";
            });
            displayData.innerHTML = "Location is not valid. Please enter a valid location.";
            displayData.style.color = "red";
        } else {
            console.log(finalData);
            let { name, main, wind, weather } = finalData;
            displayTemp.innerHTML = parseInt(main.temp - 273.15) + "°C";
            displayLocation.innerHTML = name;
            displaySpeed.innerHTML = wind.speed + " km/hr";
            displayHumidity.innerHTML = main.humidity + "%";
            icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        }
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}
