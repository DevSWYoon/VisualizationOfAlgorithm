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

    await drawArrayByIndexRange(left, right, 'lightgreen');
}

async function quickSort(left, right) {
    if(right - left <= 1) return;

    let temp = new Array(array.length);

    const mid = Math.floor((left + right) / 2);

    drawArrayByIndex(mid, 'yellow');
    drawVerticalLine(array[mid] * barHeightUnit, 'yellow');

    let i = left;
    let j = right - 1;
    let t_left = left, t_right = right - 1;

    while(i < mid) {
        if(!lock) return;
        await delay();

        outputCmpCount(++cmpCount);

        if(array[i] < array[mid]) {
            drawArrayByIndex(i, 'blue');
            temp[t_left++] = array[i++];
        } else {
            drawArrayByIndex(i, 'red');
            temp[t_right--] = array[i++];
        }
    }

    while(j >= mid) {
        if(!lock) return;
        await delay();

        outputCmpCount(++cmpCount);

        if(array[j] < array[mid]) {
            drawArrayByIndex(j, 'blue');
            temp[t_left++] = array[j--];
        } else {
            drawArrayByIndex(j, 'red');
            temp[t_right--] = array[j--];
        }
    }

    for(let i = left; i < right; ++i) {
        array[i] = temp[i];
    }

    await delay();
    await drawArrayByIndexRange(left, right, 'lightgreen');

    t_left = t_left === left ? t_left + 1 : t_left;

    await quickSort(left, t_left);
    await quickSort(t_left, right);
}
