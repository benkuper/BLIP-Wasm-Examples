import * as dev from "./arduino";

let speed: f32 = 15; // Speed of change
let pos: f32 = 0.0;
let prevTime: f32 = 0.0;

export function init(): void {
    dev.setIMUEnabled(true);
}

export function update(): void {
    dev.clearLeds();
    let pitch: f32 = dev.getPitch() / 180.0 + 0.5;
    let roll = dev.getRoll() / 360.0;
    let yaw = dev.getYaw() / 360.0;

    speed = .5 + pitch * 5;

    let t: f32 = dev.getTime();
    let deltaTime: f32 = (t - prevTime);
    prevTime = t;

    pos += speed * deltaTime;

    for(let i: u32 = 0; i < 37; i++) {
        let p = f32(i) / 37.0;
        let val:f32 = dev.noise(p, pos);
        val = min(max(val-pitch*.7,0.0), 1.0);
        dev.setLedHSV(i, .5, 1, val);
    }
}

export function stop(): void {
    // dev.clearLeds();
    dev.setIMUEnabled(false);
    dev.fillLeds(0x0);

}