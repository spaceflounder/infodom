import { useCmd, useHeading } from "@infodom";


export default () => {

    useHeading(`In the Meadow`);

    useCmd('listen', `Listen to the Creek`, () => `
    

    
    `)

    return `
    
Flowers dot a low plane of pale grass. You can hear the gentle rush of a
:kbd[creek] nearby, and just beyond is a dense :kbd[forest]. Up along a bit
of trail is a small stucco :kbd[cottage].
    
    `

}
