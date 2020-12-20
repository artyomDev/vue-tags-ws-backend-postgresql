const WebSocketServer = require("ws").Server,
    express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app);

const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(cors())
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/routes/routes.js")(app);

// set port, listen for requests
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


var wss = new WebSocketServer({server: server, path: '/getall'});



const client = require("./app/models/db.js");

wss.on("connection", function(ws){
  ws.on('message', function incoming(message) {
    if (message == "get all tags") {
      client.query('SELECT * FROM tags ORDER BY created DESC', (err, res) => {
        if(err) throw err;
        
        ws.send(JSON.stringify(res.rows));
        
      })
    } else {
      ws.send("{}");
    }
  });
});

