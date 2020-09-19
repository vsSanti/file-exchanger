const io = require('socket.io-client');

const socket = io('http://localhost:3000');

// const connectionHandler = require('./handlers/connection');
const optionsHandler = require('./handlers/options');
const logsHandler = require('./handlers/logs');

// connectionHandler(socket);
optionsHandler(socket);
logsHandler(socket);
