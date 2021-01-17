
//Global variables
var cities =[];

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