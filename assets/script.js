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
            const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=" + APIKey;

            fetch(queryURL)
            .then(function (response){
                return response.json();
            })
            .then(function (data) {
                console.log(queryURL)
                console.log(data);
            })


        });

    //
});