const io = require('socket.io-client');

const socket = io('http://localhost:3000');

const connectionHandler = require('./handlers/connection');

connectionHandler(socket);
