const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");



const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);


//chat app
var io = require('socket.io').listen(server);

io.on('connection',(socket)=>{



   // console.log('new connection made.');


    socket.on('join', function(data){
      //joining
      socket.join(data.room);

    // console.log(data.user + 'joined the room : ' + data.room);
      io.to(data.room).emit('new user joined',
        {
        username:data.username,
        message:'has joined '+ data.room,
        updated_at:data.updated_at
      });
    });


    socket.on('leave', function(data){

    // console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room',
       {
         username:data.username,
         message:'has left ' + data.room,
         updated_at:data.updated_at
        });

      socket.leave(data.room);
    });

    socket.on('message',function(data){

      io.in(data.room).emit('new message',
      {
        username:data.username,
        message:data.message,
        updated_at:data.updated_at
      });
    })

});


//chatApp ends



server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

module.exports=server;

//nHfptVvnZAdNBJdF
