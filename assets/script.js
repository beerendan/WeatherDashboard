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
reload();

function reset(){
    $("#info").hide();
    $("#5-day").hide();
    $("#data").hide();
}

function reload(){
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

            //in case of a blank name return, use user input
            if (currentName==""){
                town=search;
            } else{
                town=currentName;
            }
        })
}