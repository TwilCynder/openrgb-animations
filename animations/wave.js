import { animate } from "@twilcynder/timing-util";
import { max, min } from "./include/util.js";
import { colorArray } from "./include/orgb_util.js";

async function runBasicHalfWave(tm, client, device, ledsNB, waveDelay, color){
    for (let i = 0; i < ledsNB; i++){
        client.updateSingleLed(device, i, color);
        await tm.sleep(waveDelay);
    }
}

async function runBasicWave(tm, client, device, ledsNB, waveDelay, pauseDuration, fgColor, bgColor){
    await runBasicHalfWave(tm, client, device, ledsNB, waveDelay, fgColor);
    await tm.sleep(pauseDuration)
    await runBasicHalfWave(tm, client, device, ledsNB, waveDelay, bgColor);
}

export function BasicWave(client, deviceID, ledsNB, waveDelay, pauseDuration, fgColor, bgColor){
    return animate(async tm => {
        await runBasicWave(tm, client, deviceID, ledsNB, waveDelay, pauseDuration, fgColor, bgColor);
    })
}

export function BasicWaveDuration(client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor){
    return BasicWave(client, device, ledsNB, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor);
}

export function BasicWaveSpeed(client, device, ledsNB, waveSpeed, pauseDuration, fgColor, bgColor){
    return BasicWave(client, device, ledsNB, 1000 / waveSpeed, pauseDuration, fgColor, bgColor);
}

export function BasicWaveLoop(client, deviceID, ledsNB, waveDelay, pauseDuration, fgColor, bgColor, loops = Infinity){
    return animate(async tm => {
        for (let i = 0; i < loops; i++){
            await runBasicWave(tm, client, deviceID, ledsNB, waveDelay, pauseDuration, fgColor, bgColor);
            await tm.sleep(pauseDuration)
        }
    })
}

export function BasicWaveLoopDuration(client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor, loops){
    return BasicWaveLoop(client, device, ledsNB, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor, loops);
}

export function BasicWaveLoopSpeed(client, device, ledsNB, waveSpeed, pauseDuration, fgColor, bgColor, loops){
    return BasicWaveLoop(client, device, ledsNB, 1000 / waveSpeed, pauseDuration, fgColor, bgColor, loops);
}

async function runBasicHalfWaveSPAscending(tm, client, device, startingLed, bound, waveDelay, color){
    for (let i = startingLed + 1; i < bound; i++){
        client.updateSingleLed(device, i, color);
        await tm.sleep(waveDelay);
    }
}

async function runBasicHalfWaveSPDescending(tm, client, device, startingLed, waveDelay, color){
    for (let i = startingLed - 1; i > -1; i--){
        client.updateSingleLed(device, i, color);
        await tm.sleep(waveDelay);
    }
}

function runBasicHalfWaveCentered(tm, client, device, startingLed, bound, waveDelay, color){
    return Promise.all([
        runBasicHalfWaveSPAscending(tm, client, device, startingLed, bound, waveDelay, color),
        runBasicHalfWaveSPDescending(tm, client, device, startingLed, waveDelay, color)
    ]);
}

async function runBasicWaveCentered(tm, client, device, ledsNB, startingLed, waveDelay, pauseDuration, fgColor, bgColor){
    await runBasicHalfWaveCentered(tm, client, device, startingLed, ledsNB, waveDelay, fgColor);
    await tm.sleep(pauseDuration);
    await runBasicHalfWaveCentered(tm, client, device, startingLed, ledsNB, waveDelay, bgColor);
}

export function BasicWaveCentered(client, device, ledsNB, startingLed, waveDelay, pauseDuration, fgColor, bgColor){
    return animate(async tm => {
        await runBasicWaveCentered(tm, client, device, ledsNB, startingLed, waveDelay, pauseDuration, fgColor, bgColor);
    });
}

export function BasicWaveCenteredDuration(client, device, ledsNB, startingLed, waveDuration, pauseDuration, fgColor, bgColor){
    return BasicWaveCentered(client, device, ledsNB, startingLed, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor)
}

export function BasicWaveCenteredSpeed(client, device, ledsNB, startingLed, waveSpeed, pauseDuration, fgColor, bgColor){
    return BasicWaveCentered(client, device, ledsNB, startingLed, 1000 / waveSpeed, pauseDuration, fgColor, bgColor)
}

export function BasicWaveCenteredLoop(client, device, ledsNB, startingLed, waveDelay, pauseDuration, fgColor, bgColor, loops = Infinity){
    return animate(async tm => {
        for (let i = 0; i < loops; i++){
            await runBasicWaveCentered(tm, client, device, ledsNB, startingLed, waveDelay, pauseDuration, fgColor, bgColor);
            await tm.sleep(pauseDuration);
        }
    });
}

export function BasicWaveCenteredDurationLoop(client, device, ledsNB, startingLed, waveDuration, pauseDuration, fgColor, bgColor, loops){
    return BasicWaveCenteredLoop(client, device, ledsNB, startingLed, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor, loops)
}

export function BasicWaveCenteredSpeedLoop(client, device, ledsNB, startingLed, waveSpeed, pauseDuration, fgColor, bgColor, loops){
    return BasicWaveCenteredLoop(client, device, ledsNB, startingLed, 1000 / waveSpeed, pauseDuration, fgColor, bgColor, loops)
}

