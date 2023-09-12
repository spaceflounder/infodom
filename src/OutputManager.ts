import { contents } from "../story/contents.ts";
import { getLastCommandSymbol } from "./Commands.ts";
import { MarkPrint } from "./Mark.ts";
import { getCurrentRoom } from "./Navigation.ts";


let firstCallback: (() => string) | null = null;
let stateOutput = '';

const firstManager: {[key: string]: boolean} = {}
const stateManager: {[key: string]: string} = {}


export function getState() {
    const r = getCurrentRoom();
    const s = stateManager[r] ?? 'default';
    return s;
}


export function setState(stateName: string, roomName?: keyof typeof contents) {
    const r = roomName ?? getCurrentRoom();
    stateManager[r] = stateName;
}


export function hookUseState(stateName: string, callback: () => string) {
    const st = getState();
    if (st === stateName) {
        stateOutput = callback();
    }
}


export function hookUseFirst(callback: () => string) {
    firstCallback = callback;
}


export function clearOutput() {
    const inner = document.querySelector<HTMLDivElement>('#output-inner')!;
    const output = document.querySelector<HTMLDivElement>('#output-wrapper')!;
    output.innerHTML = '';
    const n = document.createElement('div');
    n.innerHTML = inner.innerHTML;
    n.id = 'output-inner-fadeout';
    output.append(n);
}


export function rebuildDisplay(content: string) {
    const output = document.querySelector<HTMLDivElement>('#output-wrapper')!;
    const n = document.createElement('div');
    output.innerHTML = '';
    n.innerHTML = content;
    n.id = 'output-inner';
    output.append(n);
}



export function refreshOutput() {
    const st = getState();
    const room = getCurrentRoom();
    const addr = `${st}-${room}`;
    clearOutput();
    let content = contents[room]();
    if (stateOutput !== '') {
        content = stateOutput;
        stateOutput = '';
    }
    if (firstCallback !== null && !firstManager[addr]) {
        firstManager[addr] = true;
        content = firstCallback();
        firstCallback = null;
    }
    content = MarkPrint(content);
    rebuildDisplay(content);
}


export function displayOutput(content: string) {
    const st = getState();
    const room = getCurrentRoom();
    const sym = getLastCommandSymbol();
    const addr = `${room}-${st}-${sym}`;
    clearOutput();
    if (stateOutput !== '') {
        content = stateOutput;
        stateOutput = '';
    }
    if (firstCallback !== null && !firstManager[addr]) {
        firstManager[addr] = true;
        content = firstCallback();
        firstCallback = null;
    }
    content = MarkPrint(content);
    setTimeout(() => {
        rebuildDisplay(content);
    }, 400);
}
