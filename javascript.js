var firebaseConfig = {
  apiKey: "AIzaSyDh34CH0DgB-e3DwMeuGjFINpLVq6ELgPM",
  authDomain: "train-scheduler-f5727.firebaseapp.com",
  databaseURL: "https://train-scheduler-f5727.firebaseio.com",
  projectId: "train-scheduler-f5727",
  storageBucket: "",
  messagingSenderId: "85141352130",
  appId: "1:85141352130:web:5347662d962e098c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#addTrain").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#search-train").val().trim();
  var destination = $("#search-destination").val().trim();
  var trainArival = $("#train-time").val().trim();
  var frequency = $("#freqInMin").val().trim();

  var newTrainTime = {
    Name: trainName,
    destination: destination,
    Arival: trainArival,
    frequency: frequency
  }

  database.ref().push(newTrainTime);
});

// clear all
$("#search-train").val("");
$("#search-destination").val("");
$("#train-time").val("");
$("#freqInMin").val("");


database.ref().on("child_added",function (childSnapshot) {


  var trainName = childSnapshot.val().Name;
  var destination = childSnapshot.val().destination;
  var trainArrival = childSnapshot.val().Arival;
  var frequency = childSnapshot.val().frequency;
  

  var trainTimeConv = moment(trainArrival, "hh:mm a").subtract(1, "years");
  console.log("got it!", trainTimeConv)
  var currentToFirst = moment().diff(moment(trainTimeConv), "minutes");

  var timeLeft = currentToFirst % frequency;
  var minutesAway = frequency - timeLeft;
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

console.log(nextArrival);
  
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