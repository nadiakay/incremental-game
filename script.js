const title = document.getElementById('title');

const autoxCounter = document.getElementById('autox-counter');
const autox2Counter = document.getElementById('autox2-counter');

const pointCount = document.getElementById('point-count');
const autoxCount = document.getElementById('autox-count');
const autox2Count = document.getElementById('autox2-count');

const clicker = document.getElementById('clicker');
const buyautox = document.getElementById('buy-autox');
const buyautox2 = document.getElementById('buy-autox2');

const autoxCostDisplay = document.getElementById('autox-cost');
const autox2CostDisplay = document.getElementById('autox2-cost');

const log = document.getElementById('log');

let points = 0;
let autoxs = 0;
let autoxs2 = 0;

const scaleFactor = 1.2;

let autoxCost = 10;
let autox2Cost = 10;

let Timer = window.setInterval(function() {Tick()}, 100);

function Tick() {
    points += autoxs/10;
    autoxs += autoxs2/10;
    updateCounters();
    updateUpgradeDisplays();
}

function updateCounters() {
    pointCount.innerHTML = Math.floor(points);
    autoxCount.innerHTML = Math.floor(autoxs);
    autox2Count.innerHTML = Math.floor(autoxs2);
}

//displays upgrade buttons once player has (upgrade cost/2)
function updateUpgradeDisplays() {
    if(points >= 5) {
        buyautox.classList.remove('hidden');
        autoxCounter.classList.remove('hidden');
    }
    if(autoxs >= 5) {
        buyautox2.classList.remove('hidden');
        autox2Counter.classList.remove('hidden');
    }
}

function logDisplay(text) {
    log.innerHTML = text;
    log.classList.remove('hidden');

    //clear log after 3 secs
    setTimeout(function() {
        log.innerHTML = 'placeholder';
        log.classList.add('hidden');
    }, 3000);
}

function gameWon() {
    logDisplay('You won');
    title.innerHTML = 'Congratulations!';
}

//Event Listeners

clicker.addEventListener('click', e => {
    points++;
})

buyautox.addEventListener('click', e => {
    if(points < autoxCost) {
        logDisplay('You don\'t have enough points');
    } else {
        points -= autoxCost;
        autoxs++;
        autoxCost = Math.floor(autoxCost * scaleFactor);
        autoxCostDisplay.innerHTML = autoxCost;
    }
})

buyautox2.addEventListener('click', e => {
    if(autoxs < autox2Cost) {
        logDisplay('You don\'t have enough autoclickers');
    } else {
        autoxs -= autox2Cost;
        autoxs2++;
        autox2Cost = Math.floor(autox2Cost * scaleFactor);
        autox2CostDisplay.innerHTML = autox2Cost;
        gameWon();
    }
})