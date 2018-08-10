const socket     = require('socket.io');

module.exports = class Socket {
    constructor(server, db) {
        this.db = db;
        this.io = socket(server);
        this._connectedUsers = [];
        this.sckt = null;
        this.io.on('connection', (socket) => {
            this.sckt = socket;
            socket.on('users', id => {
                this.addConnectedUser(socket.id, id);
            });
            socket.on('chat', (data) => {
                this.broadcastChat(socket, data);
            });
            socket.on('disconnect', () => {
                this.disconnectUser(socket.id);
            });
        });
    };
    //TODO:write normal function that takes id, checks in current connected users and broadcast notifications
    broadcastNote(id, action){
        let recipientSocket = this.getSocketId(id);
        this.sckt.broadcast.to(recipientSocket).emit('notification', {action});

    }

    getSocketId(id){
        let recipient, recipientSocket;
        recipient = this._connectedUsers.filter(user => user.id === id);
        if (recipient.length) {
            recipientSocket = recipient[0].socket_id;
            return recipientSocket;
        }
        return false;
    }

    addConnectedUser(socket_id, id){
        console.log('user', id, 'made socket connection', socket_id);
        if (this._connectedUsers.filter(user => user.id === id).length) {
            return false;
        } else {
            this._connectedUsers.push({id, socket_id});
            this.saveStatusOnline(id);
        }
    }

    broadcastChat(socket, data){
        let recipientSocket = this.getSocketId(data.recipient_id);
        socket.broadcast.to(recipientSocket).emit('chat', data);
        console.log('sending data to', recipientSocket, 'with uid', data.recipient_id);
        //for some reason, not all users get msg if (this.sckt is used, this is why socket passed in this fnc);
        this.broadcastNote(data.recipient_id, 'You have new message');
    }

    disconnectUser(socket_id){
        console.log('user left', socket_id);
        let uid = this._connectedUsers.filter(user => user.socket_id === socket_id);
        if (uid.length){
            let id = uid[0].id;
            this.saveStatusOffline(id);
        }
        this._connectedUsers = this._connectedUsers.filter(user => user.socket_id !== socket_id);
        console.log('remaining users', this._connectedUsers);
    }

    saveStatusOnline(id){
        let promise = this.db.update('users', 'online', 1, 'id', id);
        promise.then(() => {
            this.io.sockets.emit('status', {status: 'online', id});
        })
    }

    saveStatusOffline(id){
        let promise = this.db.update('users', 'online', 0, 'id', id);
        promise.then(() => {
            this.io.sockets.emit('status', {status: 'offline', id});
        })
    }
};
