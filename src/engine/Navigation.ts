import { contents } from "../contents.ts";
import { finishPerformingNavigation, setLocation } from "./DataSystem.ts";
import { pmsg, postBufferEmpty } from "./Output.ts";


export function sendTo(dest: keyof typeof contents) {

    setLocation(dest);
    const c = contents[dest]();
    if (postBufferEmpty()) {
        pmsg(c);
    }
    finishPerformingNavigation();

}
