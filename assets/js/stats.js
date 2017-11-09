var xbox = 1;
var ps = 2;
var apiToken = 'e682b2e62ff9487d908264a092599b61';
var gamertag;
var userPlatform;
var character1;
var character2;
var character3;
var introMusic = new Audio("assets/audio/No Mercy.mp3")
introMusic.volume = 0.50;





$(document).ready(function() {
    introMusic.play()
    $("#gamertagSearch").hide()
    $("#searchButton").hide()
    $("#restartButton").hide()
    $("#section-2").hide()
    $("#section-landing").hide()
        setTimeout(function() {
        $("#searchBanner").animate({ 'opacity': '1' }, 1000);
    }, 900);
    setTimeout(function() {
        $(".platforms").animate({ 'opacity': '1' }, 1000);
    }, 2000);
//     setTimeout(function() {
//         $(".d2-logo").animate({ 'opacity': '1' }, 3700);
//     }, 1000);
//     setTimeout(function() {
//         $(".scroll").animate({ 'opacity': '1' }, 1000);
//     }, 4500);
//         $(".diamond-shape2").addClass("pulse");   
});

function restartSearch() {
    $("#gamertagSearch").hide()
    $("#searchButton").hide()
    $("#restartButton").hide()
    $("#section-2").hide()
    $("#section-landing").hide()
    $("#characters").empty()
    $("#characters").animate({ 'opacity': '0' });
        setTimeout(function() {
        $("#searchBanner").animate({ 'opacity': '1' }, 1000);
    }, 900);
    setTimeout(function() {
        $(".platforms").show().animate({ 'opacity': '1' }, 1000);
    });
}



$(".console-images").on("click", function(event) {
    event.preventDefault()
    userPlatform = $(this).attr("data")
    setTimeout(function() {
        $(".platforms").animate({ 'opacity': '0' }, 1000);
    });
    setTimeout(function() {
        $(".platforms").hide();
    }, 900);
    setTimeout(function() {
        $("#searchButton").show().animate({ 'opacity': '1' }, 1000);
    }, 1000);
    setTimeout(function() {
        $("#restartButton").show().animate({ 'opacity': '1' }, 1000);
    }, 1000);
    setTimeout(function() {
        $("#gamertagSearch").show().animate({ 'opacity': '1' }, 1000);
    }, 1000);
})


$("#searchButton").on("click", function() {
    $("#characters").animate({ 'opacity': '0' });
    gamertag = $("#gamertag").val()
    for (i = 0; i < gamertag.length; i++) {
        gamertag = gamertag.replace(" ", "%20")
    }
    characterFind();
})

$("#restartButton").on("click", function() {
    restartSearch();
})

// $("#searchButton").on("click", characterFind)



