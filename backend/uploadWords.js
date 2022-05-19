require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const uploadWords = async () => {
    const initialWordList = [
        "LEARN",
        "POINT",
        "POUND",
        "MOUSE",
        "ZESTY",
        "FARCE",
        "WAGON",
        "MANIC",
        "GLARE",
        "LAUGH",
    ];

    const wordList = initialWordList.map((word) => {
        return {
            _id: uuidv4().substring(31, 37),
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
            .insertMany(wordList);

        console.log("got insertResult: ");
        console.log(insertResult);
    } catch (err) {
        console.log("Caught error: ");
        console.log(err.message);
    } finally {
        client.close();
        console.log("Disconnected.");
    }
};

uploadWords();
