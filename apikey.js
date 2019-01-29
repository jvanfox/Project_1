//create variable named topics to contain string of arrays
var teamNames = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago  Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Utah Jazz", "Toronto Raptors", "Washington Wizards"];
// Initial array of team codes
var teamId = ["134880", "134860", "134861", "134881","134870", "134871", "134875", "134885", "134872", "134865", "134876", "134873", "134866", "134867", "134877", "134882", "134874", "134886", "134878", "134862", "134887", "134883", "134863", "134868", "134888", "134869", "134879", "134889","134864", "134884" ];


var actualTeams = []

for (i=0 ; i<teamId.length; i++){
  
  var teamObj = {
    "id": teamId[i],
    "name": teamNames[i]
  }
actualTeams.push(teamObj)
}
console.log(actualTeams);



// displayFutureMatches function re-renders the HTML to display the appropriate content
function displayFutureMatches() {
  var team = $(this).attr("data-name");
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + team;
console.log(queryURL)
  // Creating an AJAX call for the specific team button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
var eventlink = response.events 
for (var i = 0; i < eventlink.length; i++) {
    // Creating a div to hold the next 5 matches
    var matchDiv = $("<div class='nextfive'>");
  
    // Storing the first game
    var matchOne = eventlink[i].strEvent;
    var firstdate = eventlink[i].dateEvent;
    var firsttime = eventlink[i].strTime;

    // Creating an element to have the First Game
    var mOne = $("<p>").text(" Home " + matchOne + " Away " + " Date: " + firstdate + " Time: " + firsttime);

    // Displaying the first game
    matchDiv.append(mOne);

    // Deleting the movies prior to adding new movies
    $('.nextfive').empty();
    // Putting the entire five matches above the previous movies
   $("#match-view").append(matchDiv);
}

  });
}

function renderButtons() {
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons").empty();
  // Looping through the array of movies
  for (var i = 0; i < actualTeams.length; i++) {
    var teamBtn = $("<button>");
    teamBtn.addClass("team-btn");
    teamBtn.attr("data-name", actualTeams[i].id);

    teamBtn.text(actualTeams[i].name);
    // Adding the button to the buttons-view div
    $("#buttons").append(teamBtn);
  }
};

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".team-btn", displayFutureMatches);
// Calling the renderButtons function to display the intial buttons
renderButtons();
