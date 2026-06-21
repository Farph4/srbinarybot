const indices = ['R_10', 'R_25', 'R_50', 'R_75', 'R_100', 'R_100_1S'];
const socket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

socket.onopen = () => {
    indices.forEach(idx => {
        socket.send(JSON.stringify({ ticks: idx }));
    });
};

socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.tick) updateUI(data.tick);
};

function updateUI(tick) {
    const digit = parseInt(tick.quote.toString().slice(-1));
    const container = document.getElementById('dashboard');
    // Lógica: Si el dígito es > 5, sugerir OVER 5
    const recomendacion = digit > 5 ? "OVER 5" : "UNDER 4";
    
    // Aquí renderizas el panel del índice con el botón de simulación
    // Se recomienda usar un framework como Alpine.js o Vanilla JS para actualizar el DOM
}

function simular(indice, estrategia) {
    let count = 3;
    const btn = event.target;
    btn.disabled = true;
    
    const interval = setInterval(() => {
        btn.innerText = `... ${count} ...`;
        if (count === 0) {
            clearInterval(interval);
            const win = Math.random() > 0.4;
            btn.innerText = win ? "💰 PROFIT" : "❌ LOSS";
            setTimeout(() => btn.disabled = false, 2000);
        }
        count--;
    }, 1000);
}
