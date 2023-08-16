

/* public access api */
let useCmd = (cmd, preview, callback) => {}; 
let useNav = (cmd, preview, callback) => {};
let useTopic = (topic) => {};
let useFirst = (callback) => {};
let useImplicit = (callback, cmds) => {};
let useLeave = (callback) => {};
let useRestricted = (cmds) => {};
let useMdl = () => {};
let sendTo = (newPage) => {};
let getState = (name) => '';
let setState = (state, name) => {};


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

    /* state management tracker */
    let stateManager = {};

    let activeCommand = '';
    let commands = {};
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


    getState = (name) => {

        const n = (name) ? name : mdl.page;
        const s = stateManager[n] ?? 'default';
        return s;

    }


    /**
     * 
     * setState
     * Set state (or mode) of page. If no page is 
     * specified, the current page will be applied.
     * 
     * @param {string} state 
     * @param {string} name 
     */
    setState = (state, name) => {

        const n = (name) ? name : mdl.page;
        stateManager[n] = state;

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
        commands = {};
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
     * Get the modal, or story state, for manipulation by other functions.
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

        const s = getState();
        const n = mdl.page ?? 'default';
        return `${n}-${s}`;

    }


    function getOutAddr(options) {

        const s = getState();
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
            const content = d.content
                .replace('<p>', '')
                .replace('</p>', '');
            this.tag('<div class="drop-cap">');
            this.tag(content);
            this.tag('</div>');
        }


        function aside(d) {
            const content = d.content
                .replace('<p>', '')
                .replace('</p>', '');
            this.tag('<aside>');
            this.tag(content);
            this.tag('</aside>');
        }


        function kbd(d) {
            const content = d.label;
            this.tag('<kbd>');
            this.tag(content);
            this.tag('</kbd>');
        }


        function topics(d) {
            const content = buildTopicsContent();
            if (content) {
                this.tag('<aside>');
                this.tag(content);
                this.tag('</aside>');
            }
        }


        function restricted(d) {
            const content = buildRestContent();
            if (content) {
                this.tag('<aside>');
                this.tag(content);
                this.tag('</aside>');
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
        div.className = 'response';
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

### ${preview}            

${result}

`;

        ev.preventDefault();
        const i = document.getElementById('command-line');
        const c = i.value.trim().toLowerCase();
        if (commands[c]) {
            const [preview, callback] = commands[c];
            activeCommand = c;
            let result = callback();
            const f = handleFirstOutput();
            if (f) {
                result = f;
            }
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
        const f = document.getElementById('input');
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

