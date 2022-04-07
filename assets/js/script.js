var cityNameInput = document.querySelector("#search-input");
var searchHistoryArray = [];
var searchedList = document.querySelector("#searched-list");
var searchedHistory = document.querySelector("#search-history");
var currentWeather = document.querySelector("#current-weather");
var fiveDay = document.querySelector("#five-day");
var citySearch = document.querySelector("#city-search");
var fiveDay = document.querySelector("#five-day");
var today = new Date();

//function to submit form//
var submitForm = function(event) {
    event.preventDefault();
    var cityName = cityNameInput.value.trim();

    //Add city to local storage//
    if (cityName) {
        searchHistoryArray.push(cityName);
        localStorage.setItem("weatherSearch", JSON.stringify(searchHistoryArray));
        var searchHistoryEl = document.createElement('li');
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("data-city", cityName)
        searchHistoryEl.innerHTML = cityName;
        searchedList.appendChild(searchHistoryEl);
        searchedHistory.removeAttribute("style")
        getWeatherInfo(cityName);
        cityNameInput.value = "";
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
        var date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var weatherDescription = cityResponse.weather[0].description;
        var weatherIcon = cityResponse.weather[0].icon;
        var weatherIconLink = "<img src='http://opeanweathermap.org/img/wn" + weatherIcon + "@2x.png' />"
    
        currentWeather.textContent = " ";
        fiveDay.textContent = " ";

        return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=ba2aa9d96d00d0af91f1a943d7132459');
    })
}

var buttonClickHandler = function (event) {
    var cityName = event.target.getAttribute("data-city");
    if (cityName) {
        getWeatherInfo(cityName);
    }
}
citySearch.addEventListener("submit", submitForm);
fiveDay.addEventListener("click", buttonClickHandler);