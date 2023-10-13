
import { info } from "../../Info.ts"
import { contents } from "../contents.ts";
import { clearCommandBuffer } from "./CommandSystem.ts";
import { GameDataType } from "./GameDataType.ts"
import { stringToHash } from "./Hash.ts";
import { getIgnoreUseCommand } from "./Navigation.ts";
import { bmsg, clearPostBuffer, emptyBuffers, pmsg } from "./Output.ts";


//let performingNavigation = false;


let data: GameDataType;
let dataKeyBuffer = '';
let captureCallback: (() => void | string) | undefined = undefined;
let captureErr = '';


export function resetData() {
    data = {
        location: info.firstLocation,
        enabledLocations: {},
        timerTracker: {},
        visitTracker: {},
        stateTracker: {},
        listTracker: {},
        implicitTracker: {},
        data: {},    
    }
}


export function useCapture(options: {
    dataKey: string,
    action: () => void | string,
    errorMsg: string,
}) {
    const ignore = getIgnoreUseCommand();
    if (!ignore) {
        dataKeyBuffer = options.dataKey;
        captureCallback = options.action;
        captureErr = options.errorMsg;
    }
}


export function handleCaptureInput(token: string) {
    if (dataKeyBuffer === '') {
        return false;
    } else {
        if (token === '') {
            emptyBuffers();
            bmsg(captureErr);
            return true;
        }
        data.data[dataKeyBuffer] = token;
        dataKeyBuffer = '';
        if (captureCallback) {
            const a = captureCallback();
            emptyBuffers();
            if (a) {
                bmsg(a);
            }
            captureCallback = undefined;
        }
        return true;
    }
}


export function getState(): string {
    const l = data.location;
    return data.stateTracker[l] ?? 'default';
}


export function setState(state: string, location?: keyof typeof contents) {
    const l = location ?? data.location;
    data.stateTracker[l] = state;
    contents[l]();
    clearPostBuffer();
}


export function useState(state: string, action: () => string | void) {
    const currentState = getState();
    const ignore = getIgnoreUseCommand();
    if (currentState === state) {
        const a = action();
        if (a) {
            if (!ignore) {
                pmsg(a);
            }
        }
    }
}


export function getMarker(v = '') {
    const l = data.location;
    const s = getState();
    return stringToHash(`${l}-${s}-${v}`);
}


export function getLocation() {
    return data.location;
}


export function setLocation(loc: keyof typeof contents) {
    data.location = loc;
    clearCommandBuffer();
    //performingNavigation = true;
}


export function getEnabledLocations() {
    return data.enabledLocations;
}



export function getVisitTracker() {
    return data.visitTracker;
}


export function getImplicitTracker() {
    return data.implicitTracker;
}


export function getTimerTracker() {
    return data.timerTracker;
}


export function getListTracker() {
    return data.listTracker;
}


export function useData() {
    return data.data;
}
