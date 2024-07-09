import { Client, utils } from "openrgb-sdk";
import { BasicWave, BasicWaveDuration, BasicWaveSpeed, ThinWave } from "./animations/wave.js";

let client = new Client("Test Animation", 6742, "0.0.0.0");

try {
    await client.connect();
} catch (err){
    console.error("Could not connect : ", err);
    process.exit(1);
}

let red = utils.color(255, 0, 0);
let black = utils.color(0, 0, 0);

let tm = ThinWave(client, 5, 10, 100, 350, red, black);

await tm.promise;

client.disconnect();