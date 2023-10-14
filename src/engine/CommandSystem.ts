
import { CommandType } from "./CommandType.ts";
import { stringSimilarity } from "./FuzzyStringCompare.ts";
import { synonymTable } from "../../synonymTable.ts";
import { getImplicitTracker, getMarker } from "./DataSystem.ts";
import { impBufferEmpty, imsg, setSilentMode } from "./Output.ts";
import { setCommonDefaultResponse } from "./Common.ts";
import { getIgnoreUseCommand } from "./Navigation.ts";


let implicitTriggers: string[] = [];
let implicitAction: (() => string | void) | undefined = undefined;
let commands: CommandType[] = [];
let restricted: string[] = [];
let restrictedErrorMsg = '';


export function cleanKeyword(s: string) {
    return s.replace(/\s/g, "").toLocaleLowerCase();
}


export function printCommands() {
    console.log(commands);
}


export function getOnlyValidCommands(topics: string[]) {
    return commands.
        filter(x => topics.indexOf(x.keyword) > -1).
        map(x => x.keyword);
}


export function clearCommandBuffer() {
    commands = [];
    restricted = [];
    implicitTriggers = [];
    implicitAction = undefined;
    setCommonDefaultResponse();
}



export function addRestrictedKeyCommand(choices: string[], errorMsg?: string) {
    const ignore = getIgnoreUseCommand();
    if (!ignore) {
        restricted = choices;
        if (!errorMsg) {
            restrictedErrorMsg = buildRestrictedContent(true);
        } else {
            restrictedErrorMsg = errorMsg;
        }
    }
}


export function addImplicitKeyCommand(commands: string[], action: () => string | undefined) {
    const ignore = getIgnoreUseCommand();
    if (!ignore) {
        implicitTriggers = commands.map(x => cleanKeyword(x));
        implicitAction = action;    
    }
}


export function checkImplicitCommands(keyword: string) {

    if (restricted.length > 0 && restricted.indexOf(keyword) === -1) {
        return;
    }

    const k = cleanKeyword(keyword);
    const implicitTracker = getImplicitTracker();
    const marker = getMarker(implicitTriggers.join('-'));
    const i = implicitTriggers.indexOf(k);
    if (!implicitTracker[marker]) {
        if (i > -1 && implicitAction) {
            const a = implicitAction();
            implicitTracker[marker] = true;
            if (a && impBufferEmpty()) {
                setSilentMode(false);
                imsg(a);
                setSilentMode(true);
            }
        }
    }

}


function synonymCheck(s: string) {

    let k: keyof typeof synonymTable;
    for (k in synonymTable) {
        const words: string[] = synonymTable[k] ?? [];
        for (const word of words) {
            const w = cleanKeyword(word);
            if (stringSimilarity(s, w) > 0.55) {
                return k;
            }
        }
    }
    return undefined;

}


function fuzzyKeyCompare(s1: string, s2: string) {

    s1 = cleanKeyword(s1);
    s2 = cleanKeyword(s2);
    const possibleSynonym = synonymCheck(s2);
    if (possibleSynonym) {
        s2 = possibleSynonym;
    }
    return stringSimilarity(s1, s2) > 0.6;

}


export function getPreviewByKeyword(keyword: string) {

    const cmp = restricted.map(r => fuzzyKeyCompare(r, keyword)).
    filter(x => x);

    if (cmp.length === 0 && restricted.length > 0) {
        return undefined;
    }

    const c = commands.filter(x => fuzzyKeyCompare(x.keyword, keyword));
    if (c.length > 0) {
        return c[0].preview;
    }
    return undefined;

}


export function getActionByKeyword(keyword: string) {

    const cmp = restricted.map(r => fuzzyKeyCompare(r, keyword)).
        filter(x => x);

    if (cmp.length === 0 && restricted.length > 0) {
        return () => restrictedErrorMsg;
    }

    const c = commands.filter(x => fuzzyKeyCompare(x.keyword, keyword));
    if (c.length > 0) {
        return c[0].action;
    }
    return undefined;

}


export function buildRestrictedContent(useMarkdown = false) {

    const r = restricted.map(x => {
        if (!useMarkdown) {
            return `<kbd>${x}</kbd>`;
        } else {
            return `:kbd[${x}]`;
        }
    }).filter(x => x);
    if (restricted.length === 1) {
        return `You can type ${r.pop()}.`;
    } else if (restricted.length === 2) {
        const last = r.pop();
        const first = r.pop();
        return `You can type ${first} or ${last}.`;
    } else if (restricted.length > 2) {
        const last = r.pop();
        return `You can type ${r.join(', ')} or ${last}.`;
    }
    return ``;

}


/**
 * 
 * Add command to current command context.
 * @param {string} keyword - Primary keyword to trigger command.
 * @param {string} preview - Command preview to display before action.
 * @param {function} action - Action to execute for this command.
 * 
 */
export function addStandardKeyCommand(keyword: string, preview: string, action: () => string | void) {

    const cmd: CommandType = {
        keyword,
        preview,
        action
    };
    const clean = (str: string) => str.toLocaleLowerCase().trim();
    const ignore = getIgnoreUseCommand();
    if (!ignore) {
        commands = commands.filter(x => clean(x.keyword) !== clean(keyword));
        commands = [...commands, cmd];
    }

}

