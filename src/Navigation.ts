import { Info } from "../Info.ts";
import { contents } from "./contents.ts";
import { clearAllCommands } from "./Commands.ts";
import { refreshInputManager } from "./InputManager.ts";
import { refreshOutput } from "./OutputManager.ts";

let currentRoom = Info.firstRoom;

export function navigationSendTo(destination: keyof typeof contents) {
    currentRoom = destination;
    refreshRoom();
}

export function getCurrentRoom() {
    return currentRoom;
}

export function refreshRoom() {
    clearAllCommands();
    refreshOutput();
    refreshInputManager();
}
