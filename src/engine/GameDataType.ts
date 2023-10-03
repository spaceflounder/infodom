// deno-lint-ignore-file no-explicit-any

import { contents } from '../contents.ts';

export type GameDataType = {
    location: keyof typeof contents;
    visitTracker: any,
    stateTracker: any,
    data: any;
}
