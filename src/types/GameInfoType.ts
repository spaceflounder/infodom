import { contents } from "../contents.ts";

export type GameInfoType = {
    title: string;
    author?: string;
    authorEmail: string;
    firstRoom: keyof typeof contents;
};
