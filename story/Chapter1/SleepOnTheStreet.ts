import { sendTo, useCmd, useLocal, useNav, useProceed, useTopic } from "@infodom";


function tryFighting() {

    return `
    
My hand crept towards my cutlass.
    
    `
}


function tryRunning() {
    useLocal();
    useProceed('z', () => {
        
    });
    return `
    
The butt of a musket was shoved squarely into my back. “Now, ya don’t want ta
be leavin’ so soon, do ya?”

There was a musket blast–not into my back, but not far either. I shut my eyes.
My ears rang with swords, musket-fire. A heavy blow landed on my head and 
blackness swept over...
    
    `

}


function surrounded() {
    useLocal();

    useCmd('x', `Fight`, tryFighting);
    useNav('down', `Run!`, tryRunning);

    return `

“Excuse me,” I said as fear chased away my grogginess. “Can I help you
gentlemen?” I could not tell how many there were in the darkness, but it was
clear I was surrounded.

“Bless,” said their ringleader with a wicked sneer, “A sense of humor. I like
that.”
    
    `

}


export default function() {


    useTopic('x', `Excuse Me`, surrounded);

    return `

I decided that the open cobblestone under the stars would be a fine bed-chamber
for one night. Finding a space of alleyway that seemed less foul than the rest,
I began to settle in for the evening when a band of brigands surrounded me.
    
    `
}
