
export type CommandType = {
    keyword: string,
    preview: string,
    action: () => string | void,
}
