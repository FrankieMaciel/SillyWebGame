// Newton's gravitational constant
const NGConstant = 6.67 * Math.pow(10, -11);

function calculateHypotenuse(adjacentCathetus, oppositeCathetus) {
    let aSquare = Math.pow(adjacentCathetus, 2);
    let bSquare = Math.pow(oppositeCathetus, 2);
    return Math.sqrt(aSquare + bSquare);
}

class object {

    constructor(
        space,
        xposition = 0,
        yposition = 0,
        mass = 1,
        radius = 1,
        velocity = 0,
        tickSize = 1
    ) {
        this.radius = radius;
        this.xposition = xposition;
        this.yposition = yposition;
        this.mass = mass;
        this.velocity = velocity;
        this.tickSize = tickSize;

        this.area = Math.pow(radius, 2) * Math.PI;
        this.density = this.mass / this.area;

        this.scapeVelocity = Math.sqrt(2 * NGConstant * this.mass / this.radius);
        this.gravitationalScapeRadius = Math.pow((2 * NGConstant * this.mass) / Math.pow(this.scapeVelocity, 2), 1/2);

        this.sphereDiv = document.createElement("div");
        this.sphereDiv.classList.add('sphere');
        this.sphereDiv.style.position = 'absolute';
        
        this.sphereDiv.style.backgroundColor = 'hsl(calc((' + this.mass + ' / 1500) * 360deg), 100%, 50%)';
        this.sphereDiv.style.width = (this.radius * 2) + 'px';
        this.sphereDiv.style.height = (this.radius * 2) + 'px';

        this.sphereDiv.style.top = `${yposition}px`;
        this.sphereDiv.style.left = `${xposition}px`;

        this.sphereDiv.style.borderRadius = '100%';
        space.appendChild(this.sphereDiv);
    }

    calculateObjectInfluence(ObjectsToVerify) {
        let influencedObjects = [];
        
        ObjectsToVerify.forEach(object => {
            let xDistance = Math.abs(this.xposition - object.xposition);
            let yDistance = Math.abs(this.yposition - object.yposition);

            let finalDistance = calculateHypotenuse(xDistance, yDistance);
            if (finalDistance <= this.gravitationalScapeRadius * 100) {
                influencedObjects.push({
                    object: object,
                    distance: finalDistance
                });
            }
        });
        return influencedObjects;
    }

    calculateOneTickGravity(ObjectsToVerify) {
        let ObjectsToVerifyFiltered = ObjectsToVerify.filter((item) => item.sphereDiv !== this.sphereDiv);
        let ObjetsToCalculate = this.calculateObjectInfluence(ObjectsToVerifyFiltered);

        ObjetsToCalculate.forEach(object => {
            let force = NGConstant * (this.mass * object.object.mass) / Math.pow(object.distance, 2);
            let aceleration = force / this.mass;
            this.velocity += aceleration * this.tickSize;

            let distanceX = object.object.xposition - this.xposition;
            let distanceY = object.object.yposition - this.yposition;
            
            let theta = Math.atan2(distanceY, distanceX);
            let xvelocity = this.velocity * Math.cos(theta);
            let yvelocity = this.velocity * Math.sin(theta);

            let nextAdjacentCathetus = Math.abs((this.xposition + xvelocity) - object.object.xposition);
            let nextOppositeCathetus = Math.abs((this.yposition + yvelocity) - object.object.yposition);

            let nextDistance = calculateHypotenuse(nextAdjacentCathetus, nextOppositeCathetus);

            let radiusSome = this.radius + object.object.radius;

            if (nextDistance >= radiusSome) {
                this.xposition += xvelocity;
                this.yposition += yvelocity;
            } 
            this.updateSpherePosition(this);
        });
    }

    updateSpherePosition(object) {
        this.sphereDiv.style.backgroundColor = 'hsl(calc((' + this.mass + ' / 1500) * 360deg), 100%, 50%)';
        this.sphereDiv.style.width = (this.radius * 2) + 'px';
        this.sphereDiv.style.height = (this.radius * 2) + 'px';

        this.sphereDiv.style.top = `${object.xposition}px`;
        this.sphereDiv.style.left = `${object.yposition}px`;
    }
}

export {
    object
};