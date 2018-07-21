import openSocket from 'socket.io-client'

export const socket = openSocket.connect('http://localhost:5000/messenger');
