const path = require('path');
const fs = require('fs');

const logsHandler = require('./logs');
const optionsHandler = require('./options');

module.exports = (socket, io) => {
  socket.on('create-file', (fileName) => {
    const fullPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'storage',
      fileName
    );
    console.log(`Creating ${fullPath}`);

    fs.appendFile(fullPath, 'Hello content!', (err) => {
      if (err) {
        logsHandler(io, {
          type: 'error',
          message: `File ${fileName} was not created.`,
        });
      } else {
        logsHandler(io, {
          type: 'success',
          message: `File ${fileName} was created.`,
        });
      }

      optionsHandler(io);
    });
  });
};
