module.exports = (io, data) => {
  io.emit('logs', data);
};
