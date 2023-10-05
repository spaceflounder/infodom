import { useCmd } from "@infodom";


export default () => {

    useCmd('read', `Read the Weathered Old Sign`, () => `
    
The sign consists of perilous warnings to whomever enters the cave, promising
all manner of death and dismemberment to those foolish enough to proceed beyond
this point. However, it's all written in languages you don't
understand, so on we go.
    
    `)

    return `
    
The mouth of a black cave opens ominously before you, lined with jagged rocks
like the maw of some great beast with broken teeth. Above the opening is a
weathered sign. Inside, a long :kbd[stair] extends deep down into the earth.
    
    `
}
