import * as dev from "./arduino";

export function init(): void {
    // dev.setIMUEnabled(true);
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
}

export function stop(): void {
    // dev.clearLeds();
    // dev.setIMUEnabled(false);
    dev.fillLeds(0x0);

}