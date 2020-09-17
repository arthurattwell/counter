/*jslint browser */
/*globals BigScreen */

var colors = [
    'snow',
    'cyan',
    'yellowgreen',
    'firebrick',
    'slategray'

    // 'aqua',
    // 'blueviolet',
    // 'burlywood',
    // 'cadetblue',
    // 'chocolate',
    // 'coral',
    // 'cornflowerblue',
    // 'crimson',
    // 'darkcyan',
    // 'darkkhaki',
    // 'darkmagenta',
    // 'darkorchid',
    // 'dodgerblue',
    // 'gainsboro',
    // 'gold',
    // 'goldenrod',
    // 'indianred',
    // 'indigo',
    // 'ivory',
    // 'lemonchiffon',
    // 'lightcoral',
    // 'lightgreen',
    // 'lightskyblue',
    // 'lightsteelblue',
    // 'mediumaquamarine',
    // 'mediumorchid',
    // 'mediumpurple',
    // 'mediumseagreen',
    // 'mediumslateblue',
    // 'mediumvioletred',
    // 'orchid',
    // 'palegreen',
    // 'palevioletred',
    // 'plum',
    // 'rebeccapurple',
    // 'rosybrown',
    // 'royalblue',
    // 'sienna',
    // 'slateblue',
    // 'steelblue',
    // 'teal',
    // 'tomato',
    // 'violet',
];

function save() {
    'use strict';

    var numberOfplayers, player1Score, player2Score, player3Score, player4Score,
            player1Color, player2Color, player3Color, player4Color;

    if (document.getElementById('counters').getAttribute('data-counters')) {
        numberOfplayers = Number(document.getElementById('counters').getAttribute('data-counters'));
    }

    if (document.getElementById('player1')) {
        player1Score = Number(document.querySelector('#player1 .number').textContent);
        player1Color = document.querySelector('#player1 [data-color-current]').getAttribute('data-color-current');
    }

    if (document.getElementById('player2')) {
        player2Score = Number(document.querySelector('#player2 .number').textContent);
        player2Color = document.querySelector('#player2 [data-color-current]').getAttribute('data-color-current');
    }

    if (document.getElementById('player3')) {
        player3Score = Number(document.querySelector('#player3 .number').textContent);
        player3Color = document.querySelector('#player3 [data-color-current]').getAttribute('data-color-current');
    }

    if (document.getElementById('player4')) {
        player4Score = Number(document.querySelector('#player4 .number').textContent);
        player4Color = document.querySelector('#player4 [data-color-current]').getAttribute('data-color-current');
    }

    var status = {
        numberOfplayers: numberOfplayers,

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

function getNextColor(color) {
    'use strict';

    var indexOfColor = colors.indexOf(color);
    if (indexOfColor === colors.length - 1) {
        return colors[0];
    } else {
        return colors[indexOfColor + 1];
    }
}

function getPreviousColor(color) {
    'use strict';

    var indexOfColor = colors.indexOf(color);
    if (indexOfColor === 0) {
        return colors[colors.length - 1];
    } else {
        return colors[indexOfColor - 1];
    }
}

function setColor(player, color) {
    'use strict';

    var counters;
    if (player) {
        counters = document.querySelectorAll('#' + player);
    } else {
        counters = document.querySelectorAll('.counter');
    }

    counters.forEach(function (counter) {

        var currentColorButton = counter.querySelector('[data-color-current]');
        var previousColorButton = currentColorButton.previousElementSibling;
        var nextColorButton = currentColorButton.nextElementSibling;

        var currentColor = currentColorButton.getAttribute('data-color-current');

        if (!color) {
            color = currentColor;
        }

        // Get new colours
        var previousColor = getPreviousColor(currentColor);
        var nextColor = getNextColor(currentColor);

        // Set new data-color
        currentColorButton.setAttribute('data-color-current', color);
        previousColorButton.setAttribute('data-color-previous', previousColor);
        nextColorButton.setAttribute('data-color-next', nextColor);

        // Set new appearances
        counter.style.color = color;
        currentColorButton.style.backgroundColor = color;
        previousColorButton.style.backgroundColor = previousColor;
        nextColorButton.style.backgroundColor = nextColor;
    });

    save();
}

function listenForColors() {
    'use strict';

    var colorButtons = document.querySelectorAll('.previous-color, .next-color');

    colorButtons.forEach(function (button) {

        button.addEventListener('click', function () {

            var counter = button.closest('.counter');
            var nextColor = counter.querySelector('.next-color').getAttribute('data-color-next');
            var previousColor = counter.querySelector('.previous-color').getAttribute('data-color-previous');

            if (button.classList.contains('next-color')) {
                setColor(counter.id, nextColor);
            }
            if (button.classList.contains('previous-color')) {
                setColor(counter.id, previousColor);
            }
        });
    });
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
        setColor('player1', status.player1Color);
    }
    if (status.player2Score) {
        setCounter('player2', status.player2Score);
        setColor('player2', status.player2Color);
    }
    if (status.player3Score) {
        setCounter('player3', status.player3Score);
        setColor('player3', status.player31Color);
    }
    if (status.player4Score) {
        setCounter('player4', status.player4Score);
        setColor('player4', status.player4Color);
    }
    if (status.numberOfplayers) {
        showCounters(status.numberOfplayers);
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
listenForColors();
listenForFullscreen();
listenToAddRemoveCounters();
document.onload = loadSavedStatus();
