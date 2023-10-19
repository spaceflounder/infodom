import { sendTo, useCmd, useNav } from "@infodom";
import CommonResponses from "../src/CommonResponses.ts";

export default () => {

    CommonResponses();

    useNav('up', `To the woods`, () => {
        sendTo('InTheDeepWoods')
    });

    useNav('left', `To the village`, () => {
        sendTo('InTheVillage')
    });

    useNav('right', `To the ocean`, () => {
        sendTo('AtTheOcean')
    });

    useNav('down', `To the meadow`, () => {
        sendTo('InTheMeadow')
    });

    return `
Stiff salty air blows in from the seashore, gently rustling the
tall grass and wildflowers clinging to the sandy soil. 
    `;
}
