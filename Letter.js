// Displays these characters without them having to be guessed
const IGNORED_CHARACTERS = [" ", ".", "&", "-"];

function Letter(character) {
    this.character = character;
    this.guessed = IGNORED_CHARACTERS.includes(this.character) ? true : false;
    this.displayLetter = function () {
        return this.guessed ? this.character : "_";
    };
    this.checkGuess = function (guess) {
        // Ignores the case of the character entirely
        if (!this.character.localeCompare(guess, "en", {
                sensitivity: "base"
            })) {
            this.guessed = true;
        };
    };
};

module.exports = Letter;