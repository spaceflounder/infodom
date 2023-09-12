import { Info } from "../story/Info.ts";
import { contents } from "../story/contents.ts";
import { clearAllCommands } from "./Commands.ts";
import { refreshInputManager } from "./InputManager.ts";
import { refreshOutput } from "./OutputManager.ts";

let currentRoom: keyof typeof contents = Info.firstRoom;

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
