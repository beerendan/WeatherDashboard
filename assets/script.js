let search="";
let town="";
let weather="";
let current="";
let lat="";
let long="";

let local=window.localStorage;

//searched cities and its holder
let searched=[];
let holder=[];

//API keys
const weatherKey= "460fae23bd2d7430796b3dce400149fc";
const mapKey="VlqjssRrcUenmcGjbpPDJxdS6INYZ30G";

//On page load
reset();
//reload();

function reset(){
    $("#info").hide();
    $("#5-day").hide();
    $("#data").hide();
}

function displayAll(){
    $("#info").show();
    $("#5-day").show();
    $("#data");
}

//City search and addition to history of searched cities

function searchEntry(city){
    //MapQuest API is used to return by city instead of co-ordinates
    let mapURL="https://open.mapquestapi.com/geocoding/v1/address?key="+mapKey+"&location="+city;

    fetch(mapURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            current=data;
            let currentName=current.results[0].locations[0].adminArea5;
            let latitude= current.results[0].locations[0].latLng.lat;
            lat=latitude;
            let longitude=current.results[0].locations[0].latLng.lng;
            long=longitude;

            //in case of a blank name return, use user input
            if (currentName==""){
                town=search;
            } else{
                town=currentName;
            }
          
            history(town);
            setDisplay(lat,long);
        })
}

//Function used for re-searching stored cities

function historicalSearch(city){
    let mapURL="https://open.mapquestapi.com/geocoding/v1/address?key="+mapKey+"&location="+city;

    fetch(mapURL).then(function(response){return response.json()})


    .then(function(data){
        current=data;
        let currentName=current.results[0].locations[0].adminArea5
        let latitude= current.results[0].locations[0].latLng.lat;
        lat=latitude;
        let longitude=current.results[0].locations[0].latLng.lng;
        long=longitude;

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
    local.setItem("history",JSON.stringify(searched));
}

//function to check history 
function reload(){
    if (local.length>0){
        holder=JSON.parse(local.getItem("history"));

        for (var i=0; i<holder.length; i++){
            history(holder[i]);
        }
    }
}

//To display the fetched info and call weather API
function setDisplay(lat,long){
    let latitude=lat;
    let longitude= long;
    let weatherURL="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourly,alerts&units=metric&appid="+weatherKey;

    fetch(weatherURL).then(function(response){return response.json()})
    .then(function(data){
        weather=data;
        let today= dayjs().format('MMMM DD, YYYY');

        $("#city").html("<h3>"+town+"("+today+")</h3>");
        let temperature=weather.current.feels_like+" °C";
    })
}
