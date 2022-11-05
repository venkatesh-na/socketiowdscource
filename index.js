const io = require("socket.io")(3000, {
    cors : {
        origin : ["http://127.0.0.1:5500"]
        //so client is on port 5500 and server is on port 3000 so they cant able to connect or communincate with each other cors is blocking them so the solution is use second argument as cors : {  } we just tell where our client is located in origin
    }
}) //port 300 is where our socket.io is gonna run

io.on("connection",(socket)=>{
    //this callback will run every time the client connect to server so each of them get a socket instance
    console.log(socket.id)

    //when socket listen to this custom-event this below will run
    socket.on("send-message",(message, room)=>{
        //io.emit will send all the user connected including you
        //socket.broadcast.emit() will send to all the user connected expect you
        if(room == ""){
            socket.broadcast.emit("receive-message",message)
        } else {
            socket.to(room).emit("receive-message",message)
            //it is like socket.broadcast.to(room) every one in the room expect you
        }
    })
    socket.on("join-room",(room, cb)=>{
        socket.join(room)
        cb(`Joined ${room}`)
    })
})
