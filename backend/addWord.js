require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addWord = async (req, res) => {
    console.log("Adding word to wordlist: ");
    console.dir(req.body.word);

    if (req.body.word.length !== 5) {
        return res
            .status(400)
            .json({ status: 400, message: "invalid word length" });
    }

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "wordlist";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const foundWord = await db
            .collection(collectionName)
            .findOne({ word: req.body.word });

        if (foundWord) {
            console.log("Word already in wordlist");
            return res
                .status(200)
                .json({ status: 200, message: "Word already in wordlist" });
        } else {
            const resultOfInsert = await db
                .collection(collectionName)
                .insertOne({
                    _id: uuidv4().substring(28, 37),
                    word: req.body.word.toUpperCase(),
                });

            console.log("got resultOfInsert: ");
            console.log(resultOfInsert);

            return res
                .status(200)
                .json({ status: 200, message: "Added to wordlist" });
        }
    } catch (err) {
        console.log("addWord caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { addWord };
