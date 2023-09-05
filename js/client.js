const socket = io('http://192.168.0.190:8000');

//get dom elemnts in js variables for furthur use
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ring.mp3');
//will append to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position =='left'){
    audio.play();
   }
}
//add new user and let the server know 
const name2 = prompt("enter your user name: ")
socket.emit('new-user-joined', name2);

//new user joins recieves event from server
socket.on('user-joined',name2 =>{
    append(`${name2} joined the chat`,'right');

})
//if server sends message recieve it.
socket.on('recieve',data =>{
    append(`${data.name2}: ${data.message}`,'left');

})
//user leaves the chat append message to the container
socket.on('leave',name2=>{
    append(`${name2} left the chat`,'left');
})

//after user send a message. that click on send button
form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevents from loading page again.
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})
