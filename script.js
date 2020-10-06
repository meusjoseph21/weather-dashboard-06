//When I type in a search item
    //  I should dynamically populate the temp, humidity, wind, and uv index, as well as a title for that place. 
    // that search should save onto the side of the screen under the search bar and they should save to local storage
    // uv index needs a color change and everything needs icons.

//global variables

$(document).ready(function() {
var date = dayjs().format("MM/DD/YYYY")

var historyArr = []
var lsCities = localStorage.getItem("city")

//if we have cities in local storage that should replace empty array above
if (lsCities){
  historyArr =  JSON.parse(localStorage.getItem("city"))

}
    


// search for a city

function CitySearch(){
    var city=  $("#cityValue").val()
   
   
   

   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c64ae898096dd7b2fab2998d1d228df8"



   $.ajax({
    url: queryURL,
    method: "GET"

    }).then(function (response){
       
        
        var currentWeather = $("#curr-weather") /// THIS IS ALL APPENDING TO THE DIV THAT WILL UPDATE AUTOMATICALLY AFTER A SEARCH
        currentWeather.empty()

        var h1Tag = $("<h1>")
        h1Tag.text(response.name)
        currentWeather.append(h1Tag)

        var img = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        currentWeather.append(img)

        var pTag = $("<p>")
        pTag.text(date)
        currentWeather.append(pTag)

        var temp = response.main.temp
        var convertTemp = (temp - 273.15) * 1.80 + 32
        var wholeTemp = Math.floor(convertTemp)
        var tempDiv = $("<div>")
        tempDiv.text("Temperature: " + wholeTemp + " F") 
        currentWeather.append(tempDiv)

        var humidityDiv = $("<div>")
        humidityDiv.text("Humidity: " + response.main.humidity + "%")
        currentWeather.append(humidityDiv)

        var windDiv = $("<div>")
        windDiv.text("Wind Speed: " + response.wind.speed + " MPH")
        currentWeather.append(windDiv)

        var lat = response.coord.lat
        var lon = response.coord.lon
        var newQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=c64ae898096dd7b2fab2998d1d228df8"



      $.ajax({
        url: newQueryURL,
        method: "GET"

        }).then(function (response){
            

            var UVindex = $("<div>")
            UVindex.addClass("colorIndex")
            UVindex.text("UV Index: " + response.value)
            currentWeather.append(UVindex)
        })



    
    })

    forecast()
    
   
}

//recall history 

function history(){
    
    var city =  $("#cityValue").val()

    $("#history").empty()

    if (city){
        historyArr.push(city)
    }
    

    for (i = 0; i < historyArr.length; i++){
        
        var newButton = $("<button>")
        newButton.text(historyArr[i])
        newButton.attr("class","historybutton btn btn-secondary btn-lg btn-block")
        $("#history").append(newButton)
        localStorage.setItem("city", JSON.stringify(historyArr))
        
    }
   
    $(".historybutton").on("click", function(e){
        e.preventDefault()
        console.log(newButton.text())
     
        
    })



}

function forecast(){
    $(".col-2").css("display", "block")

    var city = $("#cityValue").val()

    var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&cnt=5&appid=718877f006fbc005e62f6fd566dd15ac"

    $.ajax({
        url: forecastQuery,
        method: "GET"
    }).then(function (response){
        console.log(response.list)
        console.log((response.list[1].dt_txt))
        

        // Day 1--------------------------------------------------

       
        
        var temp1 = response.list[0].main.temp
        var convertTemp = (temp1 - 273.15) * 1.80 + 32
        var wholeTemp = Math.floor(convertTemp)

        $(".day1").empty()

        var dayOneTemp = $("<div>")
        dayOneTemp.text("Temperature: "  + wholeTemp + " F")
        $(".day1").append(dayOneTemp)

        var humidity1 = response.list[0].main.humidity

        
        var dayOneHum = $("<div>")
        dayOneHum.text("Humidity: " + humidity1 + " %")
        $(".day1").append(dayOneHum)

        var img1 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png").addClass("card-body alignment")
        console.log(img1)
        $(".day1").append(img1)

        var time1 = response.list[0].dt_txt
        
        var timeDiv1 = $("<div>")
        timeDiv1.text(time1)
        $(".day1").append(timeDiv1)
        // --------------------------------------------------

        // Day 2--------------------------------------------------
        var temp2 = response.list[1].main.temp
        var convertTemp2 = (temp2 - 273.15) * 1.80 + 32
        var wholeTemp2 = Math.floor(convertTemp2)

        $(".day2").empty()

        var dayTwoTemp = $("<div>")
        dayTwoTemp.text("Temperature: "  + wholeTemp2 + " F")
        $(".day2").append(dayTwoTemp)

        var humidity2 = response.list[1].main.humidity

        
        var dayTwoHum = $("<div>")
        dayTwoHum.text("Humidity: " + humidity2 + " %") 
        $(".day2").append(dayTwoHum)

        var img2 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png").addClass("card-body alignment")
        $(".day2").append(img2)

        var time2 = response.list[1].dt_txt
        
        var timeDiv2 = $("<div>")
        timeDiv2.text(time2)
        $(".day2").append(timeDiv2)

        // --------------------------------------------------
        // Day 3--------------------------------------------------
        var temp3 = response.list[2].main.temp
        var convertTemp3= (temp3 - 273.15) * 1.80 + 32
        var wholeTemp3 = Math.floor(convertTemp3)

        $(".day3").empty()

        var dayThreeTemp = $("<div>")
        dayThreeTemp.text("Temperature: "  + wholeTemp3 + " F")
        $(".day3").append(dayThreeTemp)

        var humidity3 = response.list[2].main.humidity

        
        var dayThreeHum = $("<div>")
        dayThreeHum.text("Humidity: " + humidity3 + " %") 
        $(".day3").append(dayThreeHum)

        var img3 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png").addClass("card-body alignment")
        $(".day3").append(img3)

        var time3 = response.list[2].dt_txt
        
        var timeDiv3 = $("<div>")
        timeDiv3.text(time3)
        $(".day3").append(timeDiv3)
        // --------------------------------------------------
        // Day 4--------------------------------------------------
        var temp4 = response.list[3].main.temp
        var convertTemp4 = (temp4 - 273.15) * 1.80 + 32
        var wholeTemp4 = Math.floor(convertTemp4)

        $(".day4").empty()

        var dayFourTemp = $("<div>")
        dayFourTemp.text("Temperature: "  + wholeTemp4 + " F")
        $(".day4").append(dayFourTemp)

        var humidity4 = response.list[3].main.humidity

        
        var dayFourHum = $("<div>")
        dayFourHum.text("Humidity: " + humidity4 + " %") 
        $(".day4").append(dayFourHum)

        var img4 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png").addClass("card-body alignment")
        $(".day4").append(img4)

        var time4 = response.list[3].dt_txt
        
        var timeDiv4 = $("<div>")
        timeDiv4.text(time4)
        $(".day4").append(timeDiv4)
        // --------------------------------------------------
        // Day 5--------------------------------------------------
        var temp5 = response.list[4].main.temp
        var convertTemp5 = (temp5 - 273.15) * 1.80 + 32
        var wholeTemp5 = Math.floor(convertTemp5)

        $(".day5").empty()

        var dayFiveTemp = $("<div>")
        dayFiveTemp.text("Temperature: "  + wholeTemp5 + " F")
        $(".day5").append(dayFiveTemp)

        var humidity5 = response.list[4].main.humidity

        
        var dayFiveHum = $("<div>")
        dayFiveHum.text("Humidity: " + humidity5 + " %") 
        $(".day5").append(dayFiveHum)

        var img5 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png").addClass("card-body alignment")
        $(".day5").append(img5)

        var time1 = response.list[4].dt_txt
        
        var timeDiv4 = $("<div>")
        timeDiv4.text(time4)
        $(".day5").append(timeDiv4)
        // --------------------------------------------------
       
        

        
    

      
    })

}

history()

//event listeners
$("#citysearch").on("click", function(e){
    e.preventDefault()
    CitySearch()
    history()   
})

$(document).on("click", ".historybutton", CitySearch)


})

