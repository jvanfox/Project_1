var Marquee = function (element, defaults) {
    'use strict';
   
    var elem = document.getElementById(element),
      options = (defaults === undefined) ? {} : defaults,
      continuous = options.continuous || true,    // once or continuous
      delayAfter = options.delayAfter || 1000,    // pause between loops
      delayBefore = options.delayBefore || 0,        // when to start
      direction = options.direction || 'ltr',     // ltr or rtl
      loops = options.loops || -1,
      speed = options.speed || 0.5,
      timer = null,
      milestone = 0,
      marqueeElem = null,
      elemWidth = null,
      self = this,
      ltrCond = 0,
      loopCnt = 0,
      start = 0,
      textcolor = options.textcolor || '#000000', // Define the text color
      bgcolor = options.bgcolor || '#ffffff', // Define the background color
      opacity = options.opacity || 1.0,
      process = null,
      constructor = function (elem) {
   
        // Build html
        var elemHTML = elem.innerHTML;
        var elemNode = elem.childNodes[1] || elem;
        elemWidth = elemNode.offsetWidth;
        marqueeElem = '<div>' + elemHTML + '</div>';
        elem.innerHTML = marqueeElem;
        marqueeElem = elem.getElementsByTagName('div')[0];
        elem.style.overflow = 'hidden';
        marqueeElem.style.whiteSpace = 'nowrap';
        marqueeElem.style.position = 'relative';
        marqueeElem.style.color = textcolor;
        marqueeElem.style.backgroundColor = bgcolor;
        marqueeElem.style.opacity = opacity;
   
        if (continuous === true) {
          marqueeElem.innerHTML += elemHTML;
          marqueeElem.style.width = '1000%';
   
          if (direction === 'ltr') {
            start = -elemWidth;
          }
        } else {
          ltrCond = elem.offsetWidth;
   
          if (direction === 'rtl') {
            milestone = ltrCond;
          }
        }
   
        if (direction === 'ltr') {
          milestone = -elemWidth;
        } else if (direction === 'rtl') {
          speed = -speed;
        }
   
        self.start();
   
        return marqueeElem;
      }
   
    this.start = function () {
      process = window.setInterval(function () {
        self.play();
      });
    };
   
    this.play = function () {
      // beginning
      marqueeElem.style.left = start + 'px';
      start = start + speed;
   
      if (start > ltrCond || start < -elemWidth) {
        start = milestone;
        loopCnt++;
   
        if (loops !== -1 && loopCnt >= loops) {
          marqueeElem.style.left = 0;
        }
      }
    }
   
    this.end = function () {
      window.clearInterval(process);
    }
   
    // Init plugin
    marqueeElem = constructor(elem);
   }
   
   
   new Marquee('marqueeOne', {
    direction: 'rtl',
    bgcolor: 'black',
    textcolor: 'white',
   continuous: true,
   
   });
  
   var teamNames = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago  Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Utah Jazz", "Toronto Raptors", "Washington Wizards"];
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
   function displayFutureMatches() {
     var team = $(this).attr("data-name");
     var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + team;
   console.log(queryURL)
     $.ajax({
       url: queryURL,
       method: "GET"
     }).then(function (response) {
   var eventlink = response.events 
   for (var i = 0; i < eventlink.length; i++) {
       var matchDiv = $("<div id='nextfive'>");
       var matchOne = eventlink[i].strEvent;
       var firstdate = eventlink[i].dateEvent;
       var firsttime = eventlink[i].strTime;
       var mOne = $("<p>").text(" Home " + matchOne + " Away " + " Date: " + firstdate + " Time: " + firsttime);
       matchDiv.append(mOne);
       $('#nextfive').empty();
      $("#match-view").append(matchDiv);
   }
     });
   }
   function renderButtons() {
     $("#buttons").empty();
     for (var i = 0; i < actualTeams.length; i++) {
       var teamBtn = $("<button>");
       teamBtn.addClass("team-btn");
       teamBtn.attr("data-name", actualTeams[i].id);
       teamBtn.text(actualTeams[i].name);
       $("#buttons").append(teamBtn);
     }
   };
   $(document).on("click", ".team-btn", displayFutureMatches);
   renderButtons();
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
   
   
   
   