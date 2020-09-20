require('dotenv').config();

/* Dependencies */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/* Express initialization */
const app = express();

/* Expres utilities */
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

/* Socket.IO initialization */
const http = require('http').Server(app);
const io = require('socket.io')(http);

/* Handlers */
const createFileHandler = require('./handlers/socket/createFile');
const readFileHandler = require('./handlers/socket/readFile');
const updateFileHandler = require('./handlers/socket/updateFile');
const optionsHandler = require('./handlers/socket/options');
const errorHandler = require('./handlers/socket/error');

/* Socket.IO */
io.on('connection', (socket) => {
  const conn = socket.request.connection;
  console.log(`Connected! ip:port = ${conn.remoteAddress}:${conn.remotePort}`);

  optionsHandler(io);

  errorHandler(socket, io);
  createFileHandler(socket, io);
  readFileHandler(socket, io);
  updateFileHandler(socket, io);
});

/* Log errors */
app.all('*', (req, res) => {
  res.status(404).send({ success: false, code: '404' });
});

http.listen(process.env.PORT, process.env.HOST, async () => {
  console.log(`Server started on  ${process.env.HOST}:${process.env.PORT}`);
});
