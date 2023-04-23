import { Universe } from "./createUniverse.js";

var mousePosition;
var offset = [0,0];
var isDown = false;

let u = new Universe;
  
// document.addEventListener("click", (event) => {
//     u.addObject(
//     event.clientY,
//     event.clientX
// )});

u.space.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        u.space.offsetLeft - e.clientX,
        u.space.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        u.space.style.left = (mousePosition.x + offset[0]) + 'px';
        u.space.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);



