$("form").hide()


$(document).ready(function() {

    setTimeout(function() {
        $(".scroll").animate({ 'opacity': '1' }, 1000);
    }, 1500);
})

$(".scroll").on("click", function(){
    $("form").show(1000)
    $(".scroll").animate({ 'opacity': '0' }, 1000);
})


$("#createPost").on("click", function(){
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

            var col = $("<div>")
            col.addClass("col-4  post-card")
            var newCard = "<div class='card' style='width: 20rem;'><img class='card-img-top emblemBackground' src='https://bungie.net" + emblemBackground + "'alt='Card image cap'><div class='card-body'><h4 class='card-title gamertag-title'>" + gamertag + "</h4> <div class='destiny-card-content' id='card-content'> <p class='card-text classType text-center'>" + classType + "</p> <p class='light-symbol text-center'>✦ <span class='lightLevel'>" + lightLevel + "</span></p><p id='userMessage'>"+userMessage+"</p></div></div></div>"
            col.append(newCard)
            $("#submittedPosts").append(col)

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
                var mic =  $("#mic").val()
                var lookingfor =  $("#lookingfor").val()
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
                    userMessage: userMessage

                });




            })
        });


 




}
