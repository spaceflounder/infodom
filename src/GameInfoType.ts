import { contents } from "./contents.ts";

export type GameInfoType = {
    title: string;
    helpText: string;
    firstLocation: keyof typeof contents;
}
