document.getElementById("mergeSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    cmpCount = 0;

    mergeSort(0, array.length).then(() => {
        drawArray();
        lock = false;
    });
});

document.getElementById("quickSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    cmpCount = 0;

    quickSort(0, array.length).then(() => {
        drawArray();
        lock = false;
    });
});

async function mergeSort(left, right) {
    if(right - left <= 1 || !lock) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSort(left, mid);
    await mergeSort(mid, right);

    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    let temp = new Array(array.length);

    let i = left;
    let j = mid;
    let k = left;

    while(i < mid && j < right) {
        if(!lock) return;

        outputCmpCount(++cmpCount);
        if(array[i] < array[j]) {
            await delay();
            drawArrayByIndex(i, 'blue');
            temp[k++] = array[i++];
        } else {
            await delay();
            drawArrayByIndex(j, 'red');
            temp[k++] = array[j++];
        }
    }

    while(i < mid) {
        if(!lock) return;

        await delay();
        drawArrayByIndex(i, 'blue');
        temp[k++] = array[i++];
    }

    while(j < right) {
        if(!lock) return;

        await delay();
        drawArrayByIndex(j, 'red');
        temp[k++] = array[j++];
    }

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    drawArray();
}

async function quickSort(left, right) {
    if(right - left <= 1) return;

    let temp = new Array(array.length);

    const mid = Math.floor((left + right) / 2);

    await delay();
    drawArrayByIndex(mid, 'lightgreen');

    let i = left;
    let j = right - 1;
    let k = left;

    while(i < mid && j >= mid) {
        if(!lock) return;

        outputCmpCount(++cmpCount);
        if(array[i] < array[mid]) {
            await delay();
            drawArrayByIndex(i, 'blue');
            temp[k++] = array[i++];
        } else {
            await delay();
            if(j !== mid) drawArrayByIndex(j, 'red');
            temp[k++] = array[j--];
        }
    }

    while(i < mid) {
        if(!lock) return;

        await delay();
        drawArrayByIndex(i, 'blue');
        temp[k++] = array[i++];
    }

    while(j >= mid) {
        if(!lock) return;

        await delay();
        drawArrayByIndex(j, 'red');
        temp[k++] = array[j--];
    }

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    drawArray();

    await quickSort(left, mid);
    await quickSort(mid, right);
}
