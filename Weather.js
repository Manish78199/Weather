

document.querySelector("#Main-con").style.backgroundImage = "url(WeatherImages/Cloud.jpg)";


document.querySelector("#searchCity").onclick = function () {
  var city = document.getElementById("City_Input").value;
  FindWeather(city);

}
function FindWeather(cityName = "Meerut") {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=Metric&appid=a4ac3c6360c0369c4fd6de9fa5117d6a").then((response) => {
    return response.text()
  }).then((data) => {

    display(JSON.parse(data));
  })
}


function display(data) {
  if (data.cod == 200) {
   
    document.querySelector(".City_Name").innerHTML = data.name;
    document.querySelector("#Temp_Con").innerHTML = Math.floor(data.main.temp);
    document.querySelector("#Humidity_Con").innerHTML = data.main.humidity + "%";
    document.querySelector("#Wind_Con").innerHTML = data.wind.speed;
    document.querySelector("#Weather_Name").innerHTML = data.weather[0].description
    document.querySelector("#WeatherImage").style.backgroundImage = "url(http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png)";
    weatherBack(data.weather[0].main)
  }
  else {
    window.alert("Enter Correct Name of Your City")
  }
}


function weatherBack(wheat) {
  var back = "";
  if (wheat == "Clear") {
    back = "Clean.jpg"
  }
  else if (wheat == "Clouds") {
    back = "Cloud.jpg";
  } else if (wheat = "Rain") {
    back = "Rain.jpg";
  }
  else if (wheat = "Thunderstorm") {
    back = "Thunder.jpg";
  }
  else if (wheat = "Drizzle") {
    back = "Drizzle.jpg";
  }
  else if (wheat = "Snow") {
    back = "Snow.jpg"
  }
  else {
    back = "Atmosphere.jpg";
  }


  document.querySelector("#Main-con").style.backgroundImage = "url(WeatherImages/" + back + ")";
}

document.querySelector("#City_Input").onkeypress= function (e) {
 
  if(e.keyCode==13){
     document.querySelector("#searchCity").click()
  }

}




FindWeather();


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    window.alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
 
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=a4ac3c6360c0369c4fd6de9fa5117d6a").then((response) => {
    return response.text()
  }).then((data) => {

    display(JSON.parse(data));
  });

}
getLocation();