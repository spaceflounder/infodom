

const importTemplate = (n: string, f: string) => `import ${n} from '.${f}';`


const extractName = (f: string) => removeExt(f.split('/').at(-1)!)


async function writeContents(files: string[]) {
  const names: string[] = [];
  const imports: string[] = [];
  files.map(f => {
    const n = extractName(f);
    names.push(n);
    imports.push(importTemplate(n, f));
  });
  const s = `
${imports.join('\n')}
export const contents = {
${names.join(',\n')}
}
`;
  await Deno.writeTextFile('./src/contents.ts', s);
}


function removeExt(path: string) {
  const sep = path.split('.');
  sep.pop();
  return sep.join('');
}



function getExt(path: string) {

    const sep = path.split('.');
    const last = sep.pop() ?? '';
    return last.toLowerCase();

}


async function scan(path: string, fileName: string[]) {

  const dir = Deno.readDir(path);
  for await (const f of dir) {
    const fullPath = `${path}/${f.name}`;
    if (f.isFile) {
      if (getExt(fullPath) === 'ts') {
        fileName.push(fullPath);
      }
    } else if (f.isDirectory) {
      await scan(fullPath, fileName);
    }
  }

}


export async function run() {

  let fileName: string[] = [];
  await scan('./story', fileName);
  await writeContents(fileName);

  const watcher = Deno.watchFs("./story");
  for await (const event of watcher) {
    if (event.kind === 'create') {
      fileName = [];
      await scan('./story', fileName);
      await writeContents(fileName);
    }
  }

}

if (import.meta.main) {
  run();
}
