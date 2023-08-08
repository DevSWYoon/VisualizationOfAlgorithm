let delayTime = 50;

const ccwTextElement = document.getElementById('ccwText');
const convexHullTextElement = document.getElementById('convexHullText');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


async function delay() {
    return new Promise(resolve => setTimeout(resolve, delayTime));
}

function coordinateText(p) {
    return `(${p.x}, ${p.y})`;
}
function drawGrid(color) {
    // 캔버스의 크기 가져오기
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 격자의 크기 설정
    const cellSize = 20;
    const numHorizontalLines = Math.floor(canvasHeight / cellSize);
    const numVerticalLines = Math.floor(canvasWidth / cellSize);

    // 격자 선 스타일 설정
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;

    // 수평선 그리기
    for (let i = 0; i < numHorizontalLines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvasWidth, i * cellSize);
        ctx.stroke();
    }

    // 수직선 그리기
    for (let i = 0; i < numVerticalLines; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvasHeight);
        ctx.stroke();
    }
}

function getDistance(p1, p2) {
    return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
}

function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
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
    drawGrid('lightgray');
    ccwTextElement.innerHTML = 'CCW : UNDEFINED';
}
