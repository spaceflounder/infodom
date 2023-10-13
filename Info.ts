
import { GameInfoType } from './src/GameInfoType.ts';
import { lookAround } from './src/engine/Navigation.ts';
import { shuffle } from "./src/engine/Scrambler.ts";

const helpTextContent = `

*This Cave is Trying to Kill You* is a one-word parser game. Type in a command,
and the game will choose what to do with that command based on the context of
your situation. What kind of commands can you type?

:kbd[Look], :kbd[Examine], :kbd[Smell], :kbd[Lick], :kbd[Push], :kbd[Pull],
:kbd[Climb], :kbd[Talk], :kbd[Dig], :kbd[Take], :kbd[Yell], :kbd[Jump], :kbd[Cut],
:kbd[Read] and many more.

Navigate to other places by typing the name of the place. To see what places you
can visit, use the :kbd[Places] command.

Some of these commands will be familiar if you've
played interactive fiction before, and some commands will be new. You'll have to
explore the game to find them...

`

const deathMsg = () => {
    const untimely = shuffle([
        'untimely',
        'unfortunate',
        'unwelcome',
        'unexpected',
        'undeserved',
        'unpredicted',
        'undue',
        'unpleasant'
    ]).unshift();

    const demise = shuffle([
        'demise',
        'departure from this mortal coil',
        'exit',
        'dissolution',
        'passing',
        'expiration',
        'fatality',
    ]).unshift();

    return `
    
We're sorry your adventures have come to an end. To reverse
your somewhat ${untimely} ${demise}, please type :kbd[whoops] now.
    
    `
}

export const info: GameInfoType = {
    title: `This Cave is Trying to Kill You`,
    helpText: () => helpTextContent,
    deathMsg,
    firstLocation: 'Intro',
    commonCommands: {
        'Listen': [`Listen`, () => `There's nothing worth listening to here.`],
        'Read': [`Read`, () => `You read for a bit and get back into your adventure.`],
        'Examine': [`Examine myself`, () => `You look ok.`],
        'Look': [`Look around`, lookAround],
        'Turn': [`Turn anything`, () => `There's nothing here to turn.`],
        'Push': [`Push something`, () => `You can't push anything here.`],
        'Pull': [`Pull something`, () => `You can't push anything here.`],
        'Climb': [`Climb anything`, () => `Climbing here won't solve anything.`],
        'Yell': [`Yell`, () => `AAAAAAH!`],
        'Talk': [`Talk to myself`, () => `You have a very pleasant conversation, then you continue your adventure.`],
        'Dig': [`Dig`, () => `You scratch the ground with your foot.`],
        'Cut': [`Cut anything`, () => `There's nothing here to cut.`],
        'Tie': [`Tie`, () => `You haven't anything to tie.`],
        'Take': [`Take something`, () => `There's nothing here worth taking.`],
        'Jump': [`Jump`, () => `You give a little bunny hop in place.`],
        'Smell': [`Smell air`, () => `You smell nothing special.`],
        'Lick': [`Lick`, () => `You be weird.`],
        'Drink': [`Drink`, () => `There's nothing here to drink.`],
        'Eat': [`Eat`, () => `There's nothing here to eat.`],
        'Hint': [`Gimme a hint will you`, () => `This game doesn't have a hint 
        command, but there might be someone you can find in-game you can
        give you some clues...`],
    },
}
