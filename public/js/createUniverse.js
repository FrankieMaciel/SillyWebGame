import { object } from "./createObject.js";

class Universe {

    constructor() {
        this.GravitationalConstant = 6.67 * Math.pow(10, -11);
        this.space = createSpace();
        this.AllObjects = [];

        this.maxWidth = space.clientWidth;
        this.maxHeight = space.clientHeight;
        this.maxMass = 1.98892 * Math.pow(10, 10);
        this.minMass = 3.285 * Math.pow(10, 3);
        this.maxRadius = 30;

        this.time = 5;

        this.generateUniverse();
    }

    generateUniverse() {
        this.generateBalls(20);
        updateBalls(this.AllObjects);
    }

    generateBalls(num) {
        for (let i = 0; i < num; i++) {
            let posX = Math.random() * this.maxHeight;
            let posY = Math.random() * this.maxWidth;
            let mass = getRandomArbitrary(this.minMass, this.maxMass);
            let radius = mass / Math.pow(10, 9);
    
            let sphere = new object(
                this.space,
                posX,
                posY,
                mass,
                radius,
                0,
                0,
                this.time,
                '#ffffff'
            );
            this.AllObjects.push(sphere);
        }
    }

    addObject(X, Y) {
        console.log('batata');
        let posX = X;
        let posY = Y;
        let mass = getRandomArbitrary(this.minMass, this.maxMass);
        let radius = mass / Math.pow(10, 9);
    
        let sphere = new object(
            this.space,
            posX,
            posY,
            mass,
            radius,
            0,
            0,
            this.time,
            '#ffffff'
        );
        this.AllObjects.push(sphere);
    }
}

function createSpace() {
    let space = document.createElement("div");
    space.setAttribute('id', 'space');
    space.style.position = "absolute";
    space.style.left = "0px";
    space.style.top = "0px";
    document.body.appendChild(space);
    return space;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function calculateColor(min, current, max) {
    return 'hsl(calc(' + ((current - min) / max) + ' * 270deg), 100%, 50%)';
}

function updateBalls(allBalls) {
    setInterval(() => {
        allBalls.forEach(ball => {
            ball.calculateOneTickGravity(allBalls);
        });
        allBalls.forEach(ball => {
            ball.changeOneTickGravity();
        });
    }, 1);
}

export {
    Universe
};