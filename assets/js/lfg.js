

$("form").hide()

$("#post-section").hide()



$(document).ready(function() {

    var introMusic = new Audio("assets/audio/destiny3.mp3")
    introMusic.volume = 0.80;

    introMusic.play()


    setTimeout(function() {
        $(".scroll").animate({ 'opacity': '1' }, 1000);
    }, 1500);

    setTimeout(function() {
        $("#video_overlays").animate({ 'opacity': '1' }, 1000);
    }, 900);

    var app = document.getElementById('app');
    
    var typewriter = new Typewriter(app, {
        loop: true
    });
    
    typewriter.typeString('Looking For a...')
        .pauseFor(900)
        .deleteChars(3)
        .typeString(' Raid Group')
        .pauseFor(900)
        .deleteChars(11)
        .typeString(' Trials God')
        .pauseFor(900)
        .deleteChars(11)
        .typeString(' Companion!')
        .pauseFor(900)
        .deleteChars(10)
        .typeString(' Scrub!')
        .pauseFor(900)
        .deleteChars(7)
        .typeString(' Sherpa!')
        .pauseFor(900)
        .deleteChars(8)
        .start();
 
})

$(document).ready(function() {
    /////////////////////////////////////////////////// FINDING THEIR TIMEZONE //////////////////////////////////////////////////////////////////


    var apiToken = 'AIzaSyDtUUkK_kOHvU4kydOumNbizpvmpfMlXQw'
    var lat;
    var long;
    var condition = false;
    var userTimezone;


    ///////////////////// //////////////////////Gathering a users Lat and Long //////////////////////////////////////////////////////////////////


    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction);
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }

    function successFunction(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        condition = true;
        console.log('Your latitude is :'+lat+' and longitude is '+long);

        var GoogleSettings = {
            "crossDomain": true,
            "url": "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+long+"&timestamp=1331161200&key=" + apiToken,
            "method": "GET",
          }

                if(condition === true){
                        $.ajax(GoogleSettings).done(function(response) {
                                userTimeZone= response.timeZoneName
                                console.log(userTimeZone)


                        })

                    }
            }


            

            //////////////////////////////////////////////////  END OF TIMEZONE FUNCTIONS //////////////////////////////////////////////////////

            })



            var hashTagActive = "";
            $("#landing-button").on("click touchstart", function(event) {

                $("#post-section").show()

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
                    $("#lfgBanner").animate({ 'opacity': '1' }, 1800);
                }, 900);
            
                $("#landing-page").hide()
            
            });
            





$(".scroll").on("click", function() {
    $("form").show(1000)
    $(".scroll").animate({ 'opacity': '0' }, 1000);
})


$("#createPost").on("click", function() {
    $("form").hide(1000)
    $(".scroll").animate({ 'opacity': '1' }, 1300);
})

var config = {
    apiKey: "AIzaSyB-tuh7WWk1RjVusPVjwZtct2otux6oxNk",
    authDomain: "destiny-app-733b5.firebaseapp.com",
    databaseURL: "https://destiny-app-733b5.firebaseio.com",
    projectId: "destiny-app-733b5",
    storageBucket: "destiny-app-733b5.appspot.com",
    messagingSenderId: "533048400036"
};
firebase.initializeApp(config);

var database = firebase.database()


//////////   LOAD INFORMATION FROM THE DATABASE ///////////////////////////

database.ref().on("child_added", function(snapshot) {

    var user = snapshot.val();
    var emblemBackground = user.emblemBackground
    var gamertag = user.gamertag

    var lightLevel = user.lightLevel;
    var activity = user.activity;
    var mic = user.mic
    var lookingfor = user.lookingfor;
    var emblemBackground = user.emblemBackground;
    var characterID = user.characterID;
    var classType = user.classType;
    var userMessage = user.userMessage;
    var timeZone = user.timeZone;
    

    if (mic === 'Yes'){
        mic = "<i class='fa fa-microphone' aria-hidden='true' style='color:#5FD2D3'></i>"
    } else if( mic === 'No' || mic === 'I have a Mic...' ){
        mic = "<i class='fa fa-microphone-slash' aria-hidden='true'  style='color: red'></i>"
    }

    var col = $("<div>")
    col.addClass("col-4  post-card")
    var newCard = "<div class='card' style='width: 20rem; background-color: rgba(30, 30, 30, 0.8);'><div class='card-img-top  justify-content-center text-center'  style= 'background-image: url(http://bungie.net/"+ emblemBackground + ")'><div class='row   justify-content-center text-center'><div class='col-sm-12'><div class='card-title'><h4>"+gamertag+"</h4></div></div></div><div class='row justify-content-center text-center' style='margin-top: 1rem;'><div class='col-sm-4' style='font-size: 20px;'>"+mic+"</div><div class='col-sm-4 char-class ' style='color: white; '><h6>"+ classType +"</h6></div><div class='col-sm-4 ' style='color: gold; '><h6>✦ <span class='lightLevel'>" + lightLevel + "</span></h6></div><div class='col-12' style='color: red; font-size: 25px;'>"+ activity+ "<hr></div><hr></div></div><div class='card-block ' style='color: white; '><p class='card-text' id='userMessage' style='margin-top: 50%;'>" + userMessage + "</p></div><hr><div class='row justify-content-center text-center bottom-row' style='padding: 5%;'><div class='col-12'>"+timeZone+"</div><div class='col-12'>Looking For: <span style='color: red;'>"+lookingfor+"</span></div></div></div></div></div>"
    col.append(newCard)
    $("#submittedPosts").prepend(col)
    $(".card").fadeIn(1000)

});




///////////////  ADD INFO TO THE DATA BASE//////////////////////////////

$("#createPost").on("click", addPost)

function addPost(event) {
    event.preventDefault()

    var gamertag = $("#gamertag").val()
    var userPlatform = 1;
    var apiToken = 'e682b2e62ff9487d908264a092599b61';

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
            var chars = response.Response.characters.data
            var key = Object.keys(chars)[0]
            var char = chars[key]

            console.log(char)


            var emblemBackground = char.emblemBackgroundPath
            var dateLastPlayed = char.dateLastPlayed
            var lightLevel = char.light;
            var classType = char.classType
                //var lightLevel =  $("#lightlevel").val()
            var mic = $("#mic").val()
            var lookingfor = $("#lookingfor").val()
            var activity = $("#activity").val()
            var userMessage = $("#userMessage").val()

            // if(lightLevel.length === 0 ){
            //     lighLevel = 'Unknown'
            // }

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

                    


            database.ref().push({
                gamertag: gamertag,
                lightLevel: lightLevel,
                activity: activity,
                mic: mic,
                lookingfor: lookingfor,
                emblemBackground: emblemBackground,
                classType: classType,
                userMessage: userMessage,
                timeZone: userTimeZone

            });




        })
    });



}