const fs = require('fs');
const mkdirp = require('mkdirp');
const AbsolutePath = require('../../helpers/AbsolutePath');
const UploadLogService = require('../../services/UploadLogService');
const uploadLog = require('../../types/uploadLog.json');

module.exports = function (socket, io) {

    /**
     * Fired when directory is added by someone on client side
     */
    socket.on('directoryAdded', function (data) {
        mkdirp(AbsolutePath + data.dirPath, async err => {
            if (err) throw err;
            console.log(`Directory ${data.coloredDirPath} has beeen ${data.coloredType}.`);

            const conn = socket.request.connection;
            const postData = {
                src_ip: conn.remoteAddress,
                src_port: conn.remotePort,
                src_id: socket.id,
                relative_path: data.dirPath,
                type: uploadLog.DIRECTORY,
                event_type: uploadLog.ADDED
            }
            await UploadLogService.post(postData);

            socket.broadcast.emit('directoryAddedOnServer', data);
            // io.emit('directoryAddedOnServer', data);
        });
    });

    /**
     * Fired when directory is removed by someone on client side
     */
    socket.on('directoryRemoved', function (data) {
        fs.rmdir(AbsolutePath + data.dirPath, { recursive: true }, async err => {
            if (err) throw err;
            console.log(`Directory ${data.coloredDirPath} has beeen ${data.coloredType}.`);

            const conn = socket.request.connection;
            const postData = {
                src_ip: conn.remoteAddress,
                src_port: conn.remotePort,
                src_id: socket.id,
                relative_path: data.dirPath,
                type: uploadLog.DIRECTORY,
                event_type: uploadLog.REMOVED
            }
            await UploadLogService.post(postData);
            socket.broadcast.emit('directoryRemovedOnServer', data);
            // io.emit('directoryRemovedOnServer', data);
        });
    });

}