const path = require('path');
const fs = require('fs');

const logsHandler = require('./logs');
const optionsHandler = require('./options');

const pathToStorage = path.join(__dirname, '..', '..', '..', 'storage');
const pathToTemp = path.join(__dirname, '..', '..', '..', 'temp');

module.exports = (socket, io) => {
  socket.on('read-file-solicitation', () => {
    try {
      const originalFiles = fs.readdirSync(pathToStorage);

      const files = [];
      originalFiles.forEach((fileName, i) => {
        files.push(`${i + 1} - ${fileName}`);
      });

      logsHandler(io, {
        message: files.join('\n'),
      });

      io.emit('read-file-solicitation', originalFiles);
    } catch (error) {
      logsHandler(io, {
        type: 'error',
        message: 'Error while reading files',
      });

      optionsHandler(io);
    }
  });

  socket.on('read-file', (fileName) => {
    const fullPathStorage = `${pathToStorage}/${fileName}`;
    const fullPathTemp = `${pathToTemp}/${fileName}`;

    console.log(`Reading ${fullPathStorage}`);

    try {
      fs.renameSync(fullPathStorage, fullPathTemp);

      const buffer = fs.readFileSync(fullPathTemp, 'utf8');
      io.emit('read-file', {
        fileName,
        buffer,
      });
    } catch (error) {
      logsHandler(io, {
        type: 'error',
        message: `File couldn't be read.`,
      });

      optionsHandler(io);
    }
  });
};
