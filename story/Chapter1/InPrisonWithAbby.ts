import { sendTo, useNav } from "@infodom";

export default function() {

    useNav('down', `Street`, () => sendTo('SleepOnTheStreet'));

    return `

In prison.

    `
}
