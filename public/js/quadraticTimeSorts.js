document.getElementById("bubbleSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : Bubble Sort";

    bubbleSort().then(() => {
        drawArray();
        lock = false;
    });
});

document.getElementById("selectionSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : Selection Sort";


    selectionSort().then(() => {
        drawArray();
        lock = false;
    });
});

document.getElementById("insertionSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : Insertion Sort";

    insertionSort().then(() => {
        drawArray();
        lock = false;
    });
});

async function bubbleSort() {
    for(let i = 0; i < array.length; ++i) {
        for(let j = 0; j < array.length - i - 1; ++j) {
            await delay();
            if (!lock) return;

            drawArrayByIndex(j, 'yellow');
            drawArrayByIndex(j + 1, 'blue');

            outputCmpCount(++cmpCount);
            if(array[j] > array[j + 1]) {
                await delay();
                drawArrayByIndex(j, 'blue');
                drawArrayByIndex(j + 1, 'red');

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }

            await delay();
            drawArray();
        }
    }

    lock = false;
}

async function selectionSort() {
    for(let i = 0; i < array.length - 1; ++i) {
        let minIdx = i;

        drawArrayByIndex(minIdx, 'green');
        for(let j = i + 1; j < array.length; ++j) {
            await delay();
            if(!lock) return;

            drawArrayByIndex(j, 'yellow');

            outputCmpCount(++cmpCount);

            await delay();
            if(array[minIdx] > array[j]) {
                drawArrayByIndex(minIdx, 'red');
                drawArrayByIndex(j, 'red');
                await delay();

                drawArrayByIndex(minIdx, 'black');
                drawArrayByIndex(j, 'blue');
                minIdx = j;
            } else {
                drawArrayByIndex(j, 'black');
            }
        }

        await delay();
        drawArrayByIndex(i, 'red');
        drawArrayByIndex(minIdx, 'red');

        let temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;

        await delay();
        drawArray();
    }

    lock = false;
}

async function insertionSort() {
    for(let i = 1; i < array.length; ++i) {
        let j = i - 1;
        let key = array[i];

        drawArrayByIndex(i, 'red');

        while(true) {
            outputCmpCount(++cmpCount);
            if(j < 0 || array[j] <= key) break;

            await delay();
            if(!lock) return;

            drawArrayByIndex(j, 'yellow');

            await delay();
            array[j + 1] = array[j];
            drawArrayByIndex(j, 'black');
            drawArrayByIndex(j + 1, 'black');
            --j;
        }

        await delay();
        drawArrayByIndex(j + 1, 'red');
        array[j + 1] = key;

        await delay();
        drawArray();
    }

    lock = false;
}