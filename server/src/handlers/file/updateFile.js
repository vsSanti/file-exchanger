const path = require('path');
const fs = require('fs');

const { logsHandler, optionsHandler } = require('../utils');

const pathToStorage = path.join(__dirname, '..', '..', '..', 'storage');
const pathToTemp = path.join(__dirname, '..', '..', '..', 'temp');

module.exports = (socket, io) => {
  socket.on('update-file', (data) => {
    const fullPathStorage = `${pathToStorage}/${data.fileName}`;
    const fullPathTemp = `${pathToTemp}/${data.fileName}`;

    console.log(`Updating ${fullPathStorage}`);

    try {
      fs.unlinkSync(fullPathTemp);
      fs.writeFileSync(fullPathStorage, data.buffer, 'utf8');

      logsHandler(io, {
        type: 'success',
        message: `File ${data.fileName} was updated.`,
      });
    } catch (error) {
      logsHandler(io, {
        type: 'error',
        message: `File ${data.fileName} couldn't be updated.`,
      });
    } finally {
      optionsHandler(io);
    }
  });
};
