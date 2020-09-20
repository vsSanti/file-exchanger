module.exports = (socket) => {
  socket.on('logs', (data) => {
    console.log('-------------------');
    console.log(data.message);
    console.log('-------------------');
  });
};
