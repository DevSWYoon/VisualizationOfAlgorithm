const arrayValuesText = document.querySelector('.arrayValues');
const cmpCountText = document.getElementById('cmpCount');
const arrayValueInput = document.getElementById('arrayValue');

let array = [];

let barWidth = 0;
let barHeightUnit = 0;

let lock = false;

let cmpCount = 0;

document.getElementById("shuffle").addEventListener("click", () => {
    shuffleArray().then(r => {
        document.getElementById("cmpCount").innerText = "COMP COUNT : UNDEFINED";
        document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : UNDEFINED";
    });
});
arrayValueInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addArrayValue();
    }
});

function generateRandomArray() {
    for (let i = 0; i < 100; i++) {
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

function outputCmpCount() {
    cmpCountText.innerText = `COMP COUNT: ${cmpCount}`;
}

function outputArrayValues() {
    arrayValuesText.innerHTML = 'Array (# of elements - ' + array.length + ') : <br>' + array.join('<br>');
}

async function shuffleArray() {
    lock = false;
    isPaused = false;
    await delay(delayTime * 10 + 1);

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

    outputCmpCount(cmpCount = 0);
    lock = true;
    return false;
}

function assignBarWidthAndHeightUnit() {
    barWidth = canvas.width / array.length;
    barHeightUnit = canvas.height / Math.max(...array);
}

async function drawArrayByIndexWithDelay(i, color = 'black') {
    if(delayTime < 0) return;

    await conditionalDelay(delayTime);

    const barLeft = Math.floor(i * barWidth), barRight = Math.ceil(barWidth);

    ctx.clearRect(barLeft, 0,  barRight, canvas.height);

    drawRectangle(barLeft, canvas.height - array[i] * barHeightUnit,barRight, array[i] * barHeightUnit, color);
}

async function drawArrayByIndexRangeWithDelay(left, right, pivot, color = 'black') {
    if(delayTime < 0) return;
    outputArrayValues();

    for(let i = left; i < right; ++i) {
        if(!lock) return;

        if(pivot < 0) {
            await drawArrayByIndexWithDelay(i, 'lightgreen');
            continue;
        }

        if(array[i] < pivot) {
            await drawArrayByIndexWithDelay(i, 'blue');
        } else {
            await drawArrayByIndexWithDelay(i, 'red');
        }
        drawVerticalLine(pivot * barHeightUnit, 'yellow');
    }
}

function drawArrayByIndexRange(left, right, pivot, color = 'black') {
    if(delayTime < 0) return;

    ctx.clearRect(left * barWidth, 0, (right - left) * barWidth, canvas.height);

    for(let i = left; i < right; ++i) {
        const barHeight = array[i] * barHeightUnit;
        const barLeft = Math.floor(i * barWidth), barRight = Math.ceil(barWidth);
        const y = canvas.height - barHeight;

        if(!lock) return;

        drawRectangle(barLeft, y, barRight, barHeight, color);
    }
}

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    assignBarWidthAndHeightUnit();
    outputArrayValues();

    for (let i = 0; i < array.length; i++) {
        const barHeight = array[i] * barHeightUnit;
        const barLeft = Math.floor(i * barWidth), barRight = Math.ceil(barWidth);
        const y = canvas.height - barHeight;

        drawRectangle(barLeft, y, barRight, barHeight, 'black');
    }
}


function getMiddleValue(left, mid, right) {
    if (array[left] > array[right]) {
        if (array[mid] > array[right]) {
            return array[mid] > array[left] ? array[left] : array[mid];
        } else {
            return array[right];
        }
    } else {
        if (array[mid] > array[left]) {
            return array[mid] > array[right] ? array[right] : array[mid];
        } else {
            return array[left];
        }
    }
}

function getMiddleIndex(left, mid, right) {
    if (array[left] > array[right]) {
        if (array[mid] > array[right]) {
            return array[mid] > array[left] ? left : mid;
        } else {
            return right;
        }
    } else {
        if (array[mid] > array[left]) {
            return array[mid] > array[right] ? right : mid;
        } else {
            return left;
        }
    }
}

function getAverageOfThree(left, mid, right) {
    if(left === mid && mid === right) return array[left];

    if(left === mid) return (array[left] + array[right]) / 2;

    if(mid === right) return (array[left] + array[mid]) / 2;

    return (array[left] + array[mid] + array[right]) / 3;
}

async function reset() {
    isPaused = false;
    lock = false;
    await delay(delayTime * 10 + 1);
    array = [];
    cmpCount = 0;
    arrayValuesText.innerHTML = 'Array : <br>';
    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : UNDEFINED";
    cmpCountText.innerText = 'COMP COUNT: 0';
    drawArray();
}
