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
    fs.writeFile(fullPath, data.buffer, 'utf8', (err) => {
      if (err) {
        socket.emit('unexpected-error', 'Error while reading file.');
        return;
      }

      rl.question('Type anything to send file back', () => {
        fs.readFile(fullPath, 'utf8', (err2, buffer) => {
          if (err2) {
            socket.emit('unexpected-error', 'Error while saving file.');
            return;
          }

          fs.unlinkSync(fullPath);

          socket.emit('update-file', { fileName: data.fileName, buffer });
        });
      });
    });
  });
};
