// Node swrver which will handel socket io connection 
const io = require('socket.io')(8000)

const user = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log("New User:", name);
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    });

    socket.on('disconnect', () =>{
        socket.broadcast.emit('leave', user[socket.id]);
        delete user[socket.id];
    });
})