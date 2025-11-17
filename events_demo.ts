import * as dev from "./arduino";

/* public variables */
let factor: f32 = 0.0; // 0:1;feedback
let speedOn: f32 = 0.01; // 0:0.1
let speedOff: f32 = 0.05; // 0:0.1
let toggledOn: boolean = false; //feedback
/* end public variables */

const enum Events {
    distanceTrig,
    togOn,
    togOff
};


let speedMultiplier: f32 = 1.0;
let mainHue: f32 = 0.5;

// Debouncing
let debounceCounter: i32 = 0;
const debounceThreshold: i32 = 10; // Number of frames to wait before changing state
let currentState: boolean = false;

// Toggle state
let lastHoverState: boolean = false;
let prevButton: boolean = false;
let toggleState: boolean = false;

function isOver(dist: f32): boolean {
    const isCurrentlyInHands = dist > 0.4;

    if (isCurrentlyInHands !== currentState) {
        debounceCounter++;
        if (debounceCounter >= debounceThreshold) {
            currentState = isCurrentlyInHands;
            debounceCounter = 0;
        }
    } else {
        debounceCounter = 0;
    }

    return !currentState;
}
export function init(): void {
    // dev.printInt(42);
    // let message: string = "cool";
}

export function update(): void {
    dev.clearLeds();
    dev.fillLedsRGB(0, 0, 0);

    let dist: f32 = dev.getDistance(0);
    // dev.printFloat(dist);

    let hover: boolean = isOver(dist);


    // // Detect the rising edge of 'hover' to toggle the state
    if (hover && !lastHoverState) {
        toggledOn = !toggledOn;

        if(hover) dev.sendEvent(Events.distanceTrig);
        dev.sendParamFeedback(3, f32(toggledOn));

    }

    lastHoverState = hover;

    let button: boolean = dev.getButtonState(0) == 1;

    if (button != prevButton) {
        if(button) toggleState = !toggleState;
        if (!toggleState) toggledOn = false;

        

        // dev.printInt(button);
        // let utf8 = String.UTF8.encode(message, true); // true = null-terminated

        // let ptr = changetype<i32>(utf8);      // pointer to the UTF-8 data
        // let len = message.length - 1;         // exclude trailing '\0'

        // dev.printInt(len);
        // dev.printString(ptr, len);

    }

    prevButton = button;


    if (toggledOn || toggleState) {
        //increase factor
        if (factor < 1.0) {
            factor += speedOn * speedMultiplier;
        }
        if (factor > 1.0) {
            factor = 1.0;
        }
    }
    else { //if toggled off
        //decrease factor
        if (factor > 0.0) {
            factor -= speedOff * speedMultiplier;
        }
        if (factor < 0.0) {
            factor = 0.0;
        }
    }


    let r: u32 = u32(255.0 * factor);
    let g: u32 = u32(100.0 * factor);
    let b: u32 = 100 - u32(100.0 * factor);



    dev.pointHSV(factor * .5, factor * 2, mainHue, 1, .3);


    //add 2 subtles white moving points over time
    let time = dev.getTime();
    let pos1 = ((time * 0.2) % 1.0) * 2 - .5;
    let pos2 = f32(1.0 - (time * 0.13 % 1.0) * 2 + .5);
    dev.pointHSV(pos1, .6, .2, 1.0, factor * .3);
    dev.pointHSV(pos2, .2, .4, .3, factor * .3);
}

function lerpColor(color1: u32, color2: u32, t: f32): u32 {
    let r1 = (color1 >> 16) & 0xFF;
    let g1 = (color1 >> 8) & 0xFF;
    let b1 = color1 & 0xFF;
    let r2 = (color2 >> 16) & 0xFF;
    let g2 = (color2 >> 8) & 0xFF;
    let b2 = color2 & 0xFF;
    let r = r1 + u32(f32(r2 - r1) * t);
    let g = g1 + u32(f32(g2 - g1) * t);
    let b = b1 + u32(f32(b2 - b1) * t);
    return (r << 16) | (g << 8) | b;
}

export function stop(): void {
    dev.clearLeds();
    // dev.setIMUEnabled(false);
}

/* public functions */
export function toggleOn(): void {
    toggledOn = true;
}

export function toggleOff(): void {
    toggledOn = false;
}
/* end public functions */
