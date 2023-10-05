import { useData } from "@infodom";

export default () => {

    const d = useData();
    d.meadow = true;
    d.forest = true;

    return `

A gentle bit of creek winds through a soft patch of grass. From here you can see
a lovely :kbd[meadow] and a :kbd[forest].

    `

}
