let fab1 = document.getElementById('fab1');
let innerFabs = document.getElementsByClassName('inner-fabs')[0];

fab1.addEventListener('click', function () {
  innerFabs.classList.toggle('show');
});

demo_events = [

]

var CLIENT_ID = '907096733100-qb5gn17ah4bfpe0lfsoqq43a8o4vppr7.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBEShUsEI41DPCkc_Y_e_cLiy8Kzy06L3o';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
event_start = [];
event_end = [];
event_name = [];

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyBEShUsEI41DPCkc_Y_e_cLiy8Kzy06L3o',
    clientId: '907096733100-qb5gn17ah4bfpe0lfsoqq43a8o4vppr7.apps.googleusercontent.com',
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
    console.log(get_event_start());
    console.log(get_event_end());
    console.log(get_event_name());
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  window.location.href = 'login.html';
}

function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function get_event_start() {
  return this.event_start;
}

function get_event_end() {
  return this.event_end;
}

function get_event_name() {
  return this.event_name;
}

function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 100,
    'orderBy': 'startTime'
  }).then(function(response) {

    var events = response.result.items

    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ExyGUG26TxUJ2jSEetnL4IuJhIv3axQm&city=Ann%20Arbor', true)
    var test;
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      if(request.status >= 200 && request.status < 400) {

        document.getElementById('event').innerHTML = data._embedded.events[0].name
        document.getElementById('start').innerHTML = data._embedded.events[0].dates.start.localDate
        document.getElementById('end').innerHTML = data._embedded.events[0].dates.start.localDate

        document.getElementById('interested').onclick = function() {
          console.log(data._embedded.events)
          var result = data._embedded.events[0].dates.start.dateTime
          console.log(result);
          var event = {
            'summary': document.getElementById('event').innerHTML,
            'start': {
              'dateTime': result
            },
            'end': {
              'dateTime': result
            }
          };

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
          });

          console.log(request);

          request.execute(function(event) {
            console.log(event);
            appendPre('Event created: ' + event.htmlLink);
            test = event.htmlLink;
          })
          data._embedded.events.shift()

          document.getElementById('event').innerHTML = data._embedded.events[0].name
          document.getElementById('start').innerHTML = data._embedded.events[0].dates.start.localDate
          document.getElementById('end').innerHTML = data._embedded.events[0].dates.start.localDate



        }
        document.getElementById('not_interested').onclick = function() {
          data._embedded.events.shift()
          document.getElementById('event').innerHTML = data._embedded.events[0].name
          document.getElementById('start').innerHTML = data._embedded.events[0].dates.start.localDate
          document.getElementById('end').innerHTML = data._embedded.events[0].dates.start.localDate

        }

      }
    }
    // Send request
    request.send()



    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ],
      })

    calendar.render();



    my_events = []
    var obj = {}
    showData(calendar, events, obj)

    //appendPre('Upcoming events:');
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        len = event.length;
        var when = event.start.dateTime;
        var when2 = event.end.dateTime;
        if (!when) {
          when = event.start.date;
        }
        event_start.push(event.start.dateTime.substring(0,10));
        event_end.push(event.end.dateTime.substring(0,10));
        event_name.push(event.summary);
        //appendPre(event.summary + ' (' + when + ')' + '(' + when2 + ')')
      }
    }
      else {
      appendPre('No upcoming events found.');
      }
            document.getElementById('interested').onclick = function() {
              console.log(data._embedded.events)
              var event = {
                'summary': document.getElementById('event').innerHTML,
                'start': {
                  'dateTime': document.getElementById('start').innerHTML
                },
                'end': {
                  'dateTime': document.getElementById('end').innerHTML,
                }
              };

              var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
              });

              console.log(request);

              request.execute(function(event) {
                console.log(event);
                appendPre('Event created: ' + event.htmlLink);
                test = event.htmlLink;
              })

            }
          })
        }

window.navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords.longitude)
  console.log(pos.coords.latitude)
})

function showData(calendar, events, obj) {
  for(var i = 0; i < events.length; i++) {
    //console.log(events[i])
    obj["title"] = events[i].summary
    obj["start"] = events[i].start.dateTime.substring(0, 10)
    obj["end"] = events[i].end.dateTime.substring(0, 10)
    my_events.push(obj)
    calendar.addEvent(obj)
    //console.log(obj)
  }
}

$(document).ready(function(){
  $('form input').change(function () {
    $('form p').text(this.files.length + " file(s) selected");
  });

  $('input[type=file]').on("change", function() {

    var $files = $(this).get(0).files;

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        return false;
      }

      // Begin file upload
      console.log("Uploading file to Imgur..");

      // Replace ctrlq with your own API key
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = 'd9329d0db2f41bc';

      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };

      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function(response) {
        var obj = JSON.parse(response);
        console.log(obj.data.link)
        var lk = obj.data.link
        $.ajax({
           type : "GET",
           url : "http://35.186.168.61?val=" + lk,
           success : function(result) {
               console.log(result)
               //$####################################3
               var event = {
                 'summary': result.substring(26,result.length),
                 'start': {
                   'dateTime':  result.substring(0,25)
                 },
                 'end': {
                   'dateTime':  result.substring(0,25),
                 }
               };

               var request = gapi.client.calendar.events.insert({
                 'calendarId': 'primary',
                 'resource': event
               });

               console.log(request);

               request.execute(function(event) {
                 console.log(event);
                 appendPre('Event created: ' + event.htmlLink);
                 test = event.htmlLink;
               })



               //(((((((((((((((((((())))))))))))))))))))
           },
           error : function(result) {
             console.log(result)
           }
         });

      });

    }
  });
});
