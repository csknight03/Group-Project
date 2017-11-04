var xbox = 1;
var ps = 2;
var apiToken = 'e682b2e62ff9487d908264a092599b61';
var gamertag;
var userPlatform;
var character1;
var character2;
var character3;
var introMusic = new Audio("assets/audio/intro.mp3")
introMusic.volume = 0.09;

$(document).ready(function() {
    introMusic.play()
    $("#gamertagSearch").hide()
    $("#searchButton").hide()
    $("#section-2").hide()
    $("#section-landing").hide()
    setTimeout(function() {
        $(".d2-logo").animate({ 'opacity': '1' }, 3700);
    }, 1000);
    setTimeout(function() {
        $(".scroll").animate({ 'opacity': '1' }, 1000);
    }, 4500);
    
    
});


// $("#section-1-button").on("click", function(){
// $("#section-2").show()
// })



$(".console-images").on("click", function(event) {
    event.preventDefault()
    userPlatform = $(this).attr("data")
    $(".platforms").hide()
    $("#searchButton").show()
    $("#gamertagSearch").show()
})

var hashTagActive = "";
$("#section-1-button").on("click touchstart", function(event) {
    $("#section-landing").show()
    if (hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
        event.preventDefault();
        //calculate destination place
        var dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({
            scrollTop: dest
        }, 600, 'swing');
        hashTagActive = this.hash;
    }

    setTimeout(function() {
        $("#button1").animate({ 'opacity': '1' }, 1700);
    }, 1000);

    setTimeout(function() {
        $("#button2").animate({ 'opacity': '1' }, 1700);
    }, 1400);

    setTimeout(function() {
        $("#button3").animate({ 'opacity': '1' }, 1700);
    }, 1800);


});

var hashTagActive = "";
$("#gearButton").on("click touchstart", function(event) {
    $("#section-2").show()
    if (hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
        event.preventDefault();
        //calculate destination place
        var dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({
            scrollTop: dest
        }, 600, 'swing');
        hashTagActive = this.hash;
    }


});


var hashTagActive = "";
$("#lfgButton").on("click touchstart", function() {
    if (hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
        //calculate destination place
        var dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({
            scrollTop: dest
        }, 600, 'swing');
        hashTagActive = this.hash;
    }

});


$("#searchButton").on("click", function() {
    gamertag = $("#gamertag").val()
    for (i = 0; i < gamertag.length; i++) {
        gamertag = gamertag.replace(" ", "%20")
    }
})

$("#searchButton").on("click", characterFind)



function characterFind() {
    $("#characters").empty()

    var settings = {
        "crossDomain": true,
        "url": "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/" + userPlatform + "/" + gamertag,
        "method": "GET",
        "headers": {
            "x-api-key": apiToken,
        }
    }


            $.ajax(settings).done(function(response) {
                var membershipid = response.Response[0].membershipId

                var characterIds = {
                    "crossDomain": true,
                    "url": "https://www.bungie.net/Platform/Destiny2/" + userPlatform + "/Profile/" + membershipid + "/?components=Characters,205",
                    "method": "GET",
                    "headers": {
                        "x-api-key": apiToken,
                    }
                }


                                $.ajax(characterIds).done(function(response) {

                                    $.each(response.Response.characters.data, function(key, value) {
                                        var emblemBackground = value.emblemBackgroundPath
                                        var dateLastPlayed = value.dateLastPlayed
                                        var dateLastPlayed = dateLastPlayed.slice(0, -10);
                                        var light = value.light;
                                        var classType = value.classType
                                        var minutesPlayed = value.minutesPlayedTotal
                                        var characterID = key
                                        

                                    

                                        if (classType === 0) {
                                            classType = "Titan"
                                        } else if (classType === 1) {
                                            classType = "Hunter"
                                        } else if (classType === 2) {
                                            classType = "Warlock"
                                        }
                                        for (i = 0; i < gamertag.length; i++) {
                                            gamertag = gamertag.replace("%20", " ")
                                        }
                                        
                                        var newCard = "<div class='col-sm-4'><div class='card destiny-card' style='width: 20rem;'><img class='card-img-top emblemBackground' src='https://bungie.net" + emblemBackground + "'alt='Card image cap'><div class='card-body'><h4 class='card-title gamertag-title'>" + gamertag + "</h4> <div class='destiny-card-content' id='card-content'> <p class='card-text classType text-center class-icon-" + characterID + "'>" + classType + "</p> <p class='light-symbol text-center'>✦ <span class='lightLevel'>" + light + "</span></p><br><p class='text-center time-played'>Time Played: " + minutesPlayed + " minutes</p><div class='row gun-icons-" + characterID + "'></div><div class='row gear-icons-" + characterID + "'></div></div></div>"
                                        $("#characters").append(newCard)

                                        
                                                                var characterStat = {
                                                                    "crossDomain": true,
                                                                    "url":  "https://www.bungie.net/Platform/Destiny2/"+userPlatform+"/Account/"+membershipid+"/Character/"+characterID+"/Stats/?modes=39",
                                                                    "method": "GET",
                                                                    "headers": {
                                                                        "x-api-key": apiToken,
                                                                    }
                                                                }
                                                                $.ajax(characterStat).done(function(response) {
                                                                    bungieURL = "https://www.bungie.net/"
                                                                    var stats = response.Response["trialsofthenine"]["allTime"]
                                                                    var img = $("<img>")
                                                                    $(img).addClass("gear-icons-styling text-center")
                                                                    var col = $("<div>");
                                                                    col.addClass("col-sm-6 text-center")
                                                                    col.append(img)

                                                                    console.log(stats)

                                                                    var gamesPlayed = stats.activitiesEntered.basic.displayValue
                                                                    var gamesWon = stats.activitiesWon.basic.displayValue
                                                                    var winPercentage = gamesWon/gamesPlayed
                                                                    var assists = stats.assists.basic.displayValue
                                                                    var deathDistance = stats.averageDeathDistance.basic.displayValue
                                                                    var killDistance = stats.averageKillDistance.basic.displayValue
                                                                    var totalDeaths = stats.death.basic.displayValue
                                                                    var totalKills = stats.kills.basic.displayValue
                                                                    var efficiency = stats.efficiency.basic.displayValue
                                                                    
                                                                    console.log(gamesPlayed)


                                                                })
                                            })
                           });
           });

}