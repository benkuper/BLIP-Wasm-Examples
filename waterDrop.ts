import * as dev from "./arduino";

let prevTime: f32 = 0.0;
let deltaTime: f32 = 0.0;
const speed: f32 = 2.0;
const size:f32 = 0.1;
let position: f32 = -size;

export function init(): void {
    dev.setIMUEnabled(true);

    prevTime = dev.getTime();
}

export function update(): void {
    dev.clearLeds();

    let t = dev.getTime();
    deltaTime = t - prevTime;
    prevTime = t;

    let pitch:f32 = dev.getPitch();
    position += speed * deltaTime * -pitch / 90.0;
    if (position > 1 + size) {
        position = 1 + size;
    } else if (position < -size) {
        position = -size;
    }

    dev.pointRGB(position, size, 0, 120, 255);
}

export function stop(): void {
    // dev.clearLeds();
    dev.setIMUEnabled(false);
    dev.fillLeds(0x0);

}