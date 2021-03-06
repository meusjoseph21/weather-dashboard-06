//global variables--------------------------------------

$(document).ready(function () {
  var date = dayjs().format("MM/DD/YYYY");
  var historyArr = [];
  //------------------------------------------------

  //-Local Storage-----------------------------------------------
  var lsCities = localStorage.getItem("city");

  //if we have cities in local storage that should replace empty array above
  if (lsCities) {
    historyArr = JSON.parse(localStorage.getItem("city"));
  }


  //------------------------------------------------

  // search for a city//------------------------------------------------

  function CitySearch() {
    var city = $("#cityValue").val();
    $(".card").css("display", "block");


    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=c64ae898096dd7b2fab2998d1d228df8";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var currentWeather = $("#curr-weather"); /// THIS IS ALL APPENDING TO THE DIV THAT WILL UPDATE AUTOMATICALLY AFTER A SEARCH
      currentWeather.empty();

      var h1Tag = $("<h1>");
      h1Tag.text(response.name);
      currentWeather.append(h1Tag);

      var img = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      currentWeather.append(img);

      var pTag = $("<p>");
      pTag.text(date);
      currentWeather.append(pTag);

      var temp = response.main.temp;
      var convertTemp = (temp - 273.15) * 1.8 + 32;
      var wholeTemp = Math.floor(convertTemp);
      var tempDiv = $("<div>");
      tempDiv.text("Temperature: " + wholeTemp + " F");
      currentWeather.append(tempDiv);

      var humidityDiv = $("<div>");
      humidityDiv.text("Humidity: " + response.main.humidity + "%");
      currentWeather.append(humidityDiv);

      var windDiv = $("<div>");
      windDiv.text("Wind Speed: " + response.wind.speed + " MPH");
      currentWeather.append(windDiv);

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var newQueryURL =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=c64ae898096dd7b2fab2998d1d228df8";

      $.ajax({
        url: newQueryURL,
        method: "GET",
      }).then(function (response) {
        var UVindex = $("<div>");
        UVindex.addClass("colorIndex");
        UVindex.text("UV Index: " + response.value);
        if (response.value < 6){
            UVindex.addClass("yellow")
        } else if (response.value < 8){
            UVindex.addClass("orange")
        } else if (responese.value < 11){
            UVindex.addClass("red")
        } else {
            UVindex.addClass("voilet")
        }
        currentWeather.append(UVindex);
      });

      $(".col-2").css("display", "block");

    

    var forecastQuery =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +
      "&exclude=current,minute,hourly,alerts&appid=718877f006fbc005e62f6fd566dd15ac";

    $.ajax({
      url: forecastQuery,
      method: "GET",
    }).then(function (response) {
        //------------------
        //DAY ONE ----------
        //------------------

       


        var temp1 = response.daily[1].temp.day;
        var convertTemp = (temp1 - 273.15) * 1.8 + 32;
        var wholeTemp = Math.floor(convertTemp);
  
        $(".day1").empty();
  
        var dayOneTemp = $("<div>");
        dayOneTemp.text("Temperature: " + wholeTemp + " F");
        $(".day1").append(dayOneTemp);
  
        var humidity1 = response.daily[1].humidity;
  
        var dayOneHum = $("<div>");
        dayOneHum.text("Humidity: " + humidity1 + " %");
        $(".day1").append(dayOneHum);
  
        var img1 = $("<img>")
          .attr(
            "src",
            "http://openweathermap.org/img/w/" +
              response.daily[1].weather[0].icon +
              ".png"
          )
          .addClass("card-body alignment");
          $(".day1").append(img1)

          var dt = response.daily[1].dt
          var date = dt *1000
          var dateFormat = new Date(date)
          var dateDisplay = dateFormat.toLocaleString()

          $(".day1").append(dateDisplay)
  
        

        //------------------------------------------------

         //------------------
        //DAY TWO ----------
        //------------------
        var temp2 = response.daily[2].temp.day;
        var convertTemp2 = (temp2 - 273.15) * 1.8 + 32;
        var wholeTemp2 = Math.floor(convertTemp2);
  
        $(".day2").empty();
  
        var dayTwoTemp = $("<div>");
        dayTwoTemp.text("Temperature: " + wholeTemp2 + " F");
        $(".day2").append(dayTwoTemp);
  
        var humidity2 = response.daily[2].humidity;
  
        var dayTwoHum = $("<div>");
        dayTwoHum.text("Humidity: " + humidity2 + " %");
        $(".day2").append(dayTwoHum);
  
        var img2 = $("<img>")
          .attr(
            "src",
            "http://openweathermap.org/img/w/" +
              response.daily[2].weather[0].icon +
              ".png"
          )
          .addClass("card-body alignment");
        $(".day2").append(img2);

        var dt1 = response.daily[2].dt
          var date1 = dt1 *1000
          var dateFormat1 = new Date(date1)
          var dateDisplay1 = dateFormat1.toLocaleString()

          $(".day2").append(dateDisplay1)
  
        //------------------------------------------------

        //------------------
        //DAY THREE ----------
        //------------------

        var temp3 = response.daily[3].temp.day;
        var convertTemp3 = (temp3 - 273.15) * 1.8 + 32;
        var wholeTemp3 = Math.floor(convertTemp3);
  
        $(".day3").empty();
  
        var dayThreeTemp = $("<div>");
        dayThreeTemp.text("Temperature: " + wholeTemp3 + " F");
        $(".day3").append(dayThreeTemp);
  
        var humidity3 = response.daily[3].humidity;
  
        var dayThreeHum = $("<div>");
        dayThreeHum.text("Humidity: " + humidity3 + " %");
        $(".day3").append(dayThreeHum);
  
        var img3 = $("<img>")
          .attr(
            "src",
            "http://openweathermap.org/img/w/" +
              response.daily[3].weather[0].icon +
              ".png"
          )
          .addClass("card-body alignment");
        $(".day3").append(img3);
  
        var dt2 = response.daily[3].dt
        var date2 = dt2 *1000
        var dateFormat2 = new Date(date2)
        var dateDisplay2 = dateFormat2.toLocaleString()

        $(".day3").append(dateDisplay2)
         //------------------------------------------------

         //------------------
        //DAY FOUR ----------
        //------------------
        
         var temp4 = response.daily[4].temp.day;
         var convertTemp4 = (temp4 - 273.15) * 1.8 + 32;
         var wholeTemp4 = Math.floor(convertTemp4);
   
         $(".day4").empty();
   
         var dayFourTemp = $("<div>");
         dayFourTemp.text("Temperature: " + wholeTemp4 + " F");
         $(".day4").append(dayFourTemp);
   
         var humidity4 = response.daily[4].humidity;
   
         var dayFourHum = $("<div>");
         dayFourHum.text("Humidity: " + humidity4 + " %");
         $(".day4").append(dayFourHum);
   
         var img4 = $("<img>")
           .attr(
             "src",
             "http://openweathermap.org/img/w/" +
               response.daily[4].weather[0].icon +
               ".png"
           )
           .addClass("card-body alignment");
         $(".day4").append(img4);
   
         var dt3 = response.daily[4].dt
          var date3 = dt3 *1000
          var dateFormat3 = new Date(date3)
          var dateDisplay3 = dateFormat3.toLocaleString()

          $(".day4").append(dateDisplay3)
         //------------------------------------------------

          //------------------
        //DAY FIVE ----------
        //------------------
        

         var temp5 = response.daily[5].temp.day;
         var convertTemp5 = (temp5 - 273.15) * 1.8 + 32;
         var wholeTemp5 = Math.floor(convertTemp5);
   
         $(".day5").empty();
   
         var dayFiveTemp = $("<div>");
         dayFiveTemp.text("Temperature: " + wholeTemp5 + " F");
         $(".day5").append(dayFiveTemp);
   
         var humidity5 = response.daily[5].humidity;
   
         var dayFiveHum = $("<div>");
         dayFiveHum.text("Humidity: " + humidity5 + " %");
         $(".day5").append(dayFiveHum);
   
         var img5 = $("<img>")
           .attr(
             "src",
             "http://openweathermap.org/img/w/" +
               response.daily[5].weather[0].icon +
               ".png"
           )
           .addClass("card-body alignment");
         $(".day5").append(img5);
   
         var dt4 = response.daily[5].dt
          var date4 = dt4 *1000
          var dateFormat4 = new Date(date4)
          var dateDisplay4 = dateFormat4.toLocaleString()
         

          $(".day5").append(dateDisplay4)

         //------------------------------------------------

    })
    });

    


  }
  //------------------------------------------------
  //------------------------------------------------

  //recall history //------------------------------------------------

  function history() {
    var city = $("#cityValue").val();

    $("#history").empty();

    if (city) {
      historyArr.push(city);
    }

    for (i = 0; i < historyArr.length; i++) {
      var newButton = $("<button>");
      newButton.text(historyArr[i]);
      newButton.attr(
        "class",
        "historybutton btn btn-secondary btn-lg btn-block"
      );
      newButton.attr("data-name", historyArr[i]);
      $("#history").append(newButton);
      localStorage.setItem("city", JSON.stringify(historyArr));
    }

    $(".historybutton").on("click", recallSearch);
  }

  function recallSearch() {
    var recalledCity = $(this).text();

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      recalledCity +
      "&appid=c64ae898096dd7b2fab2998d1d228df8";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var currentWeather = $("#curr-weather"); /// THIS IS ALL APPENDING TO THE DIV THAT WILL UPDATE AUTOMATICALLY AFTER A SEARCH
      currentWeather.empty();

      var h1Tag = $("<h1>");
      h1Tag.text(response.name);
      currentWeather.append(h1Tag);

      var img = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      currentWeather.append(img);

      var pTag = $("<p>");
      pTag.text(date);
      currentWeather.append(pTag);

      var temp = response.main.temp;
      var convertTemp = (temp - 273.15) * 1.8 + 32;
      var wholeTemp = Math.floor(convertTemp);
      var tempDiv = $("<div>");
      tempDiv.text("Temperature: " + wholeTemp + " F");
      currentWeather.append(tempDiv);

      var humidityDiv = $("<div>");
      humidityDiv.text("Humidity: " + response.main.humidity + "%");
      currentWeather.append(humidityDiv);

      var windDiv = $("<div>");
      windDiv.text("Wind Speed: " + response.wind.speed + " MPH");
      currentWeather.append(windDiv);

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var newQueryURL =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=c64ae898096dd7b2fab2998d1d228df8";

      $.ajax({
        url: newQueryURL,
        method: "GET",
      }).then(function (response) {
        var UVindex = $("<div>");
        UVindex.addClass("colorIndex");
        UVindex.text("UV Index: " + response.value);
        if (response.value < 6){
            UVindex.addClass("yellow")
        } else if (response.value < 8){
            UVindex.addClass("orange")
        } else if (responese.value < 11){
            UVindex.addClass("red")
        } else {
            UVindex.addClass("voilet")
        }
        currentWeather.append(UVindex);

        $(".card").css("display", "block");

    

        var forecastQuery =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +
          "&exclude=current,minute,hourly,alerts&appid=718877f006fbc005e62f6fd566dd15ac";
    
        $.ajax({
          url: forecastQuery,
          method: "GET",
        }).then(function (response) {
            //------------------
            //DAY ONE ----------
            //------------------
    
            var temp1 = response.daily[1].temp.day;
            var convertTemp = (temp1 - 273.15) * 1.8 + 32;
            var wholeTemp = Math.floor(convertTemp);
      
            $(".day1").empty();
      
            var dayOneTemp = $("<div>");
            dayOneTemp.text("Temperature: " + wholeTemp + " F");
            $(".day1").append(dayOneTemp);
      
            var humidity1 = response.daily[1].humidity;
      
            var dayOneHum = $("<div>");
            dayOneHum.text("Humidity: " + humidity1 + " %");
            $(".day1").append(dayOneHum);
      
            var img1 = $("<img>")
              .attr(
                "src",
                "http://openweathermap.org/img/w/" +
                  response.daily[1].weather[0].icon +
                  ".png"
              )
              .addClass("card-body alignment");
      
            $(".day1").append(img1);
      
            var dt = response.daily[1].dt
            var date = dt *1000
             var dateFormat = new Date(date)
            var dateDisplay = dateFormat.toLocaleString()

             $(".day1").append(dateDisplay)
  
    
            //------------------------------------------------
    
             //------------------
            //DAY TWO ----------
            //------------------
            var temp2 = response.daily[2].temp.day;
            var convertTemp2 = (temp2 - 273.15) * 1.8 + 32;
            var wholeTemp2 = Math.floor(convertTemp2);
      
            $(".day2").empty();
      
            var dayTwoTemp = $("<div>");
            dayTwoTemp.text("Temperature: " + wholeTemp2 + " F");
            $(".day2").append(dayTwoTemp);
      
            var humidity2 = response.daily[2].humidity;
      
            var dayTwoHum = $("<div>");
            dayTwoHum.text("Humidity: " + humidity2 + " %");
            $(".day2").append(dayTwoHum);
      
            var img2 = $("<img>")
              .attr(
                "src",
                "http://openweathermap.org/img/w/" +
                  response.daily[2].weather[0].icon +
                  ".png"
              )
              .addClass("card-body alignment");
            $(".day2").append(img2);
      
            var dt1 = response.daily[2].dt
            var date1 = dt1 *1000
            var dateFormat1 = new Date(date1)
            var dateDisplay1 = dateFormat1.toLocaleString()

            $(".day2").append(dateDisplay1)
  
            //------------------------------------------------
    
            //------------------
            //DAY THREE ----------
            //------------------
    
            var temp3 = response.daily[3].temp.day;
            var convertTemp3 = (temp3 - 273.15) * 1.8 + 32;
            var wholeTemp3 = Math.floor(convertTemp3);
      
            $(".day3").empty();
      
            var dayThreeTemp = $("<div>");
            dayThreeTemp.text("Temperature: " + wholeTemp3 + " F");
            $(".day3").append(dayThreeTemp);
      
            var humidity3 = response.daily[3].humidity;
      
            var dayThreeHum = $("<div>");
            dayThreeHum.text("Humidity: " + humidity3 + " %");
            $(".day3").append(dayThreeHum);
      
            var img3 = $("<img>")
              .attr(
                "src",
                "http://openweathermap.org/img/w/" +
                  response.daily[3].weather[0].icon +
                  ".png"
              )
              .addClass("card-body alignment");
            $(".day3").append(img3);
      
            var dt2 = response.daily[3].dt
            var date2 = dt2 *1000
            var dateFormat2 = new Date(date2)
            var dateDisplay2 = dateFormat2.toLocaleString()

            $(".day3").append(dateDisplay2)
    
             //------------------------------------------------
    
             //------------------
            //DAY FOUR ----------
            //------------------
            
             var temp4 = response.daily[4].temp.day;
             var convertTemp4 = (temp4 - 273.15) * 1.8 + 32;
             var wholeTemp4 = Math.floor(convertTemp4);
       
             $(".day4").empty();
       
             var dayFourTemp = $("<div>");
             dayFourTemp.text("Temperature: " + wholeTemp4 + " F");
             $(".day4").append(dayFourTemp);
       
             var humidity4 = response.daily[4].humidity;
       
             var dayFourHum = $("<div>");
             dayFourHum.text("Humidity: " + humidity4 + " %");
             $(".day4").append(dayFourHum);
       
             var img4 = $("<img>")
               .attr(
                 "src",
                 "http://openweathermap.org/img/w/" +
                   response.daily[4].weather[0].icon +
                   ".png"
               )
               .addClass("card-body alignment");
             $(".day4").append(img4);
       
            var dt3 = response.daily[4].dt
            var date3 = dt3 *1000
            var dateFormat3 = new Date(date3)
            var dateDisplay3 = dateFormat3.toLocaleString()

            $(".day4").append(dateDisplay3)
             //------------------------------------------------
    
              //------------------
            //DAY FIVE ----------
            //------------------
            
    
             var temp5 = response.daily[5].temp.day;
             var convertTemp5 = (temp5 - 273.15) * 1.8 + 32;
             var wholeTemp5 = Math.floor(convertTemp5);
       
             $(".day5").empty();
       
             var dayFiveTemp = $("<div>");
             dayFiveTemp.text("Temperature: " + wholeTemp5 + " F");
             $(".day5").append(dayFiveTemp);
       
             var humidity5 = response.daily[5].humidity;
       
             var dayFiveHum = $("<div>");
             dayFiveHum.text("Humidity: " + humidity5 + " %");
             $(".day5").append(dayFiveHum);
       
             var img5 = $("<img>")
               .attr(
                 "src",
                 "http://openweathermap.org/img/w/" +
                   response.daily[5].weather[0].icon +
                   ".png"
               )
               .addClass("card-body alignment");
             $(".day5").append(img5);
       
            var dt4 = response.daily[5].dt
            var date4 = dt4 *1000
            var dateFormat4 = new Date(date4)
            var dateDisplay4 = dateFormat4.toLocaleString()
         

            $(".day5").append(dateDisplay4)
    
             //------------------------------------------------
    
        })
      });
    });
  }

  //------------------------------------------------
  //------------------------------------------------

  


  history(); //call this so history loads on page load

  //event listeners//------------------------------------------------
  $("#citysearch").on("click", function (e) {
    e.preventDefault();
    CitySearch();
    history();
  });

  $("#delete").on("click", function(){
       console.log(historyArr)
       localStorage.clear()

      
  })


});
//------------------------------------------------
