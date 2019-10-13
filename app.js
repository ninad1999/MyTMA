var express = require('express');
var router = express();
var request = require("request");
var http = require('http');

router.use(express.static(__dirname + "/public"));
// console.log(__dirname); // __dirname: /home/ubuntu/workspace/V5
router.set("view engine", "ejs");
//var static = require('node-static');
//var app = http.createServer(handler);
// var socket = require('socket.io-client')('http://localhost');
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

//var files = new static.Server('./');

// function handler(request, response) {
// 	request.addListener('end', function() {
// 		files.serve(request, response);
// 	});
// }

// // listen for incoming connections from client
// io.sockets.on('connection', function (socket) {

//   // start listening for coords
//   socket.on('send:coords', function (data) {

//   	// broadcast your coordinates to everyone except you
//       //socket.broadcast.emit('load:coords', data);
//       console.log("LOCATION");
//       console.log(data);
//   });
// });

//var URL = 'https://us1.locationiq.com/v1/search.php?key=e1b6a0b9a71d8d&q=University%20of%20Michigan&format=json';
var eventsURL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ExyGUG26TxUJ2jSEetnL4IuJhIv3axQm';

router.get('/login', function(req, res) {
    res.render('./login');
});

router.get('/logout', function(req, res) {
    res.render('./logout');
})

router.get('/', function(req, res) {

    var lat;
    var lon;

    // request(URL, function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var data = JSON.parse(body);
    //       //   res.send(result["Search"][0]);
    //       lat = data[0].lat;
    //       lon = data[0].lon;
    //       console.log(lat);
    //       console.log(lon);
    //           //res.send('' + data[0].lat + ' ' +  data[0].lon);
    //           //res.send(data[0].lon);
    //     } 
    //  });

    var preferences = {
        'sports' : 'football',
        'music' : 'rock'
    };

     request(eventsURL + '&city=Ann%20Arbor', function(error, response, body) {
         if (!error && response.statusCode == 200) {
             var data = JSON.parse(body);

             var arrlength = data._embedded.events.length;

            var lst = [];
            for (var i = 0; i < arrlength; i++) {
                
                var str = data._embedded.events[i].classifications[0].segment.name.toLowerCase();

                if (preferences[str]) {
                    if (preferences[str] === data._embedded.events[i].classifications[0].genre.name.toLowerCase()) {
                        lst.push(data._embedded.events[i]);
                    }  
                }
            }
            console.log(lst.length);
            res.send(lst);
         }
     })
});

// FIREBASE AUTH ==========================================






// GOOGLE CALENDAR API======================================
// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// router.get('/calendar', function(req, res) {
//     fs.readFile('credentials.json', (err, content) => {
//         if (err) return console.log('Error loading client secret file:', err);
//         // Authorize a client with credentials, then call the Google Calendar API.
//         authorize(JSON.parse(content), listEvents);
//       });
      
//       /**
//        * Create an OAuth2 client with the given credentials, and then execute the
//        * given callback function.
//        * @param {Object} credentials The authorization client credentials.
//        * @param {function} callback The callback to call with the authorized client.
//        */
//       function authorize(credentials, callback) {
//         const {client_secret, client_id, redirect_uris} = credentials.installed;
//         const oAuth2Client = new google.auth.OAuth2(
//             client_id, client_secret, redirect_uris[0]);
      
//         // Check if we have previously stored a token.
//         fs.readFile(TOKEN_PATH, (err, token) => {
//           if (err) return getAccessToken(oAuth2Client, callback);
//           oAuth2Client.setCredentials(JSON.parse(token));
//           callback(oAuth2Client);
//         });
//       }
      
//       /**
//        * Get and store new token after prompting for user authorization, and then
//        * execute the given callback with the authorized OAuth2 client.
//        * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//        * @param {getEventsCallback} callback The callback for the authorized client.
//        */
//       function getAccessToken(oAuth2Client, callback) {
//         const authUrl = oAuth2Client.generateAuthUrl({
//           access_type: 'offline',
//           scope: SCOPES,
//         });
//         console.log('Authorize this app by visiting this url:', authUrl);
//         const rl = readline.createInterface({
//           input: process.stdin,
//           output: process.stdout,
//         });
//         rl.question('Enter the code from that page here: ', (code) => {
//           rl.close();
//           oAuth2Client.getToken(code, (err, token) => {
//             if (err) return console.error('Error retrieving access token', err);
//             oAuth2Client.setCredentials(token);
//             // Store the token to disk for later program executions
//             fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//               if (err) return console.error(err);
//               console.log('Token stored to', TOKEN_PATH);
//             });
//             callback(oAuth2Client);
//           });
//         });
//       }
      
//       /**
//        * Lists the next 10 events on the user's primary calendar.
//        * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//        */
//       function listEvents(auth) {
//         const calendar = google.calendar({version: 'v3', auth});
//         calendar.events.list({
//           calendarId: 'primary',
//           timeMin: (new Date()).toISOString(),
//           maxResults: 10,
//           singleEvents: true,
//           orderBy: 'startTime',
//         }, (err, res) => {
//           if (err) return console.log('The API returned an error: ' + err);
//           const events = res.data.items;
//           if (events.length) {
//             console.log('Upcoming 10 events:');
//             events.map((event, i) => {
//               const start = event.start.dateTime || event.start.date;
//               console.log(`${start} - ${event.summary}`);
//               res.render('./index', {events});
//             });
//           } else {
//             console.log('No upcoming events found.');
//           }
//         });
//       }
// });

// Load client secrets from a local file.










// REST OF THE ROUTES ======================================


router.listen(3000, function() {
    console.log("Listening on 3000");
})
