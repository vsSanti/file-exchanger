const PingLogService = require('../../services/PingLogService');

module.exports = (socket) => {
    socket.on('pingReturn', async function (data) {

        const finishDate = new Date();
        // const timeDiff = finishDate.getTime() - data.initialDate;
        const conn = socket.request.connection;

        const postData = {
            initial_date: new Date(data.initialDate),
            finish_date: finishDate,
            src_ip: conn.remoteAddress,
            src_port: conn.remotePort,
            src_id: socket.id
        }
        await PingLogService.post(postData);
    });
}