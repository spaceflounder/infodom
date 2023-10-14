
import { micromark } from "https://esm.sh/micromark@3.2.0?bundle"
import {
    directive,
    directiveHtml
} from "https://esm.sh/micromark-extension-directive@3.0.0?bundle"

import { buildTopicsContent } from './Topics.ts';
import { buildRestrictedContent } from './CommandSystem.ts';


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
        this.tag(`<button class='inline-button' onclick='setInpVal("${d.label}")'>`);
        this.tag(text);
        this.tag('</button>');
    }


    function heading(d) {
        const text = d.content
            .replace('<p>', '')
            .replace('</p>', '');
        this.tag('<div class="heading">');
        this.tag(text);
        this.tag('</div>');
    }

    function topics() {
        const text = buildTopicsContent();
        if (text) {
            this.tag('<div class="tip">');
            this.tag(text);
            this.tag('</div>');
        }
    }


    function materialicon(d) {
        const icon = d.content;
        this.tag(`<span class="material-symbols-rounded">
        ${icon}
        </span>`);
    }


    function restricted() {
        const text = buildRestrictedContent();
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
            materialicon,
            kbd,
            heading,
            topics,
            restricted,
        })]
    });    
}

