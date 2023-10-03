
import { useCmd, useFirst, useState, setState } from '@infodom';

export default () => {

    useCmd('read', `Read the newspaper`, () => {
        
        useState('foo', () => `foobar!`);

        return `
    
Li'l Abner was funny today.
    
    `})

    useFirst(() => `
    
This is the first text.
    
    `)

    return `
    
This is a test.
    
    `
}
