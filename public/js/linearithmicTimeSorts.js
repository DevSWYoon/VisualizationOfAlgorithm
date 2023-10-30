document.getElementById("mergeSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    console.time('mergeSort');

    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : Merge Sort";

    mergeSort(0, array.length).then(() => {
        drawArray();
        lock = false;
        console.timeEnd('mergeSort');
    });
});

document.getElementById("quickSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    console.time('quickSort');

    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : Quick Sort";

    quickSort(0, array.length).then(() => {
        drawArray();
        lock = false;
        console.timeEnd('quickSort');
    });
});

document.getElementById("3-pivotQuickSort").addEventListener("click", () => {
    if(checkAndSetLock()) return;

    console.time('3-pivotQuickSort');

    document.getElementById("nameOfAlgorithm").innerText = "ALGORITHM IN USE : 3-Pivot Quick Sort";

    quickSort(0, array.length, true).then(() => {
        drawArray();
        lock = false;
        console.timeEnd('3-pivotQuickSort');
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
            await drawArrayByIndexWithDelay(i, 'blue');
            temp[k++] = array[i++];
        } else {
            await drawArrayByIndexWithDelay(j, 'red');
            temp[k++] = array[j++];
        }
    }

    while(i < mid) {
        if(!lock) return;

        await drawArrayByIndexWithDelay(i, 'blue');
        temp[k++] = array[i++];
    }

    while(j < right) {
        if(!lock) return;

        await drawArrayByIndexWithDelay(j, 'red');
        temp[k++] = array[j++];
    }

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    await drawArrayByIndexRangeWithDelay(left, right, -1);
    drawArrayByIndexRange(left, right, -1);
}

async function quickSort(left, right, isThreePivot = false) {
    if(right - left <= 1) return;

    let temp = new Array(array.length);

    const mid = Math.floor((left + right) / 2);
    const pivot = isThreePivot ? getAverageOfThree(left, mid, right - 1) : array[mid];

    let t_left = left, t_right = right - 1;

    for(let i = left; i < right; ++i) {
        if(i === mid) continue;

        if(!lock) return;
        outputCmpCount(++cmpCount);

        if(array[i] < pivot) {
            await drawArrayByIndexWithDelay(i, 'blue');
            temp[t_left++] = array[i];
        } else {
            await drawArrayByIndexWithDelay(i, 'red');
            temp[t_right--] = array[i];
        }

        if (delayTime < 0) continue;

        drawVerticalLine(pivot * barHeightUnit, 'yellow');
    }

    temp[t_right] = pivot;

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    await drawArrayByIndexRangeWithDelay(left, right, pivot);
    drawArrayByIndexRange(0, array.length, pivot);

    await quickSort(left, t_left);
    await quickSort(t_right + 1, right);
}