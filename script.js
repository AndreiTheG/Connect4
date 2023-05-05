let turn = 0;

function pressCell(id) {
    let red = "rgb(255, 4, 10)";
    let white = "rgb(255, 255, 255)";
    let yellow = "rgb(240, 255, 0)";
    turn += 1;
    let maxRow = 6, currentCol = id % 10;
    let isOnclick = false; 
    for (let i = maxRow; i >= 1 && isOnclick == false; --i) {
        let circle = document.getElementById('circle' + (i * 10 + currentCol) + '');
        let style = circle.computedStyleMap().get('background-color').toString();
        if (style == white) {
            if (turn % 2 != 0) {
                circle.style.backgroundColor = yellow;
                verticalCross(i, currentCol);
                orizontalCross(i, currentCol);
                diagonalCross(i, currentCol);
            } else {
                circle.style.backgroundColor = red;
                verticalCross(i, currentCol);
                orizontalCross(i, currentCol);
                diagonalCross(i, currentCol);
            }
            isOnclick = true;
        }
    }
    if (turn > 42) {
        document.getElementById('message').innerHTML = 'Draw!';
        disableOnclick();
    }
}

function compare(currentDisk, neighbour, nrYellowDisks, nrRedDisks, sameColor) {
    let yellow = "rgb(240, 255, 0)";
    let red = "rgb(255, 4, 10)";
    let style1 = currentDisk.computedStyleMap().get('background-color').toString();
    let style2 = neighbour.computedStyleMap().get('background-color').toString();
    if (style1 == yellow && style1 == style2) {
        ++nrYellowDisks.val;
    } else if (style1 == red && style1 == style2) {
        ++nrRedDisks.val;
    } else {
        sameColor.val = false;
    }
}

function outputCondition(countYellowDisks, countRedDisks) {
    if (countYellowDisks.val >= 3) {
        document.getElementById('message').innerHTML = 'The player with yellow disks has won!';
        disableOnclick();
    } else if (countRedDisks.val >= 3) {
        document.getElementById('message').innerHTML = 'The player with red disks has won!';
        disableOnclick();
    }
}

function verifyCoodonates(row, column) {
    if (row >= 1 && row <= 6 && column >= 1 && column <= 7) {
        return true;
    }
    return false;
}

function verifyDiagonal(row, column, countYellowDisks, countRedDisks) {
    let count1 = 1, count2 = 1, diagonalFound = false;
    const yellow1 = {val: 0}, red1 = {val: 0}, yellow2 = {val: 0}, red2 = {val: 0}, yellow3 = {val: 0}, red3 = {val: 0}, yellow4 = {val: 0}, red4 = {val: 0};
    for (let step = 1; step <= 4 && diagonalFound == false; ++step) {
        const sameColor = {val: true};
        let exists = true;
        for (let i = row, j = column; exists == true && sameColor.val == true; i += count1, j += count2) {
            let circle = document.getElementById('circle' + (i * 10 + j) + '');
            if (verifyCoodonates(i, j) == true) {
                if ((i + 1 <= 6 && j + 1 <= 7 && count1 == 1 && count2 == 1) || (i - 1 >= 1 && j - 1 >= 1 && count1 == -1 && count2 == -1)) {
                    let neighbour = document.getElementById('circle' + ((i + count1) * 10 + (j + count2)) + '');
                    compare(circle, neighbour, yellow1, red1, sameColor);
                } else if ((i + 1 <= 6 && j - 1 >= 1 && count1 == 1 && count2 == -1) || (i - 1 >= 1 && j + 1 <= 7 && count1 == -1 && count2 == 1)) {
                    let neighbour = document.getElementById('circle' + ((i + count1) * 10 + (j + count2)) + '');
                    compare(circle, neighbour, yellow2, red2, sameColor);
                }
            } else {
                exists = false;
            }
            /*if ((i + 1 <= 6 && j + 1 <= 7 && count1 == 1 && count2 == 1) || (i - 1 >= 1 && j - 1 >= 1 && count1 == -1 && count2 == -1)) {
                let neighbour = document.getElementById('circle' + ((i + count1) * 10 + (j + count2)) + '');
                compare(circle, neighbour, yellow1, red1, sameColor);
            } else if ((i + 1 <= 6 && j - 1 >= 1 && count1 == 1 && count2 == -1) || (i - 1 >= 1 && j + 1 <= 7 && count1 == -1 && count2 == 1)) {
                let neighbour = document.getElementById('circle' + ((i + count1) * 10 + (j + count2)) + '');
                compare(circle, neighbour, yellow2, red2, sameColor);
            }*/
        }
        if (yellow1.val >= 3 || red1.val >= 3) {
            countYellowDisks.val = yellow1.val;
            countRedDisks.val = red1.val;
            diagonalFound = true;
        } else if (yellow2.val >= 3 || red2.val >= 3) {
            countYellowDisks.val = yellow2.val;
            countRedDisks.val = red2.val;
            diagonalFound = true;
        }
        if (step % 2 != 0) {
            count2 = -1;
        } else {
            let aux = count1;
            count1 = count2;
            count2 = aux;
        }
    }
}

