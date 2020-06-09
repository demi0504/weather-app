const currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const farenheit = '&units=imperial'
const apiKey = "&appid=c09412399106b3cafc2899cecbc427d6";


$(document).ready(function(){
    //Click event for submit button
    $("#submit-weather").click(function(e){
        event.preventDefault();
        var city = $("#city").val()
        //If city form is filled call weather api and return current weather
        if(city != ''){
            $.ajax({
                url: forecastURL + city + farenheit + apiKey,
                type:  "GET",
                datatype: "jsonp",
                success: function(data){
                     console.log(data)
                     var temperature = data.list[0].main.temp;
                     var icon = data.list[0].weather[0].icon;
                     $(".weather-temperature").html("<h5>Temp: " + temperature +"&#8457;" + "</h5>");
                     $(".weather-humidity").html("<h5>Humidity: " + data.list[0].main.humidity + "</h5>");
                     $(".weather-wind-speed").html("<h5>Wind Speed: " + data.list[0].wind.speed + "</h5>");
                    //  $(".uv-index").html(data.main.humidity);
                     $(".weather-icon").attr("src", "http://openweathermap.org/img/w/"+icon+".png");
                     $(".city-name").html("<h4>City: " + data.city.name + "</h4>");
                }
            })
        }else{
            return;
        }
    });
});



