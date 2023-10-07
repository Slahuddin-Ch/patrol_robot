// WebSocket client code (websocket-client.js)
const socket = new WebSocket('ws://127.0.0.1:8765'); // Replace with your WebSocket server's URL

socket.onopen = (event) => {
  console.log('WebSocket connection opened.');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received message from server:', message);
};

// Function to send a JSON command to start teleop
function startTeleop() {
  const command = {
    action: 'start_teleop'
  };
  socket.send(JSON.stringify(command));
}

