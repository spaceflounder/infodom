
import { MarkPrint } from "./Mark.ts";


// buffer of items awaiting display to next display dump.
let impBuffer: string[] = [];
let buffer: string[] = [];
let postBuffer: string[] = [];
let commandPreview = '';


/**
 *
 * Add message to implicit buffer. Will not display until next display dump.
 *
 */
export function imsg(content: string) {
    impBuffer = [...impBuffer, content];
}


/**
 *
 * Add message to buffer. Will not display until next display dump.
 *
 */
export function bmsg(content: string) {
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


function getPendingContent() {
    return `
        ${impBuffer.join('')}
        ${buffer.join('')}
        ${postBuffer.join('')}
    `;
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
    const content = getPendingContent();
    const t = MarkPrint(content);
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
