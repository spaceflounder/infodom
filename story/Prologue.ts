import { sendTo, useNav } from "@infodom";

export default function() {

    useNav('z', `Sleep on the beach`, () => {
        sendTo('SleepOnBeach')
    });

    useNav('x', `Find an Inn`, () => {
        sendTo('FindAnInn')
    });

    useNav('c', `Sleep on the Street`, () => {
        sendTo('SleepOnTheStreet')
    });

    return `
As a matter of terrible ill-fate, including a storm which nearly resulted in
shipwreck, I became stranded on Tortuga near nightfall with no lodgings.
    `;
}
