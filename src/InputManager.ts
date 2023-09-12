import { clearAllCommands, getCommandList } from "./Commands.ts";
import { MarkPrint } from "./Mark.ts";
import { displayOutput } from "./OutputManager.ts";
import { CommandType } from "./types/CommandType.ts";


let commandStack = '';


const arrows: { [key: string]: string }  = {
    'up': '<span class="material-symbols-rounded">expand_less</span>',
    'down': '<span class="material-symbols-rounded">expand_more</span>',
    'left': '<span class="material-symbols-rounded">chevron_left</span>',
    'right': '<span class="material-symbols-rounded">chevron_right</span>',
};


function isNavCommand(c: CommandType) {
    return (c.options?.navigation) ? true : false;
}


function isArrowKey(c: CommandType) {
    return (arrows[c.id]) ? true : false;
}


function isTopicCommand(c: CommandType) {
    return (c.options?.topic) ? true : false;
}


function createCommandKey(c: CommandType) {
    const element = document.createElement('div');
    const inner = document.createElement('div');
    const k = c.id;
    if (isTopicCommand(c)) {
        const second = document.createElement('div');
        const first = document.createElement('div');
        second.className = 'command-key';
        first.className = 'command-key';
        second.innerHTML = `<span class="material-symbols-rounded">chat</span>`;
        first.innerHTML = `${k}`;
        inner.className = 'inner-key-wrapper';
        inner.append(second);
        inner.append(first);
    }
    else if (isArrowKey(c)) {
        inner.innerHTML = arrows[k];
        inner.className = 'command-key';
    }
    else {
        inner.innerText = k;
        inner.className = 'command-key';
    }
    element.className = 'command-key-wrapper';
    element.append(inner);
    return element;
}


function createCommandPreview(p: string) {
    const element = document.createElement('div');
    element.className = 'command-preview';
    element.innerHTML = MarkPrint(p);
    return element;
}


function createCommandWipe(c: CommandType) {
    const element = document.createElement('button');
    const k = createCommandKey(c);
    const p = createCommandPreview(c.preview);
    element.className = 'command-wrapper-wipe';
    element.append(k);
    element.append(p);
    return element;
}


function createCommandFade(c: CommandType, index: number) {
    const element = document.createElement('button');
    const k = createCommandKey(c);
    const p = createCommandPreview(c.preview);
    index += 1;
    const sec = (index * 100) + 500;
    element.className = 'command-wrapper-fade';
    element.style.animationDuration = `${sec}ms`;
    element.append(k);
    element.append(p);
    return element;
}


function executeCommand(c: CommandType) {

    wipeAnimation();
    
    setTimeout(() => {
        const content = c.callback();
        if (content) {
            displayOutput(content);
        }
       fadeAnimation();
       setTimeout(() => {
          refreshInputManager();
       }, 2000);
    }, 490);
    
}



function createCommandButton(c: CommandType) {
    const element = document.createElement('button');
    element.className = 'command-wrapper';
    const k = createCommandKey(c);
    const p = createCommandPreview(c.preview);
    element.onclick = () => executeCommand(c);
    element.append(k);
    element.append(p);
    return element;
}


export function refreshInputManager() {
    const commands = getCommandList();
    const element = document.
        querySelector<HTMLDivElement>('#input-manager-wrapper')!;
    const upperRow = document.createElement('div');
    const lowerRow = document.createElement('div');
    const navigationButtons = commands.
        filter(c => isNavCommand(c)).
        map(c => createCommandButton(c));
    const actionButtons = commands.
        filter(c => !isNavCommand(c)).
        map(c => createCommandButton(c));
    upperRow.className = 'input-upper-manager-row';
    lowerRow.className = 'input-lower-manager-row';
    element.innerHTML = '';
    actionButtons.map(b => upperRow.appendChild(b));
    navigationButtons.map(b => lowerRow.appendChild(b));
    element.append(upperRow);
    element.append(lowerRow);
}



export function fadeAnimation() {
    const commands = getCommandList();
    const element = document.
        querySelector<HTMLDivElement>('#input-manager-wrapper')!;
    const upperRow = document.createElement('div');
    const lowerRow = document.createElement('div');
    const navigationButtons = commands.
        filter(c => isNavCommand(c)).
        map((c, index) => createCommandFade(c, index));
    const actionButtons = commands.
        filter(c => !isNavCommand(c)).
        map((c, index) => createCommandFade(c, index));
    upperRow.className = 'input-upper-anim-row';
    lowerRow.className = 'input-lower-anim-row';
    element.innerHTML = '';
    actionButtons.map(b => upperRow.appendChild(b));
    navigationButtons.map(b => lowerRow.appendChild(b));
    element.append(upperRow);
    element.append(lowerRow);
}


export function wipeAnimation() {
    const commands = getCommandList();
    const element = document.
        querySelector<HTMLDivElement>('#input-manager-wrapper')!;
    const upperRow = document.createElement('div');
    const lowerRow = document.createElement('div');
    const navigationButtons = commands.
        filter(c => isNavCommand(c)).
        map(c => createCommandWipe(c));
    const actionButtons = commands.
        filter(c => !isNavCommand(c)).
        map(c => createCommandWipe(c));
    upperRow.className = 'input-upper-anim-row';
    lowerRow.className = 'input-lower-anim-row';
    element.innerHTML = '';
    actionButtons.map(b => upperRow.appendChild(b));
    navigationButtons.map(b => lowerRow.appendChild(b));
    element.append(upperRow);
    element.append(lowerRow);
}



function processKey(c: string) {
    c = c.toLocaleLowerCase();
    c = c.trim();
    c = c.replace('arrow', '');
    return c;
}


export function setupInputManager() {
    document.addEventListener('keyup', e => {
        const key = processKey(e.key);
        const commands = getCommandList();
        for (const c of commands) {
            if (c.id === key) {
                executeCommand(c);
                return;
            }
        }
    });
}
  