// Called when a cell (td) is clicked
function cellClicked(event, i, j) {
    if (!gGame.isOn) return
    gLastBoard = saveLastBoard();
    gLastGame = Object.assign({}, gGame);

    var cell = gBoard[i][j];


    //right click - put flag
    if (event.detail === 0) {
        if (!isFirstClick()) cellRightClicked(cell);
    } else if (!cell.isMarked) {
        if (cell.isMine) {
            onclickCellMine(cell)
            return;
        }

        //click
        if (isFirstClick()) {
            cellFirstClick(cell, i, j);
        } else {
            cellShow(cell, i, j)
        }
    }

    if (isGameWin()) GameWin();

    renderBoard(gBoard, '#game-container');
}

function onclickCellMine(cell) {
    if (gGame.lives <= 0) {
        cell.isShown = true;
        GameOver();
    } else {
        alert('You clicked a mine');
    }
    if (gGame.lives > 0) gGame.lives--;
    renderBoard(gBoard, '#game-container');
}

function cellFirstClick(cell, i, j) {
    gTimerInterval = setInterval(setTimer, 10);

    cell.isShown = true;

    gEmptyCells = firstFindEmptyCells(i, j);
    createMines(gBoard, i, j);
    setMinesNegsCount(gBoard);

    expandShown(gBoard, i, j)
}

function cellShow(cell, i, j) {
    if (!cell.isShown) expandShown(gBoard, i, j)
    cell.isShown = true;
}



function cellRightClicked(cell) {
    if (cell.isShown) return

    if (!cell.isMarked) cell.isMarked = true;
    else cell.isMarked = false
}


// Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell, i, j) {
    gBoard[i][j].isMarked = true;
    renderBoard(gBoard, '#game-container');
}




// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            var countNeighborsMines = getNeighborsNumMines(i, j);

            cell.minesAroundCount = countNeighborsMines;
        }
    }
}

function getNeighborsNumMines(posI, posJ) {
    var counter = 0;
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gLevel.SIZE) continue;
            if (i === posI && j === posJ) continue;
            if (gBoard[i][j].isMine) counter++
        }
    }

    return counter;
}




// When user clicks a cell with no mines around, we need to open not only that cell,
// but also its neighbors. NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
// BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
function expandShown(board, posI, posJ) {
    var clickedCell = board[posI][posJ];
    if (clickedCell.minesAroundCount > 0) return

    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gLevel.SIZE) continue;
            if (i === posI && j === posJ) continue;
            var cell = board[i][j];
            if (cell.isShown) continue;

            if (!cell.isMine) cell.isShown = true;

            if (cell.minesAroundCount === 0) expandShown(board, i, j);
        }
    }
}




function getCellIndex(posI, posJ) {
    for (var index = 0; index < gBoard.length; index++) {
        // debugger;
        var cell = gBoard[index];
        if (cell.location.i === posI && cell.location.j === posJ) return index;
    }
    return null
}