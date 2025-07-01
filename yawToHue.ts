import * as dev from "./arduino";

export function init(): void {
    dev.setIMUEnabled(true);
    //dev.calibrateIMU(); // Uncomment to calibrate the IMU
    //dev.fillLeds(0x0); // Clear LEDs on start
}

export function update(): void {
    dev.clearLeds();
    let yaw: f32 = dev.getYaw();
    let val: f32 = (yaw / 180.0) * .5 + .5;
    dev.pointHSV(1.0, 0.1, val, 1.0, 1.0); // Point red at the front
    dev.pointRGB(0.5, 0.1, 150, 150, 150); // Point red at the front
    dev.pointHSV(0.0, 0.1, val, 1.0, 1.0); // Point red at the front
    //dev.fillLedsRGB(255, 0,0); // Fill all LEDs with white
}

export function stop(): void {
    dev.setIMUEnabled(false);
    dev.fillLeds(0x0);

}