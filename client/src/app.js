const readline = require('readline');
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const optionsHandler = require('./handlers/options');
const logsHandler = require('./handlers/logs');
const createFileHandler = require('./handlers/createFile');
const readFileHandler = require('./handlers/readFile');

logsHandler(socket);

optionsHandler(socket, rl);
createFileHandler(socket, rl);
readFileHandler(socket, rl);
