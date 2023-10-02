
import { info } from '../../info';

/**
 * loadsys()
 *
 * Load game systems.
 */
function loadSys() {

    const e = document.getElementById('output')!;
    const f = document.getElementById('entry-form')!;
    e.innerHTML = '';
    f.onsubmit = ev => {
        ev.preventDefault();
        const i = <HTMLInputElement>document.getElementById('command-line')!;
    };

}



export function start() {
    
    function watchInput() {

        const e = document.getElementById('preview')!;
        const f = <HTMLInputElement>document.getElementById('command-line')!;
        const c = f.value;
        /*
        if (commands[c]) {
            const pre = commands[c][0];
            if (pre && lastPreview !== pre) {
                e.innerText = '';
                const div = document.createElement('div');
                lastPreview = pre;
                div.className = 'preview-content';
                div.append(pre);
                e.append(div);
            }
        } else {
            e.innerText = '';
            lastPreview = '';
        }
        */
        setTimeout(() => {
            watchInput();
        }, 100);

    }


    /* at program start, run loadsys and first page */
    addEventListener('load', () => {

        document.title = info.title;
        //useGlobalCmd('help', `Help`, () => book[info.helpPage]());
        loadSys();
        watchInput();
        //dump(sendTo(info.firstPage));

    });


    addEventListener('keyup', ev => {

        const alpha = 'abcdefghijklmonpqrstuvwxyz';
        const input = <HTMLInputElement>document.getElementById('command-line');
        const key = ev.key.toLowerCase();
        if (key === 'arrowup') {
            window.scrollTo(0, window.scrollY - 50);
        } else if (key === 'arrowdown') {
            window.scrollTo(0, window.scrollY + 50);
        } else if (input && document.activeElement !== input) {
            if (alpha.indexOf(key) > -1) {
                input.value += key;
            }
            input.focus();
        }

    });  


}
