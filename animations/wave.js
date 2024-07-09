import { animate } from "@twilcynder/timing-util";

async function runBasicWave(tm, client, device, ledsNB, waveDelay, pauseDuration, fgColor, bgColor){
    for (let i = 0; i < ledsNB; i++){
        client.updateSingleLed(device, i, fgColor);
        await tm.sleep(waveDelay);
    }
    await tm.sleep(pauseDuration)
    for (let i = 0; i < ledsNB; i++){
        client.updateSingleLed(device, i, bgColor);
        await tm.sleep(waveDelay);
    }
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

export function BasicWaveLoop(client, deviceID, ledsNB, waveDelay, pauseDuration, fgColor, bgColor){
    return animate(async tm => {
        while (true){
            await runBasicWave(tm, client, deviceID, ledsNB, waveDelay, pauseDuration, fgColor, bgColor);
            await tm.sleep(pauseDuration)
        }
    })
}

export function BasicWaveLoopDuration(client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor){
    return BasicWaveLoop(client, device, ledsNB, waveDuration / (ledsNB > 1 ? ledsNB - 1 : 1), pauseDuration, fgColor, bgColor);
}

export function BasicWaveLoopSpeed(client, device, ledsNB, waveSpeed, pauseDuration, fgColor, bgColor){
    return BasicWaveLoop(client, device, ledsNB, 1000 / waveSpeed, pauseDuration, fgColor, bgColor);
}

async function runThinWave(tm, client, device, ledsNB, waveDelay, pauseDuration, fgColor, bgColor){
    for (let i = 0; i < ledsNB; i++){
        client.updateLeds(device, Array(ledsNB).fill(bgColor))
        client.updateSingleLed(device, i, fgColor);
        await tm.sleep(waveDelay);
    } 
}

export function ThinWave(client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor){
    return animate(async tm => {
        await runThinWave(tm, client, device, ledsNB, waveDuration, pauseDuration, fgColor, bgColor);
    })
}