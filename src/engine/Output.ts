
import { MarkPrint } from "./Mark.ts";


// buffer of items awaiting display to next display dump.
// imp Buffer is used for implicit action display
// buffer is used for standard action output
// post is used for place location desc display
let impBuffer = '';
let buffer = '';
let postBuffer = '';
let commandPreview = '';


/**
 *
 * Add message to implicit buffer. Will not display until next display dump.
 *
 */
export function imsg(content: string) {
    impBuffer = content;
}


/**
 *
 * Add message to buffer. Will not display until next display dump.
 *
 */
export function bmsg(content: string) {
    buffer = content;
}


/**
 *
 * Add message to post-movement buffer.
 * Will not display until next display dump, but only after primary buffer is
 * empty.
 *
 */
export function pmsg(content: string) {
    postBuffer = content;
}


export function impBufferEmpty() {
    return impBuffer === '';
}


export function displayBufferEmpty() {
    return buffer === '';
}


export function allBuffersEmpty() {
    return (postBuffer === '' &&
        buffer === '' &&
        impBuffer === '');
}


export function postBufferEmpty() {
    return postBuffer === '';
}


export function emptyBuffers() {
    impBuffer = '';
    buffer = '';
    postBuffer = '';
}


export function clearPostBuffer() {
    postBuffer = '';
}


export function setCommandPreview(p: string) {
    commandPreview = p;
}


function getPendingContent() {
    if (buffer === '') {
        buffer = postBuffer;
    }
    postBuffer = '';
    return `
        ${impBuffer}
        ${buffer}
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
    impBuffer = '';
    buffer = '';
    postBuffer = '';
    p.innerHTML = '';
    e.append(div);
    const position = div.getBoundingClientRect();
    window.scrollTo(0, position.top + window.scrollY);

}
