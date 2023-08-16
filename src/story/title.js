

book.title = () => {
    
    useCmd(
        'no',
        `No no no`,
        () => `Noooo!!`
    )

    useCmd(
        'frog',
        `Hello Frog`,
        () =>
`

The frog isn’t speaking to you.
:restricted

`
    )

    useCmd(
        'hello',
        `Hello World`,
        () => `Hello back.`
    )

    useRestricted(['yes', 'hello', 'frog'])

    return `

# The Penumbra of Anubis
### a game by spacflounder

:::dropcap
You present an interesting case,” said I with no small hint of delight.
“You believe, with the most dire sincerity, that you are in fact hunted
by none other than Anubis himself?”
:::

“With all my soul!” said Barstow. “The priests won’t help me, and I dare not
go to Scotland Yard. Please, Madame Soo, I gravely require you to shed
some light on this darkness I find myself ensconced in.”

`
}


