let points = [];
let delayTime = 200;
async function delay() {
    return new Promise(resolve => setTimeout(resolve, delayTime));
}

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function randomPoints() {
    for (let i = 0; i < 10; i++) {
        points.push({ x: Math.random() * 500, y: Math.random() * 500 });
    }

    drawPoints();
}

function drawPoint(x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(Date.now() + ' drawPoints');

    for (let i = 0; i < points.length; i++) {
        drawPoint(points[i].x, points[i].y);
    }
    console.log(Date.now() + ' drawPoints end');
}

function addPoint() {
    const xInput = document.getElementById('xInput');
    const yInput = document.getElementById('yInput');
    const x = parseInt(xInput.value);
    const y = parseInt(yInput.value);

    if (!isNaN(x) && !isNaN(y)) {
        points.push({ x, y });
        drawPoints();

        xInput.value = '';
        yInput.value = '';
    }
}

function getDistance(p1, p2) {
    return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
}

function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function eraseLine() {
    drawPoints();
}

function clearCanvas() {
    points = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}