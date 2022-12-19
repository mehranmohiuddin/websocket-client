const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log("Server started on port 8080");
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Generate a random number between 1 and 1000
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Send the response message with the random number
    ws.send(`Response: ${randomNumber}`);
  });
});
