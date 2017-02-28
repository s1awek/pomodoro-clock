//https://github.com/adobe/brackets/wiki/Brackets-Shortcuts
$(document).ready(function () {
    'use strict';
    var pomodoroTime = parseInt($('.pomodoro-timer').html(), 10);
    var breakTime = parseInt($('.break-timer').html(), 10);
    var intervals;
    var timer;
    var start = false;
    var sessionArr = [pomodoroTime];
    var z = sessionArr[0] * 60;
    var counter = 0;
    var snd = new Audio('https://www.soundjay.com/misc/censor-beep-01.mp3');
    var snd1 = new Audio('https://www.soundjay.com/misc/pill-bottle-1.mp3');

    function myTimer() {
        z = z - 1;
        if (z <= 0 && counter === sessionArr.length - 1) { // If pomodoro sessions have ended completely then back to initial position
            start = false;
            z = sessionArr[0] * 60;
            $('.progress-bar-' + (counter + 1)).addClass('done');
            $('.progress-bar-' + (counter + 1)).removeClass('current-sesion');
            counter = 0;
            clearInterval(intervals);
            $('#control').toggleClass('fa-pause');
            $('#control').toggleClass('fa-play');
            $('.time-container').html(timeFormater(sessionArr[sessionArr.length - 1] * 60));
            snd1.play();
        } else if (z <= 0) { // If break or pomodor has ended then...
            counter = counter + 1;
            z = sessionArr[counter] * 60;
            document.getElementsByClassName('time-container')[0].innerHTML = timeFormater(z);
            if (counter % 2 === 0) {
                $('.progress-bar-' + (counter)).addClass('done');
                $('.progress-bar-' + (counter)).toggleClass('current-sesion');
                snd.play();
            } else {
                $('.progress-bar-' + (counter)).addClass('done');
                $('.progress-bar-' + (counter)).toggleClass('current-sesion');
                snd.play();
            }
        } else {
            if (!$('.progress-bar-' + (counter + 1)).hasClass('current-sesion')) {
                $('.progress-bar-' + (counter + 1)).addClass('current-sesion');
            }
            document.getElementsByClassName('time-container')[0].innerHTML = timeFormater(z);
        }
    }

    function timeFormater(seconds) {
        var formated = '';
        var m = (Math.floor(seconds / 60)).toString();
        var s = (seconds - m * 60).toString();
        if (m.length === 1) {
            m = '0' + m;
        }
        if (s.length === 1) {
            s = '0' + s;
        }
        formated = m + ':' + s;
        return formated;
    }

    function createSession() {
        sessionArr = [];
        var i = 0;
        for (i; i < 7; i = i + 1) {
            if (sessionArr[sessionArr.length - 1] === pomodoroTime) {
                sessionArr.push(breakTime);
            } else {
                sessionArr.push(pomodoroTime);
            }
        }
    }

    function removeClasses() {
        var i;
        for (i = 1; i <= 7; i = i + 1) {
            $('.progress-bar-' + (i)).removeClass('done');
            $('.progress-bar-' + (i)).removeClass('current-sesion');
        }
    }

    $('.current-time').html(new Date().toLocaleTimeString());
    timer = setInterval(function () {
        $('.current-time').html(new Date().toLocaleTimeString());
    }, 1000);


    $('.pomodoro-plus').click(function () {
        if (!start) {
            if (pomodoroTime < 120) {
                pomodoroTime = pomodoroTime + 1;
                z = pomodoroTime * 60;
                $('.pomodoro-timer').html(pomodoroTime);
                $('.time-container').html(timeFormater(z));
            }
        }
    });

    $('.pomodoro-minus').click(function () {
        if (!start) {
            if (pomodoroTime > 1) {
                pomodoroTime = pomodoroTime - 1;
                z = pomodoroTime * 60;
                $('.pomodoro-timer').html(pomodoroTime);
                $('.time-container').html(timeFormater(z));
            }
        }
    });

    $('.break-plus').click(function () {
        if (breakTime < 120) {
            breakTime = breakTime + 1;
            $('.break-timer').html(breakTime);
        }

    });

    $('.break-minus').click(function () {
        if (breakTime > 1) {
            breakTime = breakTime - 1;
            $('.break-timer').html(breakTime);
        }
    });

    $('.toggle-timer-control').click(function () {
        if (counter === 0) {
            removeClasses();
            $('.progress-bar-1').addClass('current-sesion');
        }
        if (!start) {
            start = true;
            createSession();
            intervals = setInterval(myTimer, 1000);
        } else {
            start = false;
            clearInterval(intervals);
        }
        $('#control').toggleClass('fa-pause');
        $('#control').toggleClass('fa-play');
    });

    $('.reset').click(function () {
        counter = 0;
        start = false;
        clearInterval(intervals);
        removeClasses();
        z = pomodoroTime * 60;
        $('.pomodoro-timer').html(pomodoroTime);
        $('.time-container').html(timeFormater(z));
    });
});
