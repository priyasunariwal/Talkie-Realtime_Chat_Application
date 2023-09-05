//yeh humaraa node server hai. which will handle socket.io connections

const io = require('socket.io')(8000,{
       cors: {
              origin: "http://localhost:5500", //if vs code ka port changes then do it here too.
              methods: ["GET", "POST"],
              allowedHeaders: ["my-custom-header"],
              credentials: true
            }

}); //(package)(port)

const users = {};
//io.on sockect.io ka instanse hai bahot saare connections ko listen karega 
//and socket.on if connection bana toh kya karna hai connection mein vo handle karega
io.on('connection', socket =>{
       //socket.on new -user- joined event bhejh raha hai toh kya karna chahiye.
    socket.on('new-user-joined',name2 =>{
       //    console.log('New user',name2)
           users[socket.id] = name2;
           //broadcast.emit('user-joined') except the person who joined sabko user-joined bhejh dega ane name2.
           socket.broadcast.emit('user-joined',name2);
       });
       // send event recieve huva server ko toh message function execute.
       socket.on('send',message =>{
        //message broadcast karo with senders name2 that is socket.id in users.recieve is the event here for client side.
        socket.broadcast.emit('recieve',{message: message,name2: users[socket.id]})
       });
       //disconnect is build in
      socket.on('disconnect',message =>{
      // leave is the event here for client side.
       socket.broadcast.emit('leave',users[socket.id]);
       delete users[socket.id];      
});

})
