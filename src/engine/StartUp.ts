
import { info } from '../../Info.ts';
import universalListing from '../../universalListing.ts';
import { contents } from "../contents.ts";
import { checkImplicitCommands, cleanKeyword, clearCommandBuffer, getActionByKeyword, getPreviewByKeyword } from './CommandSystem.ts';
import { getLocation } from './DataSystem.ts';
import { sendTo } from './Navigation.ts';
import { bmsg, dump, setCommandPreview } from "./Output.ts";
import { handleTimers } from './TimerSystem.ts';


function beginGame() {

    const e = document.getElementById('output')!;
    const f = document.getElementById('entry-form')!;
    e.innerHTML = '';
    universalListing();
    sendTo(info.firstLocation);
    dump();
    f.onsubmit = ev => {
        ev.preventDefault();
        const i = <HTMLInputElement>document.getElementById('command-line')!;
        const k = cleanKeyword(i.value);
        const action = getActionByKeyword(k);
        if (action) {
            handleTimers();
            checkImplicitCommands(k);
            const location = getLocation();
            clearCommandBuffer();
            contents[location]();
            const preview = getPreviewByKeyword(k);
            const result = action();
            if (preview) {
                setCommandPreview(preview);
            }
            if (result) {
                bmsg(result);
            }
            dump();
            i.value = '';
        }
    };

}



export function start() {
    
    let lastPreview = '';

    function watchInput() {

        const e = document.getElementById('preview')!;
        const f = <HTMLInputElement>document.getElementById('command-line')!;
        const k = cleanKeyword(f.value);
        const preview = getPreviewByKeyword(k);
        if (preview) {
            if (lastPreview !== preview) {
                e.innerText = '';
                const div = document.createElement('div');
                lastPreview = preview;
                div.className = 'preview-content';
                div.append(preview);
                e.append(div);
            }
        } else {
            e.innerText = '';
            lastPreview = '';
        }

    }


    /* at program start, run loadsys and first page */
    addEventListener('load', () => {

        document.title = info.title;
        //useGlobalCmd('help', `Help`, () => book[info.helpPage]());
        beginGame();
        setInterval(() => {
            watchInput();
        }, 100);

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
