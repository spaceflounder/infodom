
import { print as printJS } from './markjs.js';
import { smartypants } from './smartypants.es6.js';

export function MarkPrint(content: string): string {
    content = smartypants(content);
    content = content.replaceAll('    ', '');
    content = printJS(content);
    return content;
}
