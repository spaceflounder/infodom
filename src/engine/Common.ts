
import { info } from "../../Info.ts";
import { useCmd } from "./CommandSystem.ts";


export function setCommonDefaultResponse() {

    const commands = info.commonCommands;
    for (const cmd in commands) {
        const [preview, response] = commands[cmd];
        useCmd(cmd, preview, response);
    }
    
}

