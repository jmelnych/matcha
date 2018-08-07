const socket     = require('socket.io');

module.exports = class Socket {
    constructor(server) {
        this.io = socket(server);
        this._connectedUsers = [];
        this.io.on('connection', (socket) => {
            socket.on('users', id => {
                this.addConnectedUser(socket.id, id);
            });
            socket.on('chat', (data) => {
                this.broadcastToSocket(socket, data);
            });
            socket.on('disconnect', () => {
                this.disconnectUser(socket.id);
            })
        });
    };

    addConnectedUser(socket_id, id){
        console.log('user', id, 'made socket connection', socket_id);
        if (this._connectedUsers.filter(user => user.id === id).length) {
            return false;
        } else {
            this._connectedUsers.push({id, socket_id});
        }
        //TODO: save that user online. grab current user id via cookies?
    }

    broadcastToSocket(socket, data){
        let recipient, recipientSocket;
        recipient = this._connectedUsers.filter(user => user.id === data.recipient_id);
        if (recipient.length){
            //io.sockets.emit('chat', data);
            recipientSocket = recipient[0].socket_id;
            socket.broadcast.to(recipientSocket).emit('chat', data);
        }
    }

    disconnectUser(socket_id){
        console.log('user left', socket_id);
        this._connectedUsers = this._connectedUsers.filter(user => user.socket_id !== socket_id);
        console.log('remaining users', this._connectedUsers);
        //TODO: save that user's gone offline

    }
};
