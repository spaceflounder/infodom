
import { micromark } from "https://esm.sh/micromark@3.2.0?bundle"
import {
    directive,
    directiveHtml
} from "https://esm.sh/micromark-extension-directive@3.0.0?bundle"


function clean(lines) {

    const l = lines.split('\n\n');
    return l.map(x => x.trim());

}


export function print(content) {

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


    function chaticon(d) {
        this.tag(`<span class="material-symbols-rounded">
        chat
        </span>`);
    }


    function restricted(d) {
        const text = buildRestContent();
        if (text) {
            this.tag('<div class="tip">');
            this.tag(text);
            this.tag('</div>');
        }
    }

    return micromark(content, {
        extensions: [directive()],
        htmlExtensions: [directiveHtml({
            dropcap,
            aside,
            chaticon,
            kbd,
            heading,
            topics,
            restricted,
        })]
    });    
}

