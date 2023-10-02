import { CommandType } from "./CommandType";
import { stringSimilarity } from "./FuzzyStringCompare";


let commands: CommandType[] = [];
let synonyms = new Map<string, string[]>();

function clean(s: string) {
    return s.replace(/\s/g, "").toLocaleLowerCase();
}


function synonymCheck(s: string) {

    for (const k of synonyms.keys()) {
        const words = synonyms.get(k) ?? [];
        for (const word of words) {
            let w = clean(word);
            if (stringSimilarity(s, w) > 0.55) {
                return k;
            }
        }
    }
    return undefined;

}


function fuzzyKeyCompare(s1: string, s2: string) {

    s1 = clean(s1);
    s2 = clean(s2);
    const possibleSynonym = synonymCheck(s2);
    if (possibleSynonym) {
        s2 = possibleSynonym;
    }
    return stringSimilarity(s1, s2) > 0.55;

}


export function addSynonym(keyword: string, word: string) {

    let words = synonyms.get(clean(keyword)) ?? [];
    words = [...new Set([...words, clean(word)])];
    synonyms.set(clean(keyword), words);

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


export function useCmd(keyword: string, preview: string, action: () => void) {

    const cmd: CommandType = {
        keyword,
        preview,
        action
    }

}

