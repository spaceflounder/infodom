import { contents } from "../contents.ts";
import { getLocation, setLocation } from "./DataSystem.ts";
import { emptyBuffers, pmsg, postBufferEmpty } from "./Output.ts";


export function sendTo(dest: keyof typeof contents) {

    emptyBuffers();
    setLocation(dest);
    const c = contents[dest]();
    if (postBufferEmpty()) {
        pmsg(c);
    }

}


export function lookAround() {

    const l = getLocation();
    const c = contents[l]();
    if (postBufferEmpty()) {
        pmsg(c);
    }

}

