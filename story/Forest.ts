import { setState, useData } from "@infodom";


export default () => {

    const d = useData();
    d.cave = true;

    return `
    
A cluster of oaks surrounds a flickering torch, hanging on a chain from a high
branch. Deep in the gloom you can see the vague opening of a :kbd[cave] mouth.
    
    `
}

