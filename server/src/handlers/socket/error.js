const optionsHandler = require('./options');

const logsHandler = require('./logs');

module.exports = (socket, io) => {
  socket.on('unexpected-error', (msg) => {
    logsHandler(io, {
      type: 'error',
      message: msg,
    });

    optionsHandler(io);
  });
};
