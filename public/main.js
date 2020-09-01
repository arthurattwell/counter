/*jslint browser */
/*globals BigScreen */

function save() {
    'use strict';

    var player1Score, player2Score, player3Score, player4Score;
    if (document.getElementById('player1')) {
        player1Score = Number(document.querySelector('#player1 .number').textContent);
    }

    if (document.getElementById('player2')) {
        player2Score = Number(document.querySelector('#player2 .number').textContent);
    }

    if (document.getElementById('player3')) {
        player3Score = Number(document.querySelector('#player3 .number').textContent);
    }

    if (document.getElementById('player4')) {
        player4Score = Number(document.querySelector('#player4 .number').textContent);
    }

    var status = {
        players: document.querySelectorAll('.counter').length,
        player1Score: player1Score,
        player2Score: player2Score,
        player3Score: player3Score,
        player4Score: player4Score
    };

    localStorage.setItem('status', JSON.stringify(status));
}

function setCounter(player, score) {
    'use strict';

    if (document.getElementById(player)) {
        var numberElement = document.querySelector('#' + player + ' .number');
        numberElement.innerHTML = score;
    }
}

function shift(button, direction) {
    'use strict';
    console.log(button);
    var counter = button.parentNode;
    var currentNumber = Number(counter.querySelector('.number').textContent);
    var newNumber;
    if (direction === 'up') {
        newNumber = currentNumber + 1;
    } else {
        newNumber = currentNumber - 1;
    }
    counter.querySelector('.number').innerHTML = newNumber;
    save();
}

function listenForUps() {
    'use strict';
    var ups = document.querySelectorAll('.up');
    ups.forEach(function (up) {
        up.addEventListener('click', function (event) {
            shift(event.target, 'up');
        });
    });
}

function listenForDowns() {
    'use strict';
    var downs = document.querySelectorAll('.down');
    downs.forEach(function (down) {
        down.addEventListener('click', function (event) {
            shift(event.target, 'down');
        });
    });
}

function listenForFullscreen() {
    'use strict';
    var fullscreenInput = document.getElementById('fullscreen');

    fullscreenInput.addEventListener('click', function () {
        console.log('toggling');
        BigScreen.toggle();
    });
}

function loadSavedStatus() {
    'use strict';

    var statusString = localStorage.getItem('status');
    var status = JSON.parse(statusString);
    setCounter('player1', status.player1Score);
    setCounter('player2', status.player2Score);
    setCounter('player3', status.player3Score);
    setCounter('player4', status.player4Score);
}

listenForUps();
listenForDowns();
listenForFullscreen();
document.onload = loadSavedStatus();
