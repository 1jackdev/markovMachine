/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter((word) => word !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        let newChains = new Map();
        for (let i = 0; i < this.words.length; i++) {
            let currentWord = this.words[i];
            let nextWord = this.words[i + 1] ? this.words[i + 1] : null;
            if (newChains.has(currentWord)) {
                newChains.get(currentWord).push(nextWord);
            } else newChains.set(currentWord, [nextWord]);
        }
        this.newChains = newChains;
    }

    /** return random text from chains */
    makeText(numWords = 100) {
        // make an array of our "key" words, pick one
        let keys = Array.from(this.newChains.keys());
        let keyChoice = MarkovMachine.choice(keys);

        let selectedWords = [];
        // push the curr key.
        // then, change the keyChoice to a value of curr key
        while (selectedWords.length < numWords && keyChoice !== null){
            selectedWords.push(keyChoice);
            keyChoice = MarkovMachine.choice((this.newChains.get(keyChoice)));

        }
        return selectedWords.join(" ");

    }

    static choice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

module.exports = {
    MarkovMachine
}