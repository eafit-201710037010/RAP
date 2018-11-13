import * as express from 'express';
import { createServer, Server, request } from 'http';
import * as socketio from 'socket.io';

import ip = require('internal-ip');

export class Main{
    private static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: socketio;

    constructor() {
        this.createApp();
        this.createServer();
        
    }

    private createApp(){
        this.app = express();
        this.app.get('/', (request, response) => {
            var connections: number = 0;
            this.server.getConnections((err,count) => {
                connections = count;
            })

            response.send({
                server_init: 'ok',
                server_client_connections: connections
            });
        });
    }

    private createServer(){
        const express = require('express');
        const socketio = require('socket.io');
        const http = require('http');
        const path = require('path');

        const app = express();
        const server = http.createServer(app);
        const io = socketio.listen(server);

        //settings
        app.set('port', process.env.PORT || 4000);

        require('./sockets').default(io);

        //empezando el servidor
        server.listen(app.get('port'), () => {
            console.log('escuchando en el puerto', app.get('port'));
        });
        //emite el mensaje a todos los usuarios conectados
        io.emit('some event', { for: 'everyone' });

        //emitimos el mensaje
        io.on('connection', function(socket){
            console.log('user connected');
            socket.on('message', function(msg){
            io.emit('message', msg);
            });
        });
    }

    private sockets() {
        this.server.listen(4000, );
    }
}

new Main();