// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//timestamp route with no date passed
app.get("/timestamp/",
  function(res, req){
    const date = new Date();
    res.json({"unix": Date.parse(date), "utc": date.toUTCString()});
  }
);

//timestamp api endpoint
app.get("/timestamp/:date_string?",
  function (req, res){
    const date = new Date(req.params.date_string);
    if(Date.parse(date)){      
      res.json({"unix": Date.parse(date), "utc": date.toUTCString()}) 
    } else {
        res.json({"error": "Invalid Date"})
    }
  }  
);


    
    


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});