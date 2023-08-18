const arrayValuesText = document.querySelector('.arrayValues');
const cmpCountText = document.getElementById('cmpCount');

let Array = [];

let barWidth = 0;
let barHeightUnit = 0;

let lock = false;

function outputCmpCount(cmpCount) {
    cmpCountText.innerText = `COMP COUNT: ${cmpCount}`;
}

function outputArrayValues() {
    arrayValuesText.innerHTML = 'Array : <br>' + Array.join('<br>');
}

function checkAndSetLock() {
    if (lock) return true;

    lock = true;
    return false;
}

function assignBarWidthAndHeightUnit() {
    barWidth = canvas.width / Array.length;
    barHeightUnit = canvas.height / Math.max(...Array);
}

function drawArrayByIndex(i, color = 'black') {
    assignBarWidthAndHeightUnit();
    drawRectangle(i * barWidth, canvas.height - Array[i] * barHeightUnit, barWidth, Array[i] * barHeightUnit, color);
}

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray');

    assignBarWidthAndHeightUnit();
    outputArrayValues();

    for (let i = 0; i < Array.length; i++) {
        const barHeight = Array[i] * barHeightUnit;
        const x = i * barWidth;
        const y = canvas.height - barHeight;

        drawRectangle(x, y, barWidth, barHeight, 'black');
    }
}

function generateRandomArray() {
    for (let i = 0; i < 10; i++) {
        Array.push(Math.floor(Math.random() * canvas.height));
    }
    drawArray();
}

function addArrayValue() {
    const element = parseInt(document.getElementById('arrayValue').value);
    if (!isNaN(element)) {
        Array.push(element);
        drawArray();
    }
}

async function reset() {
    lock = false;
    await delay(delayTime * 10 + 1);
    Array = [];
    arrayValuesText.innerHTML = 'Array : <br>';
    cmpCountText.innerText = 'COMP COUNT: 0';
    drawArray();
}

drawGrid('lightgray');