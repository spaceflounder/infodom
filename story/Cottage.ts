import { useCmd, useState, setState, usePlace } from "@infodom";


function pulledRug() {

    useCmd('pull', `Pull Rug Aside`, () => {
        return `The rug is already pulled.`
    });

    useCmd('climb', `Climb into the hole`, () => `
    
It's a bit slick for anything that ambitious.
    
    `)

    return `

The air is stale, musty, as though no-one has set foot in here for years. A
narrow beam of sunshine manages through the cracked roof, into a dark hole
where there was once a decayed bit of rug.

    `;
}


export default () => {

    usePlace(`In the Cottage`);


    useCmd('pull', `Pull Rug Aside`, () => {
        setState('rug')
        return `The rug slides to reveal a deep hole leading into darkness.`
    });


    useState('rug', pulledRug);

    return `
    
The air is stale, musty, as though no-one has set foot in here for years. A
narrow beam of sunshine manages through the cracked roof, onto a decayed scrap
of rug. 
    
    `
}
