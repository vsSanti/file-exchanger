const path = require('path');
const fs = require('fs');

const logsHandler = require('./logs');
const optionsHandler = require('./options');

const pathToStorage = path.join(__dirname, '..', '..', '..', 'storage');

module.exports = (socket, io) => {
  socket.on('create-file-solicitation', () => {
    io.emit('create-file-solicitation');
  });

  socket.on('create-file', (fileName) => {
    const fullPath = `${pathToStorage}/${fileName}`;
    console.log(`Creating ${fullPath}`);

    try {
      fs.writeFileSync(fullPath, '');

      logsHandler(io, {
        type: 'success',
        message: `File ${fileName} was created.`,
      });
    } catch (error) {
      logsHandler(io, {
        type: 'error',
        message: `File ${fileName} was not created.`,
      });
    } finally {
      optionsHandler(io);
    }
  });
};
