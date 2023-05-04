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
    if (countYellowDisks == 3) {
        document.getElementById('message').innerHTML = 'The player with yellow disks has won!';
        disableOnclick();
    } else if (countRedDisks == 3) {
        document.getElementById('message').innerHTML = 'The player with red disks has won!';
        disableOnclick();
    }
}

function verifyDiagonal(row, column, countYellowDisks, countRedDisks) {
    const sameColor = {val: true};
    let count1 = 1, count2 = 1;
    for (let step = 1; step <= 4; ++step) {
        let exists = true;
        //console.log(step);
        //console.log(count1 + ' ' + count2);
        for (let i = row, j = column; exists == true && sameColor.val == true; i += count1, j += count2) {
            console.log(i + ' ' + j);
            let circle = document.getElementById('circle' + (i * 10 + j) + '');
            if (i + 1 <= 6 && i - 1 >= 1 && j + 1 <= 7 && j - 1 >= 1) {
                let neighbour = document.getElementById('circle' + ((i + count1) * 10 + (j + count2)) + '');
                compare(circle, neighbour, countYellowDisks, countRedDisks, sameColor);
            } else {
                exists = false;
            }
        }
        //console.log(countYellowDisks.val + ' ' + countRedDisks.val);
        if (step % 2 != 0) {
            count2 = -1;
        } else {
            let aux = count1;
            count1 = count2;
            count2 = aux;
        }
    }
}

/*function fromNorthEastToSouthWest(row, column, countYellowSouthWestDisks, countRedSouthWestDisks) {
    const sameColor = {val: true};
    for (let i = row, j = column; i <= 6 && j >= 1 && sameColor.val == true; ++i, --j) {
        let circle = document.getElementById('circle' + (i * 10 + j) + '');
        if (i + 1 <= 6 && j - 1 >= 1) {
            let neighbour = document.getElementById('circle' + ((i + 1) * 10 + (j - 1)) + '');
            compare(circle, neighbour, countYellowSouthWestDisks, countRedSouthWestDisks, sameColor);
        }
    }
} 

function fromSouthWestToNorthEast(row, column, countYellowNorthEastDisks, countRedNorthEastDisks) {
    const sameColor = {val: true};
    for (let i = row, j = column; i >= 1 && j <= 7 && sameColor.val == true; --i, ++j) {
        let circle = document.getElementById('circle' + (i * 10 + j) + '');
        if (i - 1 >= 1 && j + 1 <= 7) {
            let neighbour = document.getElementById('circle' + ((i - 1) * 10 + (j + 1)) + '');
            compare(circle, neighbour, countYellowNorthEastDisks, countRedNorthEastDisks, sameColor);
        }
    }
}

function fromNorthWestToSouthEast(row, column, countYellowSouthEastDisks, countRedSouthEastDisks) {
    const sameColor = {val: true};
    for (let i = row, j = column; i <= 6 && j <= 7 && sameColor.val == true; ++i, ++j) {
        let circle = document.getElementById('circle' + (i * 10 + j) + '');
        if (i + 1 <= 6 && j + 1 <= 7) {
            let neighbour = document.getElementById('circle' + ((i + 1) * 10 + (j + 1)) + '');
            compare(circle, neighbour, countYellowSouthEastDisks, countRedSouthEastDisks, sameColor);
        }
    }
}

function fromSouthEastToNorthWest(row, column, countYellowNorthWestDisks, countRedNorthWestDisks) {
    const sameColor = {val: true};
    for (let i = row, j = column; i >= 1 && j >= 1 && sameColor.val == true; --i, --j) {
        let circle = document.getElementById('circle' + (i * 10 + j) + '');
        if (i - 1 >= 1 && j - 1 >= 1) {
            let neighbour = document.getElementById('circle' + ((i - 1) * 10 + (j - 1)) + '');
            compare(circle, neighbour, countYellowNorthWestDisks, countRedNorthWestDisks, sameColor);
        }
    }
}*/

