import { openPlace, usePlace } from "@infodom";

export default () => {

    usePlace(`By the Creek`);

    openPlace([
        'Creek',
        'Meadow',
        'Forest',
    ]);

    return `

A gentle bit of creek winds through a soft patch of grass. From here you can see
a lovely :kbd[meadow] and a :kbd[forest].

    `

}
