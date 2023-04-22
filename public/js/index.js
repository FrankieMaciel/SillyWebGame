import { object } from "./createObject.js";

let space = document.getElementById('space');

let allBalls = [];

const maxWidth = space.clientWidth;
const maxHeight = space.clientHeight;
const maxMass = 1000;
const maxRadius = 30;
const tickSize = 0.1;

function generateBalls(num) {
    for (let i = 0; i < num; i++) {

        let posX = Math.random() * maxHeight;
        let posY = Math.random() * maxWidth;
        let mass = Math.random() * maxMass;
        let radius = Math.random() * maxRadius;


        let sphere = new object(
            space,
            posX,
            posY,
            mass,
            radius,
            tickSize
        );
        allBalls.push(sphere);
    }
}

function updateBalls(allBalls) {
    allBalls.forEach(ball => {
        ball.calculateOneTickGravity(allBalls);
    });
}

generateBalls(20);
// updateBalls(allBalls);
setInterval(() => updateBalls(allBalls), tickSize * 10);



