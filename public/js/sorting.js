const arrayValuesText = document.querySelector('.arrayValues');
const cmpCountText = document.getElementById('cmpCount');

let array = [];

let barWidth = 0;
let barHeightUnit = 0;

let lock = false;

let cmpCount = 0;

function outputCmpCount() {
    cmpCountText.innerText = `COMP COUNT: ${cmpCount}`;
}

function outputArrayValues() {
    arrayValuesText.innerHTML = 'Array : <br>' + array.join('<br>');
}

function shuffleArray() {
    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * array.length);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    drawArray();
}

function checkAndSetLock() {
    if (lock) return true;

    lock = true;
    return false;
}

function assignBarWidthAndHeightUnit() {
    barWidth = canvas.width / array.length;
    barHeightUnit = canvas.height / Math.max(...array);
}

function drawArrayByIndex(i, color = 'black') {
    assignBarWidthAndHeightUnit();
    drawRectangle(i * barWidth, canvas.height - array[i] * barHeightUnit, barWidth, array[i] * barHeightUnit, color);
}

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray');

    assignBarWidthAndHeightUnit();
    outputArrayValues();

    for (let i = 0; i < array.length; i++) {
        const barHeight = array[i] * barHeightUnit;
        const x = i * barWidth;
        const y = canvas.height - barHeight;

        drawRectangle(x, y, barWidth, barHeight, 'black');
    }
}

function generateRandomArray() {
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * canvas.height));
    }
    drawArray();
}

function addArrayValue() {
    const element = parseInt(document.getElementById('arrayValue').value);
    if (!isNaN(element)) {
        array.push(element);
        drawArray();
    }
}

async function reset() {
    lock = false;
    await delay(delayTime * 10 + 1);
    array = [];
    cmpCount = 0;
    arrayValuesText.innerHTML = 'Array : <br>';
    cmpCountText.innerText = 'COMP COUNT: 0';
    drawArray();
}

drawGrid('lightgray');