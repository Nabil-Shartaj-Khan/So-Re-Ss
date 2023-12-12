const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const ServerExpress = http.createServer(app);
const io = new Server(ServerExpress);

app.use(express.static(path.join(__dirname, 'so-re-ss-frontend', 'dist')));

io.on('connection', (socket) => {
    console.log("User connected!");

    setTimeout(() => {
        socket.emit('msg', "This message is from backend server!");
    }, 5000);

    socket.on('disconnect', () => {
        console.log("User is disconnected!");
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'so-re-ss-frontend', 'dist', 'index.html'));
});

ServerExpress.listen(5000, () => {
    console.log("Server is running - PORT:5000");
});
