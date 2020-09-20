module.exports = (socket, rl) => {
  socket.on('create-file-solicitation', () => {
    rl.question('Inform file name:\n', (answer) => {
      socket.emit('create-file', answer);
    });
  });
};
