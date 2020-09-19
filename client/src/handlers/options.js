const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

module.exports = (socket) => {
  socket.on('options', (msg) => {
    rl.question(msg, (answer) => {
      const splittedAnswer = answer.split(' ');

      switch (splittedAnswer[0]) {
        case '1':
          socket.emit('create-file', splittedAnswer[1]);
          break;
        default:
          break;
      }

      rl.close();
    });
  });
};
