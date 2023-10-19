import { useCmd } from "@infodom";
import { getCurrentRoom } from "./Navigation.ts";
import { contents } from "./contents.ts";

export default() => {

    useCmd('enter', `Look`, () => {
        const room = getCurrentRoom();
        return contents[room]();
    });


    useCmd('z', `Wait`, () => `
    
You wait a few moments.
    
    `);

    useCmd('x', `Examine`, () => `
    
There's nothing here to examine.
    
    `);

    useCmd('c', `Consume`, () => `
    
There's nothing you'd care to consume.
    
    `);

    useCmd('a', `Attack`, () => `
    
Attack? Attack what?
    
    `);

    useCmd('s', `Smell`, () => `
    
Ah, what lovely smells.
    
    `);

    useCmd('m', `Mail`, () => `
    
Sadly, you have no letters to mail.
    
    `);

    useCmd('<', `Pull`, () => `
    
There's nothing to pull.
    
    `);

    useCmd('>', `Push`, () => `
    
There's nothing to push
        
    `);

    useCmd('/', `Turn`, () => `
    
There's nothing worth turning here.
        
    `);

    useCmd('l', `Lick`, () => `
    
You be weird.
            
    `);

}
