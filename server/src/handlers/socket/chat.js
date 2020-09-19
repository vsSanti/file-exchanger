module.exports = function (socket, io) {
  // When recieves a message
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
};
