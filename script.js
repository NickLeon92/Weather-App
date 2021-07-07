var APIKey = "fe9404aff544749cffd20c2496a42432";

let requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.749&lon=-84.388&appid=fe9404aff544749cffd20c2496a42432';

let button = document.getElementById("searchBt")
let cityName = document.getElementById("cityName")
let cityTemp = document.getElementById("cityTemp")
let cityWind = document.getElementById("cityWind")
let cityHumid = document.getElementById("cityHumid")
let cityUV = document.getElementById("cityUV")

let citynames = []


let forecast = $("#forecast")

let call = false

captureprevious()

function captureprevious(){
    console.log("START")
    let storednames = JSON.parse(localStorage.getItem("citynames"))
    if(storednames!=null){
    citynames = storednames
    }

    else{
        return
    }

    render()
}

function render(){
    document.getElementById("history").innerHTML=""
    for(i=0; i<citynames.length; i++){
        let historyEl = $("<p>")
        historyEl.addClass("searchentry")
        historyEl.text(citynames[i])
        $("#history").append(historyEl)
    }
    test = $(".searchentry")
    console.log("finish render!!")
    call = false
    seriously()
}

button.addEventListener("click", idk)


// console.log($(".searchentry"))

// test = $(".searchentry")
seriously()
function seriously(){
    test.on("click", searchbyhistory)
}

let pastsearch

function searchbyhistory(){
    console.log("hello")
    console.log(this.textContent)
    pastsearch = this.textContent
    call = true
    idk()

}

let searchthis

function idk() {
    let input = document.getElementById("input")
    if(call){
        searchthis = pastsearch
    }

    else{
        searchthis = input.value
    }

    // localStorage.setItem("cityname", input.value)
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchthis + '&appid=fe9404aff544749cffd20c2496a42432';
    fetch(requestUrl)
    .then(function (response) {
        // console.log(response.status)
        return response.json();
    })
    .then(function (data) {
        if(data.cod!=200){
            window.alert("invalid input")
            return
        }
        console.log(data)
        currentTemp = Math.round(((data.main.temp-273.15)*1.8)+32)
        currentTime = data.dt
        // console.log(data.dt)
        // console.log(data.dt+data.timezone+14400)


        
        // console.log(moment.unix(data.dt).format("MMM Do, YYYY, hh:mm:ss"))
        var unixFormat = moment.unix(data.dt+data.timezone+14400).format("MMM Do, YYYY, hh:mm:ss");
        // console.log(unixFormat)
        cityName.textContent = data.name+",   "+unixFormat
        cityTemp.textContent = "Temp: " + currentTemp + " F"
        cityWind.textContent = "Wind: " + Math.round(data.wind.speed*2.236936) + " MPH"
        cityHumid.textContent = "Humidity: " + data.main.humidity + " %"
        // cityUV.textContent = data.
        
        // console.log('Github Repo Issues \n----------');
    });
    
    let requestUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchthis + '&appid=fe9404aff544749cffd20c2496a42432';
    
    fetch(requestUrl2)
    .then(function (response) {
        
        return response.json();
            })
            .then(function (data) {
                if(data.cod!=200){
                    return
                }
                console.log(data)
                $("#5day").text("5 day forecast:")
                document.getElementById("forecast").innerHTML = ""
                
                for(i=1;i<6;i++){
                    let card = $("<div>")
                    let head = $("<h3>")
                    let dayTemp = $("<p>")
                    let dayWind = $("<p>")
                    let dayHumid = $("<p>")
                    let icon = $("<img>")
                    let iconcode = data.list[8*i-3].weather[0].icon
                    let url = "http://openweathermap.org/img/w/" + iconcode + ".png"
                    
                    card.addClass("card")
                    card.attr("style", "width: 200px;")
                    dayTemp.text("Temp: " + Math.round((data.list[8*i-3].main.temp-273.15)*1.8+32)+" F")
                    dayWind.text("Wind: " + Math.round(data.list[8*i-3].wind.speed*2.236936) + " MPH")
                    dayHumid.text("Humidity: " + data.list[8*i-3].main.humidity + " %")
                    icon.attr("src",url)
                    console.log(data.list[8*i-3].weather[0].icon)
                    head.text(moment.unix(data.list[8*i-3].dt).format("MMM Do, YYYY"))
                    
                    
                    
                    forecast.append(card)
                    card.append(head)
                    card.append(icon)
                    card.append(dayTemp)
                    card.append(dayWind)
                    card.append(dayHumid)

                }
                console.log("finish fetching!!")
                arrayEdit()
                // seriously()
            }) 
            
            // citynames.push(input.value)
            // citynames.reverse()
            // localStorage.setItem("citynames", JSON.stringify(citynames))
            // input.value = ""

            // console.log("start new render")
            
            // render()
            
}

function arrayEdit() {
    if (!citynames.includes(searchthis)) {
        citynames.push(searchthis)
        citynames.reverse()
        localStorage.setItem("citynames", JSON.stringify(citynames))
    }

    console.log("start new render")

    input.value = ""
    render()
}


        
$(function () {
    var UScities = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

 
  $('#input').autocomplete({
    source: UScities,
    minLength : 2,
  });
});

console.log("repeat???")