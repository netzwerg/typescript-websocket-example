import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    for (let num of [1, 2, 3]) {
        ws.send(num);
    }
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});