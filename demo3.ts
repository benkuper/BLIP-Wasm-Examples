import * as dev from "./arduino";

let state: u32 = 0; // 0: not thrown, 1: thrown

export function init(): void {
}

export function update(): void {
    dev.clearLeds();

     let throwState = dev.getThrowState();

    //If in the hands
    if (throwState == 0) {
        dev.fillLedsRGB(0, 0, 0);
        // dev.fillLedsRGB(255, 0, 0);
    }
    else { //if thrown, in any way
        dev.fillLedsRGB(0, 255, 225);
    }

    state = (state+1)%20;
}


export function stop(): void {
    // dev.clearLeds();
    dev.fillLeds(0x0);

}