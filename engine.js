
import { micromark } from 'https://esm.sh/micromark@3?bundle'
import { directive, directiveHtml } from 'https://esm.sh/micromark-extension-directive@3?bundle'


var book = {};
var scene = {};

/* public access api */
let useCmd = (cmd, preview, callback) => {}; 
let useGlobalCmd = (cmd, preview, callback) => {}; 
let useNav = (cmd, preview, callback) => {};
let useTopic = (topic) => {};
let useFirst = (callback) => {};
let useImplicit = (callback, cmds) => {};
let useLeave = (callback) => {};
let useRestricted = (cmds) => {};
let useMdl = () => {};
let sendTo = (newPage) => {};
let getPhase = (name) => '';
let setPhase = (phase, name) => {};
let usePhase = (phase, callback) => {};
let useChapter = (name) => {};



/**
 * Get a random ordered version of an array.
 * @param {Array} array Array to shuffle.
 * @returns {Array} Returns the same array in random order.
 */
function shuffle(array) {

// fisher-yates shuffle

  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

/**
 * Roll a number between 0 and 100.
 * @param {number} odds Likelihood of a true result. The higher the number, the more likely roll will return true.
 * @returns {boolean} Likelihood as a boolean.
 */
function roll(odds) {
    return (odds >= Math.floor(Math.random() * 100))
}

/**
 * Get one element of array and remove it, until only one element remains.
 * @param {Array} arr Array to remove from.
 * @returns {any} Element of array to remove.
 */
function countdown(arr) {
    return (arr.length > 1) ? arr.pop() : arr[0]
}

/**
 * Get one random element of an array.
 * @param {Array} arr Array to pick from.
 * @returns {any} Random element of array.
 */
function pick(arr) {
  const newArr = [...arr]
  const shuffled = shuffle(newArr)
  return shuffled[0]
}




function __run_engine() {

    /* incoming response buffer */
    let resp = [];

    /* universal game object singleton, or model */
    let mdl = createMdl();

    /* implicit action command management */
    const impl = {};

    const fout = {};

    /* current game page, or active function */
    let page = () => {};

    /* phase management tracker */
    let phaseManager = {};

    /* current phase output */
    let phaseOutput = undefined;

    let activeCommand = '';
    let commands = {};
    let gblcmds = {};
    let persCmds = {};
    let lastPreview = '';
    let leave = [];
    let rest = [];


    function createMdl() {
    
        return  {
            page: '',
            topics: [],
        }

    }


    function nospace(str) {

        return str.replace(/ /g,'');

    }


    useChapter = (name) => {

        mdl['chapter'] = name;

    }


    getPhase = (name) => {

        const n = (name) ? name : mdl.page;
        const s = phaseManager[n] ?? 'default';
        return s;

    }


    /**
     * 
     * setPhase
     * Set phase (or mode) of page. If no page is 
     * specified, the current page will be applied.
     * 
     * @param {string} phase 
     * @param {string} name 
     */
    setPhase = (phase, name) => {

        const n = (name) ? name : mdl.page;
        phaseManager[n] = phase;

    }


    usePhase = (phase, callback) => {
        
        const n = getPhase();
        if (phase === n) {
            phaseOutput = callback();
        }

    }


    useGlobalCmd = (cmd, preview, callback) => {

        const c = nospace(cmd.toLowerCase().trim());
        gblcmds[c] = [preview, callback];

    }


    useCmd = (cmd, preview, callback) => {

        const c = nospace(cmd.toLowerCase().trim());
        commands[c] = [preview, callback];

    }


    useNav = (cmd, preview, callback) => {

        const c = nospace(cmd.toLowerCase().trim());
        persCmds[c] = [preview, callback];

    }


    useRestricted = (cmds) => {
        
        rest = [...cmds];
    
    }


    useFirst = (callback) => {

        const addr = getOutAddr();
        if (!fout[addr]) {
            fout[addr] = callback;
        }

    }


    const handleFirstOutput = () => {
        const addr = getOutAddr();
        if (fout[addr] && fout[addr] !== -1) {
            const secondaryOutput = fout[addr]();
            fout[addr] = -1;
            return secondaryOutput;
        }
    }


    useTopic = (topic) => {
        
        const s = new Set([...mdl.topics, topic]);
        mdl.topics = [...s];

    }


    useLeave = (leaveCallback) => {
    
        leave = [leaveCallback, undefined];

    }


    sendTo = (newPage) => {

        let primaryOutput = '';
        let secondaryOutput = '';
        commands = { ...gblcmds };
        page = book[newPage];
        mdl.page = newPage;
        primaryOutput = page();
        const onLeave = leave.pop();
        if (onLeave) {
            return onLeave() + primaryOutput;
        }
        return primaryOutput;

    }


    useImplicit = (callback, cmds) => {

        const addr = getImplAddr();
        if (!impl[addr]) {
            impl[addr] = {
                cmds: [...cmds],
                callback,
            };
        }
    }


    /**
     * useMdl()
     *
     * Get the model, or story state, for manipulation by other functions.
     * InfoDom attempts to keep this clean by avoiding functions or callbacks
     * in this object, so it can be serialized.
     */
    useMdl = () => {
        return mdl;
    }

    function checkImpl() {

        const addr = getImplAddr();
        if (impl[addr]) {
            if (impl[addr].callback) {
                return true;
            }
        }
        return false;

    }


    function getImplAddr(options) {

        const s = getPhase();
        const n = mdl.page ?? 'default';
        return `${n}-${s}`;

    }


    function getOutAddr(options) {

        const s = getPhase();
        const n = mdl.page ?? 'default';
        const c = (activeCommand) ? `-${activeCommand}` : '';
        return `${n}-${s}${c}`;

    }


    function clean(lines) {

        const l = lines.split('\n');
        return l.map(x => x.trim()).join('\n');

    }


    function buildTopicsContent() {

        const t = [...mdl.topics.map(x => {
            if (commands[x]) {
                return `<kbd>${x}</kbd>`;
            }
        }).filter(x => x)];
        if (mdl.topics.length === 1) {
            return `You might talk
            about ${t.pop()}.`;
        } else if (mdl.topics.length === 2) {
            const last = t.pop();
            const first = t.pop();
            return `You might talk 
            about ${first} or ${last}`;
        } else if (mdl.topics.length > 2) {
            const last = t.pop();
            return `You might
            discuss ${t.join(', ')} or ${last}.`;
        }
        return ``;

    }

    function buildRestContent() {

        const r = [...rest.map(x => {
            if (commands[x]) {
                return `<kbd>${x}</kbd>`;
            }
        }).filter(x => x)];
        if (rest.length === 1) {
            return `You can type ${r.pop()}.`;
        } else if (rest.length === 2) {
            const last = r.pop();
            const first = r.pop();
            return `You can type ${first} or ${last}`;
        } else if (rest.length > 2) {
            const last = r.pop();
            return `You can type ${r.join(', ')} or ${last}.`;
        }
        return ``;

    }


    /**
     * pr(content)
     *
     * Print content to screen. Will be displayed next time the screen is
     * updated.
     */
    function pr(content) {
        
        content = clean(content);

        function dropcap(d) {
            const text = d.content
                .replace('<p>', '')
                .replace('</p>', '');
            this.tag('<div class="drop-cap">');
            this.tag(text);
            this.tag('</div>');
        }


        function aside(d) {
            const text = d.content
                .replace('<p>', '')
                .replace('</p>', '');
            this.tag('<div class="tip">');
            this.tag(text);
            this.tag('</div>');
        }


        function kbd(d) {
            const text = d.label;
            this.tag('<kbd>');
            this.tag(text);
            this.tag('</kbd>');
        }


        function heading(d) {
            const text = d.content
                .replace('<p>', '')
                .replace('</p>', '');
            this.tag('<div class="heading">');
            this.tag(text);
            this.tag('</div>');
        }


        function topics(d) {
            const text = buildTopicsContent();
            if (text) {
                this.tag('<div class="tip">');
                this.tag(text);
                this.tag('</div>');
            }
        }


        function restricted(d) {
            const text = buildRestContent();
            if (text) {
                this.tag('<div class="tip">');
                this.tag(text);
                this.tag('</div>');
            }
        }

        const div = document.createElement('div');
        div.className = 'pr';
        const s = micromark(content, {
            extensions: [directive()],
            htmlExtensions: [directiveHtml({
                dropcap,
                aside,
                kbd,
                heading,
                topics,
                restricted,
            })]
        });
        div.innerHTML = s;

        resp.push(div);

    }


    /**
     * dump()
     *
     * Dump content awaitng display to the screen.
     */
    function dump() {

        const e = document.getElementById('output');
        const p = document.getElementById('preview');
        const div = document.createElement('div');
        div.className = 'main';
        div.append(...resp);
        resp = [];
        p.innerHTML = '';
        e.append(div);
        const position = div.getBoundingClientRect();
        window.scrollTo(0, position.top + window.scrollY);

    }


    /**
     * submit(ev)
     *
     * Submit command to game input processing. Uses the event object
     * to prevent the form submit default.
     */
    function submit(ev) {

    // private functions used only in submit
    const getImpRes = (addr) => `

${impl[addr]['callback']()}

`;

    const getFormattedBlock = (preview, result) => `            

:::heading
${preview}
:::
${result}

`;

        ev.preventDefault();
        const i = document.getElementById('command-line');
        const c = i.value.trim().toLowerCase();
        if (commands[c]) {
            const [preview, callback] = commands[c];
            activeCommand = c;
            let result = callback();
            if (phaseOutput) {
                result = phaseOutput;
            }
            const f = handleFirstOutput();
            if (f) {
                result = f;
            }
            phaseOutput = undefined;
            if (checkImpl()) {
                const addr = getImplAddr();
                const actions = impl[addr]['cmds'];
                if (actions.indexOf(c) > -1) {
                    const impres = getImpRes(addr);
                    result = impres + result;
                    impl[addr]['callback'] = false;
                }
            }
            if (rest.length > 0) {
                const cmds = {...commands};
                commands = {};
                rest.map(x => commands[x] = cmds[x]);
            }
            pr(getFormattedBlock(preview, result));
            dump();
            activeCommand = '';
            i.value = '';
        }
        i.focus();
        return false;

    }


    /**
     * loadsys()
     *
     * Load game systems.
     */
    function loadSys() {

        const e = document.getElementById('output');
        const f = document.getElementById('entry-form');
        if (e) {
            e.innerHTML = '';
        }
        if (f) {
            f.onsubmit = submit;
        }

    }


    function watchInput() {

        const e = document.getElementById('preview');
        const f = document.getElementById('command-line');
        const c = f.value;
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
        setTimeout(() => {
            watchInput();
        }, 100);

    }


    /* at program start, run loadsys and first page */
    addEventListener('load', () => {

        document.title = info.title;
        useGlobalCmd('help', `Help`, () => book[info.helpPage]());
        loadSys();
        watchInput();
        pr(sendTo(info.firstPage));
        dump();

    });


    addEventListener('keyup', ev => {

        const alpha = 'abcdefghijklmonpqrstuvwxyz';
        const input = document.getElementById('command-line');
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

__run_engine();

