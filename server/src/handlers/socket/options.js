const optionsMessage = require('../../utills/optionsMessage');

module.exports = (io) => {
  io.emit('options', optionsMessage);
};
