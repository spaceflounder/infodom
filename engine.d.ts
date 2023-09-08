

/**
 * This callback is displayed as a global member.
 * @callback stringCallback:string
 */

/**
 * Set a command to be used in the current story context.
 * @param {string} cmd Command to enter to get result.
 * @param {string} preview Preview of command.
 * @param {stringCallback} callback Result action.
 */
declare function useCmd(cmd:string, preview:string, callback: () => string): void;

/**
 * Set a command to work regardless of context.
 * @param {string} cmd Command to get result.
 * @param {string} preview Preview of command.
 * @param {stringCallback} callback Result action.
 */
declare function useGlobalCmd(cmd: string, preview: string, callback: () => string): void;

/**
 * Set a story navigation command.
 * @param {string} cmd Command to execute navigation.
 * @param {string} preview Navigation action preview.
 * @param {stringCallback} callback Navigation result.
 */
declare function useNav(cmd: string, preview: string, callback: () => string): void;

/**
 * Set a topic for this context. A topic can be called without this.
 * @param {string} topic Set a suggested topic for this context. 
 */
declare function useTopic(topic: string): void;

/**
 * Use a callback to display content before the common text is displayed.
 * @param {stringCallback} callback Display this callback result first. 
 */
declare function useFirst(callback: () => string): void;

/**
 * Trigger implicit action on command(s).
 * @param {stringCallback} callback Callback to show on implicit action. 
 * @param {string[]} cmds Commands to trigger implicit action.
 */
declare function useImplicit(callback: () => string, cmds: string[]): void;

/**
 * Trigger callback on navigation to another context.
 * @param {stringCallback} callback Callback to show on leave of context. 
 */
declare function useLeave(callback: () => string): void;

/**
 * Permit only specified commands as input.
 * @param {string[]} cmds Restrict input to only these commands. 
 */
declare function useRestricted(cmds: string[]): void;

/**
 * Get the current story model (mdl) as JS object.
 * @returns {Object} The mdl object.
 */
declare function useMdl(): object;

/**
 * 
 * @param {string} newPage Navigate to new story page.
 */
declare function sendTo(newPage: string): void;

/**
 * Get phase of page.
 * @param {string} name Optional. If passed, will get phase for page by name. 
 * @returns {string} Phase of current page.
 */
declare function getPhase(name: string): string;

/**
 * Set phase of page.
 * @param {string} phase Set phase of page.
 * @param {string} name Optional. If not passed, will affect current page.
 */
declare function setPhase(phase: string, name: string): void;

/**
 * Use phase for this page.
 * @param {string} phase Phase, identified by string.
 * @param {stringCallback} callback Callback of phase, when active.
 */
declare function usePhase(phase: string, callback: () => string): void;

