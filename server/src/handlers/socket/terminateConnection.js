module.exports = (socket, io) => {
  socket.on('terminate-connection-solicitation', () => {
    console.log('Terminating connection.');

    io.emit('terminate-connection');

    process.exit();
  });
};
