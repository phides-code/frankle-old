require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

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

const uploadWords = async () => {
    const { initialWordList } = require("./words");

    const cleanWordList = initialWordList.filter((word) => {
        return word.length === 5 && checkForUniqueLetters(word);
    });

    const finalWordList = cleanWordList.map((word) => {
        return {
            _id: uuidv4().substring(28, 37),
            word: word,
        };
    });

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "wordlist";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const insertResult = await db
            .collection(collectionName)
            .insertMany(finalWordList);

        console.log("got insertResult: ");
        console.log(insertResult);
    } catch (err) {
        console.log("uploadWords caught error: ");
        console.log(err.message);
    } finally {
        client.close();
        console.log("Disconnected.");
    }
};

uploadWords();
