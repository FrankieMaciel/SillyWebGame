// Newton's gravitational constant
const NGConstant = 6.67 * Math.pow(10, -11);

class object {

    constructor(
        space,
        xposition = 0,
        yposition = 0,
        mass = 1,
        radius = 1,
        Xvelocity = 0,
        Yvelocity = 0,
        time = 1,
        color = '#ffffff',
    ) {
        this.xposition = xposition;
        this.yposition = yposition;
        this.Xvelocity = Xvelocity;
        this.Yvelocity = Yvelocity;
        this.radius = radius;
        this.mass = mass;
        this.time = time;
        this.color = color;

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

            let difX = this.xposition - obj.xposition;
            let difY = this.yposition - obj.yposition;
            let theta = calcTheta(difY, difX);
             
            let force = calcForce(this.mass, obj.mass, object.distance);

            let forceX = force * Math.cos(theta);
            let forceY = force * Math.sin(theta);

            let accelerationX = calcAceleration(forceX, obj.mass);
            let accelerationY = calcAceleration(forceY, obj.mass);

            let sumRadius = this.radius + obj.radius;
            let dis = calculateHypotenuse(difX, difY);

            if (sumRadius <= dis) {
                obj.Xvelocity += accelerationX * obj.time;
                obj.Yvelocity += accelerationY * obj.time;
            } else {
                obj.Xvelocity = -(obj.Xvelocity + this.Xvelocity) / 1.5;
                obj.Yvelocity = -(obj.Yvelocity + this.Yvelocity) / 1.5;
            }
        });
    }

    changeOneTickGravity() {
        this.xposition += this.Xvelocity;
        this.yposition += this.Yvelocity;
        this.updateSphere();
    }

    updateSphere() {
        this.sphereDiv.style.backgroundColor = this.color;
        this.sphereDiv.style.width = (this.radius * 2) + 'px';
        this.sphereDiv.style.height = (this.radius * 2) + 'px';
        this.sphereDiv.style.top = `${this.xposition}px`;
        this.sphereDiv.style.left = `${this.yposition}px`;
    }

    showInfo() {
        console.log(
            `Info:
                Xposition: ${this.xposition}
                Yposition: ${this.yposition}
                Xvelocity: ${this.Xvelocity}
                Yvelocity: ${this.Yvelocity}
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
    return NGConstant * ((mass1 * mass2) / Math.pow(distance, 2));
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