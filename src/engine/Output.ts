
import { MarkPrint } from "./Mark";

// buffer of items awaiting display to next display dump.
let buffer: string[] = [];


/**
 *
 * Add message to buffer. Will not display until next display dump.
 *
 */
export function bmsg(content: string) {

    content = MarkPrint(content);
    buffer = [...buffer, content];
    
}


/**
 * dump()
 *
 * Dump content to the screen.
 */
export function dump(content: string) {

    const e = document.getElementById('output')!;
    const p = document.getElementById('preview')!;
    const div = document.createElement('div');
    div.className = 'main';
    div.append(buffer.join('\n'));
    buffer = [];
    p.innerHTML = '';
    e.append(div);
    const position = div.getBoundingClientRect();
    window.scrollTo(0, position.top + window.scrollY);

}
