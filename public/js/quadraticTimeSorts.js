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
            if (!lock) return;

            await drawArrayByIndexWithDelay(j, 'yellow');
            await drawArrayByIndexWithDelay(j + 1, 'blue');

            outputCmpCount(++cmpCount);
            if(array[j] > array[j + 1]) {
                await drawArrayByIndexWithDelay(j, 'blue');
                await drawArrayByIndexWithDelay(j + 1, 'red');

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                await drawArrayByIndexWithDelay(j, 'black');
                await drawArrayByIndexWithDelay(j + 1, 'black');
            }

            await drawArrayByIndexWithDelay(j, 'black');
            await drawArrayByIndexWithDelay(j + 1, 'black');
        }
    }
}

async function selectionSort() {
    for(let i = 0; i < array.length - 1; ++i) {
        let minIdx = i;

        await drawArrayByIndexWithDelay(minIdx, 'green');
        for(let j = i + 1; j < array.length; ++j) {
            if(!lock) return;

            await drawArrayByIndexWithDelay(j, 'yellow');

            outputCmpCount(++cmpCount);

            if(array[minIdx] > array[j]) {
                await drawArrayByIndexWithDelay(minIdx, 'red');
                await drawArrayByIndexWithDelay(j, 'red');

                await drawArrayByIndexWithDelay(minIdx, 'black');
                await drawArrayByIndexWithDelay(j, 'blue');
                minIdx = j;
            } else {
                await drawArrayByIndexWithDelay(j, 'black');
            }
        }

        await drawArrayByIndexWithDelay(i, 'red');
        await drawArrayByIndexWithDelay(minIdx, 'red');

        let temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;

        await drawArrayByIndexWithDelay(i, 'black');
        await drawArrayByIndexWithDelay(minIdx, 'black');
    }
}

async function insertionSort() {
    for(let i = 1; i < array.length; ++i) {
        let j = i - 1;
        let key = array[i];

        await drawArrayByIndexWithDelay(i, 'red');

        while(true) {
            outputCmpCount(++cmpCount);
            if(j < 0 || array[j] <= key) break;

            if(!lock) return;

            await drawArrayByIndexWithDelay(j, 'yellow');

            array[j + 1] = array[j];
            await drawArrayByIndexWithDelay(j, 'black');
            await drawArrayByIndexWithDelay(j + 1, 'black');
            --j;
        }

        await drawArrayByIndexWithDelay(j + 1, 'red');
        array[j + 1] = key;

        await drawArrayByIndexWithDelay(i, 'black');
        await drawArrayByIndexWithDelay(j + 1, 'black');
    }
}