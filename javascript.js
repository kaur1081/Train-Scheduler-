var firebaseConfig = {
    apiKey: "AIzaSyBvgtip6yliMqyyyAQrblAGJ4XdWtpUcSQ",
    authDomain: "train-73398.firebaseapp.com",
    databaseURL: "https://train-73398.firebaseio.com",
    projectId: "train-73398",
    storageBucket: "train-73398.appspot.com",
    messagingSenderId: "212071156070",
    appId: "1:212071156070:web:273a3fba1a0d0908"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#addTrain").on("click",function(event){
    event.preventDefault();

console.log(database);
var trainName=$("#search-train").val().trim();
var destination=$("#search-destination").val().trim();
var frequency =$("#freqInMin").val().trim();
var trainArival=$("#train-time").val().trim();
   
var newTrainTime = {
    Name: trainName,
    destination: destination,
    frequency:frequency,
    Arival: trainArival
}
database.ref().push(newTrainTime);
});

// clear all
$("#search-train").val("");
$("#search-destination").val("");
$("#freqInMin").val("");
$("#train-time").val("");


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

// Console.loging the last user's data
// console.log(trainSchedule.trainName);
// console.log (trainSchedule.destination);

  var trainName= childSnapshot.val().Name;
  var destination=childSnapshot.val().destination;
  var frequency=childSnapshot.val().frequency;
  var trainArrival=childSnapshot.val().arivalTime;


  var trainTimeConv = moment(firstTrainTime, "hh:mm a").subtract(1, "years");
  var currentToFirst = moment().diff(moment(trainTimeConv), "minutes");
  
  var timeLeft = currentToFirst % frequencyOfTrain;
  var minutesAway = frequencyOfTrain - timeLeft;
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

   // Create the new row
   var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(trainArrival)
   
  );
  $("#train-table > tbody").append(newRow);
   });
