var express = require('express');
var router = express();
var request = require("request");
var http = require('http');
var static = require('node-static');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);

var files = new static.Server('./');

function handler(request, response) {
	request.addListener('end', function() {
		files.serve(request, response);
	});
}

// listen for incoming connections from client
io.sockets.on('connection', function (socket) {

  // start listening for coords
  socket.on('send:coords', function (data) {

  	// broadcast your coordinates to everyone except you
      //socket.broadcast.emit('load:coords', data);
      console.log("LOCATION");
      console.log(data);
  });
});

var URL = 'https://us1.locationiq.com/v1/search.php?key=e1b6a0b9a71d8d&q=University%20of%20Michigan&format=json';
var eventsURL = 'https://app.ticketmaster.com/discovery/v2/suggest.json?size=1&apikey=ExyGUG26TxUJ2jSEetnL4IuJhIv3axQm';


// var geolocation = require('geolocation');
// var navigator = require('navigator');
// const https = require('https');
// const fs = require('fs');

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
//   };

// function geolocate() {

//     if (navigator.geolocation) {
//         // 🗺️ yep, we can proceed!
//         console.log('inside');
//         geolocation.getCurrentPosition(function (err, position) {
//             if (err) throw err
//             console.log(position)
//           })
//       } else {
//         // no can do
//         console.log('no geolocation');
//       }
    
    
    
//   }

router.get('/', function(req, res) {

    var lat;
    var lon;

    request(URL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
          //   res.send(result["Search"][0]);
          lat = data[0].lat;
          lon = data[0].lon;
              //res.send('' + data[0].lat + ' ' +  data[0].lon);
              //res.send(data[0].lon);
        } 
     });

     request(eventsURL + '&city=Toronto', function(error, response, body) {
         if (!error && response.statusCode == 200) {
             var data = JSON.parse(body);

             res.send(data._embedded.events);
         }
     })
});


// https.createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }).listen(8000);

app.listen(3000, function() {
    console.log("Listening on 3000");
})