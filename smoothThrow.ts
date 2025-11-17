import * as dev from "./arduino";

let factor: f32 = 0.0;
let speed: f32 = 0.02; // Speed of change

export function init(): void {
    // dev.setIMUEnabled(true);
}

export function update(): void {
    dev.clearLeds();
    let throwState = dev.getThrowState();

    //If in the hands
    if (throwState == 0) {

        //decrease factor
        if (factor > 0.0) {
            factor -= speed;
        }
        if (factor < 0.0) {
            factor = 0.0;
        }

    }
    else { //if thrown, in any way

        //increase factor
        if (factor < 1.0) {
            factor += speed;
        }
        if (factor > 1.0) {
            factor = 1.0;
        }

    }


    let r:u32 = u32(255.0 * factor);
    let g:u32 = u32(100.0 * factor);
    let b:u32 = 100-u32(100.0 * factor);
    dev.fillLedsRGB(r, g, b);
}

function lerpColor(color1: u32, color2: u32, t: f32): u32 {
    let r1 = (color1 >> 16) & 0xFF;
    let g1 = (color1 >> 8) & 0xFF;
    let b1 = color1 & 0xFF;
    let r2 = (color2 >> 16) & 0xFF;
    let g2 = (color2 >> 8) & 0xFF;
    let b2 = color2 & 0xFF;
    let r = r1 + (r2 - r1) * t;
    let g = g1 + (g2 - g1) * t;
    let b = b1 + (b2 - b1) * t;
    return (r << 16) | (g << 8) | b;
}

export function stop(): void {
    // dev.clearLeds();
    // dev.setIMUEnabled(false);
    dev.fillLeds(0x0);

}