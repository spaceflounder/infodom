import { contents } from "../../story/contents.ts";

export type GameInfoType = {
    title: string;
    author?: string;
    authorEmail: string;
    firstRoom: keyof typeof contents;
};