let s = [];
function getCcw(p1, p2, p3) {
    return p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p1.y * p2.x - p2.y * p3.x - p3.y * p1.x
}

function drawLineWithDelay(x1, y1, x2, y2) {
    drawLine(x1, y1, x2, y2);
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
    drawLineWithDelay(points[0].x, points[0].y, points[1].x, points[1].y);

    for(let i = 2; i < points.length; i++) {
        await delay();
        drawLineWithDelay(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y);


        while (s.length >= 1 && getCcw(points[s[top - 1]], points[s[top]], points[i]) <= 0) {
            top--;
            s.pop();

            await delay();
            eraseLine();
            drawStackLines();
            await delay();
            drawLineWithDelay(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y);
        }


        await delay();
        drawLineWithDelay(points[s[top]].x, points[s[top]].y, points[i].x, points[i].y);
        s.push(i);
        top++;
    }


    await delay();
    drawLineWithDelay(points[s[top]].x, points[s[top]].y, points[0].x, points[0].y);
}