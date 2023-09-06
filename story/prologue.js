

book.prologue = () => {

    useCmd(
        'pay',
        `Your money, sir.`,
        () => sendTo(`tinyInnRoom`)
    )

    useCmd(
        'beach',
        `Time to sleep on the beach`,
        () => sendTo('beach_prologue')
    )

    /*
    setPhase('hurdy');

    usePhase(
        'hurdy',
        () => {

            return `gurdy`;
        }
    );
    */


    return `

“*Anything* will do,” I said with no small measure of desperation. “Please,
you can’t just send me away.” Already I could envision the spectres of brigands
and ne’re-do-wells lurking in the dark. “I will offer double your usual sum.”

The innkeeper gave a wicked little smile. “Perhaps I can help you, friend.”

:::aside
You’ve likely noticed this is a one word parser game. Type :kbd[pay] to settle
your account for the night, or type :kbd[beach] to spend the night on the 
beach.
:::

`
}


