const ccwTextElement = document.getElementById('ccwText');
const convexHullTextElement = document.querySelector('.convexHullText');
const convexHullPointsTextElement = document.querySelector('.pointsText');

let points = [];

let s = [];

function randomPoints() {
    for (let i = 0; i < 10; i++) {
        points.push({ x: Math.random() * canvas.width * 0.9 + canvas.width * 0.05, y: Math.random() * canvas.height * 0.9 + canvas.height * 0.05});
    }

    drawPoints();
}

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray');

    for (let i = 0; i < points.length; i++) {
        drawPoint(points[i].x, points[i].y);
    }

    convexHullPointsTextElement.innerHTML = 'POINTS : <br>' + points.map(p => `(${p.x}, ${p.y})`).join('<br>');
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

function getCcw(p1, p2, p3) {
    return p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p1.y * p2.x - p2.y * p3.x - p3.y * p1.x
}

function drawStackLines() {
    for (let i = 0; i < s.length - 1; i++) {
        drawLine(points[s[i]].x, points[s[i]].y, points[s[i + 1]].x, points[s[i + 1]].y);
    }
}
async function drawLinesByConvexHullAlgorithm() {
    if(points.length < 3) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.sort((a, b) => {
        if(a.x === b.x) return a.y - b.y;
        return a.x - b.x;
    })  ;

    const sortedPoints = points.slice(1).sort((a, b) => {
        let ccw = getCcw(points[0], a, b);
        if(ccw === 0) return getDistance(points[0], a) - getDistance(points[0], b);

        return -ccw;
    });

    points = [points[0], ...sortedPoints];

    drawPoints();

    console.log(points);

    s = [];
    let top = 1;
    s.push(0);
    s.push(1);

    await delay();
    drawLine(points[0].x, points[0].y, points[1].x, points[1].y);

    for(let i = 2; i < points.length; i++) {
        await delay();
        drawLine(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y);

        while (s.length >= 1) {
            let ccw = getCcw(points[s[top - 1]], points[s[top]], points[i]);
            ccwTextElement.innerText = 'CCW : ' + ccw;

            if(ccw > 0) break;

            await delay();
            drawLine(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y, 'red');

            top--;
            s.pop();

            await delay();
            eraseLine();
            drawStackLines();
            await delay();
            drawLine(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y);
        }


        await delay();
        drawLine(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y);
        s.push(i);
        top++;
    }


    await delay();
    drawLine(points[s[top]].x, points[s[top]].y, points[0].x, points[0].y);

    await delay();
    convexHullTextElement.innerHTML = 'CONVEX HULL (# of points - ' + s.length + ') : <br>' + s.map(i => `(${points[i].x}, ${points[i].y})`).join(' -> <br>');
}

function reset() {
    isPaused = false;
    points = [];
    s = [];
    drawPoints();
    clearCanvas();
    ccwTextElement.innerHTML = 'CCW : UNDEFINED';
    convexHullTextElement.innerHTML = 'CONVEX HULL : <br>UNDEFINED';
    convexHullPointsTextElement.innerHTML = 'POINTS : <br>';
}

drawGrid('lightgray');