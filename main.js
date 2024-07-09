import { Client, utils } from "openrgb-sdk";
import { ThinWaveCenteredDurationLoop } from "./animations/wave.js";

let client = new Client("Test Animation", 6742, "0.0.0.0");

try {
    await client.connect();
} catch (err){
    console.error("Could not connect : ", err);
    process.exit(1);
}

let red = utils.color(255, 0, 0);
let black = utils.color(0, 0, 0);

let tm = ThinWaveCenteredDurationLoop(client, 5, 10, 4, 500, 0, red, black, 3);

await tm.promise;

client.disconnect();