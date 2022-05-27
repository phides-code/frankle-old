require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const loadGame = async (req, res) => {
    console.log("Checking for game in progress: ");
    console.dir(req.body);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "savedgames";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const gameInProgress = await db.collection(collectionName).findOne({
            userId: req.body.userId,
            gameOver: false,
        });

        console.log("got gameInProgress: ");
        console.log(gameInProgress);

        if (gameInProgress) {
            return res.status(200).json({ status: 200, gameInProgress });
        } else {
            return res
                .status(200)
                .json({ status: 200, gameInProgress: "none" });
        }
    } catch (err) {
        console.log("loadGame caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { loadGame };
