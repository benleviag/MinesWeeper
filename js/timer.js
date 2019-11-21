function clearTimer() {
    gTimer = 0;
    clearInterval(gTimerInterval);
    gTimerInterval = null;
    $('#clocktext').html(timerFormat(gMode, gTimer));
}



function updateTimers() {
    $('#clocktext').html(timerFormat(gMode, gTimer));
    showBestTimes();
}


function setTimer() {
    ++gTimer;
    $('#clocktext').html(timerFormat(gMode, gTimer));
}


function showBestTimes() {
    showBestTime('Beginner');
    showBestTime('Medium');
    showBestTime('Expert');
}

function showBestTime(level) {
    var BestTime = localStorage.getItem("BestTime" + level);;
    $('#best' + level).html(timerFormat(gMode, BestTime));
}


function checkBestTime(level) {
    if (isBestTime(level)) {
        setTimeout(function() {
            localStorage.setItem("BestTime" + level, gTimer);
            $('#best' + level).html(timerFormat(gMode, gTimer));
        }, 300);
        setTimeout(function() {
            alert('New Best Time');
        }, 600);
    }
}


function isBestTime(level) {
    var BestTime = localStorage.getItem("BestTime" + level);
    console.log(BestTime);
    if (gTimer < BestTime || !BestTime) return true
    return false
}


function timerFormat(Mode, timer) {
    if (Mode == 'Ben') return timerHtmlV2(timer);
    else return timerHtml(timer);
}


function timerHtml(val) {
    var strHtml = '';

    var miliseconds = parseInt((val % 100) / 10);
    var seconds = pad(parseInt((val - (val % 100)) / 100));

    strHtml += seconds + '.' + miliseconds;

    return strHtml;
}


function timerHtmlV2(val) {
    var strHtml = '';

    var miliseconds = pad(val % 100);
    var seconds = pad(parseInt((val - miliseconds) / 100) % 60);
    var minutes = pad(parseInt((val - seconds * 100 - miliseconds)) / 6000);

    strHtml += minutes + ':' + seconds + ':' + miliseconds;

    return strHtml;
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else if (valString > 0) {
        return valString;
    } else return "00";
}