require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const checkValidity = async (req, res) => {
    console.log("Checking validity of guess: ");
    console.dir(req.body);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "wordlist";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const foundWord = await db
            .collection(collectionName)
            .findOne({ word: req.body.guess });

        if (foundWord) {
            console.log("Valid guess");
            return res.status(200).json({ status: 200, message: "VALID" });
        } else {
            console.log("Invalid guess");
            return res.status(200).json({ status: 200, message: "INVALID" });
        }
    } catch (err) {
        console.log("checkValidity caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { checkValidity };
