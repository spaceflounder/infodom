import { sendTo, useNav } from "@infodom";

export default function() {

    useNav('s', `Sleep on the beach`, () => {
        sendTo('SleepOnBeach')
    });

    useNav('i', `Find an Inn`, () => {
        sendTo('FindAnInn')
    });

    return `
As a matter of terrible fate, including a storm which nearly resulted in
shipwreck, I became stranded on Tortuga near nightfall with no lodgings.
    `;
}
