const express= require('express');
const app= express();
const path= require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    socket.on('sendLocation', (data) => {
        io.emit('locationUpdate',{id: socket.id, lat: data.lat, long: data.long});
    });
    socket.on('disconnect', () => { 
        io.emit('userDisconnected', socket.id);
        console.log('WebSocket connection closed');
    });
    console.log('New WebSocket connection');
});
 
app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});