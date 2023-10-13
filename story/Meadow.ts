import { useCmd, usePlace, openPlace, useCapture, useData } from "@infodom";


export default () => {

    usePlace(`The Lovely Meadow`);
    openPlace('Cottage');

    useCmd('listen', `Listen to the Creek`, () => {
        useCapture({
            'dataKey': 'name',
            errorMsg: `I want a name!`,
            action: () => {

                const data = useData();
                return `
            
Nice to meet you ${data['name']}.
                
                `

            }
        })

        return `
        
Please enter your name.
        
        `
    })

    return `
    
Flowers dot a low plane of pale grass. You can hear the gentle rush of a
:kbd[creek] nearby, and just beyond is a dense :kbd[forest]. Up along a bit
of trail is a small stucco :kbd[cottage].
    
    `

}
