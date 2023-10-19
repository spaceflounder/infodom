import { CommandType } from "./types/CommandType.ts";

let returnLocalCommandsOnly = false;
let localCommands: string[] = [];
let restrictedCommands: string[] = [];
let commands: CommandType[] = [];
let lastCommandSymbol = '';

export function getCommandList() {
    if (returnLocalCommandsOnly) {
        return commands.filter(c => localCommands.indexOf(c.id) > -1);
    }
    if (restrictedCommands.length === 0) {
        return commands;
    } else {
        return commands.filter(c => restrictedCommands.indexOf(c.id) > -1);
    }
}

export function getLastCommandSymbol() {
    return lastCommandSymbol;
}

export function clearAllCommands() {
    commands = [];
    restrictedCommands = [];
}


function addLocalCommand(id: string) {
    localCommands.push(id);
}


function fixArrows(c: CommandType) {
    if (c.id.indexOf('arrow') > -1) {
        c.id = c.id.replace('arrow', '');
    }
}


export function hookUseProceed(
    id: string,
    callback: () => void | string
) {
    const c = {
        id,
        preview: '',
        callback,
        options: {
            check: true
        },
    }
    fixArrows(c);
    addLocalCommand(id);
    commands = commands.filter(x => x.id !== c.id);
    commands = [...commands, c];
    /*
<span class="material-symbols-rounded">
check_circle
</span>
    */
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
            returnLocalCommandsOnly = false;
            lastCommandSymbol = id;
            return callback();
        }
    }
    fixArrows(c);
    addLocalCommand(id);
    commands = commands.filter(x => x.id !== c.id);
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
            returnLocalCommandsOnly = false;
            lastCommandSymbol = id;
            return callback();
        },
        options: {
            navigation: true
        },
    }
    fixArrows(c);
    addLocalCommand(id);
    commands = commands.filter(x => x.id !== c.id);
    commands = [...commands, c];
}


export function hookUseRestricted(restricted: string[]) {
    restrictedCommands = restricted;
}


export function hookUseLocal() {
    returnLocalCommandsOnly = true;
    localCommands = [];
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
            returnLocalCommandsOnly = false;
            lastCommandSymbol = id;
            return callback();
        },
        options: {
            topic: true
        },
    }
    fixArrows(c);
    addLocalCommand(id);
    commands = commands.filter(x => x.id !== c.id);
    commands = [...commands, c];
}
