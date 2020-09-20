module.exports = (socket, readLine) => {
  socket.on('options', (msg) => {
    readLine.question(msg, (answer) => {
      switch (answer) {
        case '1':
          socket.emit('create-file-solicitation');
          break;
        case '2':
          socket.emit('read-file-solicitation');
          break;
        default:
          break;
      }
    });
  });
};
