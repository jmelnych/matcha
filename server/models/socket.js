const socket     = require('socket.io');
const DB         = require('../database/DB');

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
//TODO:write normal function that takes id, checks in current connecte users and broadcast notifications
    testfun(){
        console.log('test done');
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

    broadcastToSocket(socket, data){
        let recipient, recipientSocket;
        recipient = this._connectedUsers.filter(user => user.id === data.recipient_id);
        if (recipient.length){
            recipientSocket = recipient[0].socket_id;
            socket.broadcast.to(recipientSocket).emit('chat', data);
        }
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
        let db = new DB,
            promise = db.update('users', 'online', 1, 'id', id);
        promise.then(() => {
            this.io.sockets.emit('status', {status: 'online', id});
        })
    }

    saveStatusOffline(id){
        let db = new DB,
            promise = db.update('users', 'online', 0, 'id', id);
        promise.then(() => {
            this.io.sockets.emit('status', {status: 'offline', id});
        })
    }
};
