
import { micromark } from "micromark"
import {
    directive,
    directiveHtml
} from "micromark-extension-directive"


function clean(lines) {

    const l = lines.split('\n');
    return l.map(x => x.trim()).join('\n');

}


export function print(content) {

    content = clean(content);

    function dropcap(d) {
        const text = d.content
            .replace('<p>', '')
            .replace('</p>', '');
        this.tag('<div class="drop-cap">');
        this.tag(text);
        this.tag('</div>');
    }

    function image(d) {
        const text = d.label;
        this.tag('<div class="image">');
        this.tag(`<img src="${text}" />`);
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


    function chaticon() {
        this.tag(`<span class="material-symbols-rounded">
        chat
        </span>`);
    }


    let s = micromark(content, {
        extensions: [directive()],
        htmlExtensions: [directiveHtml({
            dropcap,
            aside,
            chaticon,
            image,
            kbd,
            heading,
        })]
    });

    if (s.length < 60) {
        s = s.replace('<p>', '')
        s = s.replace('</p>', '');
    }

    return s;

}

