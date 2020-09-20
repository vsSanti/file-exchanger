module.exports = (socket) => {
  socket.on('terminate-connection', () => {
    console.log('Terminating connection.');

    process.exit();
  });
};
