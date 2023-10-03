
import { info } from "../../Info.ts"
import { contents } from "../contents.ts";
import { clearCommandBuffer } from "./CommandSystem.ts";
import { GameDataType } from "./GameDataType.ts"
import { stringToHash } from "./Hash.ts";
import { bmsg, pmsg } from "./Output.ts";


let performingNavigation = false;

let data: GameDataType = {

    location: info.firstLocation,
    visitTracker: {},
    stateTracker: {},
    implicitTracker: {},
    data: {},

}


export function resetData() {
    data = {
        location: info.firstLocation,
        visitTracker: {},
        stateTracker: {},
        implicitTracker: {},
        data: {},    
    }
}


export function getState(): string {
    const l = data.location;
    return data.stateTracker[l] ?? 'default';
}


export function setState(state: string, location?: keyof typeof contents) {
    const l = location ?? data.location;
    data.stateTracker[l] = state;
}


export function useState(state: string, action: () => string | undefined) {
    const currentState = getState();
    if (currentState === state) {
        const a = action();
        if (a) {
            if (performingNavigation) {
                pmsg(a);
            } else {
                bmsg(a);
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
    performingNavigation = true;
}


export function finishPerformingNavigation() {
    performingNavigation = false;
}


export function getVisitTracker() {
    return data.visitTracker;
}


export function getImplicitTracker() {
    return data.implicitTracker;
}


export function useData() {
    return data.data;
}
