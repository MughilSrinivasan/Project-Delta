require( 'dotenv' ).config()
var colors = require('colors');

const express = require('express')
const mongoose = require('mongoose')
const toDoRoutes = require('./routes/toDoRoutes')
const userRoutes = require( './routes/userRoutes' ) 
const chatRoutes = require( './routes/chatRoutes' ) 
const messageRoutes = require( './routes/messageRoutes' ) 
const expensesRoutes = require( './routes/expensesRoutes' ) 




const app = express()

app.use( express.json() )
app.use(express.urlencoded({ extended: true }));


// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.use(express.static('public'))

app.use( '/toDoList', toDoRoutes )
app.use( '/user', userRoutes )
app.use( '/chat', chatRoutes )
app.use( '/message', messageRoutes )
app.use('/expenses' , expensesRoutes )

const server = app.listen(process.env.PORT, () => {
    console.log('listening for requests on port'.underline.cyan, process.env.PORT.yellow)
    })

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database'.magenta)
  })
  .catch((error) => {
    console.log(error)
  })

const io = require( "socket.io" )( server,
  {
    cors: {
    origin : "http://localhost:3000"
  }
  } )

io.on( "connection", ( socket ) => {
  //console.log( "Connected to socket.io" )

  socket.on( "setup", ( userData ) => {
    console.log(userData.id)
    socket.join( userData.id );  
    socket.emit("connected");
  } );
  
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  } );
  
  socket.on( "typing", ( room ) => socket.in( room ).emit( "typing" ) );
  
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return  

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in( user._id ).emit( "message recieved", newMessageRecieved );
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData.id);
  });

} )
