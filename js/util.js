function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function renderBoard(board, selector) {
    var strHTML = ' ';
    var boardSize = gLevel.SIZE;


    strHTML += '<h5 class="hints">';
    strHTML += hintsHtml(gGame.hints);
    strHTML += '</h5>';

    strHTML += '<h5 class="lives">';
    strHTML += heartHtml(gGame.lives);
    strHTML += '</h5>';

    strHTML += '<table id="game" border="0"><tbody>';

    //TOP
    strHTML += '<tr>';
    strHTML += '<td class="bordertl"></td>'
    for (var j = 0; j < boardSize; j++) {
        strHTML += '<td class="bordertb"></td>'
    }
    strHTML += '<td class="bordertr"></td>'
    strHTML += '</tr>'

    //SMILE
    strHTML += '<tr>';
    strHTML += '<td class="borderlrlong"></td>'

    var faceClass = "facesmile";
    if (!gGame.isOn) faceClass = "facedead";
    if (isGameWin() && !gGame.isOn) faceClass = "facewin";

    strHTML += '<td colspan="' + j + '" onclick="initGame(\'' + gLevel.level + '\')" id="face"><div class="' + faceClass + '"></div></td>'

    strHTML += '<td class="borderlrlong"></td>'
    strHTML += '</tr>'

    //DATA TOP
    strHTML += '<tr>';
    strHTML += '<td class="borderjointl"></td>'
    for (var j = 0; j < boardSize; j++) {
        strHTML += '<td class="bordertb"></td>'
    }
    strHTML += '<td class="borderjointr"></td>'
    strHTML += '</tr>'

    //DATA
    for (var i = 0; i < boardSize; i++) {
        strHTML += '<tr>';
        strHTML += '<td class="borderlr"></td>'

        for (var j = 0; j < boardSize; j++) {
            // var cell = board[i][j];
            var cell = board[i][j];

            var className = setCellClass(cell);
            // debugger

            if (cell.isHinted) {
                className = setHintedCellClass(cell);
                className += ' hinted';
            }


            strHTML += '<td class="square ' + className + '" onclick="cellClicked(event, ' + i + ', ' + j + ')" oncontextmenu="cellClicked(event, ' + i + ', ' + j + ')" id ="' + i + '-' + j + '"></td>'
        }


        strHTML += '<td class="borderlr"></td>'
        strHTML += '</tr>'
    }

    //BOTTOM
    strHTML += '<tr>';
    strHTML += '<td class="borderbl"></td>'
    for (var j = 0; j < boardSize; j++) {
        strHTML += '<td class="bordertb"></td>'
    }
    strHTML += '<td class="borderbr"></td>'
    strHTML += '</tr>'

    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}



function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`#${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


function setCellClass(cell) {
    var className;
    if (cell.minesAroundCount >= 0) className = 'open' + cell.minesAroundCount;
    if (!cell.isShown) className = 'blank';

    if (cell.isMarked) className = 'bombflagged';



    if (!gGame.isOn) {
        if (cell.isMine) className = 'bombrevealed';
        if (cell.isMine && cell.isShown) className = 'bombdeath';
        if (!cell.isMine && cell.isMarked) className = 'bombmisflagged';
        if (cell.isMine && cell.isMarked) className = 'bombflagged';
    }
    return className;
}




function setHintedCellClass(cell) {
    var className;
    if (cell.minesAroundCount >= 0) className = 'open' + cell.minesAroundCount;

    if (cell.isMarked) className = 'bombflagged';

    if (cell.isMine) className = 'bombrevealed';
    if (!cell.isMine && cell.isMarked) className = 'bombmisflagged';
    if (cell.isMine && cell.isMarked) className = 'bombflagged';

    return className;
}




function heartHtml(lives) {
    var strHTML = ' ';

    for (var i = 0; i < lives; i++) {
        strHTML += '<i class="fa fa-heart text-danger"></i> ';
    }

    for (var i = 0; i < (3 - lives); i++) {
        strHTML += '<i class="fa fa-heart-o text-danger"></i> ';
    }
    return strHTML;
}

function hintsHtml(hints) {
    var strHTML = ' ';

    if (!isFirstClick()) {
        for (var i = 0; i < hints; i++) {
            strHTML += '<button class="btn btn-warning btn-xs" onclick="setHint()" data-placement="bottom" data-toggle="tooltip" title="Hint!"><i class="fa fa-lightbulb-o"></i></button> ';
        }
        for (var i = 0; i < (3 - hints); i++) {
            strHTML += '<button class="btn btn-warning btn-xs" disabled><i class="fa fa-lightbulb-o"></i></button> ';
        }
    } else {
        for (var i = 0; i < 3; i++) {
            strHTML += '<button class="btn btn-warning btn-xs" disabled><i class="fa fa-lightbulb-o"></i></button> ';
        }
    }

    return strHTML;
}