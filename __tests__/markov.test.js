const markov = require("../markov");

test("should return a sentence of inputs word(s)", () => {
    let newMM = new markov.MarkovMachine("the cat in the hat");
    expect(newMM.makeText()).toContain('hat');
});

test("should return no words", () => {
    let newMM = new markov.MarkovMachine("");
    expect(newMM.makeText()).not.toBe();
});
