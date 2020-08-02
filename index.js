const iconUrl =
    "https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json";
$.getJSON(iconUrl, (weatherIcons) => {

    //Geolocation 
    navigator.geolocation.getCurrentPosition((pos) => {
        const loc_url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=cb9a585ba3b63c09473b324d336c5701&units=metric`;
        $.getJSON(loc_url, (response) => {
            update(response,weatherIcons);
        });
    });


    // Click listenser
    $(".search-btn").click(() => {
        handler(weatherIcons);
    });


    //Enter key listener
    $(document).keypress((e) => {
        if(e.key === "Enter") {
            handler(weatherIcons);
        }
    })
});

const handler = (weatherIcons) => {
    const query = $(".search-box").val();
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=cb9a585ba3b63c09473b324d336c5701&units=metric";
    $.getJSON(url, (response) => {
        update(response, weatherIcons);
    });
}

const update = (response,weatherIcons) => {

    $("#curr-temp").text(response.main.temp);
    $("#low-temp").text(response.main.temp_min);
    $("#high-temp").text(response.main.temp_max);
    $(".summary").text(response.weather[0].description);
    $("#wind-speed").text(response.wind.speed);
    $("#wind-direc").text(response.wind.deg);
    $("#humid").text(response.main.humidity);
    $("#feel").text(response.main.feels_like);
    $("#pressure").text(response.main.pressure);
    $("#cloud").text(response.clouds.all);
    $('#name').text(response.name);
    $('#country').text(response.sys.country);

    var prefix = "wi wi-";
    var code = response.weather[0].id;
    var icon = weatherIcons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    // if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    //   icon = 'day-' + icon;
    // }

    var today = new Date();
    var hour = today.getHours();

    if (hour > 6 && hour < 19) {
        //Day time
        if (code === 800) {
            icon = "day-sunny";
        } else {
            icon = "day-" + icon;
        }
    } else {
        //Night time

        if (code === 800) {
            icon = "night-clear";
        } else {
            icon = "night-" + icon;
        }
    }

    // Finally tack on the prefix.
    icon = prefix + icon;

    $(".graphic i").removeClass();
    $(".graphic i").addClass(icon);
};

