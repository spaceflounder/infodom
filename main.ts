import denoliver from 'https://deno.land/x/denoliver/mod.ts'
import * as denopack from "https://deno.land/x/denopack@0.9.0/vendor/terser@5.3.0/terser.ts";


const port = 8080;

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


const micromarkHeader = () => `

import { micromark } from 'https://esm.sh/micromark@3?bundle'
import { directive, directiveHtml } from 'https://esm.sh/micromark-extension-directive@3?bundle'

`;


const globalObjectList = () => `

var book = {};
var scene = {};

`;


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


async function refreshset() {

    const fileContent: string[] = [];
    const fileName: string[] = [];
    await scan('src', fileContent, fileName);
   
    const code = await compress(fileContent, fileName);

    const story = `
        ${micromarkHeader()}
        ${globalObjectList()}
        ${code}
    `;
    await Deno.writeTextFile('./dist/adv.min.js', story);

}


async function checksrc() {

    const watcher = Deno.watchFs("src");

    for await (const event of watcher) {
      if (event) {
        await refreshset();
      }
    }

}

export function run() {

    denoliver({ root: 'dist', port, cors: true })
    refreshset();
    checksrc();

}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  run();
}
