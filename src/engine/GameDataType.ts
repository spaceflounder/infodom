// deno-lint-ignore-file no-explicit-any

import { contents } from '../contents.ts';

export type GameDataType = {
    location: keyof typeof contents;
    enabledLocations: {[index: string]: boolean | undefined};
    timerTracker: any;
    visitTracker: any;
    stateTracker: any;
    listTracker: any;
    implicitTracker: any;
    data: any;
}
