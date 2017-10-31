//var queryURL = "https://bungie.net/Platform/Destiny2/SearchDestinyPlayer/";
var xbox = 1;
var ps = 2;
var apiToken = 'e682b2e62ff9487d908264a092599b61';
var gamertag;
var userPlatform;
var character1;
var character2;
var character3;

$(document).ready(function() {
    $("#gamertagSearch").hide()
    $("#searchButton").hide()
});



$("#xbox").on("click", function() {
    userPlatform = 1
    $(".platforms").hide()
    $("#searchButton").show()
    $("#gamertagSearch").show()
    $("#characters").html("<h5 class='center-align' style='color:red;'>If you do not have a gamertag, try searching for one of the following: </h5>")
    var ul = $("<ul class='center-align' style='color: white;'>")
    ul.append("<li>ii WALZ ii</li>")
    ul.append("<li>Putin Pudding</li>")
    ul.append("<li>Luminusss</li>")
    ul.append("<li>Kurto13</li>")
    $("#characters").append(ul)

})

$("#playstation").on("click", function() {
    userPlatform = 2
    $(".platforms").hide()
    $("#searchButton").show()
    $("#gamertagSearch").show()
    $("#characters").html("<h5 class='center-align'>If you do not have a gamertag, try searching for one of the following: </h5>")
    var ul = $("<ul class='center-align' style='color: white;'>")
    ul.append("<li>gothalion</li>")
    ul.append("<li>NewSam973</li>")
    ul.append("<li>bolla90</li>")
    ul.append("<li>Buddha717</li>")
    $("#characters").append(ul)

})


$("#searchButton").on("click", function() {
    gamertag = $("#gamertag").val()
    for (i = 0; i < gamertag.length; i++) {
        gamertag = gamertag.replace(" ", "%20")
    }
    console.log(gamertag)
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
            // console.log(response)
            // console.log(membershipid)

        var characterIds = {
            "crossDomain": true,
            "url": "https://www.bungie.net/Platform/Destiny2/" + userPlatform + "/Profile/" + membershipid + "/?components=Characters,205",
            "method": "GET",
            "headers": {
                "x-api-key": apiToken,
            }
        }


        $.ajax(characterIds).done(function(response) {
            // console.log(response.Response)

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
                var newCard = "<div class='col s12 m4'><div class='card destiny-card'><div class='card-image'><img class ='emblemBackground' src='https://bungie.net" + emblemBackground + "'><br><span class='card-title gamertag-title'>" + gamertag + "</span></div><div class='card-content destiny-card-content' id='card-content'><p class='truncate classType center-align class-icon-" + characterID + "'>" + classType + "</p><br><p class='light-symbol center-align'>✦ <span class='lightLevel'>" + light + "</span></p><br><p class='center-align time-played'>Time Played: " + minutesPlayed + " minutes</p><h5 class ='center-align'>Equiped Guns</h5><br><div class='row gun-icons-" + characterID + "'></div><h5 class ='center-align'>Equiped Gear</h5><br><div class='row gear-icons-" + characterID + "'></div></div></div></div>"
                $(newCard).append("<p>TEST</p>")
                $("#characters").append(newCard)
                    //console.log(response.Response.characterEquipment.data[characterID].items)
                $.each(response.Response.characterEquipment.data[characterID].items, function(itemKey, itemValue) {
                    //console.log(itemValue.itemHash)
                    var characterEquip = {
                        "crossDomain": true,
                        "url": "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/" + itemValue.itemHash,
                        "method": "GET",
                        "headers": {
                            "x-api-key": apiToken,
                        }
                    }

                    $.ajax(characterEquip).done(function(response) {
                        bucketHash = response.Response.inventory.bucketTypeHash
                        bungieURL = "https://www.bungie.net/"
                        iconURL = bungieURL + response.Response.displayProperties.icon
                        var img = $("<img>")
                        $(img).attr("src", iconURL)
                        $(img).addClass("gear-icons-styling center-align")

                        var col = $("<div>");
                        col.addClass("col s6 center-align")
                        col.append(img)

                        if (bucketHash === 1498876634) {
                            $(".gun-icons-" + characterID).prepend(col)
                            $(col).prepend("<p class='center-align' style='color: grey'>Secondary</p>")

                        } else if (bucketHash === 2465295065) {
                            $(".gun-icons-" + characterID).prepend(col)
                            $(col).prepend("<p class='center-align' style='color: grey'>Primary</p>")
                        } else if (bucketHash === 3448274439) {
                            $(".gear-icons-" + characterID).prepend(col)
                            $(col).prepend("<p class='center-align' style='color: grey'>Helmet</p>")
                        } else if (bucketHash === 3551918588) {
                            $(".gear-icons-" + characterID).prepend(col)
                            $(col).prepend("<p class='center-align' style='color: grey'>Gauntlets</p>")
                        } else if (bucketHash === 14239492) {
                            $(".gear-icons-" + characterID).prepend(col)
                            $(col).prepend("<p class='center-align' style='color: grey'>Chest Piece</p>")
                        } else if (bucketHash === 20886954) {
                            $(".gear-icons-" + characterID).prepend(col)
                            $(col).prepend("<p class='center-align' style='color: grey'>Boots</p>")
                        } else if (bucketHash === 3284755031) {
                            $(".class-icon-" + characterID).prepend(img)
                            $(img).addClass("subclassImage")

                            console.log("AAHH")

                        }







                    })
                })

            })

        });



    });

}