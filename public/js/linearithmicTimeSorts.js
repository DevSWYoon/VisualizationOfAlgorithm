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

    await drawArrayByIndexRange(left, right, 'lightgreen');
}

async function quickSort(left, right) {
    if(right - left <= 1) return;

    let temp = new Array(array.length);

    const mid = Math.floor((left + right) / 2);

    drawArrayByIndex(mid, 'yellow');
    drawVerticalLine(array[mid] * barHeightUnit, 'yellow');

    let t_left = left, t_right = right - 1;

    for(let i = left; i < right; ++i) {
        if(i === mid) continue;

        if(!lock) return;
        await delay();
        outputCmpCount(++cmpCount);

        if(array[i] < array[mid]) {
            drawArrayByIndex(i, 'blue');
            temp[t_left++] = array[i];
        } else {
            drawArrayByIndex(i, 'red');
            temp[t_right--] = array[i];
        }
    }

    temp[t_right] = array[mid];

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    await drawArrayByIndexRange(left, right, 'lightgreen');

    await quickSort(left, t_left);
    await quickSort(t_right + 1, right);
}
