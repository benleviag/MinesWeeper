function setHint() {
    gGame.hints--;
    showCellHint(gBoard);
    renderBoard(gBoard, '#game-container');
}


function showCellHint(board) {
    var emptyCells = firstFindEmptyCells();
    var randomEmptyLocation = getRandomInt(0, (emptyCells.length - 1));
    var emptyCell = emptyCells[randomEmptyLocation];

    cell = board[emptyCell[0].i][emptyCell[0].j];
    cell.isHinted = true;

    setHintsNegs(gBoard, emptyCell[0].i, emptyCell[0].j, true);

    setTimeout(function() { removeHints(emptyCell[0].i, emptyCell[0].j) }, 1000);
}




function removeHints(posI, posJ) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            cell = gBoard[i][j];
            cell.isHinted = false;
        }
    }
    renderBoard(gBoard, '#game-container');
}


function setHintsNegs(board, posI, posJ, cellIsHinted) {
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gLevel.SIZE) continue;
            if (i === posI && j === posJ) continue;
            var cell = board[i][j];
            if (!cell.isShown) cell.isHinted = cellIsHinted;
        }
    }
}



function findEmptyCells() {
    emptyCells = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            cell.isHinted = true;
            // if (i === (firstPosI - 1) && j === (firstPosJ - 1)) continue;
            // if (i === (firstPosI - 1) && j === firstPosJ) continue;
            // if (i === (firstPosI - 1) && j === (firstPosJ + 1)) continue;
            // if (i === firstPosI && j === (firstPosJ - 1)) continue;
            // if (i === firstPosI && j === firstPosJ) continue;
            // if (i === firstPosI && j === (firstPosJ + 1)) continue;
            // if (i === (firstPosI + 1) && j === (firstPosJ - 1)) continue;
            // if (i === (firstPosI + 1) && j === firstPosJ) continue;
            // if (i === (firstPosI + 1) && j === (firstPosJ + 1)) continue;

            if (!cell.isMine && !cell.isShown) {
                var emptyLocation = {
                    i: i,
                    j: j
                }
                emptyCells.push([emptyLocation]);
            }
        }
    }
    return emptyCells;
}