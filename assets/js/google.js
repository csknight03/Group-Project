




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

