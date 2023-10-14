// deno-lint-ignore-file no-explicit-any

/**
 * Get a random ordered version of an array.
 * @param {Array} array Array to shuffle.
 * @returns {Array} Returns the same array in random order.
 */
export function shuffle(array: any[]): Array<any> {

    // fisher-yates shuffle
    
    let currentIndex = array.length,
    randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}


/**
 * Roll a number between 0 and 100.
 * @param {number} odds Likelihood of a true result. The higher the number, the more likely roll will return true.
 * @returns {boolean} Likelihood as a boolean.
 */
export function getRandomNumber1to100(odds: number): boolean {
    return (odds >= Math.floor(Math.random() * 100))
}

