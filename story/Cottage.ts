import { useCmd, useState, setState, useHeading } from "@infodom";


export default () => {

    useHeading(`In the Cottage`);


    useCmd('pull', `Pull Rug Aside`, () => {
        setState('rug')
        return `The rug slides to reveal a deep hole leading into darkness.`
    });


    useState('rug', () => {

        useCmd('pull', `Pull Rug Aside`, () => {
            return `The rug is already pulled.`
        });

        return `
    
The carpet is moved.
    
    `})

    return `
    
The air is stale, musty, as though no-one has set foot in here for years. A
narrow beam of sunshine manages through the cracked roof, onto a decayed scrap
of rug. 
    
    `
}
