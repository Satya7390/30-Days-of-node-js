const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

/**
 * WebSocket server for Express
 * @param {Object} server - HTTP server instance
 */
function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log('Received:', message);
      let response;
      if (message.toLowerCase() === 'hii') {
        response = 'hello satya';
        ws.send(response); // Send the response to the client
      } else {
        response = 'Server: I did not understand your message';
      }
      console.log('Response:', response);
    });
  });
}

const app = express();
const server = http.createServer(app);

// Serve the HTML file for the WebSocket connection
app.get('/websocket', (req, res) => {
  res.sendFile(path.join(__dirname, 'websocket.html'));
});

setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
