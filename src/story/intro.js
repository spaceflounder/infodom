

book.intro = () => {
    
    useCmd(
        'start',
        `Head to the Cliffside`,
        () => sendTo('cliffside')
    )

    useCmd(
        'ding',
        `And who exactly is Aunt Ding?`,
        () => sendTo('ding')
    )

    return `

### Because I Play Applesauce

:::dropcap
None of the kids at my school had ever heard of Applesauce. I mean the
card game, not the food. But Gladys had. We played together on recess,
in between wallball and hiding from bullies like Tom Dogger.
:::

Then one day she invited me to visit her Aunt Ding.

:::aside
Type :kbd[ding] to continue, or, if you‘ve played before, type :kbd[start] to
skip straight to the cliffside.
:::

`
}


