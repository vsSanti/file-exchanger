const chalk = require('chalk');

module.exports = (socket) => {
  socket.on('logs', (data) => {
    console.log('-------------------');
    switch (data.type) {
      case 'success':
        console.log(chalk.bgGreen.black(data.message));
        break;
      case 'error':
        console.log(chalk.bgRed.black(data.message));
        break;
      default:
        console.log(data.message);
        break;
    }
    console.log('-------------------');
  });
};
