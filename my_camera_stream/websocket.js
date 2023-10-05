// websocket.js

const videoElement = document.getElementById('video-stream');

const socket = new WebSocket('ws://localhost:PORT');

socket.addEventListener('open', (event) => {
    console.log('WebSocket connection established.');
});

socket.addEventListener('message', (event) => {
    const imageUrl = event.data; 
    videoElement.src = imageUrl;
});

socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed.');
});

