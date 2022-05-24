require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUserStats = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "savedgames";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB: " + dbName);

        const userResults = await db
            .collection(collectionName)
            .find({
                userId: req.body.userId,
                gameOver: true,
            })
            .toArray();

        console.log(`compiling stats for ${req.body.userId}...`);

        const wins = userResults.filter((result) => {
            return result.gameWon === true;
        }).length;
        const losses = userResults.length - wins;

        const userStats = {
            wins,
            losses,
        };

        return res.status(200).json({ status: 200, userStats: userStats });
    } catch (err) {
        console.log("getUserStats caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { getUserStats };
