async function bubbleSort() {
    if(checkAndSetLock()) return;

    let cmpCount = 0;

    for(let i = 0; i < Array.length; ++i) {
        for(let j = 0; j < Array.length - i - 1; ++j) {
            await delay();
            if (!lock) return;

            drawArrayByIndex(j, 'blue');
            drawArrayByIndex(j + 1, 'blue');

            outputCmpCount(++cmpCount);
            if(Array[j] > Array[j + 1]) {
                await delay();
                drawArrayByIndex(j, 'red');
                drawArrayByIndex(j + 1, 'red');

                let temp = Array[j];
                Array[j] = Array[j + 1];
                Array[j + 1] = temp;
            }

            await delay();
            drawArray();
        }
    }

    lock = false;
}

async function selectionSort() {
    if(checkAndSetLock()) return;

    let cmpCount = 0;

    for(let i = 0; i < Array.length - 1; ++i) {
        let minIdx = i;

        drawArrayByIndex(minIdx, 'green');
        for(let j = i + 1; j < Array.length; ++j) {
            await delay();
            if(!lock) return;

            drawArrayByIndex(j, 'blue');

            outputCmpCount(++cmpCount);

            await delay();
            if(Array[minIdx] > Array[j]) {
                drawArrayByIndex(minIdx, 'red');
                drawArrayByIndex(j, 'red');
                await delay();

                drawArrayByIndex(minIdx, 'black');
                drawArrayByIndex(j, 'green');
                minIdx = j;
            } else {
                drawArrayByIndex(j, 'black');
            }
        }

        await delay();
        drawArrayByIndex(i, 'red');
        drawArrayByIndex(minIdx, 'red');

        let temp = Array[i];
        Array[i] = Array[minIdx];
        Array[minIdx] = temp;

        await delay();
        drawArray();
    }

    lock = false;
}

async function insertionSort() {
    if(checkAndSetLock()) return;

    let cmpCount = 0;

    for(let i = 1; i < Array.length; ++i) {
        let j = i - 1;
        let key = Array[i];

        drawArrayByIndex(i, 'green');

        outputCmpCount(++cmpCount);
        while(j >= 0 && Array[j] > key) {
            await delay();
            if(!lock) return;

            drawArrayByIndex(j, 'blue');

            await delay();
            drawArrayByIndex(j, 'black');
            Array[j + 1] = Array[j];
            --j;
        }

        await delay();
        drawArrayByIndex(j + 1, 'red');
        Array[j + 1] = key;

        await delay();
        drawArray();
    }

    lock = false;
}