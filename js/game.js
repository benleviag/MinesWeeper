'use strict';
var gBoard;
var gLastBoard;
var gEmptyCells;


var gTimerInterval;
var gTimer = 0;
var gMode = 'Ben';


//This is an object in which you can keep and update the current game state:
// isOn – boolean, when true we let the user play
// shownCount: how many cells are shown
// markedCount: how many cells are marked (with a flag)
// secsPassed: how many seconds passed


var gGame = {
    isOn: false,
    lives: 3,
    hints: 3,
    shownCount: 0,
    markedCount: 0
}

var gLastGame = {
    isOn: false,
    lives: 3,
    hints: 3,
    shownCount: 0,
    markedCount: 0
}

// This is an object by which the board size is set (in this case: 4*4), and how many mines to put
var gLevel = {
    SIZE: 8,
    MINES: 12,
    level: 'Medium'
};


// This is called when page loads\
function initGame(Level) {
    clearInterval(gTimerInterval);
    gTimerInterval = null;

    gGame.isOn = true
    setGameLevel(Level);
    showBestTimes();

    $("#gameModal").modal("hide");


    gBoard = buildBoard();
    gLastBoard = saveLastBoard();


    window.oncontextmenu = function() {
        // console.log(event.target.id);
        return false; // cancel default menu
    }


    gGame.lives = 3;
    gGame.hints = 3;
    clearTimer();

    // console.log(gLastGame);
    // console.log(gGame);

    renderBoard(gBoard, '#game-container');
}


function setGameLevel(Level) {
    if (Level === 'Beginner') {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        gLevel.level = 'Beginner';
    } else if (Level === 'Medium') {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
        gLevel.level = 'Medium';
    } else if (Level === 'Expert') {
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
        gLevel.level = 'Expert';
    } else {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
        gLevel.level = 'Medium';
    }
}



// Builds the board Set mines at random locations Call
// setMinesNegsCount() Return the created board

function buildBoard() {
    var board = [];
    var gSIZE = gLevel.SIZE;

    for (var i = 0; i < gSIZE; i++) {
        board.push([]);
        for (var j = 0; j < gSIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isHinted: false,
            }
            board[i][j] = cell;
        }
    }
    // console.log(board);
    return board;
}

function isFirstClick() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            if (cell.isShown) return false;
        }
    }
    return true;
}





// Game ends when all mines are marked and all the other cells are shown
function isGameWin() {
    var counter = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            if (cell.isMine && !cell.isShown && cell.isMarked) counter++;
            if (!cell.isMine && !cell.isShown) return false;
        }
    }

    if (counter === gLevel.MINES) return true
    return false
}


// Game ends when all mines are marked and all the other cells are shown
function GameWin() {
    gGame.isOn = false
    clearInterval(gTimerInterval);
    gTimerInterval = null;
    renderBoard(gBoard, '#game-container');

    checkBestTime(gLevel.level);
    $("#gameModal .modal-body div").html('<button type="button" class="btn btn-info btn-lg" onclick="initGame(\'' + gLevel.level + '\')">play again</button>');
    $("#gameModal .modal-body h3").html('WIN <i class=" fa fa-hand-peace-o"></i>');
    $("#gameModal").modal();
}

// Game ends when all mines are marked and all the other cells are shown
function GameMode(type) {
    gMode = type;
    $("#game-container").removeClass().addClass(type);
    updateTimers();
}



// Game ends when all mines are marked and all the other cells are shown
function GameOver() {
    gGame.isOn = false
    clearInterval(gTimerInterval);
    gTimerInterval = null;
    renderBoard(gBoard, '#game-container');

    $("#gameModal .modal-body div").html('<button type="button" class="btn btn-info btn-lg" onclick="initGame(\'' + gLevel.level + '\')">play again</button>');
    $("#gameModal .modal-body h3").html('<img src="images/game_over.jpg">');
    $("#gameModal").modal();
}