function diagonalCross(row, column) {
    //const countRedSouthWestDisks = {val: 0}, countRedNorthEastDisks = {val: 0}, countYellowSouthWestDisks = {val: 0}, countYellowNorthEastDisks = {val: 0};
    //const countRedNorthWestDisks = {val: 0}, countRedSouthEastDisks = {val: 0}, countYellowNorthWestDisks = {val: 0}, countYellowSouthEastDisks = {val: 0};
    const countYellowDisks = {val : 0}, countRedDisks = {val : 0};
    console.log(row + ' ' + column);
    verifyDiagonal(row, column, countYellowDisks, countRedDisks);
    /*fromNorthEastToSouthWest(row, column, countYellowSouthWestDisks, countRedSouthWestDisks);
    fromSouthWestToNorthEast(row, column, countYellowNorthEastDisks, countRedNorthEastDisks);
    fromNorthWestToSouthEast(row, column, countYellowSouthEastDisks, countRedSouthEastDisks);
    fromSouthEastToNorthWest(row, column, countYellowNorthWestDisks, countRedNorthWestDisks);
    let totalRedDisks = 0, totalYellowDisks = 0;
    if (countYellowSouthWestDisks.val + countYellowNorthEastDisks.val == 3) {
        totalYellowDisks = countYellowSouthWestDisks.val + countYellowNorthEastDisks.val;
    } else if (countYellowNorthWestDisks.val + countYellowSouthEastDisks.val == 3) {
        totalYellowDisks = countYellowNorthWestDisks.val + countYellowSouthEastDisks.val;
    }
    if (countRedSouthWestDisks.val + countRedNorthEastDisks.val == 3) {
        totalRedDisks = countRedSouthWestDisks.val + countRedNorthEastDisks.val;
    } else if (countRedNorthWestDisks.val + countRedSouthEastDisks.val == 3) {
        totalRedDisks = countRedNorthWestDisks.val + countRedSouthEastDisks.val;
    }
    outputCondition(totalYellowDisks, totalRedDisks);*/
}


function fromLeftToRight(row, column, countYellowLeftDisks, countRedLeftDisks) {
    const sameColor = {val: true};
    for (let i = column; i <= 7 && sameColor.val == true; ++i) {
        let circle = document.getElementById('circle' + (row * 10 + i) + '');
        if (i + 1 <= 7) {
            let neighbour = document.getElementById('circle' + (row * 10 + (i + 1)) + '');
            compare(circle, neighbour, countYellowLeftDisks, countRedLeftDisks, sameColor);
        }
    }
}

function fromRightToLeft(row, column, countYellowRightDisks, countRedRightDisks) {
    const sameColor = {val: true};
    for (let i = column; i >= 1 && sameColor.val == true; --i) {
        let circle = document.getElementById('circle' + (row * 10 + i) + '');
        if (i - 1 >= 1) {
            let neighbour = document.getElementById('circle' + (row * 10 + (i - 1)) + '');
            compare(circle, neighbour, countYellowRightDisks, countRedRightDisks, sameColor);
        }
    }
}

function orizontalCross(row, column) {
    let totalYellowDisks = 0, totalRedDisks = 0;
    const countRedLeftDisks = {val: 0}, countRedRightDisks = {val: 0}, countYellowLeftDisks = {val: 0}, countYellowRightDisks = {val: 0};
    fromLeftToRight(row, column, countYellowLeftDisks, countRedLeftDisks);
    fromRightToLeft(row, column, countYellowRightDisks, countRedRightDisks);
    totalYellowDisks = countYellowLeftDisks.val + countYellowRightDisks.val;
    totalRedDisks = countRedLeftDisks.val + countRedRightDisks.val;
    outputCondition(totalYellowDisks, totalRedDisks);
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
    outputCondition(countYellowDisks.val, countRedDisks.val);
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