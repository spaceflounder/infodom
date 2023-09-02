

book.intro = () => {
    
    useCmd(
        'start',
        `I’ve played before`,
        () => sendTo('inJail')
    )

    useCmd(
        'barter',
        `Can we make a deal?`,
        () => sendTo('prologue')
    )

    useCmd(
        'beach',
        `Time to sleep on the beach`,
        () => sendTo('beach_prologue')
    )

    return `

### One Night in the Caribbean

:::dropcap
There’s nought a free room or bed in the whole village,” said the innkeeper.
He was a stocky fellow, with a fatuous nose and a mustache to match.
:::

“Please,” said I, “Anything you can spare, just for one night.”

“Ye might try down on the beach. Pebbles sleeps there all day.”

:::aside
Ye might type :kbd[barter], :kbd[beach] or,
if you‘ve played before, type :kbd[start].
:::

`
}


