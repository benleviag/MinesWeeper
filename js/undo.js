function setUndo() {
    gBoard = setLastBoard();
    gGame = gLastGame;
    if (isFirstClick()) clearTimer();
    else if (!gGame.isOn) gTimerInterval = setInterval(setTimer, 10);
    renderBoard(gBoard, '#game-container');
}


function setLastBoard() {
    var board = [];
    var gSIZE = gLevel.SIZE;

    for (var i = 0; i < gSIZE; i++) {
        board.push([]);
        for (var j = 0; j < gSIZE; j++) {
            var cell = gLastBoard[i][j];
            board[i][j] = Object.assign({}, cell);
        }
    }
    // console.log(board);

    return board;
}


function saveLastBoard() {
    var board = [];
    var gSIZE = gLevel.SIZE;

    for (var i = 0; i < gSIZE; i++) {
        board.push([]);
        for (var j = 0; j < gSIZE; j++) {
            var cell = gBoard[i][j];
            board[i][j] = Object.assign({}, cell);
        }
    }
    // console.log(board);
    return board;
}