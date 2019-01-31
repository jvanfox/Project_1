function teamGames(team) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything

    $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=wWzHoatNWzWRMnyAUsFhcO6yNjVXOuAW&keyword=" + team,

    async:true,
    dataType: "json",
    success: function(json) {
                //console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  }).then(function(response) {

      // Printing the entire object to console
      console.log('response', response);

      //var eventName = response._embedded.events[i].name;

      for (var i = 0; i <= 4; i++) {

        var eventName = response._embedded.events[i].name;

        var eventName2 = response._embedded.events[i].dates.start.localDate;

        var eventName3 = response._embedded.events[i].dates.start.localTime;

            // Function makes time appear as standard, not military
            function toStandardTime(militaryTime) {

                var eventName3 = response._embedded.events[i].dates.start.localTime;
    
                militaryTime = militaryTime.split(':');
    
                return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ':' + militaryTime[2] + ' P.M.' : militaryTime.join(':') + ' A.M.'
}

        var eventName3 = toStandardTime(eventName3);

        var eventName4 = response._embedded.events[i].url;

        var nameDiv = $("<div class='name'>");

        var p = $("<p>").text(eventName);

        var p2 = $("<p>").text(eventName2);

        var p3 = $("<p>").text(eventName3);

        var p4 = $("<a>").text("Buy Tickets");

        p4.attr("target", "_blank");
        p4.attr("href", eventName4);

        nameDiv.append(p, p2, p3, p4);

        //$("#team-div").empty();
        $("#team-div").prepend(nameDiv);
        
      }
    });
}

  // Event handler for user clicking the select-artist button
  $("#select-team").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputTeam = $("#team-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    teamGames(inputTeam);
  });

  