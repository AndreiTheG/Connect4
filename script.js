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
    let style2 = neighbour.computedStyleMap().get('background-color').toString()
    if (style1 == yellow && style1 == style2) {
        ++nrYellowDisks.val;
    } else if (style1 == red && style1 == style2) {
        ++nrRedDisks.val;
    } else {
        sameColor.val = false;
    }
}

function fromNorthEastToSouthWest(row, column, countYellowSouthWestDisks, countRedSouthWestDisks) {
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
    for (let i = row, j = column; i <= 6 && j <= 7 && sameColor == true; ++i, ++j) {
        let circle = document.getElementById('circle' + (i * 10 + j) + '');
        if (i + 1 <= 6 && j + 1 <= 7) {
            let neighbour = document.getElementById('circle' + ((i + 1) * 10 + (j + 1)) + '');
            compare(circle, neighbour, countYellowSouthEastDisks, countRedSouthEastDisks, sameColor);
        }
    }
    console.log(countYellowSouthEastDisks, countRedSouthEastDisks);
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
    console.log(countRedNorthWestDisks, countYellowNorthWestDisks);
}

function diagonalCross(row, column) {
    let totalLeftToRightYellowDisks = 0, totalLeftToRightRedDisks = 0, totalRightToLeftYellowDisks = 0, totalRightToLeftRedDisks = 0;
    const countRedSouthWestDisks = {val: 0}, countRedNorthEastDisks = {val: 0}, countYellowSouthWestDisks = {val: 0}, countYellowNorthEastDisks = {val: 0};
    const countRedNorthWestDisks = {val: 0}, countRedSouthEastDisks = {val: 0}, countYellowNorthWestDisks = {val: 0}, countYellowSouthEastDisks = {val: 0};
    fromNorthEastToSouthWest(row, column, countYellowSouthWestDisks, countRedSouthWestDisks);
    fromSouthWestToNorthEast(row, column, countYellowNorthEastDisks, countRedNorthEastDisks);
    fromNorthWestToSouthEast(row, column, countYellowSouthEastDisks, countRedSouthEastDisks);
    fromSouthEastToNorthWest(row, column, countYellowNorthWestDisks, countRedNorthWestDisks);
    totalLeftToRightYellowDisks = countYellowSouthWestDisks.val + countYellowNorthEastDisks.val;
    totalLeftToRightRedDisks = countRedSouthWestDisks.val + countRedNorthEastDisks.val;
    totalRightToLeftYellowDisks = countYellowNorthWestDisks.val + countYellowSouthEastDisks.val;
    totalRightToLeftRedDisks = countRedNorthWestDisks.val + countRedSouthEastDisks.val;
    /*console.log(totalLeftToRightRedDisks);
    console.log(totalLeftToRightYellowDisks);
    console.log(totalRightToLeftRedDisks);
    console.log(totalRightToLeftYellowDisks);*/
    if (totalLeftToRightYellowDisks == 3 || totalRightToLeftYellowDisks == 3) {
        document.getElementById('message').innerHTML = 'The player with yellow disks has won!';
        disableOnclick();
    } else if (totalLeftToRightRedDisks == 3 || totalRightToLeftRedDisks == 3) {
        document.getElementById('message').innerHTML = 'The player with red disks has won!';
        disableOnclick();
    }
}


function fromLeftToRightYellow(row, column, countYellowLeftDisks, countRedLeftDisks) {
    const sameColor = {val: true};
    for (let i = column; i <= 7 && sameColor.val == true; ++i) {
        let circle = document.getElementById('circle' + (row * 10 + i) + '');
        if (i + 1 <= 7) {
            let neighbour = document.getElementById('circle' + (row * 10 + (i + 1)) + '');
            compare(circle, neighbour, countYellowLeftDisks, countRedLeftDisks, sameColor);
        }
    }
}

function fromRightToLeftYellow(row, column, countYellowRightDisks, countRedRightDisks) {
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
    fromLeftToRightYellow(row, column, countYellowLeftDisks, countRedLeftDisks);
    fromRightToLeftYellow(row, column, countYellowRightDisks, countRedRightDisks);
    totalYellowDisks = countYellowLeftDisks.val + countYellowRightDisks.val;
    totalRedDisks = countRedLeftDisks.val + countRedRightDisks.val;
    if (totalYellowDisks == 3) {
        document.getElementById('message').innerHTML = 'The player with yellow disks has won!';
        disableOnclick();
    } else if (totalRedDisks == 3) {
        document.getElementById('message').innerHTML = 'The player with red disks has won!';
        disableOnclick();
    }
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
    if (countYellowDisks.val == 3) {
        document.getElementById('message').innerHTML = 'The player with yellow disks has won!';
        disableOnclick();
    } else if (countRedDisks.val == 3) {
        document.getElementById('message').innerHTML = 'The player with red has won!';
        disableOnclick();
    }
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