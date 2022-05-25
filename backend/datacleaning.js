const { words } = require("./words");

const checkForUniqueLetters = (word) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (i !== j) {
                if (word[i] === word[j]) {
                    return false;
                }
            }
        }
    }

    return true;
};

const goodWords = words.filter((word) => {
    return word.length === 5 && checkForUniqueLetters(word);
});

console.log(goodWords);
