
import { getTimerTracker } from "./DataSystem.ts";
import { setSilentMode, tmsg } from "./Output.ts";


export function executeTimedEvent(name: string, action: () => string | void) {

    const timerTracker = getTimerTracker();
    const n = name;
    if (timerTracker[n] === 0) {
        timerTracker[n] = -1;
        const a = action();
        if (a) {
            setSilentMode(false);
            tmsg(a);
            setSilentMode(true);
        }
    }

}


export function designateTimedEvent(name: string, turnCount: number) {
    
    const timerTracker = getTimerTracker();
    const n = name;
    if (timerTracker[n] === undefined) {
        timerTracker[n] = turnCount;
    }

}


export function handleTimers() {

    const timerTracker = getTimerTracker();
    const keys = Object.keys(timerTracker);
    for (const key of keys) {
        if (timerTracker[key] > 0) {
            timerTracker[key] -= 1;
        }
    }

}
