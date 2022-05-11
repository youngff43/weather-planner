var cityNameInput = document.querySelector("#search-input");
var searchHistoryArray = [];
var searchedList = document.querySelector("#searched-list");
var searchedHistory = document.querySelector("#search-history");
var currentWeather = document.querySelector("#current-weather");
var fiveDayBody = document.querySelector("#five-day-body");
var citySearch = document.querySelector("#city-search");
var fiveDay = document.querySelector("#five-day");
var today = new Date();
var actualCurrentWeather = document.querySelector("#actual-current-weather");
var fiveDayHeader = document.querySelector("#five-day-header");
var currentWeatherCard = document.querySelector("#current-weather-card");

//function to submit form//
var submitForm = function(event) {
    event.preventDefault();
    var cityName = cityNameInput.value.trim();

    //Add city to local storage//
    if (cityName) {
        searchHistoryArray.push(cityName);
        localStorage.setItem("weatherSearch", JSON.stringify(searchHistoryArray));
        var searchHistoryEl = document.createElement('button');
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("data-city", cityName)
        searchHistoryEl.innerHTML = cityName;
        searchedList.appendChild(searchHistoryEl);
        searchedHistory.removeAttribute("style")
        getWeatherInfo(cityName);
        cityNameInput.value = " ";
        searchHistoryEl.onclick = buttonClickHandler;
    }
    else {
        alert("Please enter a valid City's Name");
    }
}

//function to get weather from OpenWeather API//
var getWeatherInfo = function (cityName) {
    var apiOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ba2aa9d96d00d0af91f1a943d7132459";
    fetch (
        apiOpenWeather
    )
    .then(function (cityResponse) {
        return cityResponse.json();
    })
    //variables to be placed in the weather format//
    .then(function(cityResponse) {
        console.log(cityResponse)
        var latitude = cityResponse.coord.lat;
        var longitude = cityResponse.coord.lon;
        var city = cityResponse.name;
        var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        var weatherIcon = cityResponse.weather[0].icon;
        var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' />"
    
        currentWeather.textContent = " ";
        fiveDayBody.textContent = " ";
        actualCurrentWeather.innerHTML = city + " - " + date + "" + weatherIconLink;
        currentWeatherCard.classList.remove("hidden-card");
        fiveDay.classList.remove("hidden-card");
       

        return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=ba2aa9d96d00d0af91f1a943d7132459');
    })

    .then(function (response) {
        return response.json();
    })

    .then(function (response) {
        console.log(response);
        displayWeather(response);
    });
};



//Display the weather//
var displayWeather = function (weather) {
    if (weather.length === 0) {
        weatherContainerEl.textContent= "No weather data found";
        return;
    }

//Create humidity//
var humidity = document.createElement('p');
humidity.id = "humidity";
humidity.innerHTML = "Humidity: " + weather.current.humidity + "%";
currentWeather.appendChild(humidity);

//Create temperature//
var temperature = document.createElement('p');
temperature.id = "temperature";
temperature.innerHTML = "Temperature: " + weather.current.temp.toFixed(1) + "°F";
currentWeather.appendChild(temperature);

//Create wind speed//
var windSpeed = document.createElement('p');
windSpeed.id = "wind-speed";
windSpeed.innerHTML = "Wind Speed: " + weather.current.wind_speed.toFixed(1) + "MPH";
currentWeather.appendChild(windSpeed);

//Create uv index//
var uvIndex = document.createElement('p');
var uvIndexValue = weather.current.uvi.toFixed(1);
uvIndex.id = "uv-index";
if (uvIndexValue >= 0) {
    uvIndex.className = "uv-index-green"
}
if (uvIndexValue >= 4) {
    uvIndex.className = "uv-index-yellow"
}
if (uvIndexValue >= 8) {
    uvIndex.className = "uv-index-red"
}
uvIndex.innerHTML = "UV Index: " + uvIndexValue;
currentWeather.appendChild(uvIndex);

var extendedForecast = weather.daily;
for (let i = 0; i < extendedForecast.length - 3; i++) {
    var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
    var weatherIcon = extendedForecast[i].weather[0].icon;
    var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'/>";
    var dayCard = document.createElement("div");
    dayCard.className = "day";
    dayCard.innerHTML = "<p>" + date + "</p>" +
        "<p>" + weatherIconLink + "</p>" +
        "<p>Temp: " + extendedForecast[i].temp.day.toFixed(1) + "F</p>" +
        "<p>Humidity: " + extendedForecast[i].humidity + "%</p>" +
        "<p>Wind Speed: " + extendedForecast[i].wind_speed.toFixed(1) + " MPH"
        
        fiveDayBody.appendChild(dayCard);
    }
}

var loadPastWeather = function() {
    searchArray = JSON.parse(localStorage.getItem("weatherSearch"));
    if (searchArray) {
        searchHistoryArray = JSON.parse(localStorage.getItem("weatherSearch"));
        for (let i = 0; i < searchArray.length; i++) {
            var searchHistoryElement = document.createElement('button');
            searchHistoryElement.className = "btn";
            searchHistoryElement.setAttribute("data-city", searchArray[i])
            searchHistoryElement.innerHTML = searchArray[i];
            searchedList.appendChild(searchHistoryElement);
            searchedHistory.removeAttribute("style");
        }
    }
}

var buttonClickHandler = function (event) {
    var cityName = event.target.getAttribute("data-city");
    if (cityName) {
        getWeatherInfo(cityName);
    }
}

citySearch.addEventListener("submit", submitForm);
fiveDay.addEventListener("click", buttonClickHandler);

loadPastWeather();