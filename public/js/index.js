import { object } from "./createObject.js";

let space = document.getElementById('space');

let allBalls = [];

const maxWidth = space.clientWidth;
const maxHeight = space.clientHeight;
const maxMass = 1.98892 * Math.pow(10, 10);
const minMass = 3.285 * Math.pow(10, 3);
const maxRadius = 30;
const tickSize = 5;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function calculateColor(min, current, max) {
    return 'hsl(calc(' + ((current - min) / max) + ' * 270deg), 100%, 50%)';
}

function generateBalls(num) {
    for (let i = 0; i < num; i++) {

        let posX = Math.random() * maxHeight;
        let posY = Math.random() * maxWidth;
        let mass = getRandomArbitrary(minMass, maxMass);
        let radius = mass / Math.pow(10, 9);


        let sphere = new object(
            space,
            posX,
            posY,
            mass,
            radius,
            0,
            0,
            tickSize,
            '#ffffff'
        );
        allBalls.push(sphere);
    }
}

function updateBalls(allBalls) {
    allBalls.forEach(ball => {
        ball.calculateOneTickGravity(allBalls);
    });
    allBalls.forEach(ball => {
        ball.changeOneTickGravity();
    });
}

generateBalls(0);
// updateBalls(allBalls);
setInterval(() => updateBalls(allBalls), 1);

function printMousePos(event) {

    let posX = event.clientY;
    let posY = event.clientX;
    let mass = getRandomArbitrary(minMass, maxMass);
    let radius = mass / Math.pow(10, 9);

    let sphere = new object(
        space,
        posX,
        posY,
        mass,
        radius,
        0,
        0,
        tickSize,
        '#ffffff'
    );
    allBalls.push(sphere);
}
  
document.addEventListener("click", printMousePos);