function characterFind() {
    $("#characters").empty()

    var settings = {
        crossDomain: true,
        url: "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/" + userPlatform + "/" + gamertag,
        method: "GET",
        headers: {
            "x-api-key": apiToken,
        }
    }

    $.ajax(settings).done(function(response) {
        var membershipid = response.Response[0].membershipId

        var characterIds = {
            crossDomain: true,
            url: "https://www.bungie.net/Platform/Destiny2/" + userPlatform + "/Profile/" + membershipid + "/?components=Characters,205",
            method: "GET",
            headers: {
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
                
                var newCard = "<div class='col-sm-4'><div class='card destiny-card' style='width: 20rem;'>"
                + "<div class='card-img-caption'><p class='card-text shadow-text text-white'>" + gamertag + "</p>"
                + "<img class='card-img-top emblemBackground' src='https://bungie.net" + emblemBackground + "'alt='Card image cap'></div>"
                + "<div class='card-body'><h4 class='card-title gamertag-title'>" + gamertag + "</h4>"
                + "<div class='destiny-card-content' id='card-content'> <p class='card-text classType text-center class-icon-" + characterID + "'>" 
                + classType + "</p> <p class='light-symbol text-center'>✦ <span class='lightLevel'>" + light 
                + "</span></p><br>"
                + "<div class='container diamond-shape3'><div class='item-count3 stats-text' id='win-percentage-" + characterID + "'></div></div><br><hr class='thin'>"
                + "<div class='text-center stats-row' id='combat-rating-" + characterID + "'></div>"
                + "<div class='text-center stats-row' id='kd-ratio-" + characterID + "'></div>"
                + "<div class='text-center stats-row' id='efficiency-" + characterID + "'></div><br><br><hr class='thin'>"
                + "<div class='text-center weapon-row' id='best-weapon-" + characterID + "'></div>"
                + "<div id='weapon-image-" + characterID + "'></div>"
                + "</div></div></div></div>"
                
                $("#characters").append(newCard);

                setTimeout(function() {
                    $("#characters").animate({ 'opacity': '1' }, 1000);
                });
                
            
            var characterStat = {
                crossDomain: true,
                url:  "https://www.bungie.net/Platform/Destiny2/"+userPlatform+"/Account/"+membershipid+"/Character/"+characterID+"/Stats/?modes=39",
                method: "GET",
                headers: {
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
                var wpRounded = winPercentage.toFixed(2);
                // assists = stats.assists.basic.displayValue
                // deathDistance = stats.averageDeathDistance.basic.displayValue
                // killDistance = stats.averageKillDistance.basic.displayValue
                var totalDeaths = stats.deaths.basic.displayValue
                var totalKills = stats.kills.basic.displayValue
                var kdRatio = (totalKills/totalDeaths).toFixed(2);
                var combatRating = stats.combatRating.basic.displayValue
                var efficiency = stats.efficiency.basic.displayValue
                var bestWeapon = stats.weaponBestType.basic.displayValue
                var weaponNumber = stats.weaponBestType.basic.value
                
                console.log(gamesPlayed)
                console.log(characterID)
                console.log(stats)

                

                // $("#games-played-" + characterID).html("<span style='font-size: 9px;'>Games Played:</span><br>" + gamesPlayed);
                $("#win-percentage-" + characterID).html("<span style='font-size: 18px; line-height: 0.5;'>Win %</span><br>" + (wpRounded * 100));
                $("#combat-rating-" + characterID).html("<span style='font-size: 11px; color: #d3d3d3'>CR</span><br>" + combatRating);
                $("#kd-ratio-" + characterID).html("<span style='font-size: 11px; color: #d3d3d3'>KD</span><br>" + kdRatio);
                $("#efficiency-" + characterID).html("<span style='font-size: 11px; color: #d3d3d3'>Efficiency</span><br>" + efficiency);
                $("#best-weapon-" + characterID).html("<span style='font-size: 11px; color: #d3d3d3'>Best Weapon</span><br>" + bestWeapon);


                if (weaponNumber == 1) {
                        $("#weapon-image-" + characterID).append("<img class=fillheight src='https://destiny.wiki.fextralife.com/file/Destiny/auto_rifle_icon.png'>");
                    } else if (weaponNumber == 6) {
                        $("#weapon-image-" + characterID).append("<img class=fillheight src='https://destiny.wiki.fextralife.com/file/Destiny/vanguard-pulse-rifle.png'>");
                    } else if (weaponNumber == 11) {
                        $("#weapon-image-" + characterID).append("<img class=fillheight src='https://destiny.wiki.fextralife.com/file/Destiny/vanguard-hand-cannon.png'>");
                    } else if (weaponNumber == 3) {
                        $("#weapon-image-" + characterID).append("<img class=fillheight src='https://destiny.wiki.fextralife.com/file/Destiny/Scout_Rifle_Icon_1.png'>");
                    } else if (weaponNumber == 9) {
                        $("#weapon-image-" + characterID).append("<img class=fillheight src='https://destiny.wiki.fextralife.com/file/Destiny/Rocker_Launcher_Icon_1.png'>");

                    }
                })
            })
        });
    });
}