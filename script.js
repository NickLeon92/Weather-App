var APIKey = "fe9404aff544749cffd20c2496a42432";
// let requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.749&lon=-84.388&appid=fe9404aff544749cffd20c2496a42432';

let button = document.getElementById("searchBt")
let cityName = document.getElementById("cityName")
let cityTemp = document.getElementById("cityTemp")
let cityWind = document.getElementById("cityWind")
let cityHumid = document.getElementById("cityHumid")
let cityUV = document.getElementById("cityUV")

button.addEventListener("click", idk)

function idk() {
    console.log("here")
    let input = document.getElementById("input")
    console.log(input.value)
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=fe9404aff544749cffd20c2496a42432';

    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status)
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentTemp = ((data.main.temp-273.15)*1.8)+32
            currentTime = data.dt
            console.log(data.dt)
            console.log(currentTemp)
            var unixFormat = moment.unix(data.dt).format("MMM Do, YYYY, hh:mm:ss");
            console.log(unixFormat)
            cityName.textContent = data.name
            cityTemp.textContent = "Temp: " + currentTemp + " F"
            cityWind.textContent = "Wind " + data.wind.speed*2.236936 + "MPH"
            cityHumid.textContent = "Humidity " + data.main.humidity + "%"
            // cityUV.textContent = data.

            console.log('Github Repo Issues \n----------');
            // if(data[i].status !== 200){
            //     console.log(response.status)
            //     return
            // }
            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i].main.temp);
                // console.log(data[i].user.login);

            });

    }


