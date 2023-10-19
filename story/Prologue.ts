import { sendTo, useCmd } from "@infodom";
import CommonResponses from "../src/CommonResponses.ts";

export default () => {

    useCmd('w', `To the woods`, () => {
        sendTo('InTheDeepWoods')
    });

    useCmd('s', `To the village`, () => {
        sendTo('InTheVillage')
    });

    useCmd('a', `To the ocean`, () => {
        sendTo('AtTheOcean')
    });

    useCmd('d', `To the meadow`, () => {
        sendTo('InTheMeadow')
    });

    return `
Stiff salty air blows in from the seashore, gently rustling the
tall grass and wildflowers clinging to the sandy soil. 
    `;
}
