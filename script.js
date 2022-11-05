

const messageContainer = document.getElementById('message-container')
const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById("room-input")
const messageForm = document.getElementById("send-container")

const socket = io("http://localhost:3000");
socket.on("connect",()=>{
  appendMessage(`you connect with id ${socket.id}`)
})

socket.on("receive-message",(message)=>{
  appendMessage(message)
})
//allow to use any event that we want and send something to server
//socket.emit("custom-event",10, "hi", { a : "a" })

joinRoomButton.addEventListener("click",()=>{
    const room = roomInput.value
    //we are passing function(client) which can be called from the server
    socket.emit("join-room",room, message => {
      appendMessage(message) //which will append the message to container
    })
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()

  const message = messageInput.value
  const room = roomInput.value

  if(message === "") return
  appendMessage(`You: ${message}`)
  socket.emit("send-message", message, room)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

/*
when you do any fetch request or ajax request you ask for something
"he server give me something"
fetch ---> server -> client
through fetch you ask server to give and than server gives that info to us(client)

so if you have to make 10 request than you have to do
fetch ---> server -> client
fetch ---> server -> client
fetch ---> server -> client
.
.
.
.
10 time becuase the connection closes when the info has been send to client or it is the end of the request

websocket --> server  --> client
we will be creating an websocket which will be connecting to the server and that connection will stay open it will not close when info reaches to the client
*/