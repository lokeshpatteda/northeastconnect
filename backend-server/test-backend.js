const http = require('http');
const { io } = require('socket.io-client');

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

console.log('--- NECA Backend Test Suite ---');

// 1. Test HTTP GET /
http.get(URL, (res) => {
    let data = '';
    res.on('data', hunk => data += hunk);
    res.on('end', () => {
        console.log('✅ HTTP Root Check: Passed');
        console.log('Response:', JSON.parse(data));
        
        testSocket();
    });
}).on('error', (err) => {
    console.error('❌ HTTP Root Check: Failed (Is the server running?)');
    process.exit(1);
});

// 2. Test Socket.io Connection
function testSocket() {
    const socket = io(URL);

    socket.on('connect', () => {
        console.log('✅ Socket.io Connection: Passed');
        console.log('Socket ID:', socket.id);
        
        console.log('\n--- Test Successful ---');
        console.log('You can now use the Website and Admin Portal safely.');
        socket.disconnect();
        process.exit(0);
    });

    socket.on('connect_error', (err) => {
        console.error('❌ Socket.io Connection: Failed');
        console.error(err.message);
        process.exit(1);
    });

    // Timeout if socket takes too long
    setTimeout(() => {
        console.error('❌ Socket.io Connection: Timeout');
        process.exit(1);
    }, 5000);
}
