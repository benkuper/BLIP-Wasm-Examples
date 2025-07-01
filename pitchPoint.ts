import * as dev from "./arduino";

export function init(): void {
  // dev.setIMUEnabled(true);
}

export function update(): void {
    dev.clearLeds();

    let relPitch:f32 = (dev.getPitch() / 90.0)*.5+.5;
    dev.pointRGB(relPitch, .1, 255, 255, 0);
}

export function stop(): void {
  // dev.clearLeds();
  // dev.setIMUEnabled(false);
  dev.fillLeds(0x0);

}