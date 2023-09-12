import { sendTo, useCmd, useNav } from "@infodom";


const helpResponse = () => `
**Arrr** is a text-based game played with hotkeys. If you're playing with
a keyboard, you can control the story flow by typing keys as displayed
on the input bar below. If you are using a mouse or touch screen, you can
tap or click commands on the bar.

Each command advances the story by a few sentences. Note that the arrow keys
are used to move the player character. Commands with a :chaticon icon indicate a
spoken topic for conversation with a game character.

`;


export default function() {

    useNav('up', `Proceed`, () => sendTo('Prologue'));
    useCmd('?', `Help`, helpResponse);

    return `

Avast mateys! It be too late to alter course.
:::aside
Ahoy there! If this be yer first voyage, type :kbd[?] or click the Help
button to get yer bearings. Otherwise, hit the Arrow Up key to venture into
uncharted waters...
:::
    
    `;
}
