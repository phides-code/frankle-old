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

        const gamesPlayed = await db
            .collection(collectionName)
            .find({
                userId: req.body.userId,
                gameOver: true,
            })
            .toArray();

        console.log(`compiling stats for ${req.body.userId}...`);

        const wins = gamesPlayed.filter((result) => {
            return result.gameWon === true;
        });
        const losses = gamesPlayed.length - wins.length;

        let scoreTotal = 0;
        let average = 0;

        wins.forEach((win) => {
            scoreTotal += win.onRow;
        });

        if (wins.length > 0) {
            average = scoreTotal / wins.length;
        }

        const userStats = {
            gamesPlayed: gamesPlayed.length,
            wins: wins.length,
            losses,
            average,
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
