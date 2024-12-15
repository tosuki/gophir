export abstract class Repository <T> {
    protected values: T[] = []

    //Binary search algorithm to get the index of the item fast in huge arrays
    protected getIndex(id: number, filter: (value: T) => any): number {
        let low = 0
        let high = this.values.length

        while(low <= high) {
            const guessIndex = Math.round((low + high) / 2)
            const guess = filter(this.values[guessIndex])

            if (guess === id) {
                return guessIndex
            }

            if (guess > id) {
                high = guessIndex - 1
            } else {
                low = guessIndex + 1
            }
        }

        return -1
    }
}
