import { getCommandList } from "./Commands.ts";
import { detectMobile } from "./DetectMobile.ts";
import { MarkPrint } from "./Mark.ts";
import { displayOutput } from "./OutputManager.ts";
import { CommandType } from "./types/CommandType.ts";


let permitInput = true;


const graphic: { [key: string]: string }  = {
    'w': '<span class="material-symbols-rounded">arrow_upward_alt</span>',
    's': '<span class="material-symbols-rounded">arrow_downward_alt</span>',
    'a': '<span class="material-symbols-rounded">arrow_left_alt</span>',
    'd': '<span class="material-symbols-rounded">arrow_right_alt</span>',
    '1': '<span class="material-symbols-rounded">chat</span>',
    '2': '<span class="material-symbols-rounded">chat</span>',
    '3': '<span class="material-symbols-rounded">chat</span>',
    '4': '<span class="material-symbols-rounded">chat</span>',
    '5': '<span class="material-symbols-rounded">chat</span>',
    '6': '<span class="material-symbols-rounded">chat</span>',
    '7': '<span class="material-symbols-rounded">chat</span>',
    '8': '<span class="material-symbols-rounded">chat</span>',
    '9': '<span class="material-symbols-rounded">chat</span>',
    'z': `<span class="material-symbols-rounded">check_circle</span>`,
    'c': `<span class="material-symbols-rounded">keyboard_return</span>`,
    '!': `<span class="material-symbols-rounded">info</span>`,
    '@': `<span class="material-symbols-rounded">auto_stories</span>`,
    '#': `<span class="material-symbols-rounded">trophy</span>`,
    'q': '<span class="material-symbols-rounded">eda</span>',
    'e': '<span class="material-symbols-rounded">autorenew</span>',
    'x': '<span class="material-symbols-rounded">visibility</span>'
};


function isInTopRow(c: CommandType) {
    const k = c.id;
    const keys = '!1234567890';
    return (keys.indexOf(k) > -1);
}


function isInUpperRow(c: CommandType) {
    const k = c.id;
    const keys = 'qwe';
    return (keys.indexOf(k) > -1);
}


function isInMiddleRow(c: CommandType) {
    const k = c.id;
    const keys = 'asd';
    return (keys.indexOf(k) > -1);
}


function isInBottomRow(c: CommandType) {
    const k = c.id;
    const keys = 'zxc';
    return (keys.indexOf(k) > -1);
}


function createCommandKeyIcons(c: CommandType) {
    const element = document.createElement('div');
    const inner = document.createElement('div');
    const k = c.id;
    const second = document.createElement('div');
    const first = document.createElement('div');
    second.className = 'command-key';
    first.className = 'command-key';
    second.innerHTML = graphic[k];
    first.innerHTML = `${k}`;
    inner.className = 'inner-key-wrapper';
    inner.append(second);
    inner.append(first);
    element.className = 'command-key-wrapper';
    element.append(inner);
    return element;
}


function createMobileCommandKeyIcons(c: CommandType) {
    const element = document.createElement('div');
    const inner = document.createElement('div');
    const only = document.createElement('div');
    only.className = 'command-key';
    only.innerHTML = graphic[c.id];
    inner.className = 'inner-key-wrapper';
    inner.append(only);
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


function createMobileCommandPreview(p: string) {
    const element = document.createElement('div');
    element.className = 'mobile-command-preview';
    element.innerHTML = MarkPrint(p);
    return element;
}


function createDesktopButton(c: CommandType) {
    const element = document.createElement('button');
    element.className = 'command-wrapper';
    const k = createCommandKeyIcons(c);
    const p = createCommandPreview(c.preview);
    element.onclick = () => executeCommand(c);
    element.append(k);
    element.append(p);
    return element;
}


function createMobileButton(c: CommandType) {
    const element = document.createElement('button');
    element.className = 'mobile-command-wrapper';
    const k = createMobileCommandKeyIcons(c);
    const p = createMobileCommandPreview(c.preview);
    element.onclick = () => executeCommand(c);
    element.append(k);
    element.append(p);
    return element;
}


function createCommandButton(c: CommandType) {
    if (detectMobile()) {
        return createMobileButton(c);
    } else {
        return createDesktopButton(c);
    }
}


function executeCommand(c: CommandType) {

    permitInput = false;
    const content = c.callback();
    if (content) {
        displayOutput(content);
    }
    refreshInputManager();
    permitInput = true;
    
}


function sortByKeyOrder(a: CommandType, b:) {
    const order = `!@#$1234567890qweasdzxc`;
    return order.indexOf(a.id) - 
}


export function refreshInputManager() {
    const commands = getCommandList();
    const element = document.
        querySelector<HTMLDivElement>('#input-manager-wrapper')!;
    const topRow = document.createElement('div');
    const upperRow = document.createElement('div');
    const middleRow = document.createElement('div');
    const lowerRow = document.createElement('div');
    topRow.className = 'input-manager-row';
    upperRow.className = 'input-manager-row';
    middleRow.className = 'input-manager-row';
    lowerRow.className = 'input-manager-row';
    commands.filter(isInTopRow).
        map(c => topRow.appendChild(createCommandButton(c)));
    commands.filter(isInUpperRow).
        map(c => upperRow.appendChild(createCommandButton(c)));
    commands.filter(isInMiddleRow).
        map(c => middleRow.appendChild(createCommandButton(c)));
    commands.filter(isInBottomRow).
        map(c => lowerRow.appendChild(createCommandButton(c)));
    element.innerHTML = '';
    element.append(topRow);
    element.append(upperRow);
    element.append(middleRow);
    element.append(lowerRow);
}


function processKey(c: string) {
    if (c === 'Enter') {
        c = 'enter';
    }
    c = c.toLocaleLowerCase();
    c = c.trim();
    return c;
}


export function setupInputManager() {
    document.addEventListener('keyup', e => {
        if (permitInput) {
            const key = processKey(e.key);
            const commands = getCommandList();
            for (const c of commands) {
                if (c.id === key) {
                    executeCommand(c);
                    return;
                }
            }    
        }
    });
}
  