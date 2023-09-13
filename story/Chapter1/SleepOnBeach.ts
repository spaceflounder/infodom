import { sendTo, useNav } from "@infodom";

export default function() {

    useNav('up', `Rouse Quickly`, () => {
        sendTo('ToJailFromBeach')
    })

    return `

With my dignity intact, I proceeded to make a bed of sand far enough from the
crashing surf lest I wake up swimming. As I drifted off in the soft moonlight,
I was vaguely aware that a dark figure was casting a dread shadow over me.

    `;
}
