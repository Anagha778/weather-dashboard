
//Global variables
var cities =[];
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search");
var citiesEl = document.querySelector(".cities-list");


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