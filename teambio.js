function displayTeamBio() {
    var team = $(this).attr("data-name");
    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + team;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var teamlink = response.teams
        var teambioDiv = $("<div id='teambioinfo'>");

        var teamname = teamlink[0].strTeam;
        var teamyear = teamlink[0].intFormedYear;
        var stadium = teamlink[0].strStadium;
        var headcoach = teamlink[0].strManager;
        var teamlogo = teamlink[0].strTeamBadge;

        var teaminfos = $("<p>").text(" Team Name: " + teamname + " " + " Formed: " + teamyear + " " + " Stadium: " + stadium + " " + "Head Coach:" + headcoach)

        teambioDiv.append(teaminfos);

        var teamlogoimage = $("<img>").attr("src", teamlogo);

        teambioDiv.append(teamlogoimage);
        $('#teambioinfo').empty();

        $("#teaminfo").append(teambioDiv);

    });
}
$(document).on("click", ".team-btn", displayTeamBio);