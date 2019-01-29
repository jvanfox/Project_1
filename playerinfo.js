function displayPlayers() {

  var team = $(this).attr("data-name");

  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=" + team;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
var playerlink = response.player
    
    for (var i = 0; i < playerlink.length; i++) {
    var playerDiv = $("<div id='player'>");
    
    var playername = playerlink[i].strPlayer;
    var playerposition = playerlink[i].strPosition;
    var height = playerlink[i].strHeight;
    var weight = playerlink[i].strWeight;
    var nationality = playerlink[i].strNationality;
    var dateborn = playerlink[i].dateBorn;
    var playerimage= playerlink[i].strThumb;

var playerinfos = $("<p>").text(" Name: " + playername  + " Nationality: " + nationality + " Born: " + dateborn +" Height: " + height + " Weight: " + weight + " Position: " + playerposition);

playerDiv.append(playerinfos);

var image = $("<img>").attr("src", playerimage);

playerDiv.append(image);
    $('#player').empty();

    $("#playerinfo").append(playerDiv);
}
  });
}
$(document).on("click", ".team-btn", displayPlayers);

