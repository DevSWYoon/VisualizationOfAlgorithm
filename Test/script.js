const svg = document.getElementById('sortVisual');
const arraySize = 20;
const array = [];
const width = svg.width.baseVal.value;
const height = svg.height.baseVal.value;
const barWidth = width / arraySize;
const delay = 1;  // 100ms delay for visualization

for (let i = 0; i < arraySize; i++) {
    array.push(Math.random() * height);
}

function drawArray(arr) {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    for (let i = 0; i < arr.length; i++) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', i * barWidth);
        rect.setAttribute('y', height - arr[i]);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', arr[i]);
        rect.setAttribute('fill', 'blue');
        svg.appendChild(rect);
    }
}

async function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            drawArray(arr);
        }
    }
}

function startSorting() {
    bubbleSort([...array]);
}

drawArray(array);
