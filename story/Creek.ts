import { openPlace, setTimer, useCmd, usePlace, useState, useTimer } from "@infodom";

export default () => {

    usePlace(`By the Creek`);

    openPlace([
        'Creek',
        'Meadow',
        'Forest',
    ]);

    useTimer('danceTimer', () => `That dance paid off!`)


    useCmd('dance', `Dance about`, () => {
    
        setTimer('danceTimer', 1);
    
    return `
    
My but we're jolly.
    
    `})


    return `

A gentle bit of creek winds through a soft patch of grass. From here you can see
a lovely :kbd[meadow] and a :kbd[forest].

    `

}
