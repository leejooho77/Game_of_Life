let gridContainer = document.getElementById("grid-container");

// execution
for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
        let box = document.createElement("div");
        box.classList.add("grid");
        if (random() < 2) box.classList.add("alive");
        else box.classList.add("dead");
        gridContainer.appendChild(box);
    }
}

// declare value
let grids = document.querySelectorAll(".grid");
let button = document.getElementById("button");
const neighbors = [[0, -1], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 0], [0, 1], [1, 1]];
let start = false;
let time = 0;
let duration;

// declare functions
function random() {
    return Math.floor(Math.random() * 10);
}

function mark() {
    for (let i = 0; i < grids.length; i++) {
        if (grids[i].classList.contains("alive") && (numAlive(i) < 2) || numAlive(i) > 3) {
            grids[i].classList.remove("alive");
            grids[i].classList.add("alive-dead");
        }
        else if (grids[i].classList.contains("dead") && numAlive(i) === 3) {
            grids[i].classList.remove("dead");
            grids[i].classList.add("dead-alive");
        }
    }
}

function numAlive(i) {
    let x = Math.floor(i/50);
    let y = i%50;
    let count = 0;
    for (let neighbor in neighbors) {
        if(isValid(x + neighbors[neighbor][0], y + neighbors[neighbor][1])) count++;
    }
    return count;
}

function isValid(x, y) {
    if(x >= 0 && y >= 0 && x < 50 && y < 50 && grids[x * 50 + y].classList.contains("alive")) return true;
    return false;
}

function nextStage() {
    for (let i = 0; i < grids.length; i++) {
        if (grids[i].classList.contains("alive-dead")) {
            grids[i].classList.remove("alive-dead");
            grids[i].classList.add("dead");
        }
        else if (grids[i].classList.contains("dead-alive")) {
            grids[i].classList.remove("dead-alive");
            grids[i].classList.add("alive");
        }
    }
}

function toggle() {
    button.textContent = (start) ? "START" : "STOP";
    start = !start;
    if (start) duration = setInterval(play, 1000);
    else clearInterval(duration);
}

function play() {
    document.getElementById("time").innerHTML = time++ + " s";
    mark();
    nextStage();
}