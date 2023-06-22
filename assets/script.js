let search="";
let city="";
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
const geoKey="VlqjssRrcUenmcGjbpPDJxdS6INYZ30G";

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
