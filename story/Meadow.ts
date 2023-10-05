import { useCmd, useData } from "@infodom";


export default () => {

    const d = useData();
    d.cottage = true;

    useCmd('listen', `Listen to the Creek`, () => `
    

    
    `)

    return `
    
Flowers dot a low plane of pale grass. You can hear the gentle rush of a
:kbd[creek] nearby, and just beyond is a dense :kbd[forest]. Up along a bit
of trail is a small stucco :kbd[cottage].
    
    `

}
