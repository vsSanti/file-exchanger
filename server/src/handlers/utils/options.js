const optionsMessage = require('../../utils/optionsMessage');

module.exports = (io) => {
  io.emit('options', optionsMessage);
};
