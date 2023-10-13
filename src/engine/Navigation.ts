import { contents } from "../contents.ts";
import { useRestricted } from '@infodom';
import { getEnabledLocations, getLocation, setLocation, useData } from "./DataSystem.ts";
import { emptyBuffers, pmsg, postBufferEmpty } from "./Output.ts";
import { info } from "../../Info.ts";
import { useCmd } from "./CommandSystem.ts";
import { appendUniversalCommands } from "./UniversalCommand.ts";
import { VerifyCheckType } from "./VerifyCheckType.ts";


let listing: {[index: string]: [
    string,
    keyof typeof contents,
    VerifyCheckType?
]} = {};
let ignoreUseCommand = false;
let headerTitleBuffer: (keyof typeof contents) | undefined;


export function getIgnoreUseCommand() {
    return ignoreUseCommand;
}


export function useHeading(headingContent: string, verify?: VerifyCheckType) {
    if (headerTitleBuffer) {
        listing[headerTitleBuffer] = [
            headingContent,
            headerTitleBuffer,
            verify
        ];
    }
}


export function gameOver(epitaph: string, message: string) {
    
    useRestricted(['whoops']);
    const deathMsg = info.deathMsg();
    
    return `

${message}

## ${epitaph}

${deathMsg}

    `;
}


export function sendTo(dest: keyof typeof contents) {

    emptyBuffers();
    setLocation(dest);
    const c = contents[dest]();
    appendUniversalCommands();
    refreshLocationCommands();
    if (postBufferEmpty()) {
        pmsg(c);
    }

}


export function lookAround() {

    const l = getLocation();
    const c = contents[l]();
    if (postBufferEmpty()) {
        pmsg(c);
    }

}


export function refreshLocationCommands() {
    listing = {};
    let k: keyof typeof contents;
    ignoreUseCommand = true;
    for (k in contents) {
        headerTitleBuffer = k;
        contents[k]();
    }
    ignoreUseCommand = false;
    const enabled = getEnabledLocations();
    useCmd('places', 'Where can I go?', () => getLocationsList().join(', '));
    for (const k in listing) {
        const [preview, code, verify] = listing[k];
        const destination = code.toLocaleLowerCase();
        if (enabled[destination]) {
            if (verify) {
                const data = useData();
                const v = verify(data);
                if (v === true) {
                    useCmd(destination, preview, () => sendTo(code));
                } else {
                    if (typeof v === 'string') {
                        useCmd(destination, preview, () => v);
                    }
                }
            } else {
                useCmd(destination, preview, () => sendTo(code));
            }
        }
    }
}


export function getLocationsList() {
    const l = getEnabledLocations();
    return Object.keys(l).map(x => x.replaceAll('_', ' '));
}


export function enableLocation(location: keyof typeof contents) {
    const l = getEnabledLocations();
    const lwr = location.toLocaleLowerCase();
    l[lwr] = true;
}
