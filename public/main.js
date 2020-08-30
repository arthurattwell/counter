/*jslint browser */

function resetCounters(number) {
    'use strict';

    if (Number.isInteger(number)) {
        var numbers = document.querySelectorAll('.number');
        numbers.forEach(function (number) {
            number.innerHTML = number;
        });
    } else {
        return;
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

listenForUps();
listenForDowns();
