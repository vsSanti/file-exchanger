const readline = require('readline');
const io = require('socket.io-client');

const { createFileHandler, readFileHandler } = require('./handlers/file');
const {
  logsHandler,
  optionsHandler,
  terminateConnectionHandler,
} = require('./handlers/utils');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

logsHandler(socket);
optionsHandler(socket, rl);
terminateConnectionHandler(socket);

createFileHandler(socket, rl);
readFileHandler(socket, rl);
