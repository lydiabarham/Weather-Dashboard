// retrieve history from local storage
const printInput = function () {
    const searchHistory = $("<ul>");
    for (let i = 0; i < localStorage.length && i < 6; i++) {
        const historyItem = $("<li>");
        historyItem.addClass("history-item");
        const historyButton = $("<button>");
        historyButton.addClass("history-button");
        historyButton.text(localStorage.getItem(`name${i}`));
        historyItem.append(historyButton);
        searchHistory.append(historyItem);
    }
    $("#search-history").append(searchHistory);
}

$(document).ready(function () {
    printInput();
});

// event listener for the form submission
$('#search-form').on('submit', function (e) {
    e.preventDefault();

    const placeName = $('#search-input').val();
    if (placeName !== "") {

        // save to local storage
        for (let i = localStorage.length - 1; i > 0; i--) {
            const itemName = `name${i}`;
            const prevItemName = `name${i - 1}`;
            const prevItem = localStorage.getItem(prevItemName);
            if (prevItem !== null) {
                localStorage.setItem(itemName, prevItem);
            }
        }

        // save the new input at the beginning of the list
        localStorage.setItem("name0", placeName);

        $('#search-input').val("");

        // print search history list 
        $("#search-history").empty();
        printInput();

        // weather API
        const APIKey = "add3365f12976c25c0847c95c48d683c";
        const geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + placeName + "&appid=" + APIKey;

        // fetch call
        fetch(geoCode)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                const cityName = data[0].name;
                console.log(cityName);
                const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

                fetch(queryURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(queryURL)
                        console.log(data);
                        const cityDisplay = $("#city-name")
                        cityDisplay.text(data.city.name);
                        const dateDisplay = data.list[0].dt_txt.slice(0, 10);
                        $("#date-display").text(" " + dateDisplay);
                        const iconcode = data.list[0].weather[0].icon;
                        const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $("#weather-icon").attr("src", iconurl);
                        console.log(iconcode)
                        console.log(iconurl)
                        const celcius = function (K) {
                            return K - 273.15
                        }
                        const tempCelcius = parseInt(parseFloat(celcius(data.list[0].main.temp)));
                        $("#temp-display").text("Temp: " + tempCelcius + "°C");
                        $("#wind-display").text("Wind: " + data.list[0].wind.speed + "KPH")
                        $("#humidity-display").text("Humidity: " + data.list[0].main.humidity + "%");
                    })
            });
    }

});