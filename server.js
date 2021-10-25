require("dotenv").config();
var express = require("express");
var http = require('http');
var socketio = require("socket.io");
var cors = require("cors");
var bodyParser = require("body-parser")
var dbConnection = require("./config/Db");
const port = process.env.PORT || 5000;
// Routes List
var app = express();
const server = http.createServer(app)
const io = socketio(server)
let {socketBox,getsocketBox,delsocketBox} = require('./components/SocketController')

 var SocketRoute = require("./components/SocketRoutes");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

dbConnection();

app.get("/", function (req, res) {
  res.send("Server is working");
});
//SuperAdmin --superAdmin
app.use("/superAdmin", SocketRoute);

io.on('connection', (socket) => {
  // console.log('Ali user connected');
  socket.on('doRedBox',async ({index,id}) => {
    const {data}= await socketBox(index,id)  
    io.emit('doGetRedBox', {data});
  });

  //for get data firstTime
  socket.on('getFirstTimeData',async () => {
    const {data}= await getsocketBox()    
    socket.emit('getFirstTimeResult', {data})
  });

  //for del
  socket.on('clearBoxes',async ({id}) => {
    const {data}= await delsocketBox(id)       
    socket.emit('resultClearBoxes', {data})
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
});


// server port listener
server.listen(port, (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log(`server is working on port, ${port}`);
  }
});
