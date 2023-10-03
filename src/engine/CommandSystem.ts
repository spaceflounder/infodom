import { CommandType } from "./CommandType.ts";
import { stringSimilarity } from "./FuzzyStringCompare.ts";
import synonymTable from "../../synonymTable.js";
import { info } from "../../Info.ts";

let implicitTriggers: string[] = [];
let implicitAction: (() => string | void) | undefined = undefined;
let commands: CommandType[] = [];

export function cleanKeyword(s: string) {
    return s.replace(/\s/g, "").toLocaleLowerCase();
}


function getHelpCommand(): CommandType {
    return {
        keyword: 'help',
        preview: 'Help',
        action: () => info.helpText
    }
}


export function clearCommandBuffer() {
    commands = [getHelpCommand()];
    implicitTriggers = [];
    implicitAction = undefined;
}


export function useImplicit(commands: string[], action: () => string | undefined) {
    implicitTriggers = commands;
    implicitAction = action;
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
    return stringSimilarity(s1, s2) > 0.55;

}


export function getPreviewByKeyword(keyword: string) {

    const c = commands.filter(x => fuzzyKeyCompare(x.keyword, keyword));
    if (c.length > 0) {
        return c[0].preview;
    }
    return undefined;

}


export function getActionByKeyword(keyword: string) {
    
    const c = commands.filter(x => fuzzyKeyCompare(x.keyword, keyword));
    if (c.length > 0) {
        return c[0].action;
    }
    return undefined;

}


/**
 * 
 * Add command to current command context.
 * @param {string} keyword - Primary keyword to trigger command.
 * @param {string} preview - Command preview to display before action.
 * @param {function} action - Action to execute for this command.
 * 
 */
export function useCmd(keyword: string, preview: string, action: () => string) {

    const cmd: CommandType = {
        keyword: cleanKeyword(keyword),
        preview,
        action
    }
    commands = commands.filter(x => x.keyword !== keyword);
    commands = [...commands, cmd];

}

