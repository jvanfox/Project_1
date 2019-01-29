function displayPreviousMatches() {
  var team = $(this).attr("data-name");
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + team;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var resultslink = response.results

    for (var i = 0; i < resultslink.length; i++) {
      
      var previousmatchDiv = $("<div id='previousfive'>");

      var homeTeam = resultslink[i].strHomeTeam;
      var homeScore = resultslink[i].intHomeScore
      var awayScore = resultslink[i].intAwayScore
      var awayTeam = resultslink[i].strAwayTeam;
      var gameDate = resultslink[i].dateEvent;


      var pOne = $("<p>").text(" Date: " + gameDate + " Home " + homeTeam + " " + homeScore + "-" + awayScore + " " + awayTeam + " " + "Away");

      previousmatchDiv.append(pOne);

      $('#previousfive').empty();

      $("#previous-matches").append(previousmatchDiv);
    }
  });
}

$(document).on("click", ".team-btn", displayPreviousMatches);