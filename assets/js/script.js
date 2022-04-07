var cityNameInput = document.querySelector("#search-input");
var searchHistoryArray = [];
var searchedList = document.querySelector("#searched-list");
var searchedHistory = document.querySelector("#search-history");

//function to submit form//
var submitForm = function(event) {
    event.preventDefault();
    var cityName = cityNameInput.ariaValueMax.trim();

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
    var apiOpenWeather = ""
}