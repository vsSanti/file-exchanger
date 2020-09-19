const fs = require('fs');
const AbsolutePath = require('../../helpers/AbsolutePath');
const UploadLogService = require('../../services/UploadLogService');
const uploadLog = require('../../types/uploadLog.json');

module.exports = function (socket, io) {

    /**
     * Fired when file is added or updated by someone on client side
     */
    socket.on('fileAddedOrUpdated', function (data) {
        // console.log(`Name of the file: ${data.fileName} will be backed up under \n${AbsolutePath + data.filePath}`);

        fs.writeFile(AbsolutePath + data.filePath, data.buffer, async err => {
            if (err) throw err;
            console.log(`File ${data.coloredFilePath} has been ${data.coloredType}!`);

            const conn = socket.request.connection;
            const event_type = (data.type === uploadLog.ADDED) ? uploadLog.ADDED : uploadLog.CHANGED
            const postData = {
                src_ip: conn.remoteAddress,
                src_port: conn.remotePort,
                src_id: socket.id,
                relative_path: data.filePath,
                type: uploadLog.FILE,
                event_type
            }
            await UploadLogService.post(postData);
            socket.broadcast.emit('fileAddedOrUpdatedOnServer', data);
            // io.emit('fileAddedOrUpdatedOnServer', data);
        });
    });

    /**
     * Fired when some file is deleted by someone on client side
     */
    socket.on('fileDeleted', function (data) {
        // console.log(`Name of the file: ${RelativePath + data.filePath} will be removed from backup`);

        fs.unlink(AbsolutePath + data.filePath, async err => {
            if (err) {
                if (err.errno === -4058) return console.log(`File ${data.coloredFilePath} was not found while being ${data.coloredType}.`);
                throw err;
            }
            console.log(`File ${data.coloredFilePath} has been ${data.coloredType}!`);

            const conn = socket.request.connection;
            const postData = {
                src_ip: conn.remoteAddress,
                src_port: conn.remotePort,
                src_id: socket.id,
                relative_path: data.filePath,
                type: uploadLog.FILE,
                event_type: uploadLog.REMOVED
            }
            await UploadLogService.post(postData);
            socket.broadcast.emit('fileRemovedOnServer', data);
            // io.emit('fileRemovedOnServer', data);
        });
    });
}