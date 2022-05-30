require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getSavedGamesByUser = async (req, res) => {
    console.log("Getting saved games for user: ");
    console.dir(req.body);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "savedgames";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const savedGames = await db
            .collection(collectionName)
            .find({ userId: req.body.userId })
            .toArray();

        if (savedGames) {
            return res.status(200).json({ status: 200, savedGames });
        } else {
            console.log("No saved games found");
            return res
                .status(200)
                .json({ status: 200, message: "No saved games found" });
        }
    } catch (err) {
        console.log("getSavedGamesByUser caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { getSavedGamesByUser };
