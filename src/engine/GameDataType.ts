// deno-lint-ignore-file no-explicit-any

import { contents } from '../contents.ts';

export type GameDataType = {
    location: keyof typeof contents;
    timerTracker: any,
    visitTracker: any,
    stateTracker: any,
    listTracker: any,
    implicitTracker: any,
    data: any;
}
