import { useUniversal } from "@infodom";
import { lookAround } from "./src/engine/Navigation.ts";
import { getLocation, useData } from "./src/engine/DataSystem.ts";
import { executeScoreCommand } from "./src/GameFunctions.ts";

export default () => {

    useUniversal({
        keyword: 'start',
        preview: 'By the Creek',
        action: 'Start',
    })


    useUniversal({
        keyword: 'score',
        preview: 'Score',
        action: () => executeScoreCommand(),
    })


    useUniversal({
        keyword: 'meadow',
        preview: 'A Lovely Meadow',
        verify: () => {
            const d = useData();
            return (d.meadow) ? true : false;
        },
        action: 'Meadow'
    })


    useUniversal({
        keyword: 'forest',
        preview: 'The Dense Forest',
        verify: () => {
            const d = useData();
            return (d.forest) ? true : false;
        },
        action: 'Forest'
    })


    useUniversal({
        keyword: 'cottage',
        preview: 'In the Cottage',
        verify: () => {
            const d = useData();
            return (d.cottage) ? true : false;
        },
        action: 'Cottage'
    })


    useUniversal({
        keyword: 'cave',
        preview: 'At the Cave Mouth',
        verify: () => {
            const d = useData();
            return (d.cave) ? true : false;
        },
        action: 'Cave'
    })


    useUniversal({
        keyword: 'look',
        preview: 'Look Around',
        verify: () => {
            const l = getLocation();
            if (l === 'Intro') {
                return false;
            }
            return true;
        },
        action: () => lookAround()
    })
    
}
