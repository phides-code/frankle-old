require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getSavedGames = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "savedgames";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB: " + dbName);

        const savedGames = await db.collection(collectionName).find().toArray();

        console.log("returning savedGames... ");

        return res.status(200).json({ status: 200, savedGames: savedGames });
    } catch (err) {
        console.log("getSavedGames caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { getSavedGames };
