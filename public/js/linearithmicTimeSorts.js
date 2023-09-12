document.getElementById("mergeSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    mergeSort(0, array.length).then(() => {
        drawArray();
        lock = false;
    });
});

document.getElementById("quickSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    quickSort(0, array.length).then(() => {
        drawArray();
        lock = false;
    });
});

document.getElementById("3-pivotQuickSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    quickSort(0, array.length, true).then(() => {
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
        await delay();

        if(array[i] < array[j]) {
            drawArrayByIndex(i, 'blue');
            temp[k++] = array[i++];
        } else {
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

    await drawArrayByIndexRangeWithDelay(left, right, -1);
    drawArray();
}

async function quickSort(left, right, isThreePivot = false) {
    if(right - left <= 1) return;

    let temp = new Array(array.length);

    const mid = Math.floor((left + right) / 2);
    const pivot = isThreePivot ? getMiddleValue(left, mid, right - 1) : array[mid];

    let t_left = left, t_right = right - 1;

    for(let i = left; i < right; ++i) {
        if(i === mid) continue;

        if(!lock) return;
        await delay();
        outputCmpCount(++cmpCount);

        if(array[i] < pivot) {
            drawArrayByIndex(i, 'blue');
            temp[t_left++] = array[i];
        } else {
            drawArrayByIndex(i, 'red');
            temp[t_right--] = array[i];
        }

        drawVerticalLine(pivot * barHeightUnit, 'yellow');
    }

    temp[t_right] = pivot;

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    await drawArrayByIndexRangeWithDelay(left, right, pivot);
    drawArray();

    await quickSort(left, t_left);
    await quickSort(t_right + 1, right);
}