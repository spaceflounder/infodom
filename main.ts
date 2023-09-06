import * as denopack from
"https://deno.land/x/denopack@0.9.0/vendor/terser@5.3.0/terser.ts";
import { debounce } from "https://deno.land/std@0.194.0/async/debounce.ts";


function getExt(path: string) {

    const sep = path.split('.');
    const last = sep.pop() ?? '';
    return last.toLowerCase();

}


async function scan(path: string, fileContent: string[], fileName: string[]) {

  const dir = Deno.readDir(path);
  for await (const f of dir) {
    const fullpath = `${path}/${f.name}`;
    if (f.isFile) {
      if (getExt(fullpath) === 'js') {
        const s = await Deno.readTextFile(fullpath);
        fileContent.push(s);
        fileName.push(fullpath);
      }
    } else if (f.isDirectory) {
      await scan(fullpath, fileContent, fileName);
    }
  }

}


type ErrorType = {
    name: string,
    message: string,
    filename: number,
    line: number,
    col: number,
    pos: number
};


function report(error: ErrorType, fileName: string[]) {

    return `

    <code>
       <div>
            <b>Error</b>: ${error.name}
       </div> 
       <div>
            with message: ${error.message}
       </div> 
       <div>
            in file: <b>${fileName[error.filename]}</b>
       </div> 
       <div>
            at line: ${error.line} ${error.col}:${error.pos}
       </div> 
    </code>

    `

}


async function compress(fileContent: string[], fileName: string[]) {

    try {
        const code = await denopack.minify(fileContent, {
            mangle: true,
            compress: true,
            toplevel: true
        })
        return code.code;
    } catch(e) {

        const s = report(e, fileName);
        console.log(e);
        return `setErr(\`${s}\`)`;

    }

}



async function refreshset(setStory: (s: string) => void) {

    const fileName: string[] = ['engine.js'];
    const ng = await Deno.readTextFile('engine.js');
    const fileContent: string[] = [ng];
    await scan('story', fileContent, fileName);
   
    const code = await compress(fileContent, fileName);

    const story = `
        ${code}
    `;

    setStory(story);

}


async function checksrc() {

    const watcher = Deno.watchFs("story");

    const ref = debounce((_event) => {
        refreshset(s => Deno.writeTextFile('./dist/adv.min.js', s));
    }, 200);

    for await (const event of watcher) {
       ref(event);
    }

}


export function run() {

    refreshset(s => Deno.writeTextFile('./dist/adv.min.js', s));
    checksrc();
    /*
    const server = denoliver({ root: 'dist', port: 6060, cors: true })
    */

}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  run();
}
