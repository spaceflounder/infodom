import { CommandOptionsType } from "./CommandOptionsType.ts";

export type CommandType = {
    id: string,
    preview: string,
    callback: () => void | string,
    options?: CommandOptionsType,
}
