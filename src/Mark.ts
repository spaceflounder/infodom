
import { print as printJS } from './markjs.js';

export function MarkPrint(content: string): string {
    const s = printJS(content);
    return s;
}
