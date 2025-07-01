export declare function millis(): u32;
export declare function getTime(): f32;
export declare function delay(ms: u32): void;
export declare function printFloat(arg: f32): void;
export declare function printInt(arg: u32): void;

export declare function clearLeds(): void;
export declare function dimLeds(v: f32): void;
export declare function fillLeds(color: u32): void;
export declare function fillLedsRGB(r: u32, g: u32, b: u32): void;
export declare function fillLedsHSV(h: u32, s: u32, v: u32): void;
export declare function setLed(i: u32, color: u32): void;
export declare function getLed(i: u32): u32;
export declare function setLedRGB(i: u32, r: u32, g: u32, b: u32): void;
export declare function setLedHSV(i: u32, h: u32, s: u32, v: u32): void;
export declare function pointRGB(p: f32, rad: f32, r: u32, g: u32, b: u32): void;
export declare function pointHSV(p: f32, rad: f32, h: u32, s: u32, v: u32): void;
export declare function playVariant(v: u32): void;

export declare function getFXSpeed(): f32;
export declare function getFXIsoSpeed(): f32;
export declare function getFXStaticOffset(): f32;
export declare function getFXFlipped(): u32;
export declare function setFXSpeed(value: f32): void;
export declare function setFXIsoSpeed(value: f32): void;
export declare function setFXIsoAxis(value: u32): void;
export declare function setFXStaticOffset(value: f32): void;
export declare function resetFX(): void;

export declare function getOrientation(ind: u32): f32;
export declare function calibrateIMU(): void;
export declare function getThrowState(): u32;
export declare function getYaw(): f32;
export declare function getPitch(): f32;
export declare function getRoll(): f32;
export declare function getProjectedAngle(): f32;
export declare function setIMUEnabled(i: u32): void;
export declare function getButtonState(ab: u32): u32;
export declare function getActivity(): f32;
export declare function getSpin(): f32;

export declare function setMicEnabled(i: u32): void;
export declare function getMicLevel(): f32;

export declare function setBatterySendEnabled(i: u32): void;

export declare function randomInt(min: u32, max: u32): u32;
export declare function noise(x: f32, y: f32): f32;

