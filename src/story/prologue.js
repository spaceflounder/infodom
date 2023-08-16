

book.prologue = () => {

    useTopic('frog');
    useLeave(() => `The frog glares angrily.`);


    useImplicit(() => `blah!`, ['frog']);

    useCmd('frog', `Talk to frog`, () => {
        useFirst(() => `Frog is upset.`);

        return `

The frog doesn't want to talk right now.
:topics

    `})

    useCmd(
        'please',
        `Please Continue, Mr Barstow...`,
        () => sendTo('title')
    )

    useFirst(() => 'blah');

    return `

At my porch stood a small man in a tweed suit with a thick snow-colored
mustache. “My name is Reginald Barstow,” he said. His voice tremored with
fear. “Might I come in? I have a matter of the most 
strange and unplesant circumstances. Please! No-one else will help me.”

“Of course,” I said. I sat him down and presented him with a dram of
single-malt scotch to calm his nerves, which he proceeded to sip greedily.

“I am Madame Soo, Detective of Limehouse,” I said. “But you appear to have
heard of me already.”

“Yes,” he said. “I’ve come in my most desparete hour. I am being stalked,
Madame, by forces not of this Earth!”

“How very queer,” I said. He had the singular air of a man who had only
narrowly escaped the icy waves of the River Styx. His face was pale, and there
were thin crinkles around his reddish eyes. His pupils spoke of an abused
liver.

“I can assure you, you are quite safe here,” said I with no small confidence.
“But for my own enlightenment, please tell me: who is after you?”

He swallowed the entirety of his drink. “I tell you, Madame, and you must
promise to believe me. I am being hunted by none other than the Egyptian
God of Death!”

:::aside
Type :kbd[please] to continue.
:::

`
}


