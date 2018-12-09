const inquirer = require("inquirer");
const chalk = require("chalk");
const Word = require("./Word.js");
const ARRAY_OF_WORDS = ["Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby", "Fox", "Pikachu", "Luigi", "Ness", "Captain Falcon", "Jigglypuff", "Peach", "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", "Dr. Mario", "Pichu", "Falco", "Marth", "Lucina", "Young Link", "Ganondorf", "Mewtwo", "Roy", "Chrom", "Mr. Game & Watch", "Meta Knight", "Pit", "Dark Pit", "Zero Suit Samus", "Wario", "Snake", "Ike", "PKMN Trainer", "Diddy Kong", "Lucas", "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B.", "Toon Link", "Wolf", "Villager", "Mega Man", "Wii Fit Trainer", "Rosalina & Luma", "Little Mac", "Greninja", "Mii Fighter", "Palutena", "Pac-Man", "Robin", "Shulk", "Bowser Jr.", "Duck Hunt", "Ryu", "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon Belmont", "Richter", "King K. Rool", "Isabelle", "Incineroar", "Piranha Plant", "Joker"];
const NUMBER_OF_GUESSES = 8;

function guessALetter(word, numberOfGuesses) {
    // Checks how many letters need to be guessed
    const unguessedLetters = word.letters.reduce((accumulator, letter) => {
        if (!letter.guessed) {
            accumulator++;
        };
        return accumulator;
    }, 0);

    // Runs as long as there are still letters to be guessed
    if (unguessedLetters) {
        inquirer.prompt([{
            name: "guess",
            message: "Guess a letter!",
            validate: value => {
                return value.length === 1 && /^[a-zA-Z]/.test(value) || "Please enter a single letter";
            },
            filter: value => {
                return value.toLowerCase();
            }
        }]).then(response => {
            word.checkLetters(response.guess);
            console.log(`\n${word}\n`);

            // Decrements the number of guesses left if the guess were wrong
            if (word.toString().toLowerCase().indexOf(response.guess) === -1) {
                numberOfGuesses--;
                console.log(`\n${chalk.red.bold("INCORRECT!!!")}\n\n${numberOfGuesses} ${numberOfGuesses === 1 ? "guess" : "guesses"} remaining!!!\n`);
            } else {
                console.log(`\n${chalk.green.bold("CORRECT!!!")}\n`);
            };

            // Recursively calls this function until there are no more guesses left
            if (numberOfGuesses > 0) {
                guessALetter(word, numberOfGuesses);
            } else {
                console.log("You lose!");
            };
        });
    } else {
        console.log("You got it right! Next word!");
        main();
    };
};

function main() {
    // Randomly selects a word and stores it with the Word constructor
    const randomWord = new Word(ARRAY_OF_WORDS[Math.floor(Math.random() * ARRAY_OF_WORDS.length)]);
    console.log(`\n${randomWord}\n`);
    guessALetter(randomWord, NUMBER_OF_GUESSES);
};

main();