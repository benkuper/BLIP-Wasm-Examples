import * as dev from "./arduino";

let pos:f32 = 0.0;
let prevTime:f32 = 0.0;
export function init(): void {
    dev.setIMUEnabled(true);
}

export function update(): void {
    dev.clearLeds();

    let pitch:f32 = dev.getPitch() / 180.0 + 0.5;
    let speed:f32 = 0.05 + pitch*.7;

    let t:f32 = dev.getTime();
    let deltaTime:f32 = (t - prevTime);
    prevTime = t;
    pos += speed * deltaTime;

    for (let i: u32 = 0; i < 37; i++) {
        let p = f32(i) / 37.0;
        let h:f32 = (pos + pitch * p) % 1.0;
        dev.setLedHSV(i, h, 1, 1);
    }
    // dev.fillLedsHSV((dev.getTime()/10.0) % 1.0, 1.0, 1.0);
}

export function stop(): void {
    // dev.clearLeds();
    dev.setIMUEnabled(false);
    dev.fillLeds(0x0);

}