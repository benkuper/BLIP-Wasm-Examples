import * as dev from "./arduino";

export function init(): void {
}

export function update(): void {
    dev.clearLeds();
    let yaw: f32 = dev.getYaw();
    let val:f32 = (yaw/180.0)*.5+.5;
    dev.pointRGB(1, 0.2, u32(val*255), u32((1.0-val)*255),0); // Point red at the front
}

export function stop(): void {
    dev.fillLeds(0x0);

}