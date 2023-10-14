import { roll, useCmd, useEnvMsg, usePlace } from "@infodom";


function env() {
    useEnvMsg(`

An old crow in the branches high above gives a mournful squawk.

    `)
}


export default () => {

    usePlace(`Dense Forest`);

    useCmd('examine', `Examine the flowers`, () => `
    
Wildflowers -- mims, marigolds and hardy little moss roses.
    
    `)

    roll(25) && env()

    return `
    
A cluster of oaks surrounds a flickering torch, hanging on a chain from a high
branch. Deep in the gloom you can see the vague opening of a :kbd[cave] mouth.
    
    `
}

