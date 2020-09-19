module.exports = (socket) => {
  socket.on('connect', () => {
    if (socket.connected) {
      console.log('Connected');
    }
  });

  socket.on('disconnect', () => {
    if (!socket.connected) {
      console.log('Disconnected');
    }
  });
};
