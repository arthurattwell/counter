/*jslint browser */
/*globals BigScreen */

function save() {
    'use strict';

    var players, player1Score, player2Score, player3Score, player4Score,
        player1Color, player2Color, player3Color, player4Color;

    if (document.getElementById('counters').getAttribute('data-counters')) {
        players = Number(document.getElementById('counters').getAttribute('data-counters'));
    }

    if (document.getElementById('player1')) {
        player1Score = Number(document.querySelector('#player1 .number').textContent);
        player1Color = document.getElementById('player1').getAttribute('data-color');
    }

    if (document.getElementById('player2')) {
        player2Score = Number(document.querySelector('#player2 .number').textContent);
        player2Color = document.getElementById('player2').getAttribute('data-color');
    }

    if (document.getElementById('player3')) {
        player3Score = Number(document.querySelector('#player3 .number').textContent);
        player3Color = document.getElementById('player3').getAttribute('data-color');
    }

    if (document.getElementById('player4')) {
        player4Score = Number(document.querySelector('#player4 .number').textContent);
        player4Color = document.getElementById('player4').getAttribute('data-color');
    }

    var status = {
        players: players,

        player1Score: player1Score,
        player2Score: player2Score,
        player3Score: player3Score,
        player4Score: player4Score,

        player1Color: player1Color,
        player2Color: player2Color,
        player3Color: player3Color,
        player4Color: player4Color
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
    var counter = button.closest('.counter');
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

function setColour(player, color) {
    'use strict';

    var counter = document.getElementById(player);

    if (!color) {
        color = "#fff";
    }

    counter.style.color = color;
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
        BigScreen.toggle();
    });

    BigScreen.onchange = function () {
        if (document.body.classList.contains('fullscreen')) {
            document.body.classList.remove('fullscreen');
        } else {
            document.body.classList.add('fullscreen');
        }
    };
}

// Show correct number of counters
function showCounters(numberOfCounters) {
    'use strict';

    if (!document.getElementById('counters').getAttribute('data-counters')) {
        document.getElementById('counters').setAttribute('data-counters', numberOfCounters);
    }

    var counters = document.querySelectorAll('.counter');
    counters.forEach(function (counter) {
        if (Number(counter.getAttribute('data-counter')) < numberOfCounters + 1) {
            counter.classList.remove('hide');
        } else {
            counter.classList.add('hide');
        }
    });

    save();
}

function loadSavedStatus() {
    'use strict';

    var statusString = localStorage.getItem('status');
    var status = JSON.parse(statusString);
    if (status.player1Score) {
        setCounter('player1', status.player1Score);
    }
    if (status.player2Score) {
        setCounter('player2', status.player2Score);
    }
    if (status.player3Score) {
        setCounter('player3', status.player3Score);
    }
    if (status.player4Score) {
        setCounter('player4', status.player4Score);
    }
    if (status.players) {
        showCounters(status.players);
    } else {
        showCounters(2);
    }
}

// Add or remove players
function listenToAddRemoveCounters() {
    'use strict';

    var add = document.getElementById('add-counter');
    var remove = document.getElementById('remove-counter');

    add.addEventListener('click', function () {
        var numberOfCounters = Number(document.getElementById('counters')
            .getAttribute('data-counters'));

        if (numberOfCounters < 4) {
            numberOfCounters += 1;
            document.getElementById('counters').setAttribute('data-counters', numberOfCounters);
            showCounters(numberOfCounters);
        }
    });

    remove.addEventListener('click', function () {
        var numberOfCounters = Number(document.getElementById('counters')
            .getAttribute('data-counters'));

        if (numberOfCounters > 1) {
            numberOfCounters -= 1;
            document.getElementById('counters').setAttribute('data-counters', numberOfCounters);
            showCounters(numberOfCounters);
        }
    });
}

listenForUps();
listenForDowns();
listenForFullscreen();
listenToAddRemoveCounters();
document.onload = loadSavedStatus();
