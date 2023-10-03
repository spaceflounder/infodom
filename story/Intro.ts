
import { useCmd, useFirst, useState } from '@infodom';
import { useImplicit } from '../src/engine/CommandSystem.ts';

export default () => {

    useCmd('dance', `Commence dancing`, () => `
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non dapibus lectus. Phasellus venenatis auctor accumsan. Pellentesque arcu justo, consequat non facilisis id, vehicula in libero. Ut mollis arcu nec sem mattis auctor. Cras nisi lorem, fringilla vitae volutpat nec, efficitur blandit elit. Ut eu tempus enim. Aliquam et ante cursus, vehicula ex vel, hendrerit velit. Fusce gravida sapien neque, quis egestas enim congue id. Nam luctus sed tortor at convallis. Nam fringilla nulla non dui dignissim, at cursus metus consequat. Ut commodo purus at massa venenatis, et accumsan orci ornare. Vestibulum quis felis sed nibh lobortis consequat. Quisque porttitor, ipsum vitae mollis aliquam, lectus eros rutrum lorem, finibus sagittis quam dolor ut nibh. Maecenas vestibulum lectus in nisl auctor, tristique porta tortor facilisis.

Etiam molestie, nulla sed imperdiet feugiat, augue est convallis quam, eu imperdiet neque dui at enim. Phasellus tellus turpis, fermentum in vulputate a, convallis et velit. Donec pharetra dolor quis tortor dapibus, sed tristique massa hendrerit. Morbi ac dolor congue, posuere dolor in, vestibulum orci. Nam tincidunt viverra ipsum. Morbi interdum pulvinar diam vitae bibendum. Ut laoreet ornare cursus. Integer eu risus nec orci laoreet convallis. Proin ac elit nunc. Quisque sed blandit ipsum, id blandit diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sem arcu, consectetur non metus non, varius maximus erat. Proin ligula lacus, tincidunt at aliquam quis, posuere nec mi. Integer turpis turpis, ullamcorper laoreet erat in, iaculis bibendum lorem. Maecenas commodo odio eu nunc ultricies, viverra dapibus justo porttitor.
    
    `)

    useCmd('read', `Read the newspaper`, () => {
        
        useState('foo', () => `foobar!`);
        return `
        
Li'l Abner was funny today.

    `})

    useImplicit(['read'], () => {

        useFirst(() => `blah!`);

        return `You did your reading. `
    })

    return `
    
This is a test.
    
    `
}
