const path = require('path');
const fs = require('fs');

const pathToTemp = path.join(__dirname, '..', '..', 'temp');

module.exports = (socket, rl) => {
  socket.on('read-file-solicitation', (originalFiles) => {
    rl.question('Inform file index:\n', (answer) => {
      socket.emit('read-file', originalFiles[Number(answer) - 1]);
    });
  });

  socket.on('read-file', (data) => {
    const fullPath = `${pathToTemp}/${data.fileName}`;

    try {
      fs.writeFileSync(fullPath, data.buffer, 'utf8');
    } catch (error) {
      socket.emit('unexpected-error', 'Error while reading file.');
      return;
    }

    rl.question('Type anything to send file back: ', () => {
      try {
        const buffer = fs.readFileSync(fullPath, 'utf8');
        fs.unlinkSync(fullPath);

        socket.emit('update-file', { fileName: data.fileName, buffer });
      } catch (error) {
        socket.emit('unexpected-error', 'Error while saving file.');
      }
    });
  });
};
