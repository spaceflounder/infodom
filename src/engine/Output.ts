
import { getVisitTracker, getMarker } from "./DataSystem.ts";
import { MarkPrint } from "./Mark.ts";

// buffer of items awaiting display to next display dump.
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
        firstBuffer = MarkPrint(c);
        visitTracker[m] = 1;
    } else {
        visitTracker[m] += 1;
    }

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
    } else {
        content = MarkPrint(content);
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
    } else {
        content = MarkPrint(content);
    }
    postBuffer = [...postBuffer, content];
    
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
    div.innerHTML += buffer.join() + postBuffer.join();
    commandPreview = '';
    buffer = [];
    postBuffer = [];
    p.innerHTML = '';
    e.append(div);
    const position = div.getBoundingClientRect();
    window.scrollTo(0, position.top + window.scrollY);

}
