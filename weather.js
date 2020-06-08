$(document).ready(function(){
    //Click event for submit button
    $("#submit-weather").click(function(e){
        event.preventDefault();
    
        var city = $("#city").val()
        //If city form is filled call weather api and return 5 day forecast in farenheit
        if(city != ''){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' +
                '&appid=c09412399106b3cafc2899cecbc427d6',
                type:  "GET",
                datatype: "jsonp",
                success: function(data){
                     console.log(data);
                }
            })
        }else{
            return;
        }
    });
});