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


//Display todays weather data
function displayWeather(data,cityname)
{
  // check if api returned any city
  if (data.length === 0)
   {
    weatherrowEl.textContent = "No data found for city: "+cityname;
    return;
  }  
  
  var latvar = 0;
  var lonvar = 0;
  var tempvar = 0;
  var humidityvar = 0;
  var windvar = 0;
  var datevar =0;
  var iconvar = "";
  var iconurl="";
  var uvvar = 0;
  var uppercity ="";
  var dateString="";

            latvar = data.coord.lat;
            lonvar = data.coord.lon;
            tempvar = data.main.temp;
            humidityvar = data.main.humidity;
            windvar = data.wind.speed;
            iconvar = data.weather[0].icon;
            iconurl = "https:///openweathermap.org/img/w/" + iconvar + ".png";
            dateString = data.dt;
            datevar = moment.unix(dateString).format("MM/DD/YYYY");
            uppercity = cityname.charAt(0).toUpperCase()+cityname.slice(1);

            //create card for weather data           

          var weathercardEl = document.createElement("div");
          weathercardEl.classList = "col-md-12 card weather-card";
          weatherrowEl.appendChild(weathercardEl);
            //create card body div
          var cardbodyEl = document.createElement("div");
          cardbodyEl.classList = "card-body";
          weathercardEl.appendChild(cardbodyEl);
          //add body contents
          var cardtitleEl = document.createElement("h3");
          cardtitleEl.classList = "card-title";
          cardtitleEl.innerHTML = uppercity +" "+datevar;
          
          
          var imgvar = document.createElement("img");
          imgvar.classList = "card-title";
          imgvar.setAttribute("src",iconurl);
          cardtitleEl.appendChild(imgvar);
          cardbodyEl.appendChild(cardtitleEl);

          var tempbodyEl = document.createElement("div");
          tempbodyEl.classList="card-text";
          tempbodyEl.innerHTML = "Temperature: "+tempvar+"&#8457";
          cardbodyEl.appendChild(tempbodyEl);

          var humiditybodyEl = document.createElement("div");
          humiditybodyEl.classList="card-text";
          humiditybodyEl.innerHTML = "Humidity: "+humidityvar+"%";
          cardbodyEl.appendChild(humiditybodyEl);

          var windbodyEl = document.createElement("div");
          windbodyEl.classList="card-text";
          windbodyEl.innerHTML  = "Wind Speed: "+windvar+" MPH";
          cardbodyEl.appendChild(windbodyEl);
            //get UV index
          
          getUVI(latvar,lonvar,dateString);  
          
          //add 5 days forecast header and data
          cardbodyEl.appendChild(uvbodyEl);
          weather5El.innerHTML="5-Day Forecast:";
          getfivedayWeatherDetails(cityname);
          
          //Add to local repo
          addTorepository(cityname);     
};


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