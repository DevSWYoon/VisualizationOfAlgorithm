let delayTime = 50;

const nodeRadius = 20;

const canvas = document.getElementById('myCanvas');
const delayTimeTextElement = document.getElementById("delayTimeInput");
const ctx = canvas.getContext('2d');

document.getElementById("setDelayTime").addEventListener("click", () => {
    const delayTime = delayTimeTextElement.value;

    setDelayTime(delayTime);

    alert(`딜레이 시간이 ${delayTime}ms로 설정되었습니다.`);
    delayTimeTextElement.value = "";
});
function setDelayTime(inputDelayTime = delayTime) {
    delayTime = inputDelayTime;
}
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

function drawLine(x1, y1, x2, y2, color = 'blue') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawNode(node, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    ctx.fillText(node, x - 5, y + 5);
}

function drawArrow(x1, y1, x2, y2, color = 'blue') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8;

    // 두 노드 사이의 거리 계산
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // 끝점 좌표 계산
    const arrowLength = 10; // 화살표 길이

    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    const size = 10;

    const begX= x1 + nodeRadius * Math.cos(angle);
    const begY = y1 + nodeRadius * Math.sin(angle);
    const endX = x2 - nodeRadius * Math.cos(angle);
    const endY = y2 - nodeRadius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(begX, begY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - size * Math.cos(angle - Math.PI / 6), endY - size * Math.sin(angle - Math.PI / 6));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - size * Math.cos(angle + Math.PI / 6), endY - size * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function drawLoop(x, y, nodeRadius, color = 'blue') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x + nodeRadius * 1.5, y, nodeRadius * 1.5, 0, 2 * Math.PI);
    ctx.stroke();
}

function eraseLine() {
    drawPoints();
}

function clearCanvas() {
    points = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray');
}
