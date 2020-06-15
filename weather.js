const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const farenheit = "&units=imperial";
const apiKey = "&appid=c09412399106b3cafc2899cecbc427d6";



$(document).ready(function(){
    
    //Click event for submit button
    $("#submit-weather").click(function(e){
        event.preventDefault();
        var city = $("#city").val().trim();
        //If city form is filled call weather api and return current weather
        if(city != ''){
            $.ajax({
                url: currentURL + city + farenheit + apiKey,
                type:  "GET",
                datatype: "jsonp",
                success: function(data){
                    // console.log(data)
                    var temperature = data.main.temp;
                    var icon = data.weather[0].icon;
                    $(".weather-temperature").html("<h5>Temp: " + temperature +"&#8457;" + "</h5>");
                    $(".weather-humidity").html("<h5>Humidity: " + data.main.humidity + "</h5>");
                    $(".weather-wind-speed").html("<h5>Wind Speed: " + data.wind.speed + "</h5>");
                    $(".weather-icon").attr("src", "http://openweathermap.org/img/w/"+icon+".png");
                    $(".city-name").html("<h4>City: " + data.name + "</h4>");
                    
                    //Get lat and lon for uv index call
                    var longitude = data.coord.lon;
                    var latitude = data.coord.lat;
                    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + apiKey +  "&lat=" + latitude + "&lon=" + longitude;
                    $.ajax({
                        url: uvURL,
                        method: "GET"
                    }).then(function(response){
                        console.log(response)
                        var uvIndex = response.value
                        $(".uv-index").html("<h5>UV Index: " + uvIndex);
                        if(uvIndex < 3) {
                            $(".uv-index").addClass("uv-favorable");
                        } else if (uvIndex >= 3 && uvIndex < 8) {
                            $(".uv-index").addClass("uv-moderate");
                        } else if (uvIndex >= 8) {
                            $(".uv-index").addClass("uv-severe");
                        }

                        
                    })

                    forecastCall();  
                }
            })
        }else{
            return;
        }
        //Ajax call to retrieve forecast data
        function forecastCall(){
            $.ajax({
            url: forecastURL + city + farenheit + apiKey,
            type:  "GET",
            datatype: "jsonp",
            success: function(data){
                
                

                $(".card").css("visibility","visible");
                //Forecast day 1
                $("#date1").html("<h6>" + data.list[7].dt_txt.slice(5, 10) + "</h6>");
                $("#icon1").attr("src", "http://openweathermap.org/img/w/" + data.list[7].weather[0].icon + ".png");
                $("#forecast-temperature1").html("<h6>Temp: " + data.list[7].main.temp + "</h6>");
                $("#forecast-humidity1").html("<h6>Humidity: " + data.list[7].main.humidity + "</h6>");

                //Forecast day 2
                $("#date2").html("<h6>" + data.list[14].dt_txt.slice(5, 10) + "</h6>");
                $("#icon2").attr("src", "http://openweathermap.org/img/w/" + data.list[14].weather[0].icon + ".png");
                $("#forecast-temperature2").html("<h6>Temp: " + data.list[14].main.temp + "</h6>");
                $("#forecast-humidity2").html("<h6>Humidity: " + data.list[14].main.humidity + "</h6>");
                
                //Forecast day 3
                $("#date3").html("<h6>" + data.list[22].dt_txt.slice(5, 10) + "</h6>");
                $("#icon3").attr("src", "http://openweathermap.org/img/w/" + data.list[22].weather[0].icon + ".png");
                $("#forecast-temperature3").html("<h6>Temp: " + data.list[22].main.temp + "</h6>");
                $("#forecast-humidity3").html("<h6>Humidity: " + data.list[22].main.humidity + "</h6>");

                //Forecast day 4
                $("#date4").html("<h6>" + data.list[30].dt_txt.slice(5, 10) + "</h6>");
                $("#icon4").attr("src", "http://openweathermap.org/img/w/" + data.list[30].weather[0].icon + ".png");
                $("#forecast-temperature4").html("<h6>Temp: " + data.list[30].main.temp + "</h6>");
                $("#forecast-humidity4").html("<h6>Humidity: " + data.list[30].main.humidity + "</h6>");

                //Forecast day 5
                $("#date5").html("<h6>" + data.list[38].dt_txt.slice(5, 10) + "</h6>");
                $("#icon5").attr("src", "http://openweathermap.org/img/w/" + data.list[38].weather[0].icon + ".png");
                $("#forecast-temperature5").html("<h6>Temp: " + data.list[38].main.temp + "</h6>");
                $("#forecast-humidity5").html("<h6>Humidity: " + data.list[38].main.humidity + "</h6>");
            }
            })
        }
        

        
    });

    
});






