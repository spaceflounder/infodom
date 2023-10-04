
import { useCmd } from '@infodom';
import { setTimer, useTimer } from '../src/engine/TimerSystem.ts';


export default () => {

    useCmd('window', `Look out the window`, () => `
    
The Alps drifted by, vanishing gently into the frosty morning haze. I'd already
fallen for the sweeping vistas of Switzerland; there was no eagerness on my part
to return to New York.
    
    `)

    useCmd('read', `Read the newspaper`, () => `
        
The editorial was about politics in Cuba, the Yankees won the world series, and
Li'l Abner was pretty funny today.
    
    `)

    setTimer('bird', 2);

    useTimer('bird', () => `
    
A bird smacked unceremoniously into the pane of the window.
    
    `)

    return `

## Switzerland 1948

:::dropcap
The engine tumbled rhythmically down the track. I watched the mountains drift
by as big pats of snow hit the window.
:::

:::aside
If this is your first time playing, welcome! This is a single-word parser game.
You might type :kbd[read] or :kbd[window] to continue.
:::
    
    `
}
