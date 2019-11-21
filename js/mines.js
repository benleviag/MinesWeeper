function createMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        createMine(board);
    }
}



function createMine(board) {
    var randomEmptyLocation = getRandomInt(0, (gEmptyCells.length - 1));
    var emptyCell = emptyCells[randomEmptyLocation];
    gEmptyCells.splice(randomEmptyLocation, 1);

    cell = board[emptyCell[0].i][emptyCell[0].j];
    cell.isMine = true;
}


function randomEmptyCell(emptyCells) {
    var randomEmptyLocation = getRandomInt(0, (emptyCells.length - 1));
    var emptyCell = emptyCells[randomEmptyLocation];
    return emptyCell;
}


function firstFindEmptyCells(firstPosI, firstPosJ) {
    emptyCells = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            if (i === (firstPosI - 1) && j === (firstPosJ - 1)) continue;
            if (i === (firstPosI - 1) && j === firstPosJ) continue;
            if (i === (firstPosI - 1) && j === (firstPosJ + 1)) continue;
            if (i === firstPosI && j === (firstPosJ - 1)) continue;
            if (i === firstPosI && j === firstPosJ) continue;
            if (i === firstPosI && j === (firstPosJ + 1)) continue;
            if (i === (firstPosI + 1) && j === (firstPosJ - 1)) continue;
            if (i === (firstPosI + 1) && j === firstPosJ) continue;
            if (i === (firstPosI + 1) && j === (firstPosJ + 1)) continue;

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