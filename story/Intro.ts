import { useCmd, useRestricted, sendTo } from "@infodom";


export default () => {

    useRestricted(['start', 'help']);
    useCmd('start', `Begin Game`, () => sendTo('Creek'))

    return `

# This Cave is Trying to Kill You

## a game by spaceflounder

:::aside
If you've never played this game before, it's strongly recommended you type
:kbd[help] before you begin. Otherwise, type :kbd[start].
:::

    `
}