async function runThinWave(tm, client, device, ledsNB, waveDelay, fgColor, bgColor){
    for (let i = 0; i < ledsNB; i++){
        let colors = Array(ledsNB).fill(bgColor);
        colors[i] = fgColor;
        client.updateLeds(device, colors);
        await tm.sleep(waveDelay);
    } 
    client.updateLeds(device, Array(ledsNB).fill(bgColor));
}

export function ThinWave(client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor){
    return animate(async tm => {
        await runThinWave(tm, client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor);
    })
}

export function ThinWaveDuration(client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor){
    return ThinWave(client, device, ledsNB, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor);
}

export function ThinWaveSpeed(client, device, ledsNB, waveSpeed, pauseDuration, fgColor, bgColor){
    return ThinWave(client, device, ledsNB, 1000 / waveSpeed, pauseDuration, fgColor, bgColor);
}

async function runThinWaveCentered(tm, client, device, ledsNB, startingLed, waveDelay, fgColor, bgColor){
    let distToEnd = ledsNB - startingLed - 1
    let minDist = min(startingLed, distToEnd) + 1;

    let array = colorArray(ledsNB, bgColor);
    array[startingLed] = fgColor;
    client.updateLeds(device, array);

    for (let i = 1; i < minDist; i++){
        array = colorArray(ledsNB, bgColor);
        array[startingLed + i] = fgColor; 
        array[startingLed - i] = fgColor; 
        client.updateLeds(device, array)
        await tm.sleep(waveDelay);
    }

    if (startingLed > distToEnd){
        for (let i = startingLed - minDist; i > -1; i--){
            array = colorArray(ledsNB, bgColor);
            array[i] = fgColor; 
            client.updateLeds(device, array);
            await tm.sleep(waveDelay);
        }
    } else {
        for (let i = startingLed + minDist; i < ledsNB; i++){
            array = colorArray(ledsNB, bgColor);
            array[i] = fgColor; 
            client.updateLeds(device, array);
            await tm.sleep(waveDelay);
        }
    }

    client.updateLeds(device, colorArray(ledsNB, bgColor));
}

export function ThinWaveCentered(client, device, ledsNB, startingLed, waveDelay, fgColor, bgColor){
    return animate(async tm => {
        await runThinWaveCentered(tm, client, device, ledsNB, startingLed, waveDelay, fgColor, bgColor);
    })
}

export function ThinWaveCenteredDuration(client, device, ledsNB, startingLed, waveDuration, fgColor, bgColor){
    return ThinWaveCentered(client, device, ledsNB, startingLed, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), fgColor, bgColor)
}

export function ThinWaveCenteredSpeed(client, device, ledsNB, startingLed, waveSpeed, fgColor, bgColor){
    return ThinWaveCentered(client, device, ledsNB, startingLed, 1000 / waveSpeed, fgColor, bgColor)
}

export function ThinWaveCenteredLoop(client, device, ledsNB, startingLed, waveDelay, pauseDuration, fgColor, bgColor, loops = Infinity){
    return animate(async tm => {
        for (let i = 0; i < loops; i++){
            await runThinWaveCentered(tm, client, device, ledsNB, startingLed, waveDelay, fgColor, bgColor);
            await tm.sleep(pauseDuration);
        }
    })
}

export function ThinWaveCenteredDurationLoop(client, device, ledsNB, startingLed, waveDuration, pauseDuration, fgColor, bgColor, loops){
    return ThinWaveCenteredLoop(client, device, ledsNB, startingLed, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor, loops)
}

export function ThinWaveCenteredSpeedLoop(client, device, ledsNB, startingLed, waveSpeed, pauseDuration, fgColor, bgColor, loops){
    return ThinWaveCenteredLoop(client, device, ledsNB, startingLed, 1000 / waveSpeed, pauseDuration, fgColor, bgColor, loops)
}

async function runMultiThinWave(tm, client, device, ledsNB, startingLed, wavesNB, gap, waveDelay, fgColor, bgColor){
    let maxDist = max(startingLed, ledsNB - startingLed - 1) + 1;
    for (let i = 0; i < maxDist + gap * (wavesNB - 1); i++){
        let array = colorArray(ledsNB, bgColor);
        for (let w = 0; w < wavesNB; w++){
            let dist = i - (w * gap);
            
            if (dist < 0) break;

            let led = startingLed + dist;
            if (led < ledsNB){
                array[led] = fgColor;
            }

            led = startingLed - dist;
            if (led >= 0){
                array[led] = fgColor;
            }

        }

        client.updateLeds(device, array);
        await tm.sleep(waveDelay);
    }

    let array = colorArray(ledsNB, bgColor);
    client.updateLeds(device, array);
}

export function MultiThinWave(client, device, ledsNB, startingLed, wavesNB, gap, waveDelay, fgColor, bgColor){
    return animate(async tm => {
        await runMultiThinWave(tm, client, device, ledsNB, startingLed, wavesNB, gap, waveDelay, fgColor, bgColor);
    })
}

export function MultiThinWaveSpeed(client, device, ledsNB, startingLed, wavesNB, gap, waveSpeed, fgColor, bgColor){
    return MultiThinWave(client, device, ledsNB, startingLed, wavesNB, gap, 1000 / waveSpeed, fgColor, bgColor);
}

export function MultiThinWaveDuration(client, device, ledsNB, startingLed, wavesNB, gap, waveDuration, fgColor, bgColor){
    return MultiThinWave(client, device, ledsNB, startingLed, wavesNB, gap, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), fgColor, bgColor);
}