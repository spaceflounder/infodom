import { sendTo, useCmd, useNav } from "@infodom";


const helpResponse = () => `
**This Cave is Trying to Kill You** is a text-based game played with hotkeys.
If you're playing with
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
:::dropcap
Welcome adventurer! If this is your first time playing, type :kbd[?] or click
the Help button to get an idea how to play.. Otherwise, hit the Arrow Up key to
venture into the unknown...
:::
    
    `;
}
