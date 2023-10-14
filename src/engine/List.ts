import { getListTracker } from "./DataSystem.ts";
import { stringToHash } from "./Hash.ts";
import { shuffle } from "./Scrambler.ts";


/**
 * Get one random element of an array.
 * @param {Array} arr Array to pick from.
 * @returns {string} Random element of array.
 */
export function shuffleStringArrayAndGetFirst(arr: string[]): string {
    const newArr = [...arr]
    const shuffled = shuffle(newArr)
    return shuffled.at(0);
}



export function retrieveContentInStopStringArray(array: string[]) {

    const first = array[0] ?? 'first string';
    const listTracker = getListTracker();
    const h = stringToHash(first);
    if (!listTracker[h]) {
        listTracker[h] = 1;
        return array[0];
    } else {
        const i: number = listTracker[h];
        if (i < array.length - 1) {
            listTracker[h] += 1;
        }
        return array[i];
    }

}
