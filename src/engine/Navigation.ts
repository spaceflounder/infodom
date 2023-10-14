
import { contents } from "../contents.ts";
import { useRestricted } from '@infodom';
import { getEnabledLocations, getLocation, setLocation } from "./DataSystem.ts";
import { emptyBuffers, pmsg, postBufferEmpty, setSilentMode } from "./Output.ts";
import { info } from "../../Info.ts";
import { useCmd, useData } from "@infodom";
import { appendUniversalCommands } from "./UniversalCommand.ts";
import { VerifyCheckType } from "./VerifyCheckType.ts";


type locationType = keyof typeof contents;

let listing: {[index: string]: [
    string,
    locationType,
    VerifyCheckType?
]} = {};
let ignoreUseCommand = false;
let headerTitleBuffer: (locationType) | undefined;


export function getIgnoreUseCommand() {
    return ignoreUseCommand;
}


export function setIgnoreUseCommand(b: boolean) {
    ignoreUseCommand = b;
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


export function movePlayerToPlace(dest: keyof typeof contents) {

    emptyBuffers();
    setLocation(dest);
    const c = contents[dest]();
    appendUniversalCommands();
    refreshLocationCommands();
    if (postBufferEmpty() && c) {
        setSilentMode(false);
        pmsg(c);
        setSilentMode(true);
    }

}


export function lookAround() {

    const l = getLocation();
    const c = contents[l]();
    if (postBufferEmpty() && c) {
        setSilentMode(false);
        pmsg(c);
        setSilentMode(true);
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
    useCmd('places', 'Where can I go?', () => `
You could type:

${getLocationsList().join(', ')}

`);
    for (const k in listing) {
        const [preview, code, verify] = listing[k];
        const destination = code.toLocaleLowerCase();
        const currentLocation = getLocation();
        if (enabled[destination] && k !== currentLocation) {
            if (verify) {
                const data = useData();
                const v = verify(data);
                if (v === true) {
                    useCmd(destination, preview, () => movePlayerToPlace(code));
                } else {
                    if (typeof v === 'string') {
                        useCmd(destination, preview, () => v);
                    }
                }
            } else {
                useCmd(destination, preview, () => movePlayerToPlace(code));
            }
        }
    }
}


export function getLocationsList() {
    const l = getEnabledLocations();
    const currentLocation = getLocation();
    return Object.keys(l).
        filter(x => x.toLocaleLowerCase() !== currentLocation.toLocaleLowerCase()).
        map(x => `:kbd[${x.replaceAll('_', ' ')}]`);
}


export function enableLocation(location: locationType | locationType[]) {
    if (!ignoreUseCommand) {
        const l = getEnabledLocations();
        if (typeof location === 'string') {
            const lwr = location.toLocaleLowerCase();
            l[lwr] = true;    
        } else {
            location.map(l => enableLocation(l));
        }
    }
}
