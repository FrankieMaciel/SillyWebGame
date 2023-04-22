// Newton's gravitational constant
const NGConstant = 6.67 * Math.pow(10, -11);

class object {

    constructor(
        space,
        xposition = 0,
        yposition = 0,
        mass = 1,
        radius = 1,
        velocity = 0,
        time = 1
    ) {
        this.xposition = xposition;
        this.yposition = yposition;
        this.velocity = velocity;
        this.radius = radius;
        this.mass = mass;
        this.time = time;

        this.scapeVelocity = scapeVelocity(this.mass, this.radius);
        this.ScapeRadius = calcScapeRadius(this.mass, this.scapeVelocity) * 100;

        this.sphereDiv = document.createElement("div");
        this.sphereDiv.classList.add('sphere');
        this.sphereDiv.style.position = 'absolute';
        this.sphereDiv.style.borderRadius = '100%';

        this.updateSphere(this);

        space.appendChild(this.sphereDiv);
        this.showInfo();
    }

    calculateObjectInfluence(ObjectsToVerify) {

        let influencedObjects = [];
        ObjectsToVerify.forEach(obj => {
            let difX = Dif(this.xposition, obj.xposition);
            let difY = Dif(this.yposition, obj.yposition);
            let Distance = calculateHypotenuse(difX, difY);
  
            if (Distance <= this.ScapeRadius) {
                influencedObjects.push({
                    object: obj,
                    distance: Distance
                });
            }
        });
        return influencedObjects;
    }

    calculateOneTickGravity(ObjectsToVerify) {
        let ObjectsToVerifyFiltered = ObjectsToVerify.filter((item) => item.sphereDiv !== this.sphereDiv);
        let ObjetsToCalculate = this.calculateObjectInfluence(ObjectsToVerifyFiltered);

        ObjetsToCalculate.forEach(object => {

            let obj = object.object;

            let force = calcForce(this.mass, obj.mass, object.distance);
            let aceleration = calcAceleration(force, this.mass);

            this.velocity += aceleration * this.time;
            // Não pode ser modulo
            let difX = obj.xposition - this.xposition;
            let difY = obj.yposition - this.yposition;

            let theta = calcTheta(difY, difX);
            let xvelocity = this.velocity * Math.cos(theta);
            let yvelocity = this.velocity * Math.sin(theta);

            let nextDifX = Dif((this.xposition + xvelocity), obj.xposition);
            let nextDifY = Dif((this.yposition + yvelocity), obj.yposition);

            let nextDistance = calculateHypotenuse(nextDifX, nextDifY);

            let radiusSum = this.radius + obj.radius;

            if (nextDistance >= radiusSum) {
                this.xposition += xvelocity;
                this.yposition += yvelocity;
            }

            this.updateSphere(this);
        });
    }

    updateSphere(object) {
        this.sphereDiv.style.backgroundColor = 'hsl(calc((' + this.mass + ' / 1500) * 360deg), 100%, 50%)';
        this.sphereDiv.style.width = (this.radius * 2) + 'px';
        this.sphereDiv.style.height = (this.radius * 2) + 'px';
        this.sphereDiv.style.top = `${object.xposition}px`;
        this.sphereDiv.style.left = `${object.yposition}px`;
    }

    showInfo() {
        console.log(
            `Info:
                Xposition: ${this.xposition}
                Yposition: ${this.yposition}
                Velocity: ${this.velocity}
                Radius: ${this.radius}
                Mass: ${this.mass}
                Time: ${this.time}
        `)
    }
}

function calculateHypotenuse(adjacentCathetus, oppositeCathetus) {
    let aSquare = Math.pow(adjacentCathetus, 2);
    let bSquare = Math.pow(oppositeCathetus, 2);
    return Math.sqrt(aSquare + bSquare);
}

function scapeVelocity(mass, radius) {
    return Math.sqrt(2 * NGConstant * mass / radius);
}

function calcScapeRadius(mass, scapeVelocity) {
    return Math.pow((2 * NGConstant * mass) / Math.pow(scapeVelocity, 2), 1/2);
}

function calcForce(mass1, mass2, distance) {
    return NGConstant * (mass1 * mass2) / Math.pow(distance, 2);
}

function calcAceleration(force, mass) {
    return force / mass;
}

function calcTheta(disY, disX) {
    return Math.atan2(disY, disX);
}

function Dif(num1, num2) {
    return Math.abs(num1 - num2);
}

export {
    object
};