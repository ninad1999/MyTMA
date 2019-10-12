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

router.get('/events', function(req, res) {

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
             console.log(arrlength);

            // res.send(data._embedded.events[0].images.url);
            var lst = [];
            for (var i = 0; i < arrlength; i++) {
                
                var str = data._embedded.events[i].classifications[0].segment.name.toLowerCase();
                console.log(str);
                console.log('This is a string');
                if (preferences[str]) {
                    lst.push(data._embedded.events[i]);
                }
            }
            console.log(lst.length);
            res.send(lst);
         }
     })
});




router.get('/', function(req, res) {
    res.render('./login');
})

router.get('/logout', function(req, res) {
    res.render('./logout.html');
})

router.listen(3000, function() {
    console.log("Listening on 3000");
})