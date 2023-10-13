
/* Place synonyms in this listing for keywords. By default, ? is a
 * synonym for the Help command.
 */

import { synonymTableType } from "./src/engine/SynonymTableType.ts";


export const synonymTable: synonymTableType = {
    "help": ["?"],
    "score": ["$"],
    "examine": ["x"],
}
