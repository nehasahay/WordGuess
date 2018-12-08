const Letter = require("./Letter.js");

function Word(word) {
    // Eliminates split
    this.letters = Array.prototype.map.call(word, character => new Letter(character));
    this.displayWord = function () {
        // Eliminates an extra loop over map&join
        return this.letters.reduce((accumulator, character, index) => {
            // Template literal performs better than standard concatenation
            return `${accumulator}${index === 0 ? "" : " "}${character.displayLetter()}`;
        }, "");
    };
    this.checkLetters = function (guess) {
        // For loop performs better than forEach
        for (const character of this.letters) {
            character.checkGuess(guess);
        };
    };
};

module.exports = Word;