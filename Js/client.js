const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('chatSound.mp3');

const userName = prompt("Enter your name to Join:");
socket.emit('new-user-joined', userName);

function append(message, position, time) {
    const messageBox = document.createElement('div');
    messageBox.className = 'messageBox ' + position;
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.className = 'message';
    // messageElement.classList.add('message');
    // messageElement.classList.add(position);
    messageBox.append(messageElement);
    const timeContent = document.createElement('div');
    timeContent.className = 'dateTime';
    timeContent.innerText = time;
    messageBox.append(timeContent);
    messageContainer.append(messageBox)
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    let dateTime = new Date();
    var hours = dateTime.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    var dateString = ("0" + dateTime.getDate()).slice(-2) + "-" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "-" +
        dateTime.getFullYear() + "\xa0\xa0" + ("0" + hours).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2) + ":" + ("0" + dateTime.getSeconds()).slice(-2) + " " + ampm;
    append(`<b>You:</b> ${message}`, 'right', dateString);
    socket.emit('send', message);
    messageInput.value = null;
})

socket.on('user-joined', name => {
    let dateTime = new Date();
    var hours = dateTime.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    var dateString = ("0" + dateTime.getDate()).slice(-2) + "-" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "-" +
        dateTime.getFullYear() + "\xa0\xa0" + ("0" + hours).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2) + ":" + ("0" + dateTime.getSeconds()).slice(-2) + " " + ampm;
    append(`<b>${name}</b> joined the chat`, 'left', dateString)
})

socket.on('receive', data => {
    let dateTime = new Date();
    var hours = dateTime.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    var dateString = ("0" + dateTime.getDate()).slice(-2) + "-" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "-" +
        dateTime.getFullYear() + "\xa0\xa0" + ("0" + hours).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2) + ":" + ("0" + dateTime.getSeconds()).slice(-2) + " " + ampm;
    append(`<b>${data.name}:</b> ${data.message}`, 'left', dateString)
})

socket.on('leave', name => {
    let dateTime = new Date();
    var hours = dateTime.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    var dateString = ("0" + dateTime.getDate()).slice(-2) + "-" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "-" +
        dateTime.getFullYear() + "\xa0\xa0" + ("0" + hours).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2) + ":" + ("0" + dateTime.getSeconds()).slice(-2) + " " + ampm;
    append(`<b>${name}</b> left the chat`, 'left', dateString)
})