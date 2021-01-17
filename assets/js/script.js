//Global variables
var cities =[];
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search");
var citiesEl = document.querySelector(".cities-list");
var searchbtnEl = document.querySelector("#searchbtn");
var GUVIndex= 0;
var uvbodyEl = document.createElement("div");
var weather5El = document.querySelector(".weather5"); 
var citieslistEl = document.getElementsByTagName("li");
var weatherrowEl = document.querySelector(".weather-row");
var forecastEl = document.querySelector(".forecast-row");

//function to get todays temperature
var gettodayWeatherDetails = function(cityname){
    
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=eb88f60513f97685d54ad8308a28db93&units=imperial";
   
     
    fetch(apiUrl).then(function(response)
     {
        if (response.ok)
        {
          response.json().then(function(data) 
          {
            displayWeather(data,cityname);          
          });
        }         
        else
        {   
            weatherrowEl.textContent = "Error: " + cityname+" city "+ response.statusText
        }
    })
    .catch(function(error) {
      weatherrowEl.textContent = "Unable to connect";
  });
};

//function to clear nodes for next data
function clearNodes(){
  if(weatherrowEl.hasChildNodes())
    {
      while (weatherrowEl.hasChildNodes())
       {  
        weatherrowEl.removeChild(weatherrowEl.firstChild);
       }
    }

    weather5El.textContent="";
    weatherrowEl.textContent="";

    if(forecastEl.hasChildNodes())
    {
      while (forecastEl.hasChildNodes())
       {  
        forecastEl.removeChild(forecastEl.firstChild);
       }
    }
};


//function to display weather data on click of links
function dynamicEvent(){
    var city = this.textContent.trim();
    clearNodes();
    gettodayWeatherDetails(city);
  };
  

//Search city
var searchCity = function(event)
{ 
  event.preventDefault();
    
    var cityName = nameInputEl.value.trim();
    cityName = cityName.charAt(0).toUpperCase()+cityName.slice(1);
    clearNodes();

    if (cityName) 
    {
        gettodayWeatherDetails(cityName);
        nameInputEl.value = "";      
    } 
    else 
    {
      alert("Please enter a City name");
    }
};

//load cities from local storage
var loadCities = function()
{
    var getCities = localStorage.getItem("cities");
    if(getCities!==null)
    {
        getCities = JSON.parse(getCities);
        for(var i=0;i<getCities.length;i++)
        {
            // create a span element to hold city name
        cities.push(getCities[i]);
        var titleEl = document.createElement("li");
        titleEl.className = "cities-name";
        titleEl.textContent = getCities[i];
        citiesEl.appendChild(titleEl);
        titleEl.onclick = dynamicEvent;
        }
    }
};

//load cities from local storage on page load
loadCities();
userFormEl.addEventListener("submit",searchCity);