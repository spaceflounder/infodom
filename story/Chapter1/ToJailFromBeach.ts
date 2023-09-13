import { useRestricted, useTopic, useCmd, sendTo } from "@infodom";

export default function() {

    useTopic('n', `Refuse`, () => {

        useCmd('up', `Proceed`, () => {
            sendTo('InPrisonWithAbby')
        });

        useRestricted(['up']);

        return `
        
"You can’t just lock me up!" I cried. "I'm an honourable citizen of the
British government!"

"I don't care if you are the king of Spain--on this island, you shall obey the
law. Off to the dungeon!"
        
        `

    })

    useTopic('y', 'Comply', () => {

    })

    return `

The dark figure had a voice, and a weaselly appearance which I could discern
as my eyes adjusted to the night. "Clap \'im in irons..." said the man. His
lavish coat and bearing informed me he was some sort of magistrate.

"What for?" said another voice.

"Loitering," said the man in authority.

`
}
