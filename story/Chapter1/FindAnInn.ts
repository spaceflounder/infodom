import { sendTo, useNav } from "@infodom";

export default function() {

    useNav('down', `Sleep on the Beach`, () => {
        sendTo('SleepOnBeach')
    })

    useNav('right', `Sleep on the Street`, () => {
        sendTo('SleepOnTheStreet')
    })

    return `

“There's not a room on all of Tortuga,” said a stout, greasy inn-keeper
with a black fatuous mustache. “You might try sleeping on the beach. Pebbles
sleeps there all day.”

    `;
}
