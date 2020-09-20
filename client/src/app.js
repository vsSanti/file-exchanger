const readline = require('readline');
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const createFileHandler = require('./handlers/createFile');
const logsHandler = require('./handlers/logs');
const optionsHandler = require('./handlers/options');
const readFileHandler = require('./handlers/readFile');
const terminateConnectionHandler = require('./handlers/terminateConnection');

logsHandler(socket);

optionsHandler(socket, rl);
createFileHandler(socket, rl);
readFileHandler(socket, rl);

terminateConnectionHandler(socket);
