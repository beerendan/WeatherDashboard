let search="";
let town="";
let forecast="";
let current="";
let lat="";
let long="";

let local=window.localStorage;

//searched cities and its holder
let searched=[];
let holder=[];

//API keys
const weatherKey= "133ac2fd1fb23818bb44d4fc983d0159";
const mapKey="pk.cec264f3752ff9b05b6b154b5308c254";

//On page load

reset();
reload();

function reset(){
    $("#info").hide();
    $("#5-day").hide();
    $("#data").hide();
};

function displayAll(){
    $("#info").show();
    $("#5-day").show();
    $("#data").show();
}

//City search and addition to history of searched cities

function searchEntry(city){
    //MapQuest API is used to return by city instead of co-ordinates
    let mapURL="https://us1.locationiq.com/v1/search?key=" +mapKey+ "&q=" + city + "&format=json&limit=1";

    fetch(mapURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            current=data;
            let cName=data[0].display_name;
            let currentName = cName.split(',')[0];
            let lat= data[0].lat;
            let long=data[0].lon;
            

            //in case of a blank name return, use user input
            if (currentName==""){
                town=city;
            } else{
                town=currentName;
            }
          
            history(town);
            setDisplay(lat, long);
        })
}

//Function used for re-searching stored cities

function historicalSearch(city){
    let mapURL="https://us1.locationiq.com/v1/search?key=" +mapKey+ "&q=" + city+ "&format=json&limit=1";

    fetch(mapURL).then(function(response){return response.json()})
        .then(function(data){
            current=data;
            let cName=data[0].display_name;
            let currentName = cName.split(',')[0];
            let lat= data[0].lat;
            let long=data[0].lon;

        if (currentName==""){
            town=search;
        } else{
            town=currentName;
        }
      setDisplay(lat,long);
    })
}

//History button function
function history(label){
    var button=document.createElement("Button");
    $(button).html(label);
    $(button).addClass("btn btn-secondary");
    $("#split").prepend(button);

    $(button).click(() =>{
        historicalSearch(label);
        displayAll();
    }
    )
    searched.push(label);
    local.setItem('searched',JSON.stringify(searched));
}

//function to check history 
function reload(){
    if (local.length > 0){
        holder=JSON.parse(local.getItem("searched"));

        if (holder !== null && Array.isArray(holder)) {
            for (var i = 0; i < holder.length; i++) {
              history(holder[i]);
            }}
    };
}

//To display the fetched info and call weather API
function setDisplay(lat,long){
    let lati=lat;
    let longi= long;
    let weatherURL="https://api.openweathermap.org/data/3.0/onecall?lat=" + lati + "&lon=" + longi+ "&appid="+ weatherKey+ "&units=metric";

    fetch(weatherURL).then(function(response){return response.json()})
    .then(function(data){
        forecast=data;
        const date=dayjs();
        const today= dayjs().format('MMMM DD, YYYY');

        $("#city").html("<h3>"+town+"("+today+")</h3>");
        
        let temperature=data.current.temp+"°C";
        let wind=data.current.wind_speed+"km/h";
        let humidity=data.current.humidity+"%";

        $("#temperature").html("Temp:"+temperature);
        $("#wind").html("Wind:"+wind);
        $("#moist").html("Humidity:"+humidity);

        //Setting values for each of the 5 days

        let day1=forecastDate(date,1);
        let icon1=forecast.daily[0].weather[0].icon;
        let why="Temp: " +forecast.daily[0].temp.day+ "°C";
        let wind1="Wind: "+forecast.daily[0].wind_speed+"km/h";
        let humidity1="Humidity: "+forecast.daily[0].humidity+"%";

        $("#day1").html(day1);
        $("#icon1").html("<img src='https://openweathermap.org/img/wn/" +icon1+ "@2x.png'>");
        $("#temp1").html(why);
        $("#wind1").html(wind1);
        $("#humidity1").html(humidity1);

        
        let day2=forecastDate(date,2);
        let icon2=forecast.daily[1].weather[0].icon;
        let temperature2="Temp: "+forecast.daily[1].feels_like.day+"°C";
        let wind2="Wind: "+forecast.daily[1].wind_speed+"km/h";
        let humidity2="Humidity: "+forecast.daily[1].humidity+"%";

        $("#day2").html(day2);
        $("#icon2").html("<img src='https://openweathermap.org/img/wn/" +icon2+ "@2x.png'>");
        $("#temp2").html(temperature2);
        $("#wind2").html(wind2);
        $("#humidity2").html(humidity2);

        
        let day3=forecastDate(date,3);
        let icon3=forecast.daily[2].weather[0].icon;
        let temperature3="Temp: "+forecast.daily[2].feels_like.day+"°C";
        let wind3="Wind: "+forecast.daily[2].wind_speed+"km/h";
        let humidity3="Humidity: "+forecast.daily[2].humidity+"%";

        $("#day3").html(day3);
        $("#icon3").html("<img src='https://openweathermap.org/img/wn/" +icon3+ "@2x.png'>");
        $("#temp3").html(temperature3);
        $("#wind3").html(wind3);
        $("#humidity3").html(humidity3);

        
        let day4=forecastDate(date,4);
        let icon4=forecast.daily[3].weather[0].icon;
        let temperature4="Temp: "+forecast.daily[3].feels_like.day+"°C";
        let wind4="Wind: "+forecast.daily[3].wind_speed+"km/h";
        let humidity4="Humidity: "+forecast.daily[3].humidity+"%";

        $("#day4").html(day4);
        $("#icon4").html("<img src='https://openweathermap.org/img/wn/" +icon4+ "@2x.png'>");
        $("#temp4").html(temperature4);
        $("#wind4").html(wind4);
        $("#humidity4").html(humidity4);

        
        let day5=forecastDate(date,5);
        let icon5=forecast.daily[4].weather[0].icon;
        let temperature5="Temp: "+forecast.daily[4].feels_like.day+"°C";
        let wind5="Wind: "+forecast.daily[4].wind_speed+"km/h";
        let humidity5="Humidity: "+forecast.daily[4].humidity+"%";

        $("#day5").html(day5);
        $("#icon5").html("<img src='https://openweathermap.org/img/wn/" +icon5+ "@2x.png'>");
        $("#temp5").html(temperature5);
        $("#wind5").html(wind5);
        $("#humidity5").html(humidity5);
    })
}

//Seach button click functionality
$("#search-btn").click(()=>{
    search=$("#search-bar").val();
    $("#search-bar").val();
    if (search == null) {
        console.log("Invalid Entry.");
    }else{
    searchEntry(search);
    displayAll();
}
})

//To get the date for the requested forecast
function forecastDate(now, added){
    let pulled=now;
    let theDay = dayjs(pulled).add(added, "days");
    let future = dayjs(theDay).format('MMMM DD, YYYY');
    return future;
}