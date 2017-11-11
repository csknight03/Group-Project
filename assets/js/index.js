var xbox = 1;
var ps = 2;
var apiToken = 'e682b2e62ff9487d908264a092599b61';
var gamertag;
var userPlatform;
var character1;
var character2;
var character3;
var introMusic = new Audio("assets/audio/warmind.mp3")
introMusic.volume = 0.50;
var errorBanner = "<div class='alert alert-danger' role='alert'>No Destiny Player Found!</div>"
var visited = false
visited = localStorage.getItem("visited")

console.log("User has visited", visited)

$(document).ready(function() {
    introMusic.play()

    if( visited === null){
        console.log("It's false")
        $("#section-2").show()
    
    
        $("#searchButton").hide()
        $("#section-2").hide()
        $("#section-landing").hide()
        setTimeout(function() {
            $(".d2-logo").animate({ 'opacity': '1' }, 3700);
        }, 1000);
        setTimeout(function() {
            $(".scroll").animate({ 'opacity': '1' }, 1000);
        }, 4500);
  
 }else{

    
        $(".d2-logo").animate({ 'opacity': '1' }, 100);
        $(".scroll").animate({ 'opacity': '1' }, 100);
        $("#button1").animate({ 'opacity': '1' }, 100);
        $("#button4").animate({ 'opacity': '1' }, 100);
        $("#button2").animate({ 'opacity': '1' }, 100);
        $("#button5").animate({ 'opacity': '1' }, 100);
        $("#button3").animate({ 'opacity': '1' }, 100);
        $("#button6").animate({ 'opacity': '1' }, 100);
        $(".diamond-shape").addClass("pulse");

        $("#searchBanner").animate({ 'opacity': '1' }, 100);
        $(".platforms").animate({ 'opacity': '1' }, 100);


 }

});


function incorrectSearch() {
    $("#errorMessage").html(errorBanner)
    setTimeout(function() {
        $("#errorMessage").empty();
    }, 1800);

}


// $("#section-1-button").on("click", function(){
// $("#section-2").show()
// })



$(".console-images").on("click", function(event) {
    event.preventDefault()
    userPlatform = $(this).attr("data")
    console.log(userPlatform)
        // $(".platforms").hide()
    $(".platforms").fadeOut()
    $("#searchButton").show()
    setTimeout(function() {
        $("#gamertagSearch").animate({ 'opacity': '1' }, 1000);
    }, 700);
    $("#console-text").html("Enter a Gamertag to View Guardian Loadout")

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
        $("#button4").animate({ 'opacity': '1' }, 1700);
    }, 1000);

    setTimeout(function() {
        $("#button2").animate({ 'opacity': '1' }, 1700);
    }, 1400);
    setTimeout(function() {
        $("#button5").animate({ 'opacity': '1' }, 1700);
    }, 1400);

    setTimeout(function() {
        $("#button3").animate({ 'opacity': '1' }, 1700);
    }, 1800);
    setTimeout(function() {
        $("#button6").animate({ 'opacity': '1' }, 1700);
    }, 1800);


    setTimeout(function() {
        $(".diamond-shape").addClass("pulse");
    }, 2000);


    localStorage.setItem('visted', true)
    localStorage.visited = true;


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

    setTimeout(function() {
        $("#searchBanner").animate({ 'opacity': '1' }, 1000);
    }, 900);
    setTimeout(function() {
        $(".platforms").animate({ 'opacity': '1' }, 1000);
    }, 2000);


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
        // console.log(response)
        // console.log(membershipid)

        if (response.Response[0] == undefined) {
            incorrectSearch()
        } else {
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
                    var newCard = "<div class='col-sm-4'><div class='card destiny-card' style='width: 20rem;'><img class='card-img-top emblemBackground' src='https://bungie.net" + emblemBackground + "'alt='Card image cap'><div class='card-body'><h4 class='card-title gamertag-title'>" + gamertag + "</h4> <div class='destiny-card-content' id='card-content'> <p class='card-text classType text-center class-icon-" + characterID + "'>" + classType + "</p> <p class='light-symbol text-center'>✦ <span class='lightLevel'>" + light + "</span></p><br><p class='text-center time-played'>Time Played: " + minutesPlayed + " minutes</p><div class='row gun-icons-" + characterID + "'></div><div class='row gear-icons-" + characterID + "'></div></div></div>"



                    $(newCard).append("<p>TEST</p>")
                    $("#characters").append(newCard)

                    setTimeout(function() {
                        $(".destiny-card").animate({ 'opacity': '1' }, 1000);
                    }, 2000);

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
                            $(img).addClass("gear-icons-styling text-center")
                            var col = $("<div>");
                            col.addClass("col-sm-6 text-center")
                            col.append(img)
                            if (bucketHash === 1498876634) {
                                $(".gun-icons-" + characterID).prepend(col)
                                $(col).prepend("<p class='text-center' style='color: grey'>Secondary</p>")
                            } else if (bucketHash === 2465295065) {
                                $(".gun-icons-" + characterID).prepend(col)
                                $(col).prepend("<p class='text-center' style='color: grey'>Primary</p>")
                            } else if (bucketHash === 3448274439) {
                                $(".gear-icons-" + characterID).prepend(col)
                                $(col).prepend("<p class='text-center' style='color: grey'>Helmet</p>")
                            } else if (bucketHash === 3551918588) {
                                $(".gear-icons-" + characterID).prepend(col)
                                $(col).prepend("<p class='text-center' style='color: grey'>Gauntlets</p>")
                            } else if (bucketHash === 14239492) {
                                $(".gear-icons-" + characterID).prepend(col)
                                $(col).prepend("<p class='text-center' style='color: grey'>Chest Piece</p>")
                            } else if (bucketHash === 20886954) {
                                $(".gear-icons-" + characterID).prepend(col)
                                $(col).prepend("<p class='text-center' style='color: grey'>Boots</p>")
                            } else if (bucketHash === 3284755031) {
                                $(".class-icon-" + characterID).prepend(img)
                                $(img).addClass("subclassImage")
                            }
                        })
                    })
                })
            });
        }
    });


}