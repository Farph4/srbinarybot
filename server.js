const WebSocket = require('ws');
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

const indices = ['R_10', 'R_25', 'R_50', 'R_75', 'R_100', 'R_100_1S']; // Agrega los que falten

ws.on('open', () => {
    indices.forEach(symbol => {
        // Suscribirse a cada índice
        ws.send(JSON.stringify({ ticks: symbol }));
    });
});

ws.on('message', (data) => {
    const response = JSON.parse(data);
    if (response.tick) {
        const { symbol, quote } = response.tick;
        const lastDigit = parseInt(quote.toString().slice(-1));
        // Aquí disparas el análisis lógico hacia el frontend
        procesarAnalisis(symbol, lastDigit);
    }
});
