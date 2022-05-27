require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getWordList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "wordlist";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB: " + dbName);

        const wordList = await db.collection(collectionName).find().toArray();

        console.log("returning wordList... ");

        return res.status(200).json({ status: 200, wordList: wordList });
    } catch (err) {
        console.log("getWordList caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { getWordList };
