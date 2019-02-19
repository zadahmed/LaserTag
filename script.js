
const http = new XMLHttpRequest()

var gjson ;
read();

function update(updateValue){

  updateField = "https://api.thingspeak.com/update?api_key=H0XX8LIOXEQSC7BP&field1="+updateValue;
  http.open("GET", updateField)
  http.send()
}


var updScoreone
var updScoretwo

function read(){

  
  gjson = getJSON("https://api.thingspeak.com/channels/703152/fields/1.json?api_key=GFG0LD6AUT94X0RI&results=1");
  var updScore = JSON.parse(gjson).feeds[0].field1;
  document.getElementById("updateScore").innerHTML = updScore;
  updScoreone = updScore;
  
  readfromDatabase()
  

}

function readfromDatabase(){
var ref = firebase.database().ref('/sounds/');
ref.on('value', function(snapshot) {
  onesond = (snapshot.val().onesound);
  twosond = (snapshot.val().twosound);
  
  if(onesond == false){
    if(updScoreone == 1){
      var audio = new Audio('point.mp3');
      audio.play();
      writeData(true , false , false , false);
    }}
  
    
  if(twosond == false){
    if(updScoreone == 2){
      var audio = new Audio('point.mp3');
      audio.play();
      writeData(false , true , false , false);
    }}


});

}

function readfromDatabaseTwo(){
var ref = firebase.database().ref('/sounds/');
ref.on('value', function(snapshot) {
  onesond = (snapshot.val().onesound);
  twosond = (snapshot.val().twosound);
  threesond = (snapshot.val().threesound);
  foursond = (snapshot.val().foursound)
 
  if(onesond == false){
    if(updScoreone == 1){
      var audio = new Audio('point.mp3');
      audio.play();
      writeData(true , false , false , false);
    }}
  
    
  if(twosond == false){
    if(updScoreone == 2){
      var audio = new Audio('point.mp3');
      audio.play();
      writeData(false , true , false , false);
    }}


  if(threesond == false){
    if(updScoreone == 1){
      var audio = new Audio('point.mp3');
      audio.play();
      writeData(false , false , true , false);
    }}
  
    
  if(foursond == false){
    if(updScoreone == 2){
      var audio = new Audio('point.mp3');
      audio.play();
      writeData(false , false , false , true);
    }}
  


});

}



function writeData(pointonesound , pointtwosound , pointthreesound , pointfoursound) {
  firebase.database().ref('sounds/').set({
    onesound: pointonesound,
    twosound: pointtwosound,
    thirdsound : pointthreesound,
    fourthsound : pointfoursound
  });
}

function readtwoplayer(){

  
  var checkmeone = false;
  
  gjson = getJSON("https://api.thingspeak.com/channels/703152/fields/1.json?api_key=GFG0LD6AUT94X0RI&results=1");
  gjson1 = getJSON("https://api.thingspeak.com/channels/703266/fields/1.json?api_key=A7G7LK9HPPBFIAWF&results=1");

 var updScore = JSON.parse(gjson).feeds[0].field1;
    document.getElementById("updateScore").innerHTML = updScore;
  updScoreone = updScore;

 var updScore2 = JSON.parse(gjson1).feeds[0].field1;
  document.getElementById("updateScore2").innerHTML = updScore2;
  updScoretwo = updScore2;

  readfromDatabaseTwo();
  
  
  setTimeout(won, 500);  
  
  
}


function won(){
    if(updScoreone >= 2){
        updateField = " https://api.thingspeak.com/update?api_key=H0XX8LIOXEQSC7BP&field1=0";
  http.open("GET", updateField)
  http.send();
  count = 0;
    window.location = 'won.html';
    
  }

  if(updScoretwo >= 2){
        updateField = " https://api.thingspeak.com/update?api_key=CE023HIO1CS2G55K&field1=0";
  http.open("GET", updateField)
  http.send()
  counttwo = 0;
      window.location = 'won2.html';

  }
}

function getJSON(url) {
        var resp ;
        var xmlHttp ;

        resp  = '' ;
        xmlHttp = new XMLHttpRequest();

        if(xmlHttp != null)
        {
            xmlHttp.open( "GET", url, false );
            xmlHttp.send( null );
            resp = xmlHttp.responseText;
        }

        return resp ;
    }



