require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getRandomWord = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "wordlist";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB: " + dbName);

        const allWords = await db.collection(collectionName).find().toArray();

        const randomWord =
            allWords[Math.floor(Math.random() * allWords.length)];

        console.log("returning random word: ");
        console.log(randomWord);

        return res.status(200).json({ status: 200, randomWord: randomWord });
    } catch (err) {
        console.log("Caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { getRandomWord };
