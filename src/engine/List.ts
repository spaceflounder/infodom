import { getListTracker } from "./DataSystem.ts";
import { stringToHash } from "./Hash.ts";


export function useStopList(array: string[]) {

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
