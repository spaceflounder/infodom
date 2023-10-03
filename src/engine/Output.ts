
import { getVisitTracker, getMarker } from "./DataSystem.ts";
import { MarkPrint } from "./Mark.ts";

// buffer of items awaiting display to next display dump.
let impBuffer: string[] = [];
let buffer: string[] = [];
let postBuffer: string[] = [];
let firstBuffer = '';
let commandPreview = '';


export function useFirst(content: () => string) {

    const visitTracker = getVisitTracker();
    const m = getMarker();
    const f = visitTracker[m] ?? 0;
    if (f === 0) {
        const c = content();
        firstBuffer = c;
        visitTracker[m] = 1;
    } else {
        visitTracker[m] += 1;
    }

}


/**
 *
 * Add message to implicit buffer. Will not display until next display dump.
 *
 */
export function imsg(content: string) {

    if (firstBuffer !== '') {
        content = firstBuffer;
        firstBuffer = '';
    }
    impBuffer = [...impBuffer, content];
    
}


/**
 *
 * Add message to buffer. Will not display until next display dump.
 *
 */
export function bmsg(content: string) {

    if (firstBuffer !== '') {
        content = firstBuffer;
        firstBuffer = '';
    }
    buffer = [...buffer, content];
    
}


/**
 *
 * Add message to post-movement buffer.
 * Will not display until next display dump, but only after primary buffer is
 * empty.
 *
 */
export function pmsg(content: string) {

    if (firstBuffer !== '') {
        content = firstBuffer;
        firstBuffer = '';
    }
    postBuffer = [...postBuffer, content];
    
}


export function impBufferEmpty() {
    return impBuffer.length === 0;
}


export function displayBufferEmpty() {
    return buffer.length === 0;
}


export function postBufferEmpty() {
    return postBuffer.length === 0;
}


export function setCommandPreview(p: string) {
    commandPreview = p;
}


/**
 * dump()
 *
 * Dump content to the screen.
 */
export function dump() {

    const e = document.getElementById('output')!;
    const p = document.getElementById('preview')!;
    const div = document.createElement('div');
    const commandHeader = document.createElement('h3');
    div.className = 'main';
    if (commandPreview !== '') {
        commandHeader.innerHTML = commandPreview;
        div.append(commandHeader);
    }
    const t = MarkPrint(impBuffer.join() + buffer.join() + postBuffer.join());
    div.innerHTML += t;
    commandPreview = '';
    impBuffer = [];
    buffer = [];
    postBuffer = [];
    p.innerHTML = '';
    e.append(div);
    const position = div.getBoundingClientRect();
    window.scrollTo(0, position.top + window.scrollY);

}
