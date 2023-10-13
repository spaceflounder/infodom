import { useUniversal } from "@infodom";
import { executeScoreCommand } from "./src/GameFunctions.ts";
import { info } from "./Info.ts";

export default () => {

    useUniversal({
        keyword: 'score',
        preview: 'Score',
        action: () => executeScoreCommand(),
    })

    useUniversal({
        keyword: 'help',
        preview: 'Help',
        action: () => info.helpText(),
    })
    
}
