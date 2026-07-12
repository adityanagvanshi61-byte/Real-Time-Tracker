const express= require('express');
const app= express();
const path= require('path');
const http = require('http');
const socketio = require('socket.io');
const helmet = require('helmet');
const compression = require('compression');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://unpkg.com"],
            styleSrc: ["'self'", "https://unpkg.com", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://*.tile.openstreetmap.org", "https://*.openstreetmap.org", "https://unpkg.com"],
            connectSrc: ["'self'", "ws:", "wss:"],
            fontSrc: ["'self'", "https://unpkg.com"],
            objectSrc: ["'none'"],
        }
    }
}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

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