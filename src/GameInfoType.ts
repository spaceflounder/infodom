import { contents } from "./contents.ts";

export type GameInfoType = {
    title: string;
    helpText: () => string;
    firstLocation: keyof typeof contents;
    deathMsg: () => string,
    commonCommands: { [index: string]: [string, () => string | void]};
}
