"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var app = express();
//initialize a simple http server
var server = http.createServer(app);
//initialize the WebSocket server instance
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    setInterval(function () {
        var now = Date.now();
        var value = Math.sin(now * 0.05);
        var data = {
            timestamp: now,
            value: value
        };
        ws.send(JSON.stringify(data)), 1000;
    });
});
//start our server
server.listen(process.env.PORT || 8999, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
