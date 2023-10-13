import { useLocation, useHeading } from "@infodom";

export default () => {

    useHeading(`By the Creek`);

    useLocation('Creek');
    useLocation('Meadow');
    useLocation('Forest');



    return `

A gentle bit of creek winds through a soft patch of grass. From here you can see
a lovely :kbd[meadow] and a :kbd[forest].

    `

}
