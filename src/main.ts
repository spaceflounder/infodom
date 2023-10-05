import { start } from './engine/StartUp.ts';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

    <div class='output' id='output'>
    </div>

    <form
        autocomplete='off'
        class='entry-form'
        id='entry-form'
    >
        <div class='preview' id='preview'></div>
        <input
            autofocus
            class='input center-text'
            id='command-line'
            type='text'
        />

    </form>
`

start();
