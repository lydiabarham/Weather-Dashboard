$('#search-form').on('submit', function (e) {
    e.preventDefault();

    // open weather API
    const APIKey = "add3365f12976c25c0847c95c48d683c";
    const placeName = $('#search-input').val();
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
                    const celcius = function(K) {
                        return K - 273.15
                      }
                    const tempCelcius = parseInt(parseFloat(celcius(data.list[0].main.temp)));
                    $("#temp-display").text("Temp: " + tempCelcius + "°C");
                    $("#wind-display").text("Wind: " + data.list[0].wind.speed + "KPH")
                    $("#humidity-display").text("Humidity: " + data.list[0].main.humidity + "%");
    
    

                })
        });

});