function diagonalCross(row, column) {
    const countYellowDisks = {val : 0}, countRedDisks = {val : 0};
    verifyDiagonal(row, column, countYellowDisks, countRedDisks);
    outputCondition(countYellowDisks, countRedDisks);
}

function verifyOrizontal(row, column, countYellowDisks, countRedDisks) {
    const leftYellowDisks = {val : 0}, rightYellowDisks = {val : 0}, leftRedDisks = {val : 0}, rightRedDisks = {val : 0};
    let counter = 1, counterFound = false;
    for (let step = 1; step <= 2 && counterFound == false; ++step) {
        sameColor = {val : true}
        let exists = true;
        for (let i = column; sameColor.val == true && exists == true; i += counter) {
            let circle = document.getElementById('circle' + (row * 10 + i) + '');
            if (i + 1 <= 7 && counter == 1) {
                let neighbour = document.getElementById('circle' + (row * 10 + (i + counter)) + '');
                compare(circle, neighbour, rightYellowDisks, rightRedDisks, sameColor);
            } else if (i - 1 >= 1 && counter == -1) {
                let neighbour = document.getElementById('circle' + (row * 10 + (i + counter)) + '');
                compare(circle, neighbour, leftYellowDisks, leftRedDisks, sameColor);
            } else {
                exists = false;
            }
        }
        countYellowDisks.val = rightYellowDisks.val + leftYellowDisks.val;
        countRedDisks.val = rightRedDisks.val +  leftRedDisks.val;
        if (countYellowDisks.val >= 3 || countYellowDisks.val  >= 3) {
            counterFound = true;
        }
        if (step % 2 != 0) {
            counter = -1;
        }
    }
}

function orizontalCross(row, column) {
    const countYellowDisks = {val : 0}, countRedDisks = {val : 0};
    verifyOrizontal(row, column, countYellowDisks, countRedDisks);
    outputCondition(countYellowDisks, countRedDisks);
}

function verticalCross(row, column) {
    const sameColor = {val: true}, countYellowDisks = {val: 0}, countRedDisks = {val: 0};
    for (let i = row; i <= 6 && sameColor.val == true; ++i) {
        let circle = document.getElementById('circle' + (i * 10 + column) + '');
        if (i + 1 <= 6) {
            let neighbour = document.getElementById('circle' + ((i + 1) * 10 + column) + '');
            compare(circle, neighbour, countYellowDisks, countRedDisks, sameColor);
        }
    }
    outputCondition(countYellowDisks, countRedDisks);
}

function disableOnclick() {
    for (let i = 1; i <= 6; ++i) {
        for (let j = 1; j <= 7; ++j) {
            document.getElementById('' + (i * 10 + j) + '').onclick = null;
        }
    }
    document.getElementById('refreshButton').innerHTML = '<br><input class="btn btn-success" type="button" value="Refresh" onclick="refresh()">';
}

function refresh() {
    location.reload();
}