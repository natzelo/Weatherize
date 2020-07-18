$(".search-btn").click( () => {
    const query = $(".search-box").val();
    const url ='https://api.openweathermap.org/data/2.5/weather?q='+ query + '&appid=cb9a585ba3b63c09473b324d336c5701&units=metric';
    $.getJSON(url, (response) => {
        $('#curr-temp').text(response.main.temp);
        $('#low-temp').text(response.main.temp_min);
        $('#high-temp').text(response.main.temp_max);
        $('.summary').text(response.weather[0].description);
        $('#wind-speed').text(response.wind.speed);
        $('#wind-direc').text(response.wind.deg);
        $('#humid').text(response.main.humidity);
        $('#feel').text(response.main.feels_like);
        $('#pressure').text(response.main.pressure);
        $('#cloud').text(response.clouds.all);
    }) 
} );