require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteGame = async (req, res) => {
    console.log("Deleting game: ");
    console.log(req.body.userId + " " + req.body.word);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "savedgames";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const resultOfDelete = await db.collection(collectionName).deleteOne({
            userId: req.body.userId,
            word: req.body.word,
        });

        console.log("got resultOfDelete: ");
        console.log(resultOfDelete);
        return res.status(200).json({ status: 200, message: "deleted game" });
    } catch (err) {
        console.log("deleteGame caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { deleteGame };
