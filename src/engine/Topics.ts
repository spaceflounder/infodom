import { getOnlyValidCommands } from "./CommandSystem.ts";


let topics:string[] = [];


export function clearTopics() {
    topics = [];
}


export function appendRecommendedDiscussionTopic(topic: string) {
    topics = [...new Set([...topics, topic])];
}


export function buildTopicsContent() {

    const validated = getOnlyValidCommands(topics);
    const t = [...topics.map(x => {
        if (validated.indexOf(x) > -1) {
            return `<kbd>${x}</kbd>`;
        }
    }).filter(x => x)];
    if (topics.length === 1) {
        return `You might talk
        about ${t.pop()}.`;
    } else if (topics.length === 2) {
        const last = t.pop();
        const first = t.pop();
        return `You might talk 
        about ${first} or ${last}`;
    } else if (topics.length > 2) {
        const last = t.pop();
        return `You might
        discuss ${t.join(', ')} or ${last}.`;
    }
    return ``;

}
