import { CommandType } from "./types/CommandType.ts";


let commands: CommandType[] = [];
let lastCommandSymbol = '';

export function getCommandList() {
    return commands;
}

export function getLastCommandSymbol() {
    return lastCommandSymbol;
}

export function clearAllCommands() {
    commands = [];
}

function fixArrows(c: CommandType) {
    if (c.id.indexOf('arrow') > -1) {
        c.id = c.id.replace('arrow', '');
    }
}


export function hookUseCommand(
    id: string,
    preview: string,
    callback: () => void | string
) {
    const c = {
        id,
        preview,
        callback: () => {
            lastCommandSymbol = id;
            return callback();
        }
    }
    fixArrows(c);
    commands = [...commands, c];
}


export function hookUseNavCommand(
    id: string,
    preview: string,
    callback: () => void | string
) {
    const c: CommandType = {
        id,
        preview,
        callback: () => {
            lastCommandSymbol = id;
            return callback();
        },
        options: {
            navigation: true
        },
    }
    fixArrows(c);
    commands = [...commands, c];
}


export function hookUseTopicCommand(
    id: string,
    preview: string,
    callback: () => void | string
) {
    const c: CommandType = {
        id,
        preview,
        callback: () => {
            lastCommandSymbol = id;
            return callback();
        },
        options: {
            topic: true
        },
    }
    fixArrows(c);
    commands = [...commands, c];
}
