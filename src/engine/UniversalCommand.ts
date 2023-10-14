// deno-lint-ignore-file no-explicit-any
import { contents } from "../contents.ts";
import { useCmd, useData, sendTo } from "@infodom";
import { VerifyCheckType } from "./VerifyCheckType.ts";


type ContentKey = keyof typeof contents;
type CommandActionType = ((data: any) => void | string) | ContentKey;
type UniversalCommandType = {
    keyword: string,
    verify?: VerifyCheckType,
    preview: string,
    action: CommandActionType
};

let commands: UniversalCommandType[] = [];


export function appendUniversalCommands() {
    const data = useData();
    commands.map(c => {
        const createCommand = () => {
            useCmd(c.keyword, c.preview, () => {
                if (typeof c.action === 'string') {
                    sendTo(c.action);
                } else {
                    const a = c.action(data);
                    return a;
                }
            });        
        }
        if (!c.verify) {
            createCommand();
        } else {
            const verify = c.verify(data);
            if (typeof verify === 'string') {
                useCmd(c.keyword, c.preview, () => verify);
            } else if (verify === true) {
                createCommand();
            }
        }
    });
}


export function addUniversalKeyCommand(cmd: UniversalCommandType) {
    const keyword = cmd.keyword;
    commands = commands.filter(x => x.keyword !== keyword);
    commands = [...commands, cmd];
